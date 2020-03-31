import React from 'react';
import './App.css';
import { StartGame } from './views/startGame';
import { Business, BusinessView } from './views/business';
import { City, CityView } from './views/city';
import { Employee } from './views/employee';
import { PickRandom, InRange } from './utils';


function App() {
  const spreadChance = .005;
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
    // city spread
    const newInfections = city.infected * spreadChance * city.interaction;
    const newRecovered = city.infected / 18 + 1; // 14 days to recover...
    const newDeceased = city.infected * .05 / 18 + 1; // 6% die?

    setCity({
      ...city,
      infected: city.infected + newInfections - newRecovered - newDeceased,
      deceased: city.deceased + newDeceased,
      recovered: city.recovered + newRecovered,
      day: city.day + 1,
    })

    // business spend
    if (business) {
      const customers = InRange(50, 400);
      let volume = "normal";
      if (customers > 250) {
        volume = "busy";
      }
      if (customers > 330) {
        volume = "very busy";
      }
      if (customers < 150) {
        volume = "quiet";
      }
      console.log(`today was a ${volume} day with ${customers} customers`);

      const staffHours: number = business.employees.map(e => e.status).map(s => {
        switch (s) {
          case "fulltime":
            return 1;
          case "parttime":
            return .5;
          default:
            return 0;
        }
      }).reduce((p, v) => p + v as any);

      const openHours = staffHours * business.openHours;
      const cleanHours = staffHours * business.cleanHours;

      const staffRatio = customers / openHours;
      const cleanRatio = customers / cleanHours;

      // compare staffing to customers
      console.log("staff ratio", staffRatio);
      console.log("clean ratio", cleanRatio);

      if (staffRatio > 8) {
        console.log("You were very understaffed today");
        //todo lower staff morale

      }
      else if (staffRatio > 5) { console.log("You were understaffed today"); }

      if (cleanRatio < 10) { console.log("your store looks very clean") }

      // compare cleaning to customers

      setBusiness({
        ...business,
        money: business.money - business.employees.map(e => e.pay).reduce((p, v) => p + (v * 8)),
        employees: business.employees.map(e => ({ ...e, hasVirus: e.hasVirus || Math.random() < (business.customerLimit || customers) * city.infected / city.population } as Employee)),
      });
    }

    // business make
  }


  return (
    <div className="App">
      <h2>Welcome to Quarantine Trail!</h2>
      You run a small business, you will need to manage your store, employees and hygiene practices to try and get through the pandemic while providing an essential service to your customers.

      <br />
      <br />
      {city != null && business != null ? <CityView c={city} /> : null}
      {business == null ? <StartGame onCreate={setBusiness} /> : <BusinessView b={business} setBusiness={setBusiness} />}

      <br />
      <br />

      <button onClick={advanceDay}>Run Day</button>
    </div>
  );
}

export default App;


