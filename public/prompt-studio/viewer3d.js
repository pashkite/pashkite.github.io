import * as THREE from 'https://esm.sh/three@0.180.0';
import { GLTFLoader } from 'https://esm.sh/three@0.180.0/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://esm.sh/three@0.180.0/examples/jsm/loaders/DRACOLoader.js';

const canvas = document.getElementById('threeCanvas');
const statusEl = document.getElementById('orbitStatus');
const view3d = document.getElementById('view-orbit3d');
if (!canvas || !view3d) throw new Error('Prompt Studio 3D canvas not found');

const MODEL_DEFS = {
  standard: {
    label: '표준 · Soldier',
    url: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/models/gltf/Soldier.glb',
    rotationY: 0,
    targetHeight: 2.08,
  },
  anime: {
    label: '애니형 · Kira',
    url: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/models/gltf/kira.glb',
    rotationY: Math.PI,
    targetHeight: 2.06,
  },
  xbot: {
    label: 'Xbot · Mixamo',
    url: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/models/gltf/Xbot.glb',
    rotationY: 0,
    targetHeight: 2.08,
  },
};

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b0d12);
scene.fog = new THREE.Fog(0x0b0d12, 9, 18);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.12;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const camera = new THREE.PerspectiveCamera(45, 1, 0.05, 60);
const target = new THREE.Vector3(0, 1.02, 0);

scene.add(new THREE.HemisphereLight(0xe7efff, 0x20242e, 2.2));
const key = new THREE.DirectionalLight(0xffffff, 3.5);
key.position.set(-3.5, 6, -4.5);
key.castShadow = true;
key.shadow.mapSize.set(1024, 1024);
key.shadow.camera.near = 0.1;
key.shadow.camera.far = 18;
key.shadow.camera.left = -4;
key.shadow.camera.right = 4;
key.shadow.camera.top = 5;
key.shadow.camera.bottom = -2;
scene.add(key);
const rim = new THREE.DirectionalLight(0x8da9ff, 2.1);
rim.position.set(4, 3, 5);
scene.add(rim);
const fill = new THREE.DirectionalLight(0xffb27a, 0.75);
fill.position.set(2, 2.5, -5);
scene.add(fill);

const floor = new THREE.Mesh(
  new THREE.CircleGeometry(5.8, 96),
  new THREE.MeshStandardMaterial({ color: 0x11151d, roughness: 0.88, metalness: 0.02 })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -0.012;
floor.receiveShadow = true;
scene.add(floor);

const grid = new THREE.GridHelper(8, 16, 0x394153, 0x242a35);
grid.position.y = 0.002;
if (Array.isArray(grid.material)) grid.material.forEach(m => { m.transparent = true; m.opacity = 0.24; });
else { grid.material.transparent = true; grid.material.opacity = 0.24; }
scene.add(grid);

const frontArrow = new THREE.ArrowHelper(
  new THREE.Vector3(0, 0, -1),
  new THREE.Vector3(0, 0.02, 0),
  0.72,
  0xff7a1a,
  0.18,
  0.10
);
scene.add(frontArrow);

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/libs/draco/');
dracoLoader.preload();

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

const cache = new Map();
let currentKey = null;
let currentModel = null;
let currentLoadId = 0;
let visible = false;
let renderQueued = false;

function slider(id, fallback) {
  const el = document.getElementById(id);
  return el ? Number(el.value) : fallback;
}

function cameraState() {
  return {
    az: slider('az', 0),
    el: slider('el', 0),
    dist: slider('dist', 4.2),
    lens: slider('lens', 50),
    roll: slider('roll', 0),
  };
}

function requestRender() {
  if (!visible || renderQueued) return;
  renderQueued = true;
  requestAnimationFrame(() => {
    renderQueued = false;
    resizeRenderer();
    updateCamera();
    renderer.render(scene, camera);
  });
}

function resizeRenderer() {
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(1, Math.round(rect.width * dpr));
  const height = Math.max(1, Math.round(rect.height * dpr));
  if (canvas.width !== width || canvas.height !== height) {
    renderer.setSize(rect.width, rect.height, false);
    renderer.setPixelRatio(dpr);
  }
  camera.aspect = rect.width / rect.height;
  camera.updateProjectionMatrix();
}

function updateCamera() {
  const s = cameraState();
  const theta = THREE.MathUtils.degToRad(s.az);
  const phi = THREE.MathUtils.degToRad(THREE.MathUtils.clamp(s.el, -70, 70));
  const radius = 0.72 + THREE.MathUtils.clamp(s.dist, 0.6, 7) * 0.78;
  const horizontal = Math.cos(phi) * radius;

  camera.position.set(
    Math.sin(theta) * horizontal,
    target.y + Math.sin(phi) * radius,
    -Math.cos(theta) * horizontal
  );
  camera.setFocalLength(THREE.MathUtils.clamp(s.lens, 16, 200));
  camera.lookAt(target);
  camera.rotation.z += THREE.MathUtils.degToRad(-s.roll);
  camera.updateProjectionMatrix();
}

function freezeUsefulPose(gltf) {
  if (!gltf.animations?.length) return;
  const preferred = gltf.animations.find(a => /idle|standing|stand/i.test(a.name)) || gltf.animations[0];
  try {
    const mixer = new THREE.AnimationMixer(gltf.scene);
    const action = mixer.clipAction(preferred);
    action.play();
    const t = Math.max(0, preferred.duration * 0.12);
    mixer.setTime(t);
    action.paused = true;
    gltf.scene.userData.__promptStudioMixer = mixer;
  } catch (_) {}
}

function normalizeModel(model, def) {
  model.rotation.y = def.rotationY || 0;
  model.updateMatrixWorld(true);

  let box = new THREE.Box3().setFromObject(model);
  let size = box.getSize(new THREE.Vector3());
  if (!Number.isFinite(size.y) || size.y <= 0.001) size.y = 1;
  const scale = def.targetHeight / size.y;
  model.scale.multiplyScalar(scale);
  model.updateMatrixWorld(true);

  box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  model.position.x -= center.x;
  model.position.z -= center.z;
  model.position.y -= box.min.y;
  model.updateMatrixWorld(true);

  model.traverse(obj => {
    if (!obj.isMesh) return;
    obj.castShadow = true;
    obj.receiveShadow = true;
    const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
    mats.filter(Boolean).forEach(mat => {
      if ('envMapIntensity' in mat) mat.envMapIntensity = 0.65;
      if ('roughness' in mat) mat.roughness = Math.max(0.35, mat.roughness ?? 0.6);
      mat.needsUpdate = true;
    });
  });
  return model;
}

async function loadModel(keyName) {
  const def = MODEL_DEFS[keyName] || MODEL_DEFS.standard;
  const loadId = ++currentLoadId;
  if (statusEl) statusEl.textContent = `${def.label} 불러오는 중…`;

  try {
    let entry = cache.get(keyName);
    if (!entry) {
      const gltf = await loader.loadAsync(def.url);
      if (loadId !== currentLoadId) return;
      freezeUsefulPose(gltf);
      const model = normalizeModel(gltf.scene, def);
      entry = { model, gltf };
      cache.set(keyName, entry);
    }
    if (loadId !== currentLoadId) return;

    if (currentModel) scene.remove(currentModel);
    currentModel = entry.model;
    currentKey = keyName;
    scene.add(currentModel);

    document.querySelectorAll('[data-avatar]').forEach(btn => {
      btn.classList.toggle('on', btn.dataset.avatar === keyName);
    });
    try { localStorage.setItem('promptStudioAvatar', keyName); } catch (_) {}
    if (statusEl) statusEl.textContent = `${def.label} · 외부 GLB`;
    requestRender();
  } catch (err) {
    console.error('3D model load failed:', err);
    if (statusEl) statusEl.textContent = `${def.label} 로드 실패 · 다시 선택해 보세요`;
  }
}

function setStudioValue(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  el.value = String(value);
  el.dispatchEvent(new Event('input', { bubbles: true }));
}

let dragging = false;
let pointerId = null;
let lastX = 0;
let lastY = 0;

canvas.addEventListener('pointerdown', e => {
  dragging = true;
  pointerId = e.pointerId;
  lastX = e.clientX;
  lastY = e.clientY;
  canvas.setPointerCapture?.(e.pointerId);
  canvas.style.cursor = 'grabbing';
});

canvas.addEventListener('pointermove', e => {
  if (!dragging || (pointerId !== null && e.pointerId !== pointerId)) return;
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  lastX = e.clientX;
  lastY = e.clientY;

  const s = cameraState();
  const nextAz = THREE.MathUtils.clamp(s.az - dx * 0.62, -180, 180);
  const nextEl = THREE.MathUtils.clamp(s.el + dy * 0.48, -70, 70);
  setStudioValue('az', Math.round(nextAz * 10) / 10);
  setStudioValue('el', Math.round(nextEl * 10) / 10);
  requestRender();
});

function endDrag(e) {
  dragging = false;
  pointerId = null;
  canvas.style.cursor = 'grab';
  try { canvas.releasePointerCapture?.(e.pointerId); } catch (_) {}
}
canvas.addEventListener('pointerup', endDrag);
canvas.addEventListener('pointercancel', endDrag);
canvas.addEventListener('pointerleave', e => { if (dragging) endDrag(e); });
canvas.style.cursor = 'grab';

canvas.addEventListener('wheel', e => {
  e.preventDefault();
  const s = cameraState();
  const next = THREE.MathUtils.clamp(s.dist + Math.sign(e.deltaY) * 0.24, 0.6, 7);
  setStudioValue('dist', Math.round(next * 10) / 10);
  requestRender();
}, { passive: false });

for (const id of ['az', 'el', 'dist', 'lens', 'roll']) {
  document.getElementById(id)?.addEventListener('input', requestRender);
}

document.querySelectorAll('[data-avatar]').forEach(btn => {
  btn.addEventListener('click', () => loadModel(btn.dataset.avatar));
});

const tab3d = document.querySelector('[data-view="orbit3d"]');
tab3d?.addEventListener('click', () => {
  visible = true;
  const remembered = (() => {
    try { return localStorage.getItem('promptStudioAvatar'); } catch (_) { return null; }
  })();
  if (!currentModel) loadModel(MODEL_DEFS[remembered] ? remembered : 'standard');
  requestRender();
});

document.querySelectorAll('[data-view]:not([data-view="orbit3d"])').forEach(btn => {
  btn.addEventListener('click', () => { visible = false; });
});

const ro = new ResizeObserver(() => requestRender());
ro.observe(view3d);
window.addEventListener('resize', requestRender);

visible = view3d.classList.contains('active');
if (visible) {
  const remembered = (() => {
    try { return localStorage.getItem('promptStudioAvatar'); } catch (_) { return null; }
  })();
  loadModel(MODEL_DEFS[remembered] ? remembered : 'standard');
}
