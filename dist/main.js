(()=>{const e=document.body.clientWidth,t=document.body.clientHeight;let n,i,o=0,d=0,l=0,c=0,a=!1,s=!1;const h=document.createElement("canvas");h.width=e,h.height=t,h.style.width=e+"px",h.style.height=t+"px",document.body.appendChild(h);const u=h.getContext("2d");u.fillStyle="#000",u.fillRect(0,0,h.width,h.height),h.addEventListener("mousedown",(e=>{a=!0,s||(i.start(),s=!0),n.gain.value=1})),h.addEventListener("mouseup",(e=>{a=!1,n.gain.value=0})),h.addEventListener("mousemove",(e=>{requestAnimationFrame((()=>{o=e.clientX,d=e.clientY,w(),l=o,c=d}))}));const w=()=>{if(a){n.gain.value=d/h.height,i.frequency.value=o/h.width*880;const e=o/h.width*360,t=d/h.height*100,l=Date.now();u.fillStyle=`hsl(${e}, 100%, ${t}%)`;const c=1+20*(.5*Math.sin(l/300)+.5);u.shadowBlur=100,u.shadowColor=`hsl(${l/10%360}, 100%, 50%)`,u.fillRect(o-c,d-c,c,c)}};(()=>{const e=new(window.AudioContext||window.webkitAudioContext);n=e.createGain(),n.connect(e.destination),i=e.createOscillator(),i.type="sine",i.connect(n)})()})();