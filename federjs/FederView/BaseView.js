import * as d3 from 'd3';
import { renderLoading, finishLoading } from './loading';
import * as THREE from 'three';
import { OrbitControls } from './OrbitControls';
import { HNSW_LINK_TYPE, HNSW_NODE_TYPE } from 'Types';
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
    // const ctx = canvas.getContext('2d');
    // const infoPanel = this.initInfoPanel(dom);

    this.overviewLayoutPromise && (await this.overviewLayoutPromise);
    finishLoading(dom);
    // this.renderOverview(ctx, infoPanel);
    // const eventHandlers = this.getOverviewEventHandler(ctx, infoPanel);
    // addMouseListener(canvas, this.canvasScale, eventHandlers);
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

    const infoPanel = this.initInfoPanel(dom);

    const searchViewLayoutData = await this.searchViewHandler(searchRes);
    console.log(searchViewLayoutData.visData, searchViewLayoutData.id2forcePos);

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
      // camera.lookAt(0, 0, 0);
      // camera.zoom = 1.5;

      //setup the renderer
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setClearColor(0xffffff, 1);

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

      // add the mesh esto the scene
      const setupMeshes = () => {
        let z0 = 0;
        for (let i = 0; i < searchViewLayoutData.visData.length; i++) {
          const { entryIds, fineIds, links, nodes } =
            searchViewLayoutData.visData[i];
          const { id2forcePos } = searchViewLayoutData;
          console.log(entryIds, fineIds, links, nodes);
          for (let j = 0; j < nodes.length; j++) {
            const node = nodes[j];
            const { id, x, y, type } = node;
            let color = new THREE.Color(0xffffff);
            if (type === HNSW_NODE_TYPE.Candidate) {
              color.setRGB(0, 0, 1);
            } else if (type === HNSW_NODE_TYPE.Entry) {
              color.setRGB(1, 0, 0);
            } else if (type === HNSW_NODE_TYPE.Fine) {
              color.setRGB(0, 1, 0);
            }else if (type === HNSW_NODE_TYPE.Neighbor) {
              color.setRGB(0, 1, 1);
            }
            const geometry = new THREE.SphereGeometry(10, 32, 32);
            const material = new THREE.MeshPhongMaterial({
              color,
              flatShading: true,
            });
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(x, y, z0);
            scene.add(sphere);
          }
          for (let j = 0; j < links.length; j++) {
            const link = links[j];
            const { source, target } = link;
            //create buffer geometry
            const geometry = new THREE.BufferGeometry();
            //create points array
            const points = [];
            points.push(new THREE.Vector3(source.x, source.y, z0));
            points.push(new THREE.Vector3(target.x, target.y, z0));
            const lineGeometry = new THREE.BufferGeometry().setFromPoints(
              points
            );
            let color = new THREE.Color(0xaaaaaa);
            if (link.type === HNSW_LINK_TYPE.Searched) {
              color.setRGB(1, 1, 0.2);
            }
            // }else if(link.type===HNSW_LINK_TYPE.Visited){
            //     color.setRGB(0.2,1,0.2);
            // }

            //create a new material
            const material = new THREE.LineBasicMaterial({
              color,
              linewidth: 2,
            });
            //create a new line
            const line = new THREE.Line(lineGeometry, material);

            scene.add(line);
          }

          z0 += 400;
        }
        // for (let i = 0; i < circles.length; i++) {
        //   const circle = circles[i];
        //   //circle is a <circle> element
        //   //get the fill color of the circle
        //   const color = circle.attributes.fill.value;
        //   //parse the color string to a THREE.Color
        //   const c = new THREE.Color(color);

        //   console.debug(circle.cx.baseVal.value, color);
        //   //create sphere
        //   const sphere = new THREE.SphereGeometry(
        //     circle.r.baseVal.value,
        //     16,
        //     16
        //   );
        //   const material = new THREE.MeshPhongMaterial({
        //     color: c,
        //     flatShading: true,
        //   });
        //   const mesh = new THREE.Mesh(sphere, material);
        //   mesh.position.set(
        //     -circle.cx.baseVal.value,
        //     -circle.cy.baseVal.value,
        //     0
        //   );
        //   scene.add(mesh);
        // }
      };
      setupMeshes();
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
