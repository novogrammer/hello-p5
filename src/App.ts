
import p5 from "p5";
import { getElementSize } from "./dom_utils";
import {BREAK_WIDTH_PC} from "./constants";

// const VIRTUAL_WIDTH=800;
// const VIRTUAL_HEIGHT=800;
const CELL_WIDTH=100;
const CELL_HEIGHT=100;


export default class App{
  p:p5;
  heroElement: HTMLElement;
  constructor(){
    const heroElement=document.querySelector<HTMLElement>(".p-section-hero");
    if(!heroElement){
      throw new Error("heroElement is null");
    }
    this.heroElement=heroElement;
        
    const sketch=(p:p5)=>{
      p.setup=()=>{
        this.onSetup();
      };
      p.windowResized=()=>{
        this.onWindowResized();
      }
      p.draw=()=>{
        this.onDraw();
      };
    };
    this.p=new p5(sketch,heroElement);

  }
  onSetup(){
    const {width,height} = getElementSize(this.heroElement);
    const {p}=this;

    p.createCanvas(width,height);
    // p.background(255,0,255);
    p.ellipseMode(p.CENTER);

  }
  onWindowResized(){
    const {width,height} = getElementSize(this.heroElement);
    const {p}=this;
    p.resizeCanvas(width,height);

  }
  drawCell(x:number,y:number){
    const {p}=this;

    const drawingContext=p.drawingContext as CanvasRenderingContext2D;

    p.push();
    p.translate(x,y);
    p.strokeWeight(0);
    p.rect(0,0,CELL_WIDTH,CELL_HEIGHT);
    drawingContext.clip();

    p.fill(0,255,0);
    p.circle(CELL_WIDTH/2,CELL_HEIGHT/2,CELL_WIDTH*1.1);
    drawingContext.clip();

    p.push();

    // const gradient=drawingContext.createLinearGradient(0,0,CELL_WIDTH,CELL_HEIGHT);
    const gradient=drawingContext.createRadialGradient(CELL_WIDTH/3,CELL_HEIGHT/4,0,CELL_WIDTH/4,CELL_HEIGHT/2,CELL_WIDTH/2);
    
    // p.fill(0,0,255);
    const n=p.noise(x/200,y/200,performance.now()/1000*0.5);
    p.colorMode(p.HSB,255);
    // p.fill(n*255,255,255);
    gradient.addColorStop(0,p.color(n*255,0,255) as any);
    gradient.addColorStop(1,p.color(n*255,255,255) as any);
    drawingContext.fillStyle=gradient;
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
  onDraw(){
    const {p}=this;
    const {width,height} = getElementSize(this.heroElement);

    let virtualWidth:number;
    let virtualHeight:number;
    if(width<BREAK_WIDTH_PC){
      virtualWidth=400
      virtualHeight=800;
    }else{
      virtualWidth=800
      virtualHeight=400;
    }

    const scaleX=width/virtualWidth;
    const scaleY=height/virtualHeight;


    p.push();
    p.scale(scaleX,scaleY);
    for(let y=0;y<virtualHeight;y+=CELL_HEIGHT){
      for(let x=0;x<virtualWidth;x+=CELL_WIDTH){
        this.drawCell(x,y);
      }
    }
    p.pop();

  }
}