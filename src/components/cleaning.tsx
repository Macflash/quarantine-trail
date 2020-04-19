import * as React from "react";
import CrossHair from '../images/crosshair.png';
import Spray1 from '../images/spray1.png';
import Spray2 from '../images/spray2.png';
import Towel1 from '../images/towel1.png';
import Towel2 from '../images/towel2.png';
import Water1 from '../images/water2.png';
import Wipe1 from '../images/wipe1.png';
import Virus1 from '../images/virus.png';
import { InRange } from "../utils";
import { buttonStyle } from "./layout";

type Direction = "up" | "down" | "left" | "right";
var viruses: { x: number, y: number, img: HTMLImageElement, dir: Direction, dead: boolean }[] = [];
var interval: any = null;
var splotch = document.createElement("img");
splotch.src = Water1;
var wipe = document.createElement("img");
wipe.src = Wipe1;
var v1 = document.createElement("img");
v1.src = Virus1;

var vcanv: HTMLCanvasElement | null = null;
var vctx: CanvasRenderingContext2D | null = null;
var cleancanv: HTMLCanvasElement | null = null;
var cleanctx: CanvasRenderingContext2D | null = null;

var spawned = 0;
var killed = 0;

export const CleaningView: React.FC<{ close: (score: number) => void }> = props => {
    const [spray, setSpray] = React.useState(Spray1);
    const [towel, setTowel] = React.useState(Towel1);

    React.useEffect(() => {
        spawned = 0;
        killed = 0;

        if (interval) { clearInterval(interval) }
        interval = setInterval(() => {
            if (spawned < 50) {
                if (Math.random() < .1) {
                    spawned++;
                    viruses.push({
                        dead: false,
                        dir: "right",
                        img: v1,
                        x: -50,
                        y: InRange(0, 300)
                    });
                }
                else if (Math.random() < .1) {
                    spawned++;
                    viruses.push({
                        dead: false,
                        dir: "left",
                        img: v1,
                        x: 650,
                        y: InRange(0, 300)
                    });
                }
            }
            else if (viruses.length == 0) {
                clearInterval(interval);
                props.close(killed / spawned);
                alert(`Done! you got ${killed} out of ${spawned}`);
                return;
            }

            viruses.forEach(v => {
                if (v.dead) { return; }
                if (v.dir == "left") {
                    v.x -= 30;
                }
                else if (v.dir == "right") {
                    v.x += 25;
                }
            });

            viruses = viruses.filter(v => v.x < 800 && v.x > -50 && !v.dead);

            vcanv = vcanv ?? document.getElementById("viruscanvas") as HTMLCanvasElement;
            vctx = vctx ?? vcanv.getContext("2d");
            vctx?.clearRect(0, 0, 700, 700);
            viruses.forEach(v => vctx?.drawImage(v.img, v.x, v.y))
        }, 100);

        return () => { clearInterval(interval); vcanv = null; vctx = null; cleanctx = null; cleancanv = null; };
    }, []);

    return <div style={{ overflow: "hidden", cursor: `url(${CrossHair}) 12 12, crosshair`, position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "green" }}>
        <div style={{ position: "relative" }}>

            <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, zIndex: 8 }}>
                <button style={{ ...buttonStyle }} onClick={() => props.close(0)}>Quit</button>
            </div>
            <img style={{ position: "absolute", left: 0, top: 50, zIndex: 1 }} src={spray} />
            <img style={{ position: "absolute", left: 0, top: 50, zIndex: 2 }} src={towel} />
            <canvas
                style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0, zIndex: 3 }}
                width={618}
                height={465}
                id="viruscanvas"
            />
            <canvas draggable onDragOver={ev => {
                const canv = document.getElementById("cleancanvas") as HTMLCanvasElement;
                const rect = canv!.getBoundingClientRect()
                const x = ev.clientX - rect.left
                const y = ev.clientY - rect.top

                const ctx = canv.getContext("2d");
                const size = 100;
                const half = size / 2;
                ctx?.clearRect(x - half, y - half, size, size);
            }} onDragStart={ev => {
                ev.dataTransfer.setDragImage(wipe, 50, 50);
                console.log("drag!!");
                setTowel(Towel2);
            }} onDragEnd={() => {
                console.log("drag!!");
                setTowel(Towel1);
            }}
                onClick={(ev) => {
                    cleancanv = cleancanv ?? document.getElementById("cleancanvas") as HTMLCanvasElement;
                    const rect = cleancanv!.getBoundingClientRect()
                    const x = ev.clientX - rect.left
                    const y = ev.clientY - rect.top

                    //check for viruses
                    viruses.forEach(v => {
                        if (Math.abs(v.x - x) < 50 && Math.abs(v.y - y) < 50) {
                            cleanctx?.drawImage(v.img, v.x, v.y);
                            v.dead = true;
                            killed++;
                        }
                    });

                    cleanctx = cleanctx ?? cleancanv.getContext("2d");
                    cleanctx!.fillStyle = "rgba(0,150,255, 50)";
                    const size = 200;
                    const half = size / 2;
                    //ctx?.fillRect(x-half,y-half,size,size);
                    cleanctx?.drawImage(splotch, x - half, y - half);

                    console.log(x, y);
                    setSpray(Spray2);
                    setTimeout(() => {
                        setSpray(Spray1);
                    }, 150);
                }}
                style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0, zIndex: 4 }}
                width={618}
                height={465}
                id="cleancanvas"
            />
        </div>
    </div>;
}