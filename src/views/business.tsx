import React from 'react';
import { Employee, EmployeeView, advanceEmployee } from './employee';
import { Setter, ParseConstrainRange, InRange } from '../utils';
import { City } from './city';

export type BusinessType = "grocery";


export interface Business {
  name: string;
  money: number;
  employees: Employee[];
  businessType: BusinessType; // Store is default. Restaurant is closed to take out only mid way, grocery has extra business but more customers = more risk for spread;
  customerLimit?: number;

  openHours: number;
  cleanHours: number;

  customers: number;
}

export const BusinessView: React.FC<{ b: Business, setBusiness?: Setter<Business> }> = props => {
  const { b, setBusiness } = props;
  return <div>
    <div>Business: {b.name}</div>
    <div>Money: ${b.money}</div>

    <div>
      <h3>Hours</h3>
            Open: <input value={b.openHours} type="number" onChange={ev => setBusiness?.({ ...b, openHours: ParseConstrainRange(ev.target.value, 0, 24 - b.cleanHours) })} />
            &nbsp;
            Clean: <input value={b.cleanHours} type="number" onChange={ev => setBusiness?.({ ...b, cleanHours: ParseConstrainRange(ev.target.value, 0, 24 - b.openHours) })} />
    </div>

    <div>
      <h3>Employees</h3>
      <div style={{ overflow: "auto", width: "100%" }}>
        {b.employees.map((e, i) =>
          <EmployeeView
            key={i}
            e={e}
            i={i}
            setEmployee={props.setBusiness ? (newE, i) => {
              const employees = [...b.employees];
              employees[i] = newE;
              props.setBusiness?.({ ...b, employees });
            } : undefined}
          />)}
      </div>
    </div>

    <br />
    <br />
  </div>;
}


export function advanceBusiness(b: Business, c: City): Business {
  const newBusiness = { ...b };
  newBusiness.customers = InRange(50, 400);
  let volume = "normal";
  if (newBusiness.customers > 250) {
    volume = "busy";
  }
  if (newBusiness.customers > 330) {
    volume = "very busy";
  }
  if (newBusiness.customers < 150) {
    volume = "quiet";
  }
  console.log(`today was a ${volume} day with ${newBusiness.customers} customers`);

  const staffHours: number = b.employees.map(e => e.status).map(s => {
    switch (s) {
      case "fulltime":
        return 1;
      case "parttime":
        return .5;
      default:
        return 0;
    }
  }).reduce((p, v) => p + v as any);

  const openHours = staffHours * b.openHours;
  const cleanHours = staffHours * b.cleanHours;

  const staffRatio = newBusiness.customers / openHours;
  const cleanRatio = newBusiness.customers / cleanHours;

  const employees = [...b.employees];
  // compare staffing to customers
  console.log("staff ratio", staffRatio);
  console.log("clean ratio", cleanRatio);

  if (staffRatio > 8) {
    console.log("You were very understaffed today");
    //todo lower staff morale
    employees.forEach(e => e.morale -= 10);

  }
  else if (staffRatio > 5) {
    console.log("You were understaffed today");
    employees.forEach(e => e.morale -= 5);
  }

  if (cleanRatio < 10) { console.log("your store looks very clean") }

  // compare cleaning to customers

  let infectedShoppers = 0;
  for (let i = 0; i < newBusiness.customers; i++) {
    if (Math.random() > (c.population - c.infected) / c.population) {
      infectedShoppers++;
    }
  }

  console.log(`You had ${infectedShoppers} infected shoppers today!`);
  // should have like a HALF life of the cleanliness of the store
  const ic = .05;

  const laborCost = b.employees.map(e => e.pay).reduce((p, v) => p + (v * (b.openHours + b.cleanHours)));
  let sales = 0;
  for (var i = 0; i < newBusiness.customers; i++) {
    sales += InRange(1, 30);
  }
  const fixedCost = 500; //* how much is RENT? 300? insurance? maybe 500-1000?
  const profit = (sales - fixedCost) - laborCost;
  console.log(`You made $${profit}. Labor was $${laborCost}, sales were $${sales} and fixed costs were $${fixedCost}`);

  newBusiness.money -= laborCost;
  newBusiness.money += sales;
  newBusiness.money -= fixedCost;

  newBusiness.employees = employees.map(e => ({ ...e, hasVirus: e.hasVirus || Math.random() < ic * infectedShoppers } as Employee));
  newBusiness.employees = newBusiness.employees.map(e => advanceEmployee(e, b, c));

  return newBusiness;
}