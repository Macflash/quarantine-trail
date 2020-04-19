import * as React from "react";
import CrossHair from '../images/crosshair.png';
import Spray1 from '../images/spray1.png';
import Spray2 from '../images/spray2.png';
import Towel1 from '../images/towel1.png';
import Towel2 from '../images/towel2.png';
import Water1 from '../images/water2.png';
import Wipe1 from '../images/wipe1.png';

type Direction = "up" | "down" | "left" | "right";
var viruses: { x: number, y: number, img: string, dir: Direction, dist: number }[] = [];
var interval: any = null;
var splotch = document.createElement("img");
splotch.src = Water1;
var wipe = document.createElement("img");
wipe.src = Wipe1;

export const CleaningView: React.FC<{ close: () => void }> = props => {
    const [spray, setSpray] = React.useState(Spray1);
    const [towel, setTowel] = React.useState(Towel1);

    return <div style={{ overflow: "hidden", cursor: `url(${CrossHair}) 12 12, crosshair`, position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "green" }}>
        <div style={{ position: "relative" }}>
            <img style={{ position: "absolute", left: 0, top: 50, zIndex: 1 }} src={spray} />
            <img style={{ position: "absolute", left: 0, top: 50, zIndex: 2 }} src={towel} />
            <canvas draggable onDragOver={ev=>{
                const canv = document.getElementById("cleancanvas") as HTMLCanvasElement;
                const rect = canv!.getBoundingClientRect()
                const x = ev.clientX - rect.left
                const y = ev.clientY - rect.top

                const ctx = canv.getContext("2d");
                const size = 50;
                const half = size / 2;
                ctx?.clearRect(x-half,y-half,size,size);
            }} onDragStart={ev => {
                ev.dataTransfer.setDragImage(wipe, 50, 50);
                console.log("drag!!");
                setTowel(Towel2);
            }} onDragEnd={() => {
                console.log("drag!!");
                setTowel(Towel1);
            }}
            onClick={(ev) => {
                const canv = document.getElementById("cleancanvas") as HTMLCanvasElement;
                const rect = canv!.getBoundingClientRect()
                const x = ev.clientX - rect.left
                const y = ev.clientY - rect.top

                const ctx = canv.getContext("2d");
                ctx!.fillStyle = "rgba(0,150,255, 50)";
                const size = 200;
                const half = size / 2;
                //ctx?.fillRect(x-half,y-half,size,size);
                ctx?.drawImage(splotch, x-half, y-half);

                console.log(x, y);
                setSpray(Spray2);
                setTimeout(() => {
                    setSpray(Spray1);
                }, 150);
            }} 
            style={{ position: "absolute", left: 0, top: 0, right: 0, bottom:0, zIndex: 3 }}
             width={618} 
             height={465} 
             id="cleancanvas" 
             />
        </div>
    </div>;
}