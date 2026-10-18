(function(root){
 'use strict';
 const pending={};let template;
 function loadScript(src){
  if(!pending[src])pending[src]=new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=src;script.onload=resolve;script.onerror=()=>{delete pending[src];script.remove();reject(Error('Nu am putut încărca diploma. Încearcă din nou.'));};document.head.append(script);});
  return pending[src];
 }
 async function image(){
  if(!template){await loadScript('assets/diploma-template.js?v=classroom-v2');template=await new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>reject(Error('Imaginea diplomei nu este disponibilă.'));img.src=root.RoboDiplomaImage;});}return template;
 }
 function dateLabel(value){const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(value);return m?m[3]+'.'+m[2]+'.'+m[1]:'';}
 async function paint(canvas,name='',date=''){
  const img=await image(),ctx=canvas.getContext('2d');
  canvas.width=3072;canvas.height=2048;ctx.scale(2,2);ctx.drawImage(img,0,0,1536,1024);
  const clean=String(name).replace(/[\u0000-\u001f\u007f]/g,'').trim().slice(0,70);
  ctx.fillStyle='#094a70';ctx.textAlign='center';ctx.textBaseline='alphabetic';
  let size=42;ctx.font='bold '+size+'px "Trebuchet MS", Arial, sans-serif';
  while(ctx.measureText(clean).width>650&&size>18){size--;ctx.font='bold '+size+'px "Trebuchet MS", Arial, sans-serif';}
  ctx.fillText(clean,782,402,650);
  ctx.font='bold 25px "Trebuchet MS", Arial, sans-serif';ctx.textAlign='left';ctx.fillText(dateLabel(date),188,905,185);
  canvas.setAttribute('aria-label','Diplomă Programator Robo'+(clean?', pentru '+clean:'')+'. '+dateLabel(date));
  return canvas;
 }
 async function create(name,date){
  await loadScript('assets/vendor/jspdf.umd.min.js');
  const canvas=await paint(document.createElement('canvas'),name,date),doc=new root.jspdf.jsPDF({orientation:'landscape',unit:'mm',format:'a4',compress:true});
  // Fit the original illustration inside A4, keeping its aspect ratio and a print margin.
  const width=277,height=width*2/3;
  doc.addImage(canvas.toDataURL('image/jpeg',0.96),'JPEG',10,(210-height)/2,width,height);
  doc.setProperties({title:'Diploma Programator Robo',subject:'Aventura de acasa',creator:'Robo Explorator'});
  return doc;
 }
 root.RoboDiploma={paint,create,dateLabel};
})(window);
