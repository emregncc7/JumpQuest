(()=>{"use strict";var e={};e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var t;e.g.importScripts&&(t=e.g.location+"");var i=e.g.document;if(!t&&i&&(i.currentScript&&"SCRIPT"===i.currentScript.tagName.toUpperCase()&&(t=i.currentScript.src),!t)){var n=i.getElementsByTagName("script");if(n.length)for(var o=n.length-1;o>-1&&(!t||!/^http(s?):/.test(t));)t=n[o--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=t})();const t=e.p+"347f82a94beababb2dc6.png",i=e.p+"6e902050bf0ff785cb59.png",n=e.p+"47624c61f6296a8076be.png",o=e.p+"e494d981adb48f0f111b.png",s=e.p+"35e10ce50c6f1e865783.png",a=e.p+"cfffe4c371f5e11d372b.png",h=e.p+"4a5e305a8cf0a83554cd.png",r=e.p+"c7ab7ba86c726fe6b3d9.png",l=e.p+"c67ea51444aafa9bdcd5.png",d=e.p+"a2f75989924952a7e49c.png",c=e.p+"11514f48f22f6d8e3cf7.png",w=e.p+"01e8f15e899155c68950.png",g=e.p+"7fc8c80d18e73cc5ebc8.png",p=e.p+"7fc8c80d18e73cc5ebc8.png",m=e.p+"776d33c8d669f05a009e.png",y=e.p+"79edf0165a4ecec3a818.png",f=e.p+"abc4a2b02dee9456e9cf.png",x=e.p+"16add4f357213812da0e.png",u=e.p+"842da0b77e373a002fb2.png",v=e.p+"d3cb27b60abca96bda22.png",b=e.p+"508bf20242ff37ae1d03.png",L=e.p+"416a2ede19bd0f7b3bf8.png",S=e.p+"52c48812a2c47ac3451d.png",E=e.p+"28e46f0f1adfe6f506e4.png",k=e.p+"b7a456241ecf27c71d7c.png";class C{static checkCollision(e,t){return e.position.y+e.height<=t.position.y&&e.position.y+e.height+e.velocity.y>=t.position.y&&e.position.x+e.width>=t.position.x&&e.position.x<=t.position.x+t.width}static handleCollisions(e,t){t.forEach((t=>{this.checkCollision(e,t)&&(e.velocity.y=0,e.isJumping=!1)}))}}const A=document.querySelector("canvas"),T=A.getContext("2d");A.width=1024,A.height=576;let M=0;A.addEventListener("touchstart",(e=>{M=e.touches[0].clientX})),A.addEventListener("touchmove",(e=>{e.preventDefault();const t=e.touches[0].clientX-M;Math.abs(t)>50&&(t>0?(se.right.pressed=!0,se.left.pressed=!1):(se.left.pressed=!0,se.right.pressed=!1))})),A.addEventListener("touchend",(()=>{se.right.pressed=!1,se.left.pressed=!1})),A.addEventListener("touchstart",(e=>{q.isJumping||q.jump()}));const P="menu",I="playing",D="gameOver",O="levelComplete";let R=P,$=1,j="en";const B={en:{title:"Platform Game",startText:"Press SPACE to Start",controls:"Controls:",moveLeft:"A - Move Left",moveRight:"D - Move Right",jump:"W - Jump",gameOver:"GAME OVER",levelComplete:"LEVEL COMPLETE!",pressSpace:"Press SPACE for Level",congratulations:"Congratulations!"},tr:{title:"Platform Oyunu",startText:"Başlamak için SPACE tuşuna basın",controls:"Kontroller:",moveLeft:"A - Sola Git",moveRight:"D - Sağa Git",jump:"W - Zıpla",gameOver:"OYUN BİTTİ",levelComplete:"BÖLÜM TAMAMLANDI!",pressSpace:"Bölüm için SPACE tuşuna basın",congratulations:"Tebrikler!"},ru:{title:"Платформер",startText:"Нажмите SPACE чтобы начать",controls:"Управление:",moveLeft:"A - Влево",moveRight:"D - Вправо",jump:"W - Прыжок",gameOver:"ИГРА ОКОНЧЕНА",levelComplete:"УРОВЕНЬ ПРОЙДЕН!",pressSpace:"Нажмите SPACE для уровня",congratulations:"Поздравляем!"}},W={tr:z(S),en:z(E),ru:z(k)};class Y{constructor(){this.speed=5,this.position={x:100,y:100},this.velocity={x:0,y:0},this.width=66,this.height=150,this.image=z(w),this.frames=0,this.sprites={stand:{right:z(w),left:z(c),cropWidth:177,width:66},run:{right:z(d),left:z(l),cropWidth:340,width:127.875}},this.currentSprite=this.sprites.stand.right,this.currentCropWidth=177,this.isJumping=!1,this.score=0,this.maxVelocityY=20,this.friction=.8}draw(){T.drawImage(this.currentSprite,this.currentCropWidth*this.frames,0,this.currentCropWidth,400,this.position.x,this.position.y,this.width,this.height)}update(){this.frames++,this.updateAnimation(),this.updatePhysics(),this.checkBoundaries(),this.draw()}updateAnimation(){(this.frames>59&&(this.currentSprite===this.sprites.stand.right||this.currentSprite===this.sprites.stand.left)||this.frames>29&&(this.currentSprite===this.sprites.run.right||this.currentSprite===this.sprites.run.left))&&(this.frames=0)}updatePhysics(){this.position.x+=this.velocity.x,this.position.y+=this.velocity.y,this.position.y+this.height+this.velocity.y<=576&&(this.velocity.y=Math.min(this.velocity.y+1.2,this.maxVelocityY)),this.velocity.x*=this.friction}checkBoundaries(){this.position.x<0&&(this.position.x=0)}respawn(){this.position={x:100,y:100},this.velocity={x:0,y:0},this.isInvulnerable=!0,setTimeout((()=>this.isInvulnerable=!1),2e3)}jump(){this.isJumping||(this.velocity.y=-25,this.isJumping=!0)}die(){if(this.lives--,console.log("Lives remaining:",this.lives),this.lives<=0)return console.log("Game Over - No lives remaining"),void(R=D);ce=!1,ae=0,this.position={x:100,y:100},this.velocity={x:0,y:0}}}class J{constructor({x:e,y:t,image:i}){this.position={x:e,y:t},this.image=i,this.width=i.width,this.height=i.height}draw(){T.drawImage(this.image,this.position.x,this.position.y)}}class X{constructor({x:e,y:t,image:i}){this.position={x:e,y:t},this.image=i,this.width=i.width,this.height=i.height}draw(){T.drawImage(this.image,this.position.x,this.position.y)}}function z(e){const t=new Image;return t.src=e,t}let G,N=z(t),V=z(o),q=new Y,F=[],U=[],K=z(g),Z=z(p),H=z(s),Q=z(r),_=z(g),ee=z(p),te=z(m),ie=z(u),ne=z(x),oe=z(L);const se={right:{pressed:!1},left:{pressed:!1}};let ae=0;function he(){q=new Y,q.lives=3,K=z(g),N=z(t),q=new Y,F=[new J({x:4*N.width+300-2+N.width-V.width,y:270,image:z(o)}),new J({x:-1,y:470,image:N}),new J({x:N.width-3,y:470,image:N}),new J({x:2*N.width+100,y:470,image:N}),new J({x:3*N.width+200,y:370,image:N}),new J({x:4*N.width+300-2,y:370,image:N}),new J({x:5*N.width+490-2,y:370,image:N}),new J({x:6*N.width+600-2,y:370,image:N}),new J({x:7*N.width+700-2,y:470,image:N}),new J({x:8*N.width+900-2,y:370,image:N}),new J({x:9*N.width+1e3-2,y:270,image:N}),new J({x:10*N.width+600-2,y:170,image:N}),new J({x:11*N.width+600-2+N.width-V.width,y:470,image:z(o)}),new J({x:12*N.width+433-2+N.width-V.width,y:470,image:z(o)}),new J({x:13*N.width+350-2+N.width-V.width,y:370,image:z(o)}),new J({x:14*N.width+300-2+N.width-V.width,y:370,image:z(o)}),new J({x:15*N.width+250-2+N.width-V.width,y:270,image:z(o)}),new J({x:16*N.width+200-2+N.width-V.width,y:170,image:z(o)}),new J({x:17*N.width+150-2+N.width-V.width,y:170,image:z(o)}),new J({x:18*N.width+300-2,y:370,image:N})],U=[new X({x:-1,y:-1,image:z(n)}),new X({x:-1,y:-1,image:z(i)}),new X({x:7400,y:180,image:z(g)})],ae=0}let re=[];class le{constructor(){this.x=Math.random()*A.width,this.y=0,this.size=10*Math.random()+5,this.speed=3*Math.random()+2,this.angle=360*Math.random(),this.rotation=5*Math.random()-2.5,this.color=["#ff0","#f00","#0f0","#00f","#f0f","#0ff","#ffa500"][Math.floor(7*Math.random())],this.opacity=1}update(){return this.y+=this.speed,this.angle+=this.rotation,this.opacity=Math.max(0,this.opacity-.02),this.opacity>0}draw(){T.save(),T.translate(this.x,this.y),T.rotate(this.angle*Math.PI/180),T.globalAlpha=this.opacity,T.fillStyle=this.color,T.fillRect(-this.size/2,-this.size/2,this.size,this.size),T.restore()}}function de(){for(let e=0;e<50;e++)re.push(new le)}let ce=!1;addEventListener("keydown",(({keyCode:e})=>{switch(e){case 65:console.log("left"),se.left.pressed=!0,G="left";break;case 83:console.log("down");break;case 68:console.log("right"),se.right.pressed=!0,G="right";break;case 87:console.log("up"),q.isJumping||q.jump()}})),addEventListener("keyup",(({keyCode:e})=>{switch(e){case 65:console.log("left"),se.left.pressed=!1;break;case 83:console.log("down");break;case 68:console.log("right"),se.right.pressed=!1;break;case 87:console.log("up")}})),addEventListener("keydown",(({code:e})=>{"Space"===e&&R===P&&(R=I,he())})),A.addEventListener("click",(e=>{if(R===P){const t=A.getBoundingClientRect(),i=e.clientX-t.left,n=e.clientY-t.top,o=50,s=30,a=20,h=A.width/2-(3*o+2*a)/2,r=50;i>=h&&i<=h+o&&n>=r&&n<=r+s?j="tr":i>=h+o+a&&i<=h+2*o+a&&n>=r&&n<=r+s?j="en":i>=h+2*(o+a)&&i<=h+3*o+2*a&&n>=r&&n<=r+s&&(j="ru")}})),function e(){switch(requestAnimationFrame(e),R){case P:!function(){T.fillStyle="rgba(0, 0, 0, 0.85)",T.fillRect(0,0,A.width,A.height),T.fillStyle="white",T.font="64px Arial",T.textAlign="center",T.fillText(B[j].title,A.width/2,A.height/3),T.font="32px Arial",T.fillText(B[j].startText,A.width/2,A.height/2),T.font="20px Arial",T.fillText(B[j].controls,A.width/2,A.height-160),T.fillText(B[j].moveLeft,A.width/2,A.height-120),T.fillText(B[j].moveRight,A.width/2,A.height-90),T.fillText(B[j].jump,A.width/2,A.height-60);const e=50,t=A.width/2-95;T.drawImage(W.tr,t,50,e,30),T.drawImage(W.en,t+e+20,50,e,30),T.drawImage(W.ru,t+140,50,e,30)}();break;case I:if(!ce){switch($){case 1:he();break;case 2:q=new Y,q.lives=3,console.log("Door2 Image:",Z),F=[new J({x:-1,y:470,image:H}),new J({x:H.width-3,y:470,image:H}),new J({x:2*H.width+100,y:470,image:H}),new J({x:3*H.width+300,y:470,image:H}),new J({x:4*H.width+500,y:370,image:H}),new J({x:5*H.width+700,y:370,image:H}),new J({x:6*H.width+900,y:270,image:Q}),new J({x:7*H.width+900,y:290,image:Q}),new J({x:8*H.width+900,y:370,image:H}),new J({x:9*H.width+1240,y:470,image:H}),new J({x:10*H.width+1370,y:400,image:H}),new J({x:11*H.width+1500,y:350,image:H}),new J({x:8200,y:150,image:Z})],U=[new X({x:-1,y:-1,image:z(h)}),new X({x:-1,y:-1,image:z(a)}),new X({x:8200,y:200,image:Z})],console.log("Door X position:",U[2].position.x),console.log("Door Y position:",U[2].position.y),ae=0;break;case 3:q=new Y,q.lives=3,console.log("Door3 Image:",_),F=[new J({x:-1,y:470,image:te}),new J({x:te.width-3,y:470,image:te}),new J({x:2*te.width+100,y:470,image:te}),new J({x:3*te.width+300,y:400,image:te}),new J({x:4*te.width+500,y:320,image:ne}),new J({x:5*te.width+500,y:240,image:ne}),new J({x:6*te.width+500,y:300,image:te}),new J({x:7*te.width+600,y:250,image:te}),new J({x:8*te.width+700,y:350,image:te}),new J({x:9*te.width+800,y:200,image:ne}),new J({x:10*te.width+800,y:150,image:ne}),new J({x:11*te.width+850,y:270,image:te}),new J({x:12*te.width+900,y:370,image:te}),new J({x:13*te.width+2100,y:400,image:te}),new J({x:14*te.width+2300,y:470,image:te}),new J({x:15*te.width+2500,y:270,image:ne}),new J({x:16*te.width+2700,y:150,image:ne}),new J({x:17*te.width+2900,y:100,image:te}),new J({x:18*te.width+3100,y:150,image:te}),new J({x:8230,y:180,image:_})],U=[new X({x:-1,y:-1,image:z(f)}),new X({x:-1,y:-1,image:z(y)}),new X({x:8250,y:200,image:_})],console.log("Door X position:",U[2].position.x),console.log("Door Y position:",U[2].position.y),ae=0;break;case 4:q=new Y,q.lives=3,console.log("Door4 Image:",ee),F=[new J({x:-1,y:470,image:ie}),new J({x:ie.width-3,y:470,image:ie}),new J({x:2*ie.width+100,y:470,image:ie}),new J({x:3*ie.width+300,y:400,image:ie}),new J({x:4*ie.width+400,y:350,image:ie}),new J({x:5*ie.width+500,y:300,image:ie}),new J({x:6*ie.width+630,y:250,image:oe}),new J({x:7*ie.width+630,y:200,image:oe}),new J({x:8*ie.width+630,y:300,image:ie}),new J({x:9*ie.width+690,y:350,image:ie}),new J({x:6240,y:150,image:ee})],U=[new X({x:-1,y:-1,image:z(b)}),new X({x:-1,y:-1,image:z(v)}),new X({x:6300,y:200,image:ee})],console.log("Door X position:",U[2].position.x),console.log("Door Y position:",U[2].position.y),ae=0}ce=!0,console.log(`Level ${$} initialized`)}T.fillStyle="white",T.fillRect(0,0,1024,576),U.forEach((e=>e.draw())),F.forEach((e=>e.draw())),q.update(),C.handleCollisions(q,F),se.right.pressed&&q.position.x<400?q.velocity.x=5:se.left.pressed&&q.position.x>100||se.left.pressed&&0===ae&&q.position.x>0?q.velocity.x=-5:(q.velocity.x=0,se.right.pressed?(ae+=5,F.forEach((e=>{e.position.x-=5})),U.forEach((e=>{e.position.x-=5*.66}))):se.left.pressed&&ae>0&&(ae-=5,F.forEach((e=>{e.position.x+=5})),U.forEach((e=>{e.position.x+=5*.66})))),function(){if(q.position.y>A.height)return $=1,ce=!1,ae=0,q.position={x:100,y:100},void(q.velocity={x:0,y:0});const e=Math.round(q.position.x+ae);let t;switch(console.log(`Level ${$} - Position: ${e}`),$){case 1:t=11200;break;case 2:t=8300;break;case 3:t=8350;break;case 4:t=6300}e>=t&&(console.log(`Level ${$} Complete! Position: ${e}`),R=O)}(),function(){T.fillStyle="white",T.font="20px Arial",T.textAlign="right";const e=Math.round(q.position.x+ae),t=Math.round(q.position.y);T.fillText(`X: ${e} Y: ${t}`,A.width-20,30)}(),re.length>0&&(re=re.filter((e=>{const t=e.update();return t&&e.draw(),t})));break;case D:!function(){function e(t){"Space"===t.code&&(document.removeEventListener("keydown",e),window.gameOverListener=null,R=I,$=1,ce=!1)}window.gameOverListener&&document.removeEventListener("keydown",window.gameOverListener),T.fillStyle="rgba(0, 0, 0, 0.7)",T.fillRect(0,0,A.width,A.height),T.fillStyle="white",T.font="48px Arial",T.textAlign="center",$>4?(T.fillText(B[j].congratulations,A.width/2,A.height/2-40),T.font="24px Arial",T.fillText(B[j].levelComplete,A.width/2,A.height/2+10)):T.fillText(B[j].gameOver,A.width/2,A.height/2),T.font="24px Arial",T.fillText(B[j].startText,A.width/2,A.height/2+40),window.gameOverListener=e,document.addEventListener("keydown",e)}();break;case O:!function(){function e(t){"Space"===t.code&&(document.removeEventListener("keydown",e),window.levelCompleteListener=null,re=[],$<4?($++,console.log("Starting Level:",$),R=I,ce=!1):($=1,R=P,ce=!1))}window.levelCompleteListener&&document.removeEventListener("keydown",window.levelCompleteListener),T.fillStyle="rgba(0, 0, 0, 0.85)",T.fillRect(0,0,A.width,A.height),4===$&&(0===re.length&&de(),re=re.filter((e=>{const t=e.update();return t&&e.draw(),t})),0===re.length&&de()),T.fillStyle="white",T.font="48px Arial",T.textAlign="center",T.fillText(B[j].levelComplete,A.width/2,A.height/2),T.font="24px Arial",4===$?(T.fillText(B[j].congratulations,A.width/2,A.height/2+40),T.font="20px Arial",T.fillText(B[j].startText,A.width/2,A.height/2+80)):T.fillText(B[j].pressSpace+" "+($+1),A.width/2,A.height/2+40),window.levelCompleteListener=e,document.addEventListener("keydown",e)}()}}()})();