import * as THREE from 'https://esm.sh/three@0.180.0';
import { GLTFLoader } from 'https://esm.sh/three@0.180.0/examples/jsm/loaders/GLTFLoader.js';

const canvas = document.getElementById('threeCanvas');
const statusEl = document.getElementById('orbitStatus');
const view3d = document.getElementById('view-orbit3d');
if (!canvas || !view3d) throw new Error('Prompt Studio 3D canvas not found');

const MODEL_DEFS = {
  standard: {
    label: 'VRoid A · 프릴',
    url: 'https://cdn.jsdelivr.net/gh/iamenahs/xlunar-ai-avatar@main/public/avatars/VRoid_Sample_A.glb',
    rotationY: Math.PI,
    targetHeight: 2.02,
  },
  anime: {
    label: 'VRoid B · 트윈테일',
    url: 'https://cdn.jsdelivr.net/gh/iamenahs/xlunar-ai-avatar@main/public/avatars/VRoid_Sample_B.glb',
    rotationY: Math.PI,
    targetHeight: 2.02,
  },
  xbot: {
    label: 'VRoid D · 롱헤어',
    url: 'https://cdn.jsdelivr.net/gh/iamenahs/xlunar-ai-avatar@main/public/avatars/VRoid_Sample_D.glb',
    rotationY: Math.PI,
    targetHeight: 2.02,
  },
};

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b0d12);
scene.fog = new THREE.Fog(0x0b0d12, 9, 18);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const camera = new THREE.PerspectiveCamera(45, 1, 0.05, 60);
const target = new THREE.Vector3(0, 1.02, 0);

scene.add(new THREE.HemisphereLight(0xe7efff, 0x20242e, 2.4));
const key = new THREE.DirectionalLight(0xffffff, 3.7);
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
const rim = new THREE.DirectionalLight(0x9eb5ff, 2.15);
rim.position.set(4, 3, 5);
scene.add(rim);
const fill = new THREE.DirectionalLight(0xffc49b, 0.85);
fill.position.set(2, 2.5, -5);
scene.add(fill);

const floor = new THREE.Mesh(
  new THREE.CircleGeometry(5.8, 96),
  new THREE.MeshStandardMaterial({ color: 0x11151d, roughness: 0.9, metalness: 0.01 }),
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -0.012;
floor.receiveShadow = true;
scene.add(floor);

const grid = new THREE.GridHelper(8, 16, 0x465064, 0x252c39);
grid.position.y = 0.002;
if (Array.isArray(grid.material)) {
  grid.material.forEach((m) => { m.transparent = true; m.opacity = 0.28; });
} else {
  grid.material.transparent = true;
  grid.material.opacity = 0.28;
}
scene.add(grid);

function addDirectionArrow(dir, color) {
  const arrow = new THREE.ArrowHelper(dir, new THREE.Vector3(0, 0.028, 0), 2.05, color, 0.26, 0.15);
  scene.add(arrow);
}
addDirectionArrow(new THREE.Vector3(0, 0, -1), 0xff7a1a);
addDirectionArrow(new THREE.Vector3(0, 0, 1), 0x6d7f9f);
addDirectionArrow(new THREE.Vector3(-1, 0, 0), 0x9a7cff);
addDirectionArrow(new THREE.Vector3(1, 0, 0), 0x6fcf97);

const centerRing = new THREE.Mesh(
  new THREE.RingGeometry(0.34, 0.38, 64),
  new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4, side: THREE.DoubleSide }),
);
centerRing.rotation.x = -Math.PI / 2;
centerRing.position.y = 0.029;
scene.add(centerRing);

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function makeFloorLabel(text, accent, x, z, rotZ = 0) {
  const c = document.createElement('canvas');
  c.width = 640;
  c.height = 180;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, c.width, c.height);
  roundRect(ctx, 12, 12, 616, 156, 36);
  ctx.fillStyle = 'rgba(7,10,15,0.88)';
  ctx.fill();
  ctx.lineWidth = 8;
  ctx.strokeStyle = accent;
  ctx.stroke();
  ctx.fillStyle = '#f6f7fb';
  ctx.font = '700 54px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 320, 92);
  const texture = new THREE.CanvasTexture(c);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1.75, 0.49),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, side: THREE.DoubleSide }),
  );
  plane.rotation.x = -Math.PI / 2;
  plane.rotation.z = rotZ;
  plane.position.set(x, 0.035, z);
  plane.renderOrder = 3;
  scene.add(plane);
}
makeFloorLabel('앞 · FRONT', '#ff7a1a', 0, -2.62, 0);
makeFloorLabel('뒤 · BACK', '#6d7f9f', 0, 2.62, Math.PI);
makeFloorLabel('왼쪽 · LEFT', '#9a7cff', -2.62, 0, -Math.PI / 2);
makeFloorLabel('오른쪽 · RIGHT', '#6fcf97', 2.62, 0, Math.PI / 2);

const loader = new GLTFLoader();
const cache = new Map();
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
function resizeRenderer() {
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return false;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(1, Math.round(rect.width * dpr));
  const height = Math.max(1, Math.round(rect.height * dpr));
  if (canvas.width !== width || canvas.height !== height) {
    renderer.setPixelRatio(dpr);
    renderer.setSize(rect.width, rect.height, false);
  }
  camera.aspect = rect.width / rect.height;
  camera.updateProjectionMatrix();
  return true;
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
    -Math.cos(theta) * horizontal,
  );
  camera.setFocalLength(THREE.MathUtils.clamp(s.lens, 16, 200));
  camera.lookAt(target);
  camera.rotation.z += THREE.MathUtils.degToRad(-s.roll);
  camera.updateProjectionMatrix();
}
function requestRender() {
  if (!visible || renderQueued) return;
  renderQueued = true;
  requestAnimationFrame(() => {
    renderQueued = false;
    if (!resizeRenderer()) return;
    updateCamera();
    renderer.render(scene, camera);
  });
}

function freezeUsefulPose(gltf) {
  if (!gltf.animations?.length) return;
  const preferred = gltf.animations.find((a) => /idle|standing|stand/i.test(a.name)) || gltf.animations[0];
  try {
    const mixer = new THREE.AnimationMixer(gltf.scene);
    const action = mixer.clipAction(preferred);
    action.play();
    mixer.setTime(Math.max(0, preferred.duration * 0.08));
    action.paused = true;
    gltf.scene.userData.__promptStudioMixer = mixer;
  } catch (_) {}
}

function normalizeModel(model, def) {
  model.rotation.y = def.rotationY || 0;
  model.updateMatrixWorld(true);
  let box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const modelHeight = Number.isFinite(size.y) && size.y > 0.001 ? size.y : 1;
  model.scale.multiplyScalar(def.targetHeight / modelHeight);
  model.updateMatrixWorld(true);
  box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  model.position.x -= center.x;
  model.position.z -= center.z;
  model.position.y -= box.min.y;
  model.updateMatrixWorld(true);
  model.traverse((obj) => {
    if (!obj.isMesh) return;
    obj.castShadow = true;
    obj.receiveShadow = true;
    const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
    mats.filter(Boolean).forEach((mat) => {
      if ('envMapIntensity' in mat) mat.envMapIntensity = 0.75;
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
      entry = { model: normalizeModel(gltf.scene, def), gltf };
      cache.set(keyName, entry);
    }
    if (loadId !== currentLoadId) return;
    if (currentModel) scene.remove(currentModel);
    currentModel = entry.model;
    scene.add(currentModel);
    document.querySelectorAll('[data-avatar]').forEach((btn) => {
      btn.classList.toggle('on', btn.dataset.avatar === keyName);
    });
    try { localStorage.setItem('promptStudioAvatar', keyName); } catch (_) {}
    if (statusEl) statusEl.textContent = `${def.label} · VRoid 캐릭터`;
    requestRender();
  } catch (err) {
    console.error('3D model load failed:', err);
    if (statusEl) statusEl.textContent = `${def.label} 로드 실패 · 다른 모델을 선택해 보세요`;
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
canvas.addEventListener('pointerdown', (e) => {
  dragging = true;
  pointerId = e.pointerId;
  lastX = e.clientX;
  lastY = e.clientY;
  canvas.setPointerCapture?.(e.pointerId);
  canvas.style.cursor = 'grabbing';
});
canvas.addEventListener('pointermove', (e) => {
  if (!dragging || (pointerId !== null && e.pointerId !== pointerId)) return;
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  lastX = e.clientX;
  lastY = e.clientY;
  const s = cameraState();
  setStudioValue('az', Math.round(THREE.MathUtils.clamp(s.az - dx * 0.62, -180, 180) * 10) / 10);
  setStudioValue('el', Math.round(THREE.MathUtils.clamp(s.el + dy * 0.48, -70, 70) * 10) / 10);
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
canvas.addEventListener('pointerleave', (e) => { if (dragging) endDrag(e); });
canvas.style.cursor = 'grab';
canvas.addEventListener('wheel', (e) => {
  e.preventDefault();
  const s = cameraState();
  setStudioValue('dist', Math.round(THREE.MathUtils.clamp(s.dist + Math.sign(e.deltaY) * 0.24, 0.6, 7) * 10) / 10);
  requestRender();
}, { passive: false });
for (const id of ['az', 'el', 'dist', 'lens', 'roll']) {
  document.getElementById(id)?.addEventListener('input', requestRender);
}
document.querySelectorAll('[data-avatar]').forEach((btn) => {
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
document.querySelectorAll('[data-view]:not([data-view="orbit3d"])').forEach((btn) => {
  btn.addEventListener('click', () => { visible = false; });
});
const ro = new ResizeObserver(requestRender);
ro.observe(view3d);
window.addEventListener('resize', requestRender);
visible = view3d.classList.contains('active');
if (visible) {
  const remembered = (() => {
    try { return localStorage.getItem('promptStudioAvatar'); } catch (_) { return null; }
  })();
  loadModel(MODEL_DEFS[remembered] ? remembered : 'standard');
}
