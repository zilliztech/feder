import { TViewParams } from 'Types';
import { TViewParamsHnsw, TVisData, TVisDataHnsw3d } from 'Types/visData';
import TViewHandler from '../types';
import InfoPanel from 'FederView/InfoPanel';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';
import { MeshBasicMaterial } from 'three';
import { hnswlibHNSWSearch } from 'FederIndex/searchHandler/hnswSearch';
import anime from 'animejs/lib/anime.es.js';

const defaultViewParams = {
  width: 800,
  height: 600,
};
type TViewParamsHnsw3d = typeof defaultViewParams;

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
  selectedLayer = -1;
  lastSelectedLayer = -1;
  intervalId: number;

  //threejs stuff
  longerLineMap = new Map<string, THREE.Mesh>();
  longerDashedLineMap = new Map<string, THREE.Mesh>();
  layerUi: HTMLDivElement;
  scene: THREE.Scene;
  camera: THREE.OrthographicCamera;
  renderer: THREE.WebGLRenderer;
  spheres: THREE.Mesh[] = [];
  targetSpheres: THREE.Mesh[] = [];
  planes: THREE.Mesh[] = [];
  lines: THREE.Mesh[] = [];
  controller: OrbitControls;
  canvasWidth: number;
  canvasHeight: number;
  minX = Infinity;
  minY = Infinity;
  maxX = -Infinity;
  maxY = -Infinity;
  scenes: THREE.Scene[] = [];
  pickingScene: THREE.Scene;
  sphere2id = new Map<THREE.Mesh, number>();
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
  dashedLines: THREE.Mesh<MeshLine, MeshLineMaterial>[] = [];
  orangeLines: THREE.Mesh[] = [];
  pickingTarget: THREE.WebGLRenderTarget;
  pickingMap: Map<
    number,
    THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>
  >;
  objectsPerLayer: Map<number, THREE.Mesh[]> = new Map(); //存储每一层的mesh，包括节点、连接线、plane
  moveObjects: THREE.Mesh[] = [];
  playerUi: HTMLDivElement;
  playBtn: HTMLDivElement;
  resetBtn: HTMLDivElement;
  prevBtn: HTMLDivElement;
  nextBtn: HTMLDivElement;
  originCamBtn: HTMLDivElement;
  static stopHtml = `
  <svg  width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="28" cy="28" r="27.5" stroke="white"/>
  <rect x="20" y="19" width="3" height="18" fill="white"/>
  <rect x="33" y="19" width="3" height="18" fill="white"/>
  </svg>
  `;
  static playHtml = `
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="28" cy="28" r="27.5" stroke="white"/>
  <path d="M24 19.8599C24 19.087 24.8777 18.6414 25.5017 19.0974L35.9565 26.7374C36.4728 27.1147 36.4728 27.8852 35.9565 28.2625L25.5017 35.9026C24.8777 36.3586 24 35.913 24 35.1401L24 19.8599Z" fill="white"/>
  </svg>
  `;
  played: boolean;
  currentSceneIndex: number;
  slider: HTMLInputElement;

  get k() {
    return this.visData.searchRecords.searchParams.k;
  }

  constructor(visData: TVisData, viewParams: TViewParamsHnsw3d) {
    // this.staticPanel = new InfoPanel();
    // this.clickedPanel = new InfoPanel();
    // this.hoveredPanel = new InfoPanel();
    this.init_(visData, viewParams);
  }

  //to be deleted
  init() {}

  addCss() {
    //create a div element
    this.layerUi = document.createElement('div');
    //flex column display
    this.layerUi.style.display = 'flex';
    this.layerUi.style.flexDirection = 'column';
    this.layerUi.style.position = 'absolute';
    this.layerUi.style.top = '0';
    this.layerUi.style.right = '0';

    this.layerUi.style.height = '100%';
    //center justify
    this.layerUi.style.justifyContent = 'center';
    this.node.style.position = 'relative';
    const style = document.createElement('style');
    style.innerHTML = `
    .layer-ui{
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      pointer-events: none;
    }
    .layer-ui-item{
      justify-content: center;
      align-items: center;
      display: flex;
      transition: transform 0.3s;
    }

    .layer-ui-item-inner-circle{
      width:12px;
      height:12px;
      border-radius: 50%;
      background-color: #fff;
      position: relative;
      
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .layer-ui-item-outer-circle{
      width:32px;
      height:32px;
      border-radius: 50%;
      border: 1px dashed #fff;
      opacity: 0.3;
    }
    .layer-ui-item-outer-circle:hover{
      boxShadow: 0 0 10px white;
      opacity: 1;
      border: 1px solid #fff;
    }
    .hnsw-search-hnsw3d-view-player-ui{
      position: absolute;
      bottom: -128;
     flex-direction: column;
     display: flex;
     height:128px;
    }
    .hnsw-search-hnsw3d-view-player-ui-row{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex: 1;
    }
    .hnsw-search-hnsw3d-view-player-ui-row-item{
      display: flex;
      flex-direction: row;
      justify-content:left;
      align-items: center;
      flex: 1;
    }
    .hnsw-search-hnsw3d-view-player-ui-row-item > .icon{
     margin-right: 15px;
    }
    .hnsw-search-hnsw3d-view-player-ui-row-item > .icon:hover{
      cursor: pointer;
     }
     .hnsw-search-hnsw3d-view-player-ui-row > input{
      width: 100%;
      background: rgba(255,255,255,0.3);
     }
    .hnsw-search-hnsw3d-view-player-ui-row > input::-webkit-slider-thumb{
      -webkit-appearance: none;
      appearance: none;
      visibility: hidden;
    }
    .hnsw-search-hnsw3d-view-player-ui-row > input::-moz-range-thumb{
      visibility: hidden;
    }
    //focus style
    .hnsw-search-hnsw3d-view-player-ui-row > input:focus{
      outline: none;
    }
    //track style
    .hnsw-search-hnsw3d-view-player-ui-row > input::-webkit-slider-runnable-track{
      width: 100%;
      background: rgba(255,255,255);
    }
    .hnsw-search-hnsw3d-view-player-ui-row > input::-moz-range-track{
      width: 100%;
      background: rgba(255,255,255,0.3);
    }
    .hnsw-search-hnsw3d-view-player-ui-row > input::-ms-track{
      width: 100%;
      background: rgba(255,255,255,0.3);
    }
    `;

    //hover glow bloom
    document.head.appendChild(style);
  }

  createCircleDom() {
    const circleDom = document.createElement('div');
    circleDom.classList.add('layer-ui-item');
    const parentDiv = document.createElement('div');
    parentDiv.classList.add('layer-ui-item-outer-circle');
    //hover cursor pointer
    parentDiv.style.cursor = 'pointer';
    parentDiv.style.marginBottom = '16px';
    parentDiv.style.transition = 'box-shadow 0.3s';
    parentDiv.style.transition = 'opacity 0.3s';

    const childDiv = document.createElement('div');
    //
    childDiv.classList.add('layer-ui-item-inner-circle');

    parentDiv.appendChild(childDiv);

    circleDom.appendChild(parentDiv);
    return circleDom;
  }

  setUpLayerUi() {
    this.addCss();
    //create a div element
    this.layerUi = document.createElement('div');
    //flex column display
    this.layerUi.style.display = 'flex';
    this.layerUi.style.flexDirection = 'column';
    this.layerUi.style.position = 'absolute';
    this.layerUi.style.top = '0';
    this.layerUi.style.right = '0';
    this.node.style.width = '1200px';
    this.layerUi.style.height = '100%';
    //center justify
    this.layerUi.style.justifyContent = 'center';
    this.node.style.position = 'relative';

    const adjustLayout = () => {
      //make all div above ith layer translateY(100%)
      const children = this.layerUi.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (this.selectedLayer <= i) {
          (child as HTMLDivElement).style.transform = 'translateY(0)';
        } else {
          (child as HTMLDivElement).style.transform = 'translateY(-100%)';
        }
      }
    };

    const highlightLayer = () => {
      const children = this.layerUi.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (this.selectedLayer === i) {
          (child.children[0] as HTMLDivElement).style.boxShadow =
            '0 0 10px white';
          (child.children[0] as HTMLDivElement).style.opacity = '1';
          (child.children[0] as HTMLDivElement).style.border = '1px solid #fff';
        } else {
          (child.children[0] as HTMLDivElement).style.boxShadow = 'none';
          (child.children[0] as HTMLDivElement).style.opacity = '0.3';
          (child.children[0] as HTMLDivElement).style.border =
            '1px dashed #fff';
        }
      }
    };

    //create  circleDoms  represent layers
    for (let i = 0; i < this.visData.searchRecords.searchRecords.length; i++) {
      const circleDom = this.createCircleDom();
      let toggled = false;
      circleDom.children[0].addEventListener('click', () => {
        if (this.played) {
          return;
        }
        if (this.selectedLayer !== i) {
          this.selectedLayer = i;
        } else {
          this.selectedLayer = -1;
        }
        adjustLayout();
        this.startTransition();
        highlightLayer();
        this.lastSelectedLayer = this.selectedLayer;
      });
      //add circleDom to layerUi
      this.layerUi.appendChild(circleDom);
    }
    this.node.appendChild(this.layerUi);
  }

  startTransition() {
    debugger;
    if (this.lastSelectedLayer !== this.selectedLayer) {
      //iterate all the scene objects
      for (let i = 0; i < this.scene.children.length; i++) {
        const child = this.scene.children[i];
        //if the object userdata.longer is true
        if (child.userData.longer) {
          debugger;
          const layer = parseInt(child.userData.layer.split('-')[1]);
          if (this.selectedLayer === layer) {
            child.visible = true;
          } else {
            child.visible = false;
          }
        } else if (typeof child.userData.layer === 'string') {
          const layer = parseInt(child.userData.layer.split('-')[1]);
          if (this.selectedLayer === layer) {
            child.visible = false;
          } else {
            child.visible = true;
          }
        }
      }

      //计算diff
      const lastOffsets = new Array(
        this.visData.searchRecords.searchRecords.length
      )
        .fill(undefined)
        .map((v, idx) => {
          return idx < this.lastSelectedLayer ? 1200 : 0;
        });
      const offsets = new Array(this.visData.searchRecords.searchRecords.length)
        .fill(undefined)
        .map((v, idx) => {
          return idx < this.selectedLayer ? 1200 : 0;
        });
      const diff = offsets.map((v, idx) => v - lastOffsets[idx]);
      this.scene.children.forEach((obj, idx) => {
        if (
          obj instanceof THREE.Mesh &&
          obj.userData.layer !== undefined &&
          !obj.userData.longer
        ) {
          let layer = obj.userData.layer;
          //layer type is string
          if (typeof layer === 'string') {
            layer = parseInt(layer.split('-')[0]);
          }
          const offset = diff[layer];

          //animejs animation
          anime({
            targets: obj.position,
            y: obj.position.y + offset,
            duration: 200,
            easing: 'easeInOutQuad',
          });
        }
      });
      this.pickingScene.children.forEach((pickingObj) => {
        if (
          pickingObj instanceof THREE.Mesh &&
          pickingObj.userData.layer !== undefined
        ) {
          let layer = pickingObj.userData.layer;
          if (typeof layer === 'string') {
            layer = parseInt(layer.split('-')[0]);
          }
          const offset = diff[layer];
          pickingObj.position.y += offset;
        }
      });
    }
  }

  init_(visData: TVisData, viewParams: TViewParamsHnsw3d) {
    this.visData = visData as TVisDataHnsw3d;
    console.log(visData);
    const searchRecords = this.visData.searchRecords;
    console.log(searchRecords);
    this.node = document.createElement('div');
    this.setUpLayerUi();
    this.node.className = 'hnsw-search-hnsw3d-view';
    viewParams = Object.assign({}, defaultViewParams, viewParams);
    this.canvasWidth = viewParams.width;
    this.canvasHeight = viewParams.height;
    this.node.style.width = `${this.canvasWidth}px`;
    this.node.style.height = `${this.canvasHeight}px`;
    this.setupCanvas();
    this.setupRenderer();
    this.setupScene();
    this.parseSearchRecords();
    this.setupPickingScene();
    this.setupEventListeners();
    this.setupCamera();
    this.setupController();
    this.setupPlayerUi();
  }

  setupPlayerUi() {
    this.playerUi = document.createElement('div');
    this.playerUi.className = 'hnsw-search-hnsw3d-view-player-ui';
    this.node.appendChild(this.playerUi);
    this.playerUi.style.width = `${this.canvasWidth}px`;
    //white border
    this.playerUi.style.border = '1px solid white';

    //1st row
    const row1 = document.createElement('div');
    row1.className = 'hnsw-search-hnsw3d-view-player-ui-row';
    this.playerUi.appendChild(row1);
    //set row1 innnerHTML
    row1.innerHTML = `
    <div class="hnsw-search-hnsw3d-view-player-ui-row-item">
      <div class="icon play">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="28" cy="28" r="27.5" stroke="white"/>
        <path d="M24 19.8599C24 19.087 24.8777 18.6414 25.5017 19.0974L35.9565 26.7374C36.4728 27.1147 36.4728 27.8852 35.9565 28.2625L25.5017 35.9026C24.8777 36.3586 24 35.913 24 35.1401L24 19.8599Z" fill="white"/>
        </svg>
      </div>
      <div class="icon replay">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="28" cy="28" r="27.5" stroke="white"/>
        <g clip-path="url(#clip0_698_587)">
        <path d="M35.0175 36.202C32.9308 38.0102 30.2612 39.0038 27.5 39C21.1486 39 16 33.8514 16 27.5C16 21.1485 21.1486 16 27.5 16C33.8514 16 39 21.1485 39 27.5C39 29.9564 38.2295 32.2334 36.9185 34.101L33.25 27.5H36.7C36.6998 25.3796 35.9672 23.3244 34.6262 21.682C33.2851 20.0396 31.4179 18.9109 29.3404 18.4867C27.2629 18.0626 25.1026 18.369 23.2251 19.3543C21.3475 20.3395 19.8679 21.9431 19.0366 23.8937C18.2053 25.8443 18.0732 28.0222 18.6628 30.0589C19.2524 32.0956 20.5274 33.8662 22.2722 35.0711C24.017 36.276 26.1244 36.8412 28.2379 36.6711C30.3514 36.501 32.3413 35.6061 33.871 34.1378L35.0175 36.202Z" fill="white"/>
        </g>
        <defs>
        <clipPath id="clip0_698_587">
        <rect width="28" height="28" fill="white" transform="translate(14 14)"/>
        </clipPath>
        </defs>
        </svg>
      </div>
    </div>
    <div class="hnsw-search-hnsw3d-view-player-ui-row-item" style="justify-content: center;">
      <div class="icon prev">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="28" cy="28" r="27.5" stroke="white"/>
        <path d="M17.1161 27.1161C16.628 27.6043 16.628 28.3957 17.1161 28.8839L25.0711 36.8388C25.5592 37.327 26.3507 37.327 26.8388 36.8388C27.327 36.3507 27.327 35.5592 26.8388 35.0711L19.7678 28L26.8388 20.9289C27.327 20.4408 27.327 19.6493 26.8388 19.1612C26.3507 18.673 25.5592 18.673 25.0711 19.1612L17.1161 27.1161ZM37 26.75L18 26.75V29.25L37 29.25V26.75Z" fill="white"/>
        </svg>
      </div>
      <div class="icon next">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="28" cy="28" r="27.5" stroke="white"/>
        <path d="M37.8839 27.1161C38.372 27.6043 38.372 28.3957 37.8839 28.8839L29.9289 36.8388C29.4408 37.327 28.6493 37.327 28.1612 36.8388C27.673 36.3507 27.673 35.5592 28.1612 35.0711L35.2322 28L28.1612 20.9289C27.673 20.4408 27.673 19.6493 28.1612 19.1612C28.6493 18.673 29.4408 18.673 29.9289 19.1612L37.8839 27.1161ZM18 26.75L37 26.75V29.25L18 29.25V26.75Z" fill="white"/>
        </svg>
      </div>
    </div>
    <div class="hnsw-search-hnsw3d-view-player-ui-row-item" style="justify-content: right;">
      <div class="icon origin-cam" style="margin-right:0 ;">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="28" cy="28" r="27.5" stroke="white"/>
        <line x1="29" y1="14" x2="29" y2="19" stroke="white" stroke-width="2"/>
        <line x1="29" y1="38" x2="29" y2="43" stroke="white" stroke-width="2"/>
        <line x1="42" y1="28" x2="47" y2="28" stroke="white" stroke-width="2"/>
        <line x1="9" y1="28" x2="14" y2="28" stroke="white" stroke-width="2"/>
        <path d="M28 21C33.9806 21 38.9563 24.2333 40 28.5C38.9574 32.7667 33.9806 36 28 36C22.0194 36 17.0437 32.7667 16 28.5C17.0426 24.2333 22.0194 21 28 21Z" fill="white"/>
        <circle cx="28" cy="28.5" r="5.5" fill="black"/>
        <circle cx="28" cy="28.5" r="2" fill="white"/>
        </svg>
      </div>
    </div>
    `;

    this.playBtn = this.playerUi.querySelector('.play') as HTMLDivElement;
    this.resetBtn = this.playerUi.querySelector('.replay') as HTMLDivElement;
    this.prevBtn = this.playerUi.querySelector('.prev') as HTMLDivElement;
    this.nextBtn = this.playerUi.querySelector('.next') as HTMLDivElement;
    this.originCamBtn = this.playerUi.querySelector(
      '.origin-cam'
    ) as HTMLDivElement;
    this.playBtn.addEventListener('click', () => {
      console.log('play');

      this.play();
    });
    this.resetBtn.addEventListener('click', () => {
      this.currentSceneIndex = 0;
      this.slider.value = '0';
    });
    this.prevBtn.addEventListener('click', () => {
      console.log('prev');
      this.currentSceneIndex = Math.max(0, this.currentSceneIndex - 1);
      this.slider.value = this.currentSceneIndex.toString();
    });
    this.nextBtn.addEventListener('click', () => {
      console.log('next');
      this.currentSceneIndex = Math.min(
        this.currentSceneIndex + 1,
        this.scenes.length - 1
      );
      this.slider.value = `${this.currentSceneIndex}`;
    });
    this.originCamBtn.addEventListener('click', () => {
      console.log('origin cam');
      this.resetCamera();
    });

    //2nd row
    const row2 = document.createElement('div');
    row2.className = 'hnsw-search-hnsw3d-view-player-ui-row';
    this.playerUi.appendChild(row2);
    //create a slider
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = (this.scenes.length - 1).toString();
    slider.value = slider.max;
    this.currentSceneIndex = this.scenes.length - 1;
    slider.className = 'hnsw-search-hnsw3d-view-player-ui-slider';
    slider.addEventListener('input', () => {
      this.currentSceneIndex = parseInt(slider.value);
      this.played = false;
      this.playBtn.innerHTML = HnswSearchHnsw3dView.playHtml;
    });
    row2.appendChild(slider);
    this.slider = slider;
  }
  play() {
    this.played = !this.played;
    if (this.played) {
      this.playBtn.innerHTML = HnswSearchHnsw3dView.stopHtml;
      this.intervalId = window.setInterval(() => {
        if (this.played) {
          this.currentSceneIndex++;
          if (this.currentSceneIndex >= this.scenes.length) {
            this.currentSceneIndex = 0;
          }
          //update slider
          this.slider.value = this.currentSceneIndex.toString();
        }
      }, 300);
    } else {
      this.playBtn.innerHTML = HnswSearchHnsw3dView.playHtml;
      window.clearInterval(this.intervalId);
    }
  }

  createLine(
    from: THREE.Vector3,
    to: THREE.Vector3,
    color: number | THREE.Texture,
    width = 10
  ) {
    const line = new MeshLine();
    line.setPoints([from.x, from.y, from.z, to.x, to.y, to.z]);
    let material: MeshLineMaterial;
    if (color instanceof THREE.Texture) {
      material = new MeshLineMaterial({
        useMap: true,
        transparent: true,
        map: color,
        opacity: 1,
        lineWidth: width,
      });
    } else {
      material = new MeshLineMaterial({
        color: new THREE.Color(color),
        lineWidth: width,
      });
    }

    const mesh = new THREE.Mesh(line, material);
    return mesh;
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

  //change sphere color
  changeSphereColor(sphere: THREE.Mesh, color: number) {
    //clone sphere
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
    });
    const geometry = sphere.geometry.clone();
    const newSphere = new THREE.Mesh(geometry, material);
    newSphere.name = sphere.name;
    newSphere.position.copy(sphere.position);
    // copy userData
    newSphere.userData = sphere.userData;
    this.scene.remove(sphere);
    this.scene.add(newSphere);
    // (newSphere.material as MeshBasicMaterial).color = new THREE.Color(color);
  }

  async wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  createGradientTexture(color1: number, color2: number) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 256, 0);
    gradient.addColorStop(0, '#' + color1.toString(16));
    gradient.addColorStop(1, '#' + color2.toString(16));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  parseSearchRecords() {
    let y0 = 0;
    const { searchRecords } = this.visData.searchRecords;

    //建立id与sphere的映射
    let sphere2idArray: Map<
      THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>,
      number
    >[] = [];
    let id2sphereArray: Map<
      number,
      THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>
    >[] = [];
    let id2lineArray: Map<string, THREE.Mesh<any, MeshLineMaterial>>[] = [];

    for (let i = 0; i < searchRecords.length; i++) {
      let records = searchRecords[i];
      const sphere2id = new Map<
        THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>,
        number
      >();
      const id2sphere = new Map<
        number,
        THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>
      >();
      const id2line = new Map<string, THREE.Mesh<any, MeshLineMaterial>>();

      for (let j = 0; j < records.length; j++) {
        const record = records[j];
        const startNode = record[0];
        const endNode = record[1];
        const { x: x0, z: z0 } = this.getPositionXZ(startNode);
        const { x: x1, z: z1 } = this.getPositionXZ(endNode);
        if (!id2line.has(`${startNode}-${endNode}`)) {
          const line = this.createLine(
            new THREE.Vector3(x0, y0, z0),
            new THREE.Vector3(x1, y0, z1),
            0x000000
          );
          line.userData = {
            layer: i,
          };
          this.scene.add(line);
          line.visible = false;
          line.name = `${startNode}-${endNode}`;
          id2line.set(`${startNode}-${endNode}`, line);
        }
        if (!id2sphere.has(startNode)) {
          const startNodeSphere = this.createSphere(
            x0,
            y0,
            z0,
            HnswSearchHnsw3dView.colors.searchedYellow
          );
          startNodeSphere.visible = false;
          startNodeSphere.name = `${startNode}`;
          startNodeSphere.userData = {
            layer: i,
          };
          this.scene.add(startNodeSphere);
          id2sphere.set(startNode, startNodeSphere);
          sphere2id.set(startNodeSphere, startNode);
        }
        if (!id2sphere.has(endNode)) {
          const endNodeSphere = this.createSphere(
            x1,
            y0,
            z1,
            HnswSearchHnsw3dView.colors.searchedYellow
          );
          endNodeSphere.visible = false;
          endNodeSphere.name = `${endNode}`;
          endNodeSphere.userData = {
            layer: i,
          };
          this.scene.add(endNodeSphere);
          id2sphere.set(endNode, endNodeSphere);
          sphere2id.set(endNodeSphere, endNode);
        }
      }
      y0 += -400;
      sphere2idArray.push(sphere2id);
      id2sphereArray.push(id2sphere);
      id2lineArray.push(id2line);
    }

    y0 = 0;
    const topVisitedNodes: { id: number; distance: number }[] = [];
    for (let i = 0; i < searchRecords.length; i++) {
      const records = searchRecords[i];
      const visited = new Set<number>();

      const firstRecord = records[0];
      let lastVisited = firstRecord[0];
      if (i === 0) {
        const targetSphere = this.createSphere(
          0,
          0,
          0,
          HnswSearchHnsw3dView.colors.targetWhite
        );
        targetSphere.userData = {
          layer: i,
        };
        this.scene.add(targetSphere);
        this.targetSpheres.push(targetSphere);
      }
      for (let j = 0; j < records.length; j++) {
        const record = records[j];
        const startNode = record[0];
        const endNode = record[1];
        const distance = record[2];
        const { x: x0, z: z0 } = this.getPositionXZ(startNode);
        const { x: x1, z: z1 } = this.getPositionXZ(endNode);
        const startNodeSphere = id2sphereArray[i].get(startNode);
        const endNodeSphere = id2sphereArray[i].get(endNode);
        const line = id2lineArray[i].get(`${startNode}-${endNode}`);

        if (startNodeSphere) {
          if (
            i === searchRecords.length - 1 &&
            !topVisitedNodes.find((v) => v.id === endNode)
          ) {
            topVisitedNodes.push({ id: endNode, distance });
          }
          startNodeSphere.visible = true;
          this.changeSphereColor(
            startNodeSphere,
            HnswSearchHnsw3dView.colors.searchedYellow
          );
          visited.add(startNode);
          if (lastVisited !== startNode) {
            const line = id2lineArray[i].get(`${lastVisited}-${startNode}`);
            if (line) {
              //create yellow texture
              const texture = this.createGradientTexture(
                0xffffff00,
                HnswSearchHnsw3dView.colors.searchedYellow
              );
              //delete line
              this.scene.remove(line);
              //create line connect  to startNodeSphere from lastVisitedSphere
              const { x: x2, z: z2 } = this.getPositionXZ(lastVisited);
              const line2 = this.createLine(
                new THREE.Vector3(x2, y0, z2),
                new THREE.Vector3(x0, y0, z0),
                texture
              );
              line2.userData = {
                layer: i,
              };
              this.scene.add(line2);
              id2lineArray[i].set(`${lastVisited}-${startNode}`, line2);
            } else if (i === searchRecords.length - 1) {
              //当发现需要回溯访问过的节点时
              //find line whose name has startNode
              const id2line = id2lineArray[i];
              const key = Array.from(id2line.keys()).find((key) =>
                key.includes(`-${startNode}`)
              );
              const line = id2line.get(key);
              if (line) {
                //create yellow texture
                const texture = this.createGradientTexture(
                  0xffffff00,
                  HnswSearchHnsw3dView.colors.searchedYellow
                );
                //delete line
                this.scene.remove(line);
                //parse line name
                const [start, end] = key.split('-').map((v) => parseInt(v));
                //create line connect  start and end
                const { x: x0, z: z0 } = this.getPositionXZ(start);
                const { x: x1, z: z1 } = this.getPositionXZ(end);
                const line2 = this.createLine(
                  new THREE.Vector3(x0, y0, z0),
                  new THREE.Vector3(x1, y0, z1),
                  texture
                );
                line2.userData = {
                  layer: i,
                };
                this.scene.add(line2);
                line2.name = `${start}-${end}`;
                id2lineArray[i].set(`${start}-${end}`, line2);
              }
            }
          }
        }
        if (endNodeSphere && !visited.has(endNode)) {
          endNodeSphere.visible = true;
          this.changeSphereColor(
            endNodeSphere,
            HnswSearchHnsw3dView.colors.candidateBlue
          );
        }
        if (line && !visited.has(endNode)) {
          let texture = null;
          texture = this.createGradientTexture(
            0xffffff00,
            HnswSearchHnsw3dView.colors.candidateBlue
          );
          const newLine = this.createLine(
            new THREE.Vector3(x0, y0, z0),
            new THREE.Vector3(x1, y0, z1),
            texture
          );
          newLine.userData = {
            layer: i,
          };

          this.scene.remove(line);
          this.scene.add(newLine);
          id2lineArray[i].set(`${startNode}-${endNode}`, newLine);
        }

        lastVisited = startNode;

        this.scenes.push(this.scene.clone());
      }
      let nextLevelMap = id2sphereArray[i + 1];
      if (nextLevelMap) {
        const nextLevelSphere = nextLevelMap.get(lastVisited);
        if (nextLevelSphere) {
          this.changeSphereColor(
            nextLevelSphere,
            HnswSearchHnsw3dView.colors.searchedYellow
          );
          nextLevelSphere.visible = true;
          const currentLevelSphere = id2sphereArray[i].get(lastVisited);
          if (currentLevelSphere) {
            this.changeSphereColor(
              currentLevelSphere,
              HnswSearchHnsw3dView.colors.fineOrange
            );
          }
          //create line connecting current level and next level
          const orangeYellowTexture = this.createGradientTexture(
            HnswSearchHnsw3dView.colors.fineOrange,
            HnswSearchHnsw3dView.colors.searchedYellow
          );
          const { x: x0, z: z0 } = this.getPositionXZ(lastVisited);
          const { x: x1, z: z1 } = this.getPositionXZ(lastVisited);
          const line = this.createLine(
            new THREE.Vector3(x0, y0, z0),
            new THREE.Vector3(x1, y0 - 400, z1),
            orangeYellowTexture
          );
          line.userData = {
            layer: `${i}-${i + 1}`,
          };
          this.orangeLines.push(line);
          const longerLine = this.createLine(
            new THREE.Vector3(x0, y0 + 1200, z0),
            new THREE.Vector3(x1, y0 - 400, z1),
            orangeYellowTexture
          );
          longerLine.userData = {
            layer: `${i}-${i + 1}`,
            longer: true,
          };
          longerLine.visible = false;
          this.longerLineMap.set(`${i}-${i + 1}`, longerLine);
          this.scene.add(longerLine);
          this.scene.add(line);
        }
      }
      //处理最终的橙色情况
      if (i === searchRecords.length - 1) {
        //sort topVisitedNodes in ascending order
        topVisitedNodes.sort((a, b) => a.distance - b.distance);
        //get ef search parameter
        const k = this.k;
        //get top ef nodes
        const topEfNodes = topVisitedNodes.slice(0, k);
        //change color of top ef nodes to orange
        for (let j = 0; j < topEfNodes.length; j++) {
          const { id } = topEfNodes[j];
          const sphere = id2sphereArray[i].get(id);
          if (sphere) {
            this.changeSphereColor(
              sphere,
              HnswSearchHnsw3dView.colors.fineOrange
            );
          }
        }
        this.scenes.push(this.scene.clone());
      }

      //layer切换创建新的target连接线
      if (i < searchRecords.length - 1) {
        //create a white sphere
        const targetSphere = this.createSphere(
          0,
          y0 - 400,
          0,
          HnswSearchHnsw3dView.colors.targetWhite
        );
        targetSphere.userData = {
          layer: i + 1,
        };
        this.targetSpheres.push(targetSphere);
        this.scene.add(targetSphere);
        const dashedMaterial = new MeshLineMaterial({
          color: new THREE.Color(HnswSearchHnsw3dView.colors.targetWhite),
          lineWidth: 10,
          dashed: true,
          dashArray: 0.1,
          dashRatio: 0.5,
          transparent: true,
        });

        const line = new MeshLine();
        line.setPoints([0, y0, 0, 0, y0 - 400, 0]);
        const mesh = new THREE.Mesh(line.geometry, dashedMaterial);
        mesh.userData = {
          layer: `${i}-${i + 1}`,
        };
        this.dashedLines.push(mesh);

        const dashedMaterial2 = new MeshLineMaterial({
          color: new THREE.Color(HnswSearchHnsw3dView.colors.targetWhite),
          lineWidth: 10,
          dashed: true,
          dashArray: 0.025,
          dashRatio: 0.5,
          transparent: true,
        });
        const longerDashedLineGeometry = new MeshLine();
        longerDashedLineGeometry.setPoints([0, y0 + 1200, 0, 0, y0 - 400, 0]);
        const longerDashedLine = new THREE.Mesh(
          longerDashedLineGeometry,
          dashedMaterial2
        );
        longerDashedLine.userData = {
          layer: `${i}-${i + 1}`,
          longer: true,
        };
        longerDashedLine.visible = false;
        this.scene.add(longerDashedLine);
        this.longerDashedLineMap.set(`${i}-${i + 1}`, longerDashedLine);

        this.scene.add(mesh);
        if (i === searchRecords.length - 2) {
          const targetSphere = this.createSphere(
            0,
            y0 - 400,
            0,
            HnswSearchHnsw3dView.colors.targetWhite
          );
          targetSphere.userData = {
            layer: i + 1,
          };
          this.targetSpheres.push(targetSphere);
          this.scene.add(targetSphere);
        }
      }
      y0 += -400;
    }
  }

  createDashedLineTexture(
    backgroundColor = 0x00000000,
    color = 0xffffff00,
    dashSize = 20,
    gapSize = 10
  ) {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 1;
    const context = canvas.getContext('2d');
    context.fillStyle = `#${backgroundColor.toString(16)}`;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = `#${color.toString(16)}`;
    context.lineWidth = 10;
    context.beginPath();
    context.setLineDash([dashSize, gapSize]);
    context.moveTo(0, 0);
    context.lineTo(canvas.width, canvas.height);
    context.stroke();
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  setupPickingScene() {
    // create picking scene
    this.pickingScene = new THREE.Scene();
    this.pickingTarget = new THREE.WebGLRenderTarget(
      this.renderer.domElement.width,
      this.renderer.domElement.height
    );
    this.pickingScene.background = new THREE.Color(0x000000);
    let count = 1;
    this.pickingMap = new Map<number, THREE.Mesh>();
    const pickingMaterial = new THREE.MeshBasicMaterial({
      vertexColors: true,
    });
    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        //check if the object is a sphere
        if (obj.geometry.type === 'SphereGeometry') {
          const geometry = obj.geometry.clone();
          //apply vertex color to picking mesh
          let color = new THREE.Color();
          applyVertexColors(geometry, color.setHex(count));
          const pickingMesh = new THREE.Mesh(geometry, pickingMaterial);
          pickingMesh.position.copy(obj.position);
          pickingMesh.rotation.copy(obj.rotation);
          pickingMesh.scale.copy(obj.scale);
          pickingMesh.userData = obj.userData;
          pickingMesh.name = obj.name;
          this.pickingScene.add(pickingMesh);
          this.pickingMap.set(count, pickingMesh);
          count++;
        }
      }
    });
    const pickingPlaneMaterial = new THREE.MeshBasicMaterial({
      vertexColors: true,
    });
    debugger;

    //create a plane for each layer
    for (let i = 0; i < this.visData.searchRecords.searchRecords.length; i++) {
      let geometry = this.planes[i].clone().geometry.clone();
      //set vertex color for plane
      let color = new THREE.Color();
      applyVertexColors(geometry, color.setHex(count));
      const plane = new THREE.Mesh(geometry, pickingPlaneMaterial);
      const { x, y, z } = this.planes[i].position;
      const scale = this.planes[i].scale;
      plane.scale.set(scale.x, scale.y, scale.z);
      plane.position.set(x, y, z);
      plane.rotation.x = -Math.PI / 2;
      plane.scale.set(1.2, 1.2, 1.2);
      plane.name = `plane${i}`;
      plane.userData = { layer: i };
      this.pickingScene.add(plane);
      this.pickingMap.set(count, plane);
      count += 0x000042;
    }
  }

  //add event listener to the canvas
  setupEventListeners() {
    this.renderer.domElement.addEventListener('click', (event) => {
      //pointer = { x: e.offsetX, y: e.offsetY };

      let id = this.pick(event.offsetX, event.offsetY);
      //console.log(id);
      const obj = this.pickingMap.get(id);
      console.log('picked', obj.userData, obj.name);
      //if picking a plane
      if (obj?.name?.startsWith('plane')) {
        const layer = obj.userData.layer;
        console.log(layer);
      }
    });
  }

  pick(x: number, y: number) {
    if (x < 0 || y < 0) return -1;
    const pixelRatio = this.renderer.getPixelRatio();
    // console.log(pixelRatio, x, y);
    // set the view offset to represent just a single pixel under the mouse
    this.camera.setViewOffset(
      this.canvas.clientWidth,
      this.canvas.clientHeight,
      x * pixelRatio,
      y * pixelRatio,
      1,
      1
    );
    // render the scene
    this.renderer.setRenderTarget(this.pickingTarget);
    this.renderer.render(this.pickingScene, this.camera);
    this.renderer.setRenderTarget(null);
    //clear the view offset so the camera returns to normal
    this.camera.clearViewOffset();
    // get the pixel color under the mouse
    const pixelBuffer = new Uint8Array(4);
    this.renderer.readRenderTargetPixels(
      this.pickingTarget,
      0,
      0,
      1,
      1,
      pixelBuffer
    );
    const id = (pixelBuffer[0] << 16) | (pixelBuffer[1] << 8) | pixelBuffer[2];
    return id;
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
      plane.name = `plane${i}`;
      plane.userData = { layer: visData.length - 1 - i };
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
    const render = (t) => {
      //update camera zoom
      //change dashed line offset
      if (this.dashedLines.length > 0) {
        this.dashedLines.forEach((line) => {
          line.material.uniforms.dashOffset.value -= 0.01;
        });
        this.longerDashedLineMap.forEach((line) => {
          (line.material as any).uniforms.dashOffset.value -= 0.0025;
        });
      }
      this.controller.update();
      if (this.currentSceneIndex !== undefined) {
        this.scene = this.scenes[this.currentSceneIndex];
      }
      this.renderer.render(this.scene, this.camera);

      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
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

  private resetCamera() {
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
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
  }
}
/**
 *
 * @param {THREE.Geometry} geometry
 * @param {THREE.Color } color
 */
function applyVertexColors(geometry: THREE.BufferGeometry, color: THREE.Color) {
  const positions = geometry.getAttribute('position');
  const colors = [];
  for (let i = 0; i < positions.count; i++) {
    colors.push(color.r, color.g, color.b);
  }
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
}
