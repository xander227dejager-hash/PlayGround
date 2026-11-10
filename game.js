import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const canvas = document.querySelector('#scene');
const scene = new THREE.Scene();
scene.background = new THREE.Color('#b8d5ea');
scene.fog = new THREE.Fog('#b8d5ea', 16, 30);
const camera = new THREE.PerspectiveCamera(42, 1, .1, 100);
camera.position.set(8.7, 6.7, 10.5);
const renderer = new THREE.WebGLRenderer({canvas, antialias:true});
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const ambient = new THREE.HemisphereLight('#fff8e9','#57718e',2.5); scene.add(ambient);
const sun = new THREE.DirectionalLight('#fff1d2',3.3); sun.position.set(-5,10,6); sun.castShadow=true; sun.shadow.mapSize.set(1024,1024); scene.add(sun);
const fill = new THREE.PointLight('#bed7ff',1.8,20); fill.position.set(8,4,0); scene.add(fill);
const mats={floor:new THREE.MeshStandardMaterial({color:'#d9b895',roughness:1}), wall:new THREE.MeshStandardMaterial({color:'#f9f4e9'}), trim:new THREE.MeshStandardMaterial({color:'#ead9bd'}), blue:new THREE.MeshStandardMaterial({color:'#5577a2'}), navy:new THREE.MeshStandardMaterial({color:'#243e63'}), green:new THREE.MeshStandardMaterial({color:'#72bca7'}), yellow:new THREE.MeshStandardMaterial({color:'#ffc857'}), wood:new THREE.MeshStandardMaterial({color:'#d08d5b'}), darkwood:new THREE.MeshStandardMaterial({color:'#a7694c'}), white:new THREE.MeshStandardMaterial({color:'#ffffff'}), skin:new THREE.MeshStandardMaterial({color:'#e4a77d'}), skin2:new THREE.MeshStandardMaterial({color:'#8d573f'})};
function box(name, size, pos, mat, parent=scene){const m=new THREE.Mesh(new THREE.BoxGeometry(...size),mat);m.name=name;m.position.set(...pos);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m}
function cyl(name,r,h,pos,mat,parent=scene){const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,18),mat);m.name=name;m.position.set(...pos);m.castShadow=true;parent.add(m);return m}
// room
box('floor',[18,.22,14],[0,-.18,0],mats.floor); box('back-wall',[18,8,.2],[0,3.8,-5.7],mats.wall); box('left-wall',[.2,8,14],[-9,3.8,0],mats.wall); box('baseboard',[18,.3,.28],[0,.05,-5.55],mats.trim); box('left-trim',[.3,.3,14],[-8.85,.05,0],mats.trim);
// windows
for(const x of [-5.8,-1.7,2.4,6.5]){box('window',[3.1,2.7,.12],[x,4.7,-5.57],new THREE.MeshStandardMaterial({color:'#9fd5e9',roughness:.5}));box('window-frame',[.12,2.7,.16],[x,4.7,-5.45],mats.trim);box('window-frame',[3.1,.12,.16],[x,4.7,-5.45],mats.trim)}
// board and colorful cards
box('chalkboard',[7.8,3.2,.22],[1.9,4,-5.3],new THREE.MeshStandardMaterial({color:'#365a62',roughness:.9}));
box('board-trim',[8.2,.18,.3],[1.9,2.36,-5.15],mats.wood);
const cardColors=['#f6c75e','#83cdb5','#ee8c78']; const cardLabels=['EVAPORATION','CONDENSATION','PRECIPITATION'];
cardLabels.forEach((label,i)=>{const c=box('lesson-card-'+i,[2.1,1.05,.08],[-.65+i*2.6,4.1,-5.14],new THREE.MeshStandardMaterial({color:cardColors[i]}));c.userData={lesson:true,index:i};});
// teacher desk
box('teacher-desk',[3.6,.55,1.4],[5.7,1, -3.2],mats.darkwood);for(const x of [4.3,7.1])box('desk-leg',[.18,1.4,.18],[x,.3,-3.2],mats.darkwood);box('book',[.9,.12,.65],[5.3,1.38,-3.2],mats.yellow);box('plant-pot',[.4,.35,.4],[7,1.45,-3.2],mats.wood);cyl('plant',.06,.7,[7,1.9,-3.2],mats.green);
// student desk rows
function student(x,z,skinMat,shirt){const g=new THREE.Group();g.position.set(x,0,z);scene.add(g);const body=box('student-body',[.65,.85,.42],[0,1.05,0],shirt,g);cyl('student-head',.3,.42,[0,1.85,0],skinMat,g);cyl('student-hair',.31,.2,[0,2.09,0],new THREE.MeshStandardMaterial({color:'#4b302d'}),g);box('desk-top',[1.7,.16,.75],[0,1.48,.65],mats.wood,g);for(const dx of [-.65,.65])box('desk-leg',[.1,1.3,.1],[dx,0.72,.65],mats.darkwood,g);return g}
student(-5.4,-1.1,mats.skin,new THREE.MeshStandardMaterial({color:'#ee8882'}));student(-1.8,-1.1,mats.skin2,new THREE.MeshStandardMaterial({color:'#6da7dc'}));student(1.8,-1.1,mats.skin,new THREE.MeshStandardMaterial({color:'#8dc9a8'}));student(-5.4,1.5,mats.skin2,new THREE.MeshStandardMaterial({color:'#f0b958'}));student(-1.8,1.5,mats.skin,new THREE.MeshStandardMaterial({color:'#a98adc'}));student(1.8,1.5,mats.skin2,new THREE.MeshStandardMaterial({color:'#e47987'}));
// teacher avatar
const teacher=new THREE.Group();teacher.position.set(5.8,0,-1.8);scene.add(teacher);box('teacher-body',[.75,1.15,.5],[0,1.2,0],mats.blue,teacher);cyl('teacher-head',.33,.45,[0,2.05,0],mats.skin,teacher);cyl('teacher-hair',.35,.2,[0,2.3,0],new THREE.MeshStandardMaterial({color:'#3b2a37'}),teacher);box('pointer',[.08,.08,2.5],[-.72,1.5,-.2],mats.yellow,teacher).rotation.x=.3;
// little props
cyl('globe',.42,.15,[-7.3,1,-3],mats.blue);box('book-stack',[.8,.22,.55],[-7,1.55,-3],mats.yellow);box('rug',[4.2,.04,2.4],[0,.01,3.8],new THREE.MeshStandardMaterial({color:'#8fc6bd'}));

const raycaster=new THREE.Raycaster();const pointer=new THREE.Vector2();let targetRot=0, targetY=6.7, dragging=false,lastX=0;
function resize(){const r=canvas.getBoundingClientRect();camera.aspect=r.width/r.height;camera.updateProjectionMatrix();renderer.setSize(r.width,r.height,false)}window.addEventListener('resize',resize);resize();
canvas.addEventListener('pointerdown',e=>{dragging=true;lastX=e.clientX;canvas.setPointerCapture(e.pointerId)});canvas.addEventListener('pointerup',()=>dragging=false);canvas.addEventListener('pointermove',e=>{if(dragging){targetRot+=(e.clientX-lastX)*.004;lastX=e.clientX}});canvas.addEventListener('wheel',e=>{targetY=Math.max(4.8,Math.min(8.5,targetY+e.deltaY*.005))});
canvas.addEventListener('click',e=>{const r=canvas.getBoundingClientRect();pointer.x=((e.clientX-r.left)/r.width)*2-1;pointer.y=-((e.clientY-r.top)/r.height)*2+1;raycaster.setFromCamera(pointer,camera);const hit=raycaster.intersectObjects(scene.children,true).find(x=>x.object.userData.lesson);if(hit){openQuiz();}});
function animate(){requestAnimationFrame(animate);camera.position.x=8.7*Math.cos(targetRot);camera.position.z=10.5*Math.sin(targetRot)+.5;camera.position.y+=(targetY-camera.position.y)*.04;camera.lookAt(0,2,-1);renderer.render(scene,camera)}animate();

const modal=document.querySelector('#quizModal'),feedback=document.querySelector('#feedback');function openQuiz(){modal.classList.remove('hidden');feedback.textContent='';document.querySelectorAll('.answers button').forEach(b=>b.disabled=false)}document.querySelector('#missionBtn').addEventListener('click',openQuiz);document.querySelector('#closeQuiz').addEventListener('click',()=>modal.classList.add('hidden'));
document.querySelectorAll('.answers button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.answers button').forEach(b=>b.disabled=true);if(btn.dataset.answer==='B'){feedback.textContent='Correct! Rivers and lakes carry water on its journey. ✨';feedback.style.color='#43a981';setTimeout(()=>{modal.classList.add('hidden');completeLesson()},850)}else{feedback.textContent='Almost! Think about where puddles flow after a storm.';feedback.style.color='#e38b56';setTimeout(()=>document.querySelectorAll('.answers button').forEach(b=>b.disabled=false),800)}}));
function completeLesson(){document.querySelector('#progressText').textContent='50%';document.querySelector('#progressBar').style.width='50%';document.querySelector('#moodText').textContent='Proud';document.querySelector('#missionTitle').textContent='Explain the journey';document.querySelector('#missionSub').textContent='Now teach evaporation to a partner';document.querySelector('.step.active').classList.remove('active');document.querySelectorAll('.step')[1].classList.add('active');document.querySelector('#speech').innerHTML='<b>Excellent work!</b><span>Now let’s explain the journey.</span>';const toast=document.querySelector('#toast');toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2800)}
let sound=true;document.querySelector('#soundBtn').addEventListener('click',()=>{sound=!sound;document.querySelector('#soundBtn').textContent=sound?'♫':'×';});
