import React from 'react';
import './App.css';
import { StartGame } from './views/startGame';
import { Business, BusinessView, advanceBusiness } from './views/business';
import { City, CityView, AdvanceCity } from './views/city';
import { useHistory } from './utils';
import { BarDisplay } from './components/barDisplay';
import { StoreDisplay } from './components/storeDisplay';
import { Layout, ColorOrange, OuterBorder } from './components/layout';

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


  return (
    <div className="wrapper" style={{ backgroundColor: ColorOrange, padding: 18, width: 620, height: 460, border: OuterBorder }}>
      <Layout />
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