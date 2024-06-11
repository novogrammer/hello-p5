import './style.scss'

import p5 from "p5";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <section class="p-section-hero"></section>
`;

const sketchA=(p:p5)=>{
  const CANVAS_WIDTH=800;
  const CANVAS_HEIGHT=800;
  const CELL_WIDTH=100;
  const CELL_HEIGHT=100;
  p.setup=()=>{
    p.createCanvas(CANVAS_WIDTH,CANVAS_HEIGHT);
    // p.background(255,0,255);
    p.ellipseMode(p.CENTER);
  };
  const drawCell=(x:number,y:number)=>{
    p.push();
    p.translate(x,y);
    p.strokeWeight(0);
    p.rect(0,0,CELL_WIDTH,CELL_HEIGHT);
    p.drawingContext.clip();

    p.fill(0,255,0);
    p.circle(CELL_WIDTH/2,CELL_HEIGHT/2,CELL_WIDTH*1.1);
    p.drawingContext.clip();

    p.push();
    // p.fill(0,0,255);
    const n=p.noise(x,y,performance.now()/1000);
    p.colorMode(p.HSB,255);
    p.fill(n*255,255,255);
    p.colorMode(p.RGB);
    p.rect(0,0,CELL_WIDTH,CELL_HEIGHT);
    p.pop();

    p.fill(200);
    p.stroke(0,0,0);
    p.strokeWeight(10);
    p.textAlign(p.LEFT,p.TOP);
    p.textSize(40);
    p.text("Hello!",0,0);
    // p.scale(0.25,0.25);
    // p.scale(2,2);
    // p.scale(10,10);
    p.rect(CELL_WIDTH/2,CELL_HEIGHT/2,CELL_WIDTH/2,CELL_HEIGHT/2);
    p.pop();

  }

  p.draw=()=>{
    for(let y=0;y<CANVAS_HEIGHT;y+=CELL_HEIGHT){
      for(let x=0;x<CANVAS_WIDTH;x+=CELL_WIDTH){
        drawCell(x,y);
      }
    }
  };
}


const heroElement=document.querySelector<HTMLElement>(".p-section-hero");
if(!heroElement){
  throw new Error("heroElement is null");
}


(window as any).p5SketchA=new p5(sketchA,heroElement);
