import React from 'react';
import './App.css';
import { PickRandom } from './utils';
import { Layout, ColorOrange, OuterBorder, headerStyle, basicBoxStyle, InnerBorder, buttonStyle, MiniBorder, ColorYellow, MenuCircle, Employee, ColorBrown, Callback, VerticalMenu, CenterMenuItem, Game } from './components/layout';

import Help from './images/help.png';
import Eagle from './images/eagle.png';
import EagleR from './images/eagle_r.png';
import Banner from './images/quarantine banner.png';
import Virus1 from './images/virus1.bmp';
import Virus2 from './images/virus2.bmp';
import Virus3 from './images/virus3.bmp';
import Save from './images/save.png';

const textBlockStyle: React.CSSProperties = {
  margin: "16px 48px",
  fontWeight: 700,
  textAlign: "left",
  lineHeight: 2,
  fontSize: 13
}

const savedGameKey = "quarantinetrail_savedgame";

const enableDevMode = true;
export const isDev = window.location.href.indexOf("localhost") >= 0 && enableDevMode;

export var yourName = isDev ? "YOU" : "";
export var businessName = PickRandom(["OK Food!", "Eat 'r Up!", "Burgers and More Things", "Fancy Fish", "Mario's Asian Fusion", "Leftover's Cafe", "Papi Juan's"]);

export var startingGame: Game | null = null;

export var employees: Employee[] = [
  { name: PickRandom(["Bert", "Simon", "Sampson"]), status: "Good", mood: "Ok" },
  { name: PickRandom(["Mary", "Alice", "Arushi"]), status: "Good", mood: "Ok" },
  { name: PickRandom(["Gautham", "Bob", "Mike"]), status: "Good", mood: "Ok" },
  { name: PickRandom(["Zach", "Aunya", "Jonathan"]), status: "Good", mood: "Ok" },
  { name: PickRandom(["Francesca", "Sam", "Tyler"]), status: "Good", mood: "Ok" },
]

export interface ILog {
  message: string;
  style?: React.CSSProperties;
}

export var Logs: ILog[] = [];
export var AddLog = (message: string, style?: React.CSSProperties) => {
  Logs.unshift({ message, style });
}

function App() {
  const [width, setWidth] = React.useState(window.innerWidth);
  const scale = width / 620;
  React.useEffect(() => {
    setTimeout(() => {
      var w = window.innerWidth;
      if (w != width) {
        setWidth(w);
      }
    }, 1000);
  }, []);

  type Stage = "Menu" | "Intro" | "DetailedIntro" | "OptionsMenu" | "PickNames" | "Game";

  const [stage, setStage] = React.useState<Stage>(isDev ? "Game" : "Menu");

  let layout = <Layout gameOver={() => {
    Logs = [];
    employees.forEach(e => e.status = "Good");
    setStage("Menu");
  }} />;

  if (stage == "Menu") {
    layout = <Menu onClick={() => setStage("Intro")}
      introduction={() => setStage("DetailedIntro")}
      options={() => setStage("OptionsMenu")}
    />;
  }

  if (stage == "Intro") {
    layout = <Intro onClick={() => {
      if (startingGame) { setStage("Game"); }
      else { setStage("PickNames") }
    }} />;
  }

  if (stage == "DetailedIntro") {
    layout = <DetailedIntro onClick={() => setStage("Menu")} />
  }

  if (stage == "OptionsMenu") {
    layout = <OptionsMenu onClick={() => setStage("Menu")} />
  }

  if (stage == "PickNames") {
    layout = <PickNames onClick={() => {
      setStage("Game");
      AddLog("The pandemic has started. You set off with 5 employees, plenty of supplies and $1600.");
    }} />
  }

  return (
    <div className="wrapper" style={{ backgroundColor: ColorOrange, padding: 18, width: 620, height: 460, border: OuterBorder, transform: `scale(${Math.min(scale, 1)},${Math.min(scale, 1)})` }}>
      {layout}
    </div>
  );
}

export default App;

const Menu: React.FC<{ onClick: Callback, introduction: Callback, options: Callback }> = props => {
  const [img, setImage] = React.useState(Virus1);
  React.useEffect(() => {
    setTimeout(() => {
      if (img == Virus1) {
        setImage(Virus2);
      }
      else if (img == Virus2) {
        setImage(Virus3);
      }
      else if (img == Virus3) {
        setImage(Virus1);
      }
    }, (300));
  }, [img]);

  const intro_theme = require("./sounds/QT Intro Theme.wav");

  React.useEffect(() => {
    setTimeout(() => {
      var audio = new Audio(intro_theme);
      audio.volume = .25;
      audio.play();
    }, 2000);
  }, []);

  return <div style={{ backgroundColor: "white", border: InnerBorder, padding: 20, position: "relative" }}>
    <div style={{ position: "absolute", top: 32, left: 0, right: 0, textAlign: "center" }}><img src={Banner} /></div>
    <img style={{ border: InnerBorder }} src={img} width="100%" />
    <div style={{ position: "absolute", bottom: 40, left: 30, right: 20, justifyContent: "space-around", display: "flex" }}>
      <button style={{ ...buttonStyle, width: "20%", border: MiniBorder }} onClick={props.introduction}>Introduction</button>
      <button style={{ ...buttonStyle, width: "20%", border: MiniBorder }} onClick={props.options}>Options</button>
      <button style={{ ...buttonStyle, width: "20%", border: MiniBorder }} onClick={() => { var link = document.createElement("a"); link.href = "https://github.com/Macflash/quarantine-trail"; link.click(); }}>Quit</button>
      <button style={{ ...buttonStyle, width: "25%", border: MiniBorder }} onClick={props.onClick}>Travel the Trail</button>
    </div>
    <div style={{ position: "absolute", right: 10, bottom: -30, fontSize: 12, color: ColorBrown }}>© 2020</div>
  </div>;
}

const Intro: React.FC<{ onClick: () => void }> = props => {
  return <div style={{ ...basicBoxStyle, border: InnerBorder, height: "100%" }}>
    <div style={{ ...headerStyle, marginTop: 12 }}>Welcome to the Quarantine Trail!</div>
    <div style={textBlockStyle}>You're about to begin a great adventure, running a small business during a global pandemic and local quarantine somewhere in the midst of the rugged landscape of North America. Your essential business, run by a team of employees, will provide an essential service to your customers and community somewhere between Indepdence, Missouri, to the fertile Willamette Valey of Oregon State, to the inner city of New York City--a distance of over 2,500 miles.</div>
    <div style={textBlockStyle}>Before you set off on the trail, register your name, the names of the members of your staff, and your business. After that, you'll need to buy supplies and make other important decisions.</div>
    <div style={textBlockStyle}>Good Luck!</div>
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: 35 }}>
      <button
        style={{ ...buttonStyle, width: "25%", border: MiniBorder }}
        onClick={() => { startingGame = JSON.parse(localStorage.getItem(savedGameKey)!); props.onClick(); }}
        disabled={!localStorage.getItem(savedGameKey)}>
        Load Game
        </button>

      <button style={{ ...buttonStyle, width: "25%", border: MiniBorder }} onClick={props.onClick}>New Game</button>
    </div>
  </div>;
}

const slide1 = <div>
  <div style={{ ...textBlockStyle, fontSize: 12 }}>
    What was it like to live and work in quarantine and social isolation across the entire country in apartments, home and work spaces in 2020?  "The Quarantine Trail" allows you to relive one of the greatest struggles in American history: the journey take by millions of essential workers during the Coronavirus (Covid-19) pandemic.
    It was a long, difficult struggle to work--one that often resulted in bankruptcy and death. But for those workers and businesses that survived, it led to a new and better life for the rich in the profitable heartland of the United States of America.
</div>
  <div style={{ ...textBlockStyle, fontSize: 12 }}>
    How will you make life-and-death decisions for your employees and your business? How much hand sanitizer and paper towels will you buy? Will you provide your workers with health care and paid time off if they get sick? How much and what kind of supplies should you purchase? If you run low on cleaning supplies, will you be able to shop or trade to get the disinfectant and paper towels you need? Will your business overcome the dangers of disease and severe conditions? "The Quarantine Trail" poses these and other exciting challenges.</div>
</div>;

const slide2 = <div>
  <div style={{ ...textBlockStyle, fontSize: 12 }}>
    If for some reason you don't survive--your employees get sick, sick customers bring in the coronavirus, you run out of masks and cleaning spplies--don't give up! Unlike the real-life essential workers of 2020, you can try again and again until you succeed and your name is added to the "The Quarantine Trail List of Legends."
    </div>
  <div style={{ ...textBlockStyle, fontSize: 12 }}>
    The object of "The Quarantine Trail" is to make it all the way through the pandemic and pay off any remaining debt. Along the way, you'll have many decisions to make.
    </div>
  <div style={{ ...textBlockStyle, fontSize: 12 }}>
    On the computer screen you'll see varios "buttons" that you can click with the mouse. Clicking on these buttons allows you to perform different functions vital to the success of your journey. For example, clicking on the "Pay" button lets you decide how much money you employees will make each day during the quarantine.
    </div>
</div>;

const slide3 = <div>
  <div style={{ ...textBlockStyle, fontSize: 12 }}>
    You'll also see a "Conditions" panel that keeps you informed of the date, the spread of the pandemic, and the current situation of your business. Just like the real-life business owners, you'll have to stay alert and make good decisions if you want your employees and your business to survive.
    </div>
  <div style={{ ...textBlockStyle, fontSize: 12 }}>
    If you amke it all the way to the end of the pandemic, you'll receive points based on your current status. If your score is high enough, you'll be added to the List of Legends.
    </div>
  <div style={{ ...textBlockStyle, fontSize: 12 }}>
    If you have to stop in the middle of your journey, you can Quit and Save (by going to the Options Screen) so that you can resume the journey at a later time.
    </div>
</div>;

const slides = [slide1, slide2, slide3];

const DetailedIntro: React.FC<{ onClick: () => void }> = props => {
  const [slide, setSlide] = React.useState(0);

  return <div style={{ ...basicBoxStyle, border: InnerBorder, height: "100%" }}>
    <div style={{ ...headerStyle, marginTop: 12 }}>Introduction</div>
    {slides[slide]}
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", position: "absolute", bottom: 25, left: 20, right: 20 }}>
      <button style={{ ...buttonStyle, width: undefined, minWidth: 80, border: MiniBorder }} disabled={slide == 0} onClick={() => setSlide(slide - 1)}>Previous</button>
      <button style={{ ...buttonStyle, width: undefined, minWidth: 80, border: MiniBorder }} onClick={props.onClick}>Done</button>
      <span style={{ border: "2px solid black", padding: 1, borderRadius: 8 }}>
        <button style={{ ...buttonStyle, width: undefined, minWidth: 80, border: MiniBorder }} disabled={slide >= slides.length - 1} onClick={() => setSlide(slide + 1)}>Next</button>
      </span>
    </div>
  </div>;
};

export var tickSpeed = 4000;
export var virusCount = 50;

export const OptionsMenu: React.FC<{ onClick: () => void, game?: Game }> = props => {
  const [state, setState] = React.useState(0);
  const ping = () => setState(Math.random());
  return <div style={{ ...basicBoxStyle, border: InnerBorder, height: "100%", display: "flex", flexDirection: "row" }}>
    <div style={{ flex: "auto", textAlign: "left", margin: 8 }}>
      <div>Simulation Speed</div>
      <div><label><input type="radio" checked={tickSpeed == 5000} onChange={ev => { ping(); tickSpeed = 5000 }} /> Slow</label></div>
      <div><label><input type="radio" checked={tickSpeed == 4000} onChange={ev => { ping(); tickSpeed = 4000 }} /> Regular</label></div>
      <div><label><input type="radio" checked={tickSpeed == 2000} onChange={ev => { ping(); tickSpeed = 2000 }} /> Fast</label></div>
      <div><label><input type="radio" checked={tickSpeed == 1000} onChange={ev => { ping(); tickSpeed = 1000 }} /> Very Fast</label></div>

      <br />
      <br />
      <div>Cleaning length</div>
      <div><label><input type="radio" checked={virusCount == 15} onChange={ev => { ping(); virusCount = 15 }} /> 15</label> </div>
      <div><label><input type="radio" checked={virusCount == 25} onChange={ev => { ping(); virusCount = 25 }} /> 25 </label></div>
      <div><label><input type="radio" checked={virusCount == 50} onChange={ev => { ping(); virusCount = 50 }} /> 50 (Regular)</label> </div>
      <div><label><input type="radio" checked={virusCount == 75} onChange={ev => { ping(); virusCount = 75 }} /> 75</label>  </div>
      <div><label><input type="radio" checked={virusCount == 100} onChange={ev => { ping(); virusCount = 100 }} /> 100</label></div>
      <div><label><input type="radio" checked={virusCount == 120} onChange={ev => { ping(); virusCount = 120 }} /> 120</label></div>
    </div>

    {props.game ?
      <div>
        <CenterMenuItem name="Save Game" image={Save} onClick={() => { localStorage.setItem(savedGameKey, JSON.stringify(props.game)); alert("Saved!") }} />
      </div>
      : null}
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", position: "absolute", bottom: 25, left: 175, right: 175 }}>
      <span style={{ border: "3px solid black", borderRadius: 9 }}>
        <button style={{ ...buttonStyle, width: undefined, minWidth: 80, border: MiniBorder }} onClick={() => { props.onClick() }}>OK</button>
      </span>
      <button style={{ ...buttonStyle, width: undefined, minWidth: 80, border: MiniBorder }} onClick={props.onClick}>Cancel</button>
    </div>
  </div>
}

const PickNames: React.FC<{ onClick: () => void }> = props => {
  return <div style={{ ...basicBoxStyle, border: InnerBorder, height: "100%", display: "flex", flexDirection: "column", fontWeight: 700, }}>
    {/* Header */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <img src={Eagle} width="25%" />
      <div style={{ textAlign: "right" }}>
        <div>
          Your Name: <input defaultValue={yourName} onChange={ev => yourName = ev.target.value} style={{ backgroundColor: ColorYellow, border: MiniBorder }} />
        </div>
        <div>
          Business: <input defaultValue={businessName} onChange={ev => businessName = ev.target.value} style={{ backgroundColor: ColorYellow, border: MiniBorder }} />
        </div>
      </div>
      <img src={EagleR} width="25%" />
    </div>

    {/** Body */}
    <div style={{ display: "flex", justifyContent: "space-between", margin: "48px 32px" }}>

      {/** Occupation */}
      <div style={{ border: MiniBorder, width: "40%", position: "relative", textAlign: "center" }}>
        <div style={{ position: "absolute", top: -16, textAlign: "center", left: 0, right: 0 }}>
          <div style={{ display: "inline-block", backgroundColor: ColorYellow, padding: 5, }}>
            Occupation
          </div>
        </div>
        <div style={{ ...textBlockStyle, margin: 5 }}>
          <div><label><input type="radio" checked={true} /> Restaurant</label></div>
          <div><label><input type="radio" disabled /> Grocer</label></div>
          <div><label><input type="radio" disabled /> Banker</label></div>
          <div><label><input type="radio" disabled /> Doctor</label></div>
          <div><label><input type="radio" disabled /> Farmer</label></div>
          <div><label><input type="radio" disabled /> Merchant</label></div>
          <div><label><input type="radio" disabled /> Saddlemaker</label></div>
          <div><label><input type="radio" disabled /> Teacher</label></div>
        </div>
        {/* TODO: add occupations and info here: <div style={{ position: "absolute", top: 0, bottom: 0, right: 16, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <MenuCircle image={Help} />
          </div>*/}
      </div>

      {/** Employee names */}
      <div style={{ width: "50%" }}>
        <div>The employees in your store:</div>
        <div><input defaultValue={employees[0].name} onChange={ev => employees[0].name = ev.target.value} style={{ backgroundColor: ColorYellow, border: MiniBorder }} /></div>
        <div><input defaultValue={employees[1].name} onChange={ev => employees[1].name = ev.target.value} style={{ backgroundColor: ColorYellow, border: MiniBorder }} /></div>
        <div><input defaultValue={employees[2].name} onChange={ev => employees[2].name = ev.target.value} style={{ backgroundColor: ColorYellow, border: MiniBorder }} /></div>
        <div><input defaultValue={employees[3].name} onChange={ev => employees[3].name = ev.target.value} style={{ backgroundColor: ColorYellow, border: MiniBorder }} /></div>
        <div><input defaultValue={employees[4].name} onChange={ev => employees[4].name = ev.target.value} style={{ backgroundColor: ColorYellow, border: MiniBorder }} /></div>

        <div style={{ marginTop: 32 }}>
          <button style={{ ...buttonStyle, width: "25%", border: MiniBorder }} onClick={props.onClick} >OK</button>
        </div>
      </div>
    </div>
  </div>;
}