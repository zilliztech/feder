import { TViewParams } from 'Types';
import { TVisData, TVisDataHnsw3d } from 'Types/visData';
import TViewHandler from '../ViewHandler';
import InfoPanel from 'FederView/InfoPanel';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';
const defaultViewParams = {
  width: 800,
  height: 600,
};

export const HNSW_NODE_TYPE = {
  Coarse: 1,
  Candidate: 2,
  Fine: 3,
  Target: 4,
};

export default class HnswSearchHnsw3dView implements TViewHandler {
  node: HTMLElement;
  staticPanel: InfoPanel;
  clickedPanel: InfoPanel;
  hoveredPanel: InfoPanel;
  canvas: HTMLCanvasElement;
  visData: TVisDataHnsw3d;
  static colors = {
    candidateBlue: 0x175fff,
    searchedYellow: 0xfffc85,
    fineOrange: 0xf36e4b,
    targetWhite: 0xffffff,
    labelGreen: 0x7fff7c,
  };

  //threejs stuff
  scene: THREE.Scene;
  camera: THREE.OrthographicCamera;
  renderer: THREE.WebGLRenderer;
  spheres: THREE.Mesh[] = [];
  planes: THREE.Mesh[] = [];
  lines: THREE.Mesh[] = [];
  controller: OrbitControls;
  canvasWidth: number;
  canvasHeight: number;
  minX = Infinity;
  minY = Infinity;
  maxX = -Infinity;
  maxY = -Infinity;
  static defaultCamera = {
    position: {
      isVector3: true,
      x: 85.73523132349014,
      y: 21.163507502655282,
      z: 46.92095544735611,
    },
    rotation: {
      isEuler: true,
      x: -0.42372340871438785,
      y: 1.0301035872063589,
      z: 0.36899315353677475,
      order: 'XYZ',
    },
    zoom: 0.14239574134637464,
  };

  constructor(visData: TVisData, viewParams: TViewParams) {
    this.staticPanel = new InfoPanel();
    this.clickedPanel = new InfoPanel();
    this.hoveredPanel = new InfoPanel();
    this.init(visData, viewParams);
  }

  init(visData: TVisData, viewParams: TViewParams) {
    this.visData = visData as TVisDataHnsw3d;
    console.log(visData);
    const searchRecords = this.visData.searchRecords;
    console.log(searchRecords);
    this.node = document.createElement('div');
    this.node.className = 'hnsw-search-hnsw3d-view';
    viewParams = Object.assign({}, defaultViewParams, viewParams);
    this.canvasWidth = viewParams.width;
    this.canvasHeight = viewParams.height;
    this.setupCanvas();
    this.setupRenderer();
    this.setupScene();
    this.parseSearchRecords();
    this.setupCamera();
    this.setupController();
  }

  addLine(from: THREE.Vector3, to: THREE.Vector3, color: number) {
    const line = new MeshLine();
    line.setPoints([from.x, from.y, from.z, to.x, to.y, to.z]);
    const material = new MeshLineMaterial({
      color: new THREE.Color(color),
      lineWidth: 6,
    });
    const mesh = new THREE.Mesh(line, material);
    this.scene.add(mesh);
  }

  createSphere(x: number, y: number, z: number, color: number) {
    const geometry = new THREE.SphereGeometry(20);
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(x, y, z);
    return sphere;
  }

  stepTo(steps: number) {}

  getPositionXZ(id: number) {
    const { id2forcePos } = this.visData;
    const pos = id2forcePos[id];
    return { x: pos[0], z: pos[1] };
  }

  parseSearchRecords() {
    let z0 = 0;
    const { id2forcePos } = this.visData;
    const { searchRecords } = this.visData.searchRecords;
    let searchPaths = [];
    let candidates = [];
    for (let i = 0; i < searchRecords.length; i++) {
      let records = searchRecords[i];
      let searchPath = [];
      let candidatesOnThisLayer = [];
      for (let j = 0; j < records.length; j++) {
        const from = records[j][0];
        const to = records[j][1];
        if (searchPath.indexOf(from) === -1) {
          searchPath.push(from);
        }
        

      }
      searchPaths.push(searchPath);
      z0 += -400;
    }
  }
  createPlaneGradientTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(0, 'rgba(30, 100, 255, 1)');
    gradient.addColorStop(1, 'rgba(0, 35, 77, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    //draw white borders 1px
    ctx.fillStyle = '#D9EAFF';
    ctx.fillRect(0, 0, 1, 256);
    ctx.fillRect(0, 0, 256, 1);
    ctx.fillRect(0, 255, 256, 1);
    ctx.fillRect(255, 0, 1, 256);
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  drawBorderLine(from: THREE.Vector3, to: THREE.Vector3, color: string) {
    const line = new MeshLine();
    line.setPoints([from.x, from.y, from.z, to.x, to.y, to.z]);
    const material = new MeshLineMaterial({
      color: new THREE.Color(color),
      lineWidth: 0.01,
      sizeAttenuation: false,
    });
    const mesh = new THREE.Mesh(line, material);
    this.scene.add(mesh);
  }

  setupPlanes() {
    let z0 = -30;
    const { visData } = this.visData;
    for (let i = visData.length - 1; i >= 0; i--) {
      //add planes
      const width = this.maxX - this.minX;
      const height = this.maxY - this.minY;
      const planeGeometry = new THREE.PlaneGeometry(width, height);
      const texture = this.createPlaneGradientTexture();
      const planeMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
      });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.x = Math.PI / 2;
      plane.position.z = (this.maxY + this.minY) / 2;
      plane.position.x = (this.maxX + this.minX) / 2;
      plane.scale.set(1.2, 1.2, 1.2);
      plane.position.y = z0;
      z0 += -400;
      this.planes.push(plane);
    }
    console.log(this.planes);
  }

  computeBoundries() {
    const { visData } = this.visData;
    console.log(visData);
    for (let i = visData.length - 1; i >= 0; i--) {
      const { nodes } = visData[i];
      for (let j = 0; j < nodes.length; j++) {
        const node = nodes[j];
        const { id, x, y, type } = node;
        this.maxX = Math.max(this.maxX, x);
        this.maxY = Math.max(this.maxY, y);
        this.minX = Math.min(this.minX, x);
        this.minY = Math.min(this.minY, y);
      }
    }
  }

  render() {
    //render
    const render = () => {
      //update camera zoom

      this.controller.update();
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(render);
    };
    render();
  }

  private setupController() {
    this.controller = new OrbitControls(this.camera, this.canvas);
    this.controller.enableZoom = true;
    this.controller.enablePan = true;
    this.controller.enableDamping = true;
    this.controller.enableRotate = true;
  }

  private setupCamera() {
    this.camera = new THREE.OrthographicCamera(
      -this.canvas.width / 2,
      this.canvas.width / 2,
      this.canvas.height / 2,
      -this.canvas.height / 2,
      -4000,
      4000
    );
    //default camera position

    this.camera.position.set(
      HnswSearchHnsw3dView.defaultCamera.position.x,
      HnswSearchHnsw3dView.defaultCamera.position.y,
      HnswSearchHnsw3dView.defaultCamera.position.z
    );
    this.camera.rotation.set(
      HnswSearchHnsw3dView.defaultCamera.rotation.x,
      HnswSearchHnsw3dView.defaultCamera.rotation.y,
      HnswSearchHnsw3dView.defaultCamera.rotation.z
    );
    this.camera.zoom = HnswSearchHnsw3dView.defaultCamera.zoom;
    this.camera.updateProjectionMatrix();
  }

  private setupScene() {
    this.scene = new THREE.Scene();
    this.computeBoundries();
    this.setupPlanes();
    this.scene.add(...this.planes);
  }

  private setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.setSize(this.canvas.width, this.canvas.height);
  }

  setupCanvas() {
    this.canvas = document.createElement('canvas');
    this.node.appendChild(this.canvas);
    this.canvas.width = 1000;
    this.canvas.height = 600;
  }
}
