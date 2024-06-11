
import p5 from "p5";
import chroma from "chroma-js";
import Stats from "stats.js";
import { getElementSize } from "./dom_utils";
import {BREAK_WIDTH_PC} from "./constants";

// const VIRTUAL_WIDTH=800;
// const VIRTUAL_HEIGHT=800;
const CELL_WIDTH=100;
const CELL_HEIGHT=100;


export default class SecondApp{
  p:p5;
  layer?:p5.Graphics;
  stats:Stats;
  sectionElement: HTMLElement;
  constructor(){
    const sectionElement=document.querySelector<HTMLElement>(".p-section-second");
    if(!sectionElement){
      throw new Error("sectionElement is null");
    }
    this.sectionElement=sectionElement;
    this.stats=new Stats();
    this.stats.dom.style.top="50px";
    document.body.appendChild( this.stats.dom );
    const sketch=(p:p5)=>{
      p.setup=()=>{
        this.onSetup();
      };
      p.windowResized=()=>{
        this.onWindowResized();
      }
      p.draw=()=>{
        this.stats.begin();
        this.onDraw();
        this.stats.end();
      };
    };
    this.p=new p5(sketch,sectionElement);

  }
  onSetup(){
    const {width,height} = getElementSize(this.sectionElement);
    const {p}=this;

    p.createCanvas(width,height);
    // p.background(255,0,255);
    p.ellipseMode(p.CENTER);


  }
  onWindowResized(){
    const {width,height} = getElementSize(this.sectionElement);
    const {p}=this;
    p.resizeCanvas(width,height);

  }
  drawCell(x:number,y:number){
    const {p}=this;

    const drawingContext=p.drawingContext as CanvasRenderingContext2D;

    p.push();
    p.translate(x,y);
    // p.strokeWeight(0);
    // p.rect(0,0,CELL_WIDTH,CELL_HEIGHT);
    // drawingContext.clip();


    const colors=chroma.scale(["#80ff00","#ffff00","#ff8000"]).mode("lch").colors(8);
    for(let iz=0;iz<colors.length;iz++){
      const color=colors[iz];
      p.push();
      p.strokeWeight(0);
      p.fill(color);
      const offsetX=p.map(p.noise(x/100,y/100,performance.now()/1000*0.2+iz*0.1),0,1,CELL_WIDTH*-0.5,CELL_WIDTH*0.5);
      const offsetY=p.map(p.noise(x/100,y/100,performance.now()/1000*0.2+iz*0.1+33),0,1,CELL_WIDTH*-0.5,CELL_WIDTH*0.5);
      p.circle(CELL_WIDTH/2+offsetX,CELL_HEIGHT/2+offsetY,CELL_WIDTH/2);
      p.pop();
    }

    p.pop();
  }
  onDraw(){
    const {p}=this;
    const {width,height} = getElementSize(this.sectionElement);

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


    p.clear();
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