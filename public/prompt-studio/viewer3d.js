import * as THREE from 'https://esm.sh/three@0.180.0';
import { GLTFLoader } from 'https://esm.sh/three@0.180.0/examples/jsm/loaders/GLTFLoader.js';

const canvas=document.getElementById('threeCanvas');
const statusEl=document.getElementById('orbitStatus');
const $=id=>document.getElementById(id);
if(!canvas) throw new Error('threeCanvas not found');

const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.08;
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;

const scene=new THREE.Scene();
scene.background=new THREE.Color(0x0b0d12);
scene.fog=new THREE.FogExp2(0x0b0d12,0.035);
const camera=new THREE.PerspectiveCamera(40,1,.05,100);
scene.add(new THREE.HemisphereLight(0xdce5ff,0x17191f,1.65));
const key=new THREE.DirectionalLight(0xffffff,2.2);key.position.set(4,6,4);key.castShadow=true;key.shadow.mapSize.set(1024,1024);scene.add(key);
const rim=new THREE.DirectionalLight(0xff7a1a,2.0);rim.position.set(-4,3,-5);scene.add(rim);
const fill=new THREE.PointLight(0x7889ff,1.1,12);fill.position.set(-2,2,3);scene.add(fill);

const floor=new THREE.Mesh(new THREE.CircleGeometry(3.5,96),new THREE.MeshStandardMaterial({color:0x11151c,roughness:.96}));
floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;scene.add(floor);
const grid=new THREE.GridHelper(6,12,0x303746,0x202631);grid.position.y=.005;grid.material.transparent=true;grid.material.opacity=.3;scene.add(grid);
const ring=new THREE.Mesh(new THREE.RingGeometry(1.6,1.63,96),new THREE.MeshBasicMaterial({color:0x434b5c,transparent:true,opacity:.45,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.y=.008;scene.add(ring);

const root=new THREE.Group();scene.add(root);
const models={};
let activeModel=localStorage.getItem('promptStudio.avatarModel')||'standard';
let xbotLoading=false;
let lastCam='';
let lastPose='';
let dirty=true;

const material=(c,r=.62,m=.02)=>new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m});
function add(parent,geo,mat,pos=[0,0,0],scale=[1,1,1],rot=[0,0,0]){const o=new THREE.Mesh(geo,mat);o.position.set(...pos);o.scale.set(...scale);o.rotation.set(...rot);o.castShadow=o.receiveShadow=true;parent.add(o);return o;}
function sphere(parent,r,c,pos,scale=[1,1,1],custom){return add(parent,new THREE.SphereGeometry(r,40,28),custom||material(c),pos,scale);}
function capsule(parent,r,l,c,pos,rot=[0,0,0],scale=[1,1,1]){return add(parent,new THREE.CapsuleGeometry(r,l,10,28),material(c),pos,scale,rot);}
function box(parent,size,c,pos,rot=[0,0,0]){return add(parent,new THREE.BoxGeometry(...size,6,6,6),material(c,.55,.03),pos,[1,1,1],rot);}
function face(g,y,s=1,anime=false){const dark=material(0x111722,.32,.04),white=material(0xf5f6fa,.4);const z=.19*s,sep=(anime?.098:.075)*s,ey=y+(anime?.035:.01)*s;for(const side of[-1,1]){sphere(g,anime?.052:.035,0,[side*sep,ey,z],[1.15,.74,.52],anime?white:dark);if(anime)sphere(g,.022,0,[side*sep,ey,z+.034*s],[1,1,.55],dark)}const nose=add(g,new THREE.ConeGeometry(.038*s,.11*s,24),material(0xc39780,.72),[0,y-.025*s,.22*s]);nose.rotation.x=Math.PI/2;const mouth=add(g,new THREE.TorusGeometry(.045*s,.009*s,12,32,Math.PI),material(0x794a46,.65),[0,y-.105*s,.207*s]);mouth.rotation.set(Math.PI/2,0,Math.PI)}
function limb(o,type,side){o.userData.limb=type;o.userData.side=side;o.userData.baseRot=o.rotation.clone();return o}

function buildStandard(){const g=new THREE.Group(),skin=0xcaa790,shirt=0x69778f,pants=0x343b48,joint=0x202731;sphere(g,.28,pants,[0,1.02,0],[1.12,.72,.82]);sphere(g,.42,shirt,[0,1.55,0],[1.08,1.08,.70]);box(g,[.18,.44,.055],0x526079,[0,1.55,.30]);capsule(g,.09,.32,skin,[0,1.91,0]);sphere(g,.24,skin,[0,2.17,0],[.92,1.08,.90]);face(g,2.17);capsule(g,.028,.58,0x424e64,[0,1.49,-.31]);for(const s of[-1,1]){sphere(g,.12,joint,[s*.43,1.75,0]);limb(capsule(g,.105,.36,shirt,[s*.55,1.49,0]),'upperArm',s);sphere(g,.095,joint,[s*.57,1.26,0]);limb(capsule(g,.085,.34,skin,[s*.55,1.02,.02]),'lowerArm',s);sphere(g,.095,skin,[s*.54,.79,.04],[.75,1,.75]);limb(capsule(g,.14,.52,pants,[s*.18,.67,0]),'upperLeg',s);sphere(g,.11,joint,[s*.18,.35,0]);limb(capsule(g,.115,.52,pants,[s*.18,.02,0]),'lowerLeg',s);box(g,[.24,.14,.42],0x181d25,[s*.18,-.35,.09])}g.position.y=.38;return g}
function buildAnime(){const g=new THREE.Group(),skin=0xf0c8b0,shirt=0x8c76aa,pants=0x3d3649,joint=0x25222d,hair=0x282630;sphere(g,.30,skin,[0,2.20,0],[1,1.08,.86]);face(g,2.20,1.08,true);sphere(g,.315,hair,[0,2.30,-.02],[1.03,.70,.96]);capsule(g,.045,.28,hair,[-.25,2.03,.01],[0,0,.10]);capsule(g,.045,.28,hair,[.25,2.03,.01],[0,0,-.10]);capsule(g,.07,.29,skin,[0,1.86,0]);sphere(g,.36,shirt,[0,1.53,0],[.92,1.15,.58]);sphere(g,.23,pants,[0,1.00,0],[1,.72,.70]);box(g,[.13,.50,.05],0xab9bc4,[0,1.53,.27]);capsule(g,.024,.55,0x554c69,[0,1.47,-.27]);for(const s of[-1,1]){sphere(g,.105,joint,[s*.36,1.74,0]);limb(capsule(g,.085,.42,shirt,[s*.48,1.46,0]),'upperArm',s);sphere(g,.08,joint,[s*.49,1.19,0]);limb(capsule(g,.072,.40,skin,[s*.47,.91,0]),'lowerArm',s);sphere(g,.082,skin,[s*.46,.65,.03],[.75,1,.72]);limb(capsule(g,.105,.66,pants,[s*.14,.58,0]),'upperLeg',s);sphere(g,.09,joint,[s*.14,.20,0]);limb(capsule(g,.088,.66,pants,[s*.14,-.22,0]),'lowerLeg',s);box(g,[.20,.11,.38],0x181720,[s*.14,-.61,.10])}g.position.y=.64;return g}
function buildXbotFallback(){const g=new THREE.Group(),steel=0x8795aa,dark=0x222a36,accent=0xff7a1a,joint=0x111720;sphere(g,.22,steel,[0,2.12,0],[.90,1.05,.82]);box(g,[.20,.11,.035],accent,[0,2.13,.19]);capsule(g,.075,.25,dark,[0,1.86,0]);box(g,[.70,.68,.36],steel,[0,1.52,0]);box(g,[.33,.28,.08],accent,[0,1.56,.22]);capsule(g,.035,.50,0x435066,[0,1.49,-.22]);box(g,[.46,.30,.33],dark,[0,1.08,0]);for(const s of[-1,1]){sphere(g,.12,joint,[s*.46,1.70,0]);limb(capsule(g,.095,.39,steel,[s*.58,1.44,0]),'upperArm',s);sphere(g,.095,joint,[s*.59,1.18,0]);limb(capsule(g,.082,.37,steel,[s*.57,.92,0]),'lowerArm',s);box(g,[.16,.20,.13],dark,[s*.57,.66,.02]);limb(capsule(g,.125,.54,dark,[s*.19,.68,0]),'upperLeg',s);sphere(g,.10,joint,[s*.19,.35,0]);limb(capsule(g,.105,.54,steel,[s*.19,.01,0]),'lowerLeg',s);box(g,[.24,.14,.42],dark,[s*.19,-.36,.10])}g.position.y=.39;return g}

models.standard=buildStandard();models.anime=buildAnime();models.xbot=buildXbotFallback();Object.values(models).forEach(m=>{m.visible=false;root.add(m)});
function normalize(obj,h=2.82){obj.updateMatrixWorld(true);let b=new THREE.Box3().setFromObject(obj),s=b.getSize(new THREE.Vector3());obj.scale.multiplyScalar(h/(s.y||1));obj.updateMatrixWorld(true);b=new THREE.Box3().setFromObject(obj);const c=b.getCenter(new THREE.Vector3());obj.position.x-=c.x;obj.position.z-=c.z;obj.position.y-=b.min.y;obj.traverse(n=>{if(n.isMesh){n.castShadow=n.receiveShadow=true}})}
async function loadXbot(){if(xbotLoading||models.xbotReal)return;xbotLoading=true;statusEl.textContent='Xbot 고폴리 모델 불러오는 중…';try{const gltf=await new GLTFLoader().loadAsync('https://threejs.org/examples/models/gltf/Xbot.glb');models.xbotReal=gltf.scene;normalize(models.xbotReal);models.xbotReal.visible=false;root.add(models.xbotReal);if(activeModel==='xbot'){models.xbot.visible=false;models.xbotReal.visible=true;statusEl.textContent='Xbot 고폴리 모델'}dirty=true}catch(e){console.warn(e);statusEl.textContent='Xbot형 고디테일 대체 모델'}finally{xbotLoading=false}}
function active(){return activeModel==='xbot'?(models.xbotReal||models.xbot):models[activeModel]}
function setModel(name){if(!models[name])name='standard';activeModel=name;localStorage.setItem('promptStudio.avatarModel',name);Object.entries(models).forEach(([k,m])=>{if(m?.isObject3D)m.visible=false});const o=active();if(o)o.visible=true;document.querySelectorAll('#avatarSwitch [data-avatar]').forEach(b=>b.classList.toggle('on',b.dataset.avatar===name));statusEl.textContent=name==='standard'?'표준 고디테일 마네킹':name==='anime'?'애니 비율 고디테일 마네킹':(models.xbotReal?'Xbot 고폴리 모델':'Xbot형 고디테일 모델');if(name==='xbot'&&!models.xbotReal)loadXbot();dirty=true}
function poseText(){return ($('poseCustom')?.value||'').trim()||$('posePreset')?.value||'standing pose'}
function applyPose(){const p=poseText().toLowerCase(),o=active();if(!o||models.xbotReal===o)return;o.traverse(n=>{if(n.userData.baseRot)n.rotation.copy(n.userData.baseRot)});o.rotation.x=p.includes('leaning forward')?.18:0;o.scale.y=(p.includes('crouching')||p.includes('sitting'))?.84:1;o.traverse(n=>{if(!n.userData.limb)return;const s=n.userData.side||1,t=n.userData.limb;if(p.includes('walking')){if(t==='upperArm')n.rotation.x+=s*.45;if(t==='upperLeg')n.rotation.x-=s*.42}if(p.includes('running')){if(t==='upperArm')n.rotation.x+=s*.85;if(t==='upperLeg')n.rotation.x-=s*.78}if(p.includes('arms crossed')&&t==='upperArm'){n.rotation.z-=s*.95;n.rotation.x+=.25}if(p.includes('waving')&&t==='upperArm'&&s===1)n.rotation.z-=1.55;if(p.includes('one hand on the hip')&&t==='upperArm'&&s===1){n.rotation.z-=.95;n.rotation.x+=.25}});dirty=true}
function readCamera(){return{az:Number($('az')?.value||0),el:Number($('el')?.value||0),dist:Number($('dist')?.value||4.2),lens:Number($('lens')?.value||50),roll:Number($('roll')?.value||0)}}
function cameraKey(c){return`${c.az}|${c.el}|${c.dist}|${c.lens}|${c.roll}`}
function fov(mm){return THREE.MathUtils.radToDeg(2*Math.atan(36/(2*Math.max(16,mm))))}
function updateCamera(c=readCamera()){const az=THREE.MathUtils.degToRad(c.az),el=THREE.MathUtils.degToRad(c.el),r=Math.max(1.5,c.dist*.72),t=new THREE.Vector3(0,1.38,0);camera.position.set(Math.sin(az)*Math.cos(el)*r,t.y+Math.sin(el)*r,Math.cos(az)*Math.cos(el)*r);camera.fov=THREE.MathUtils.clamp(fov(c.lens),12,80);camera.aspect=Math.max(.1,canvas.clientWidth/Math.max(1,canvas.clientHeight));camera.up.set(0,1,0);camera.lookAt(t);camera.rotateZ(THREE.MathUtils.degToRad(-c.roll));camera.updateProjectionMatrix();dirty=true}
function dispatchInput(id,val){const e=$(id);if(!e)return;e.value=val;e.dispatchEvent(new Event('input',{bubbles:true}))}
let drag=false,lx=0,ly=0;canvas.addEventListener('pointerdown',e=>{drag=true;lx=e.clientX;ly=e.clientY;canvas.setPointerCapture(e.pointerId)});canvas.addEventListener('pointermove',e=>{if(!drag)return;const c=readCamera();c.az=THREE.MathUtils.clamp(c.az+(e.clientX-lx)*.65,-180,180);c.el=THREE.MathUtils.clamp(c.el-(e.clientY-ly)*.52,-70,70);lx=e.clientX;ly=e.clientY;dispatchInput('az',c.az);dispatchInput('el',c.el);updateCamera(c)});canvas.addEventListener('pointerup',()=>drag=false);canvas.addEventListener('pointercancel',()=>drag=false);canvas.addEventListener('wheel',e=>{e.preventDefault();const c=readCamera();c.dist=THREE.MathUtils.clamp(c.dist+Math.sign(e.deltaY)*.25,.6,7);dispatchInput('dist',c.dist);updateCamera(c)},{passive:false});
document.getElementById('avatarSwitch')?.addEventListener('click',e=>{const b=e.target.closest('[data-avatar]');if(b)setModel(b.dataset.avatar)});
function resize(){const w=Math.max(1,canvas.clientWidth),h=Math.max(1,canvas.clientHeight),d=Math.min(window.devicePixelRatio||1,2);if(canvas.width!==Math.round(w*d)||canvas.height!==Math.round(h*d)){renderer.setPixelRatio(d);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();dirty=true}}
function loop(){requestAnimationFrame(loop);resize();const c=readCamera(),k=cameraKey(c);if(k!==lastCam){lastCam=k;updateCamera(c)}const p=poseText();if(p!==lastPose){lastPose=p;applyPose()}if(dirty){dirty=false;renderer.render(scene,camera)}}
setModel(activeModel);updateCamera();applyPose();loop();
