import * as d3 from 'd3';
import { renderLoading, finishLoading } from './loading';
import * as THREE from 'three';
import { OrbitControls } from './OrbitControls';
import { HNSW_LINK_TYPE, HNSW_NODE_TYPE } from 'Types';
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';
// import { VIEW_TYPE } from 'Types';

export default class BaseView {
  constructor({ viewParams, getVectorById }) {
    this.viewParams = viewParams;

    const { width, height, canvasScale, mediaType, mediaCallback } = viewParams;
    this.clientWidth = width;
    this.width = width * canvasScale;
    this.clientHeight = height;
    this.height = height * canvasScale;
    this.getVectorById = getVectorById;
    this.canvasScale = canvasScale;
    this.mediaType = mediaType;
    this.mediaCallback = mediaCallback;
  }

  // override
  initInfoPanel() {}
  renderOverview() {}
  renderSearchView() {}
  searchViewHandler() {}
  getOverviewEventHandler() {}
  getSearchViewEventHandler() {}

  async overview(dom) {
    const canvas = initCanvas(
      dom,
      this.clientWidth,
      this.clientHeight,
      this.canvasScale
    );
    const ctx = canvas.getContext('2d');
    const infoPanel = this.initInfoPanel(dom);

    this.overviewLayoutPromise && (await this.overviewLayoutPromise);
    finishLoading(dom);
    this.renderOverview(ctx, infoPanel);
    const eventHandlers = this.getOverviewEventHandler(ctx, infoPanel);
    addMouseListener(canvas, this.canvasScale, eventHandlers);
  }

  async search(dom, { searchRes, targetMediaUrl }) {
    const canvas = initCanvas(
      dom,
      this.clientWidth,
      this.clientHeight,
      this.canvasScale
    );
    // canvas.getContext("webgl2");
    // const ctx = canvas.getContext('2d');

    // const infoPanel = this.initInfoPanel(dom);

    const searchViewLayoutData = await this.searchViewHandler(searchRes);
    // console.log(searchViewLayoutData.visData, searchViewLayoutData.id2forcePos);

    const setup3d = () => {
      const scene = new THREE.Scene();

      //setup the orthographic camera
      const camera = new THREE.OrthographicCamera(
        canvas.clientWidth,
        canvas.clientWidth * -1,
        canvas.clientHeight,
        canvas.clientHeight * -1,
        -2000,
        2000
      );
      camera.position.set(0, 0, -25);

      //setup the renderer
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      // renderer.setClearColor(0xffffff, 1);

      const setupLights = () => {
        //setup the directional light
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 1, 1);
        scene.add(light);
        //setup ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
        scene.add(ambientLight);
      };
      setupLights();
      // console.log(searchViewLayoutData.entryNodesLevels);

      // add the nodes to the scene
      const setupNodes = () => {
        let z0 = 0;
        for (let i = searchViewLayoutData.visData.length - 1; i >= 0; i--) {
          const { entryIds, fineIds, links, nodes } =
            searchViewLayoutData.visData[i];
          const { id2forcePos } = searchViewLayoutData;
          // pts.push(
          //   id2forcePos[entryIds[0]][0],
          //   id2forcePos[entryIds[0]][1],
          //   z0
          // );

          for (let j = 0; j < nodes.length; j++) {
            const node = nodes[j];
            const { id, x, y, type } = node;
            let color = new THREE.Color(),
              opacity = 1;
            if (type === HNSW_NODE_TYPE.Entry) {
              color.setHex(0x156cdd);
            } else if (type === HNSW_NODE_TYPE.Candidate) {
              color.setHex(0x8a98ff);
            } else if (type === HNSW_NODE_TYPE.Fine) {
              color.setHex(0x80bc7a);
            } else if (type === HNSW_NODE_TYPE.Target) {
              color.setHex(0xee8484);
            }
            const geometry = new THREE.SphereGeometry(10, 32, 32);
            const material = new THREE.MeshPhongMaterial({
              color,
              transparent: true,
              opacity,
              flatShading: true,
            });
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(x, y, z0);
            scene.add(sphere);
          }

          z0 += 400;
        }
      };
      setupNodes();

      const setupLinks = () => {
        let z0 = 0;
        let lines=[];
        let lastFinePt=new THREE.Vector3();
        for (let i = searchViewLayoutData.visData.length - 1; i >= 0; i--) {
          const { entryIds, fineIds, links, nodes } =
            searchViewLayoutData.visData[i];
          const { id2forcePos } = searchViewLayoutData;
          
          for (let j = 0; j < links.length; j++) {
            const link = links[j];
            const { source, target } = link;

            //create points array
            const points = [];
            points.push(new THREE.Vector3(source.x, source.y, z0));
            points.push(new THREE.Vector3(target.x, target.y, z0));
            const lineGeometry = new THREE.BufferGeometry().setFromPoints(
              points
            );
            let color = new THREE.Color(),
              opacity = 1.0;

            if (link.type === HNSW_LINK_TYPE.Fine) {
              color = color.setHex(0xee8484);
            } else if (link.type === HNSW_LINK_TYPE.Searched) {
              color.setHex(0x80bc7a);
            } else if (link.type === HNSW_LINK_TYPE.Extended) {
              color.setHex(0x86a9c2);
              opacity = 0;
            } else if (link.type === HNSW_LINK_TYPE.Visited) {
              color.setHex(0x000000);
              opacity = 0;
            }

            //create a new material
            const material = new THREE.LineBasicMaterial({
              color,
              opacity,
              linewidth: 2,
              transparent: true,
            });
            //create a new line
            const line = new THREE.Line(lineGeometry, material);
            if (opacity > 0) lines.add(line);
          }
          const {x,y}=links[links.length-1].target;
          lastFinePt=new THREE.Vector3(x,y,z0);
          z0 += 400;
        }
      };
      setupLinks();
      //adjust the display
      function adjustDisplay() {
        renderer.setSize(
          renderer.domElement.clientWidth,
          renderer.domElement.clientHeight
        );
        camera.left = canvas.clientWidth * -1;
        camera.right = canvas.clientWidth;
        camera.top = canvas.clientHeight;
        camera.bottom = canvas.clientHeight * -1;
        camera.updateProjectionMatrix();
      }
      //setup the controls
      const controls = new OrbitControls(camera, renderer.domElement);

      const render = () => {
        //adjust the display
        adjustDisplay();
        //update the controls
        controls.update();
        //render the scene
        renderer.render(scene, camera);
        //request the next frame
        requestAnimationFrame(render);
      };
      render();
    };
    setup3d();

    finishLoading(dom);
    // this.renderSearchView(
    //   ctx,
    //   infoPanel,
    //   searchViewLayoutData,
    //   targetMediaUrl,
    //   dom
    // );
    // const eventHandlers = this.getSearchViewEventHandler(
    //   ctx,
    //   searchViewLayoutData,
    //   infoPanel
    // );
    // addMouseListener(canvas, this.canvasScale, eventHandlers);
  }
}

const addMouseListener = (
  element,
  canvasScale,
  { mouseMoveHandler, mouseClickHandler, mouseLeaveHandler } = {}
) => {
  element.addEventListener('mousemove', (e) => {
    const { offsetX, offsetY } = e;
    const x = offsetX * canvasScale;
    const y = offsetY * canvasScale;
    mouseMoveHandler && mouseMoveHandler({ x, y });
  });
  element.addEventListener('click', (e) => {
    const { offsetX, offsetY } = e;
    const x = offsetX * canvasScale;
    const y = offsetY * canvasScale;
    mouseClickHandler && mouseClickHandler({ x, y });
  });
  element.addEventListener('mouseleave', () => {
    mouseLeaveHandler && mouseLeaveHandler();
  });
};

const initCanvas = (dom, clientWidth, clientHeight, canvasScale) => {
  renderLoading(dom, clientWidth, clientHeight);

  const domD3 = d3.select(dom);
  domD3.selectAll('canvas').remove();

  const canvas = domD3
    .append('canvas')
    .attr('width', clientWidth)
    .attr('height', clientHeight);
  // const ctx = canvas.node().getContext('2d');
  // ctx.scale(1 / canvasScale, 1 / canvasScale);

  return canvas.node();
};
