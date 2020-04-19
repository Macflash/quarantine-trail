import * as React from "react";
import CrossHair from '../images/crosshair.png';
import Spray1 from '../images/spray1.png';
import Spray2 from '../images/spray2.png';
import Towel1 from '../images/towel1.png';
import Towel2 from '../images/towel2.png';
import Water1 from '../images/water2.png';
import Wipe1 from '../images/wipe1.png';
import Virus1 from '../images/virus.png';
import { InRange, PickRandom } from "../utils";
import { buttonStyle, basicBoxStyle } from "./layout";

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

const virusesPerRun = 50;

const spray_sound = require("../sounds/spray.mp3");
const wipe_sound = require("../sounds/wipe.mp3");

const sneeze_sound = require("../sounds/sneeze.mp3");
const smallcough_sound = require("../sounds/smallcough.mp3");
const cough_sound = require("../sounds/cough.mp3");
const backgroundnoise_sound = require("../sounds/backgroundnoise.mp3");


const playSpray = () => {
    var audio = new Audio(spray_sound);
    audio.volume = .25;
    audio.play();
}

const playWipe = () => {
    var audio = new Audio(wipe_sound);
    audio.volume = .25;
    audio.play();
}

const playVirusSound = () => {
    const pick = PickRandom([sneeze_sound, smallcough_sound, cough_sound, backgroundnoise_sound]);
    var audio = new Audio(pick);
    audio.volume = .25;

    if (pick == sneeze_sound) { audio.volume = .05; }
    if (pick == cough_sound) { audio.volume = .005; }
    if (pick == smallcough_sound) { audio.volume = .1; }
    if (pick == backgroundnoise_sound) { audio.volume = .4; }

    audio.play();
}

const cleanmusic = require("../sounds/clean music.wav");

export const CleaningView: React.FC<{ paperTowels: number, cleaningSprays: number, close: (score: number, sprays: number, towels: number) => void }> = props => {
    const [spray, setSpray] = React.useState(Spray1);
    const [towel, setTowel] = React.useState(Towel1);
    const [paperTowels, setPaperTowels] = React.useState(props.paperTowels);
    const [cleaningSprays, setCleaningSprays] = React.useState(props.cleaningSprays);

    React.useEffect(() => {
        var audio = new Audio(cleanmusic);
        audio.volume = .25;
        audio.play();
        return () => audio.pause()
    }, []);

    React.useEffect(() => {
        viruses = [];
        spawned = 0;
        killed = 0;

        if (interval) { clearInterval(interval) }
        interval = setInterval(() => {
            if (spawned < virusesPerRun) {
                if (Math.random() < .1) {
                    if (Math.random() < .2) {
                        playVirusSound();
                    }
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
                props.close(killed / spawned, cleaningSprays, paperTowels);
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

            <div style={{ position: "absolute", top: 430, bottom: 0, right: 0, zIndex: 8 }}>
                <button style={{ ...buttonStyle }} onClick={() => props.close(killed / virusesPerRun, cleaningSprays, paperTowels)}>Quit</button>
            </div>

            <div style={{ position: "absolute", top: 410, bottom: 0, left: 0, zIndex: 8 }}>
                <div style={{ ...basicBoxStyle, color: cleaningSprays <= 0 ? "red" : undefined }}>Cleaning spray: {cleaningSprays}</div>
                <div style={{ ...basicBoxStyle, color: paperTowels <= 0 ? "red" : undefined }}>Paper Towels: {paperTowels}</div>
            </div>

            <img style={{ position: "absolute", left: 0, top: 50, zIndex: 3 }} src={spray} />
            <img style={{ position: "absolute", left: 0, top: 50, zIndex: 4 }} src={towel} />
            <canvas
                style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0, zIndex: 1 }}
                width={618}
                height={465}
                id="viruscanvas"
            />
            <canvas 
                style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0, zIndex: 2 }}
                width={618}
                height={465}
                id="cleancanvas"
            />
            <div id="dragger!" style={{position: "absolute", left: 0, top: 0, right: 0, bottom: 0, height: 465, width: 618, zIndex: 10}}
            draggable={paperTowels > 0} 
            onDragOver={ev => {
                const canv = document.getElementById("cleancanvas") as HTMLCanvasElement;
                const rect = canv!.getBoundingClientRect()
                const x = ev.clientX - rect.left
                const y = ev.clientY - rect.top

                const ctx = canv.getContext("2d");
                const size = 100;
                const half = size / 2;
                ctx?.clearRect(x - half, y - half, size, size);
            }} 
            onDragStart={ev => {
                playWipe();
                setPaperTowels(paperTowels - 1);
                ev.dataTransfer.setDragImage(wipe, 50, 50);
                console.log("drag!!");
                setTowel(Towel2);
            }} 
            onDragEnd={() => {
                console.log("drag!!");
                setTowel(Towel1);
            }}
                onClick={(ev) => {
                    console.log("clicked!");
                    if (cleaningSprays <= 0) { return; }
                    playSpray();
                    setCleaningSprays(cleaningSprays - 1);
                    cleancanv = cleancanv ?? document.getElementById("cleancanvas") as HTMLCanvasElement;
                    const rect = cleancanv!.getBoundingClientRect()
                    const x = ev.clientX - rect.left
                    const y = ev.clientY - rect.top

                    const size = 200;
                    const half = size / 2;
                    const effectiveRange = half;

                    //check for viruses
                    viruses.forEach(v => {
                        const dist = Math.sqrt(Math.pow(v.x - x, 2) + Math.pow(v.y - y, 2));
                        if (dist < effectiveRange) {
                            cleanctx?.drawImage(v.img, v.x, v.y);
                            v.dead = true;
                            killed++;
                        }
                    });

                    cleanctx = cleanctx ?? cleancanv.getContext("2d");
                    cleanctx!.fillStyle = "rgba(0,150,255, 50)";
                    //ctx?.fillRect(x-half,y-half,size,size);
                    cleanctx?.drawImage(splotch, x - half, y - half);

                    console.log(x, y);
                    setSpray(Spray2);
                    setTimeout(() => {
                        setSpray(Spray1);
                    }, 150);
                }}></div>
        </div>
    </div>;
}