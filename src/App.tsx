import React from 'react';
import './App.css';
import { StartGame } from './views/startGame';
import { Business, BusinessView, advanceBusiness } from './views/business';
import { City, CityView, AdvanceCity } from './views/city';
import { useHistory } from './utils';
import { BarDisplay } from './components/barDisplay';
import { StoreDisplay } from './components/storeDisplay';
import { Layout, ColorOrange, OuterBorder, headerStyle, basicBoxStyle, InnerBorder, buttonStyle, MiniBorder, ColorYellow, MenuCircle } from './components/layout';

import Help from './images/help.png';
import Eagle from './images/eagle.png';
import EagleR from './images/eagle_r.png';

const confirmedCases = [1, 3, 6, 13, 18, 28, 39, 70, 80, 102, 136, 162, 267, 366, 457, 568, 642, 769, 904, 1012, 1187, 1376, 1524, 1793, 1996, 2469, 2580, 3207, 3723, 4310, 4896];

function App() {
  const [infected, addInfected] = useHistory([0]);
  const [business, setBusiness] = React.useState<Business | null>(null)
  const [city, setCity] = React.useState<City>({
    name: "Seattle",
    day: 1,
    infected: 10,
    deceased: 0,
    interaction: 100,
    population: 2000000,
    protection: 0,
    recovered: 0,
    testedPositive: 0,
  });

  const advanceDay = () => {
    const newCity = AdvanceCity(city)
    setCity(newCity);
    addInfected(newCity.testedPositive);

    if (business) {
      setBusiness(advanceBusiness(business, city));
    }
  }

  type Stage = "Menu" | "Intro" | "PickNames" | "Game";

  const [stage, setStage] = React.useState("Intro");

  let layout = <Layout />;

  const textBlockStyle: React.CSSProperties = {
    margin: "16px 48px",
    fontWeight: 700,
    textAlign: "left",
    lineHeight: 2,
    fontSize: 13
  }

  if (stage == "Intro") {
    layout = <div style={{ ...basicBoxStyle, border: InnerBorder, height: "100%" }}>
      <div style={{ ...headerStyle, marginTop: 12 }}>Welcome to the Quarantine Trail!</div>
      <div style={textBlockStyle}>You're about to begin a great adventure, running a small business during a global pandemic and local quarantine somewhere in the midst of the rugged landscape of North America. Your essential business, run by a team of employees, will provide an essential service to your customers and community somewhere between Indepdence, Missouri, to the fertile Willamette Valey of Oregon State, to the inner city of New York City--a distance of over 2,500 miles.</div>
      <div style={textBlockStyle}>Before you set off on the trail, register your name, the names of the members of your staff, and your business. After that, you'll need to buy supplies and make other important decisions.</div>
      <div style={textBlockStyle}>Good Luck!</div>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: 55 }}>
        <button style={{ ...buttonStyle, width: "25%", border: MiniBorder }} disabled>Load Game</button>
        <button style={{ ...buttonStyle, width: "25%", border: MiniBorder }} onClick={() => setStage("PickNames")}>New Game</button>
      </div>
    </div>
  }

  if (stage == "PickNames") {
    layout = <div style={{ ...basicBoxStyle, border: InnerBorder, height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <img src={Eagle} width="30%" />
        <div style={{ textAlign: "right" }}>
          <div>
            Your Name: <input style={{ backgroundColor: ColorYellow, border: MiniBorder }} />
          </div>
          <div>
            Business: <input style={{ backgroundColor: ColorYellow, border: MiniBorder }} />
          </div>
        </div>
        <img src={EagleR} width="30%" />
      </div>

      {/** Body */}
      <div style={{display: "flex", justifyContent: "space-around", margin: 48}}>

        {/** Occupation */}
        <div style={{border: MiniBorder, width: "50%", position: "relative", textAlign: "center"}}>
          <div style={{position: "absolute", top: -16, textAlign: "center", left: 0, right: 0}}>
            <div style={{display: "inline-block", backgroundColor: ColorYellow, padding: 5, }}>
              Occupation
              </div>
            </div>
          <div style={{...textBlockStyle, margin: 5}}>
            <div><label><input type="radio"/> Grocer</label></div>
            <div><label><input type="radio"/> Restaurant</label></div>
            <div><label><input type="radio" disabled/> Banker</label></div>
            <div><label><input type="radio" disabled/> Doctor</label></div>
            <div><label><input type="radio" disabled/> Farmer</label></div>
            <div><label><input type="radio" disabled/> Merchant</label></div>
            <div><label><input type="radio" disabled/> Saddlemaker</label></div>
            <div><label><input type="radio" disabled/> Teacher</label></div>
          </div>
          <div style={{position: "absolute", top:0, bottom:0, right: 16, display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <MenuCircle image={Help} />
          </div>
        </div>

        {/** Employee names */}
        <div style={{width: "50%"}}>
            <div>The employees in your store:</div>
            <div><input style={{backgroundColor: ColorYellow, border: MiniBorder}} /></div>
            <div><input style={{backgroundColor: ColorYellow, border: MiniBorder}} /></div>
            <div><input style={{backgroundColor: ColorYellow, border: MiniBorder}} /></div>
            <div><input style={{backgroundColor: ColorYellow, border: MiniBorder}} /></div>
            <div><input style={{backgroundColor: ColorYellow, border: MiniBorder}} /></div>
            <div><input style={{backgroundColor: ColorYellow, border: MiniBorder}} /></div>

            <div style={{marginTop: 32}}>
              <button style={{ ...buttonStyle, width: "25%", border: MiniBorder }} onClick={() => setStage("Game")} >OK</button>
            </div>
        </div>

      </div>

    </div>
  }

  return (
    <div className="wrapper" style={{ backgroundColor: ColorOrange, padding: 18, width: 620, height: 460, border: OuterBorder }}>
      {layout}
    </div>
  );
}

export default App;


/*
<div className="App" style={{ backgroundColor: ColorYellow, border: InnerBorder, height: "100%" }}>
<h2>Welcome to Quarantine Trail!</h2>

You run a small business, you will need to manage your store, employees and hygiene practices to try and get through the pandemic while providing an essential service to your customers.
<br />
<div>{city.testedPositive - confirmedCases[city.day]} diff</div>
<BarDisplay values={infected} />

<br />

{city != null && business != null ? <CityView c={city} /> : null}
{business == null ? <StartGame onCreate={setBusiness} /> : <BusinessView b={business} setBusiness={setBusiness} />}

<br />
<br />

<button onClick={advanceDay}>Run Day</button>

<StoreDisplay customers={(business?.customers ?? 0) / (business?.openHours ?? 1)} />
</div>
*/