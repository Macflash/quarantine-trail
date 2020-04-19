import React from 'react';
import Banner from '../images/banner.png';
import Buy from '../images/buy.png';
import Graph from '../images/graph.png';
import Help from '../images/help.png';
import Pay from '../images/pay.png';
import News from '../images/news.png';
import Status from '../images/status.png';
import Hours from '../images/hours.png';
import Finances from '../images/finances.png';
import Cleaning from '../images/cleaning.png';
import Supplies from '../images/supplies.png';
import Hunt from '../images/hunt.png';
import Placeholder from '../images/status placeholder.png';

import PayBad from '../images/paybad.png';
import PayOk from '../images/payok.png';
import PayGreat from '../images/paygreat.png';

import ShortShift from '../images/shortshift.png';
import RegularShift from '../images/regularshift.png';
import LongShift from '../images/longshift.png';

import CleanGreat from '../images/cleangreat.png';
import CleanOk from '../images/cleanok.png';
import CleanBad from '../images/cleanbad.png';

import Tweet from '../images/shitnews.png';


import { StoreDisplay } from './storeDisplay';
import { BarDisplay } from './barDisplay';
import { isDev, yourName as StartingName, businessName as StartingBusinessName, Logs, AddLog } from '../App';

import { employees as StartEmployees } from '../App';
import { CleaningView } from './cleaning';
import { SupplyStore } from './supplyStore';
import { PickRandom } from '../utils';

export const ColorYellow = "rgb(255,247,138)";
export const ColorOrange = "rgb(247,166,48)";
export const ColorBrown = "rgb(178,101,8)";
export const ColorDarkBrown = "rgb(69,20,0)";

export const OuterBorder = `10px ridge ${ColorBrown}`;
export const InnerBorder = `5px solid ${ColorBrown}`;
export const MiniBorder = `1px solid ${ColorDarkBrown}`;

export type Lookup<T extends string> = { [P in T]: number };
export type ReverseLookup<T extends string> = { [x: number]: T };

export const bodyText: React.CSSProperties = {
    fontSize: 12, fontWeight: 700
}

export const buttonStyle: React.CSSProperties = {
    fontSize: 14,
    fontWeight: 700,
    width: "calc(100% - 4px)",
    backgroundColor: ColorYellow,
    border: InnerBorder,
    borderRadius: 5,
    margin: 2,
    cursor: "pointer",
}

export const buttonWrapperStyle: React.CSSProperties = {
    width: "100%",
    display: "inline-block",
    backgroundColor: ColorYellow,
    border: MiniBorder,
    borderRadius: 5
}

export const headerStyle: React.CSSProperties = {
    fontWeight: 600,
    fontSize: 18
}

export const bodyStyle: React.CSSProperties = {
    fontWeight: 700,
    fontSize: 10,
    textAlign: "left",
    margin: "0 10px"
}

const spacing = 5;
const margin = spacing / 2;

export const basicBoxStyle = {
    backgroundColor: ColorYellow,
    margin,
    border: MiniBorder,
}

export type View = "Store" | "Chart" | "Guide" | "Status" | "Pay" | "Bank" | "Supplies" | "News" | "Cleaning" | "Hours" | "Hunt";

export type PayQuality = "Paid Sick Leave" | "Overtime" | "Minimum Wage";
const PayMap: Lookup<PayQuality> = {
    "Minimum Wage": 14,
    "Overtime": 18,
    "Paid Sick Leave": 22,
};

export type HourQuality = "Short Shifts" | "Normal Shifts" | "Grueling shifts";
const HourMap: Lookup<HourQuality> = {
    "Short Shifts": 12,
    "Normal Shifts": 9,
    "Grueling shifts": 7,
};

export type Callback = () => void;
export type Setter<T> = (newValue: T) => void;

export type Health = "Good" | "Fair" | "Poor" | "Sick" | "Coronavirus" | "Severe Coronavirus" | "Deceased";
export const HealthMap: Lookup<Health> = {
    "Good": 0,
    "Fair": 1,
    "Poor": 2,
    "Sick": 3,
    "Coronavirus": 4,
    "Severe Coronavirus": 5,
    "Deceased": 6,
};
export const ReverseHealthMap: ReverseLookup<Health> = {
    0: "Good",
    1: "Fair",
    2: "Poor",
    3: "Sick",
    4: "Coronavirus",
    5: "Severe Coronavirus",
    6: "Deceased",
};

export const Health = (currentValue: Health, change: number): Health => {
    let cur = HealthMap[currentValue];
    cur -= change;
    if (cur > 6) { cur = 6; }
    if (cur < 0) { cur = 0; }
    return ReverseHealthMap[cur];
}

export type Mood = "Good" | "Ok" | "Bad";
export const MoodMap: Lookup<Mood> = {
    "Good": 0,
    "Ok": 1,
    "Bad": 2,
};
export const ReverseMoodMap: ReverseLookup<Mood> = {
    0: "Good",
    1: "Ok",
    2: "Bad",
};

export const Mood = (currentValue: Mood, change: number): Mood => {
    let cur = MoodMap[currentValue];
    cur -= change;
    if (cur > 2) { cur = 2; }
    if (cur < 0) { cur = 0; }
    return ReverseMoodMap[cur];
}

export interface Employee {
    name: string,
    status: Health,
    /** mood affects job performance */
    mood: "Good" | "Ok" | "Bad",
}

export type Cleanliness = "Pristine" | "Fair" | "Poor" | "Dirty" | "Filthy" | "Dangerous!";
export const CleanMap: Lookup<Cleanliness> = {
    "Pristine": 0,
    "Fair": 1,
    "Poor": 2,
    "Dirty": 3,
    "Filthy": 4,
    "Dangerous!": 5,
};
export const ReverseCleanMap: ReverseLookup<Cleanliness> = {
    0: "Pristine",
    1: "Fair",
    2: "Poor",
    3: "Dirty",
    4: "Filthy",
    5: "Dangerous!",
};

export const Clean = (currentValue: Cleanliness, change: number): Cleanliness => {
    let cur = CleanMap[currentValue];
    cur -= change;
    if (cur > 5) { cur = 5; }
    if (cur < 0) { cur = 0; }
    return ReverseCleanMap[cur];
}

export interface Game {
    // Infection stats
    /** High = sumemr unrestricted (15%), Normal is about 10%, low is 5%, very low is 2.5%, forced quarantine is 1% */
    infectRate: "Festival" | "Normal" | "Stay at Home" | "Shelter in Place" | "Forced Quarantine";
    date: Date,
    uninfected: number, // total pool that can get sick
    infected: number,
    deceased: number,
    recovered: number,

    // Business Stats
    yourName: string,
    yourStatus: Health,
    businessName: string,
    money: number,
    debt: number,
    employees: Employee[],
    cleanliness: Cleanliness,
    paperTowels: number,
    cleaningSprays: number,
};

function useStateAndView<T>(defaultValue: T, onChange?: () => void, logger?: (value: T) => void): [T, Setter<T>] {
    const [state, setState] = React.useState<T>(defaultValue);

    const changeState = React.useCallback((newValue: T) => {
        setState(newValue);
        onChange?.();
        logger?.(newValue);
    }, [setState, onChange]);

    return [state, changeState];
}

const Randomize = (base: number, variation: number): number => {
    return Math.round(base - variation + (Math.random() * 2 * variation));
}

var month = 0;
var customers = 0;
var infectionGraph = [0];

export const Layout: React.FC<{ gameOver?: Callback }> = props => {
    const [paused, setPaused] = React.useState(false);
    const Pause = React.useCallback(() => setPaused(true), [setPaused]);

    const [view, setView] = useStateAndView<View>("Store", Pause);
    const ResetView = React.useCallback(() => setView("Store"), [setView]);

    const UnPause = React.useCallback(() => { ResetView(); setPaused(false); }, [setPaused, ResetView]);

    const [payQ, setPayQ] = useStateAndView<PayQuality>("Overtime", ResetView, val => AddLog(`You decided to change the the pay to ${val}.`));
    const [hourQ, setHourQ] = useStateAndView<HourQuality>("Normal Shifts", ResetView, val => AddLog(`You decided to change the the hours to ${val}.`));

    const [game, setGame] = React.useState<Game>({
        infectRate: "Normal",

        date: new Date("02/02/2020"),
        uninfected: 2000000,
        infected: 1,
        deceased: 0,
        recovered: 0,

        money: 1600,
        debt: 10000,
        yourName: StartingName,
        yourStatus: "Good",
        businessName: StartingBusinessName,
        employees: StartEmployees,

        cleanliness: "Fair",
        paperTowels: 10,
        cleaningSprays: 20,
    });

    const { infectRate, date, infected, deceased, uninfected, recovered, money, debt, employees, yourName, yourStatus, businessName, cleanliness, paperTowels, cleaningSprays } = game;

    if (employees.filter(e => e.status != "Deceased").length == 0) {
        alert("Game Over! All your employees died.");
        props.gameOver?.();
    }

    React.useEffect(() => {
        // advance the days!
        setTimeout(() => {
            if (debt <= 0 && infected == 0) {
                alert("You win! You survived the pandemic and stayed in business!");
                props.gameOver?.();
            }
            //console.log("running")
            if (!paused) {
                if (money < 0) {
                    setPaused(true);
                    alert("Oh no, you are out of money! Better go to the bank!");
                    props.gameOver?.();
                }
                // increment date
                let newDate = new Date(date);
                newDate.setDate(newDate.getDate() + 1);

                // do sales and costs and stuff
                //const daySales = [15, 10, 11, 12, 13, 17, 20];
                const dayNum = [52, 43, 45, 46, 48, 57, 58];
                const dayTicket = [33, 25, 24, 25, 26, 29, 33];
                const variation = .3;

                const monthsales = [6, 7, 9, 8, 9, 10, 10, 10, 9, 8, 7, 7];

                let transactions = Randomize(dayNum[date.getDay()] * monthsales[date.getMonth()] / 8.333, variation);

                if (infectRate == "Stay at Home") {
                    transactions *= .75;
                }
                if (infectRate == "Shelter in Place") {
                    transactions *= .67;
                }
                if (infectRate == "Forced Quarantine") {
                    transactions *= .45;
                }

                // EVENTS!
                const busyEvent = Math.random() < .035;
                const slowEvent = Math.random() < .02;
                if (busyEvent) {
                    AddLog("Today was really busy!");
                    transactions *= 1.3;
                }
                else if (slowEvent) {
                    AddLog("Today was slow.");
                    transactions /= 1.5;
                }

                //UPDATE cleanliness
                // for each customer check if they were sick
                let youInfected = 0;
                let newCleanliness = cleanliness;
                let sickCustomers = 0;

                let sales = 0;
                let availableEmployees = employees.filter(e => payQ !== "Paid Sick Leave" || HealthMap[e.status] < HealthMap["Sick"]);
                let youWorked = false;
                console.log("Available Employees", availableEmployees);
                if(availableEmployees.length == 0){
                    //you gotta do it!
                    youWorked = true;
                    availableEmployees = [{name: yourName, status: yourStatus, mood: "Ok"}];
                }
                for (var i = 0; i < transactions; i++) {
                    // pick a random employee to have them interact with!
                    // if there is PTO then only use NOT sick employees
                    const server = PickRandom(availableEmployees);
                    const serverIsSick = HealthMap[server.status] > HealthMap["Sick"];

                    let sickModifier = 1;
                    if(serverIsSick){
                        sickModifier = .9;
                    }

                    var customerIsSick = Math.random() < (2 * infected / (uninfected + recovered + infected));
                    if(Math.random() < .5){
                        customerIsSick = customerIsSick || Math.random() < (2 * infected / (uninfected + recovered + infected));
                    }
                    // TODO: Factor in masks or gloves here! 
                    if(serverIsSick && Math.random() < .1){
                        customerIsSick = true; // You spread it!
                        youInfected++;
                    }

                    if(customerIsSick){
                        sickCustomers++;
                        if(Math.random() < .1){
                            server.status = Health(server.status, -1);
                        }
                    }

                    // if the employee was sick they might make the customer sick
                    // if customer was sick they might make the employee sick

                    // the employee's mood affects sale amount
                    let moodModifier = 1;
                    if(server.mood == "Good"){ moodModifier = 1.15; }
                    if(server.mood == "Bad"){ moodModifier = .8; }

                    sales += Randomize(dayTicket[date.getDay()] * moodModifier * sickModifier, .15);
                }

                // update your health if you got sick
                let yourNewStatus = yourStatus;
                if(youWorked){
                    yourNewStatus = availableEmployees[0].status;
                }

                if (busyEvent || slowEvent) {
                    AddLog(`You made $${sales}.`);
                }

                //console.log("sick customers", sickCustomers)
                if (sickCustomers == 0) {
                    // small chance the store gets dirty
                    if (Math.random() < .05) {
                        newCleanliness = Clean(newCleanliness, -1);
                    }
                }
                else if (sickCustomers < 5) {
                    //alert("sick customer!");
                    // small chance the store gets dirty
                    if (Math.random() < .5) {
                        newCleanliness = Clean(newCleanliness, -1);
                    }
                }
                else if (sickCustomers < 20) {
                    // small chance the store gets dirty
                    if (Math.random() < .5) {
                        newCleanliness = Clean(newCleanliness, -1);
                    }
                    else if (Math.random() < .5) {
                        newCleanliness = Clean(newCleanliness, -2);
                    }
                }
                else if (sickCustomers > 40) {
                    // small chance the store gets dirty
                    if (Math.random() < .5) {
                        newCleanliness = Clean(newCleanliness, -2);
                    }
                    else if (Math.random() < .5) {
                        newCleanliness = Clean(newCleanliness, -3);
                    }
                }

                // employee health
                const newEmployees = employees.map(e => {
                    if (e.status == "Deceased") { return e; }

                    // handle mood
                    const originalMood = e.mood;
                    if(payQ =="Paid Sick Leave"){
                        if(Math.random() < .25){
                            e.mood = Mood(e.mood, 1);
                        }
                    }
                    else if(payQ =="Overtime"){
                        if(Math.random() < .1){
                            e.mood = Mood(e.mood, 1);
                        }
                        else if(Math.random() < .05){
                            e.mood = Mood(e.mood, -1);
                        }
                    }
                    else if(payQ =="Minimum Wage"){
                        if(Math.random() < .08){
                            e.mood = Mood(e.mood, 1);
                        }
                        else if(Math.random() < .1){
                            e.mood = Mood(e.mood, -1);
                        }
                    }

                    if(e.mood != originalMood){
                        if(e.mood == "Bad"){
                            // still pretty noisy!
                            //if(Math.random() < .3){
                                AddLog(`${e.name} is upset about their pay.`, {color: "brown"});
                            //}
                        }
                        if(e.mood == "Good"){
                            // Kind of noisy: AddLog(`${e.name} is happy with their pay.`);
                        }
                    }

                    //handle sick chance & PTO
                    const originalHealth = e.status;
                    if(payQ == "Paid Sick Leave" && HealthMap[e.status] >= HealthMap["Sick"]){
                        // employee is sick and so is not at work
                        // chance to recover, but it could still get worse
                        if(Math.random() < .1){
                            e.status = Health(e.status, 1);
                        }
                        else if(Math.random() <.05){
                            e.status = Health(e.status, -1);
                        }
                    }
                    else {
                        // TODO Make this not terrible!
                        var cVal = CleanMap[cleanliness];
                        var hVal = HealthMap[e.status];
                        var combo = (sickCustomers + 1 / transactions) * Math.pow(cVal + 1, .6) //* Math.pow(hVal+1, .5) / HourMap[hourQ];
                        const chance = Math.pow(Math.random(), 1 / combo);
                        //console.log("chance (sick > .9, heal < .1)", chance, combo);
                        if (Math.pow(Math.random(), 1 / combo) > .9) {
                            e.status = Health(e.status, -1);
                            //AddLog(`${e.name} got ${e.status}!`, { color: "red" });
                        }
                        else if (Math.pow(Math.random(), 1 / combo) < .1 && e.status != "Good") {
                            e.status = Health(e.status, 1);
                            //AddLog(`${e.name} healed to ${e.status}!`, { color: "green" });
                        }
                    }

                    if(e.status != originalHealth){
                        // Health has gotten worse
                        if(HealthMap[e.status] > HealthMap[originalHealth]){
                            if(e.status == "Sick"){
                                AddLog(`${e.name} is sick.`);
                            }
                            if(e.status == "Coronavirus"){
                                AddLog(`${e.name} has Coronavirus.`, {color: "red"});
                            }
                            if(e.status == "Severe Coronavirus"){
                                AddLog(`${e.name} is severely ill from the Coronavirus.`, {color: "red"});
                            }
                            if(e.status == "Deceased"){
                                AddLog(`${e.name} has died from the Coronavirus.`, {color: "red"});
                            }
                        }
                    }

                    return e;
                });

                // for display only... TODO: make the customer display not terrible
                customers = transactions / 6;

                // do costs like employees and stuff
                const employeeWage = PayMap[payQ] ?? 15;
                const hours = HourMap[hourQ] ?? 8;
                const cost = hours * employeeWage * 5; //5 employees

                // RENT
                let rentPayment = 0;
                const costperfoot = 2.33;
                const sqfoot = 2500;
                if (date.getDate() == 1) {
                    rentPayment = costperfoot * sqfoot;
                    //console.log("RENT!", rentPayment);
                }

                // Utilities
                let utiltiiesPayment = 0;
                const electricityPerFoot = 2.9 / 12;
                const gasPerfoot = .85 / 12;
                if (date.getDate() == 1) {
                    utiltiiesPayment = sqfoot * (gasPerfoot + electricityPerFoot) + 150;
                    //console.log("utilities!", utiltiiesPayment);
                }

                // DEBT
                let debtPayment = 0;
                let debtPrinciple = 0;
                const monthlyInterest = .007;
                if (date.getDate() == 1) {
                    debtPayment = debt * monthlyInterest;
                    debtPrinciple = debt / 120;
                    //console.log("DEBT!", debtPayment);
                }

                let monthylpayments = rentPayment + utiltiiesPayment + debtPayment;

                //TODO PURCHASE FOOD as supplies! compare BULK prices vs spoilage and stuff
                // for now lets say ~30% of the sale is food cost
                let foodCost = Math.round(sales * .2);

                //console.log("Wages", payQ, hourQ, `$${cost}`);
                const profit = sales - cost - foodCost;
                //console.log("Profit", `$${profit}`, sales, cost, foodCost);

                month += profit;
                if (date.getDate() == 1) {
                    debtPayment = debt * monthlyInterest;

                    AddLog(`${date.toDateString()}`, { marginTop: 8 });
                    AddLog(`You made $${month}.00 in revenue this month.`);
                    AddLog(`Rent: $${rentPayment}`);
                    AddLog(`Utilities: $${utiltiiesPayment}`);
                    AddLog(`Interest Payments: $${debtPayment + debtPrinciple}`);
                    AddLog(`Net: $${month - monthylpayments}`);

                    month = 0;
                }

                // increment virus
                // 10% seems about reasonable
                // slightly slow at first, slightly fast later
                // we can adjust this as the town either imposes quarantine or not
                let growthRate = .1;
                const FestivalGrowth = .3;
                const NormalGrowth = .15;
                const StayHomeGrowth = .125;
                const ShelterGrowth = .05;
                const ForcedQuarantineGrowth = .012;
                switch (infectRate) {
                    case "Festival":
                        growthRate = FestivalGrowth;
                        break;
                    case "Normal":
                        growthRate = NormalGrowth;
                        break;
                    case "Stay at Home":
                        growthRate = StayHomeGrowth;
                        break;
                    case "Shelter in Place":
                        growthRate = ShelterGrowth;
                        break;
                    case "Forced Quarantine":
                        growthRate = ForcedQuarantineGrowth;
                        break;
                }

                const deaths = Math.round((infected * .007 * Math.random()) + Math.random());
                const recoveries = Math.round((infected / 21) * Math.random());

                const increase = Math.min(uninfected, Math.round((infected * growthRate) + (Math.random() * 2)));
                //console.log("infections", increase, infected + increase);

                let newInfectRate = infectRate
                if (increase > 1000) {
                    // chance to go to other stages
                    if (growthRate > ShelterGrowth && Math.random() < .1) {
                        console.log("going to shelter in place!")
                        newInfectRate = "Shelter in Place";
                    }
                    else if (Math.random() < .01) {
                        console.log("going to forced quarantine!")
                        newInfectRate = "Forced Quarantine";
                    }
                }
                else if (increase > 100) {
                    // chance to go to other stages
                    if (growthRate > StayHomeGrowth && Math.random() < .1) {
                        console.log("going to stay at home!")
                        newInfectRate = "Stay at Home";
                    }
                    else if (Math.random() < .01) {
                        console.log("going to shelter in place!")
                        newInfectRate = "Shelter in Place";
                    }
                }
                else if (increase > 10) {
                    // chance to go to other stages
                    if (growthRate > StayHomeGrowth && Math.random() < .05) {
                        console.log("going to stay at home!")
                        newInfectRate = "Stay at Home";
                    }
                }
                else {
                    if (growthRate < NormalGrowth && Math.random() < .1) {

                        console.log("going to normal!")
                        newInfectRate = "Normal";
                    }
                }

                const newInfected = infected + increase - (recoveries + deaths);
                infectionGraph.push(newInfected);
                setGame({
                    ...game,
                    date: newDate,
                    uninfected: uninfected - (increase + youInfected),
                    recovered: recovered + recoveries,
                    infected: newInfected + youInfected,
                    deceased: deceased + deaths,
                    infectRate: newInfectRate,

                    money: money + (sales - cost) - (rentPayment + debtPayment + foodCost),
                    debt: debt - debtPrinciple,

                    cleanliness: newCleanliness,
                    employees: newEmployees,
                    yourStatus: yourNewStatus,
                });
            }
        }, isDev ? 500 : 4000);
    }, [paused, game])

    let centerMenu = <StoreDisplay paused={paused} customers={customers} height={220} width={280} />;
    switch (view) {
        case "Pay":
            centerMenu = <CenterMenu<PayQuality>
                setValue={setPayQ}
                title="How much do you want to pay your employees?"
                items={[
                    { name: "Paid Sick Leave", image: PayGreat },
                    { name: "Overtime", image: PayOk },
                    { name: "Minimum Wage", image: PayBad },
                ]}
            />;
            break;
        case "Hours":
            centerMenu = <CenterMenu<HourQuality>
                setValue={setHourQ}
                title="How long should your employees work each day?"
                items={[
                    { name: "Short Shifts", image: ShortShift },
                    { name: "Normal Shifts", image: RegularShift },
                    { name: "Grueling shifts", image: LongShift },
                ]}
            />;
            break;
        case "Cleaning":
            centerMenu = <CleaningView
                paperTowels={paperTowels}
                cleaningSprays={cleaningSprays}
                close={(score, sprays, towels) => {
                    const newGame = { ...game, cleaningSprays: sprays, paperTowels: towels };
                    if (score > .9) {
                        AddLog("You did a great job cleaning! The store looks much better.", { color: "blue" });
                        setGame({ ...newGame, cleanliness: Clean(cleanliness, 3) });
                    }
                    else if (score > .75) {
                        AddLog("You did a good job cleaning. The store looks better.", { color: "blue" });
                        setGame({ ...newGame, cleanliness: Clean(cleanliness, 2) });
                    }
                    else if (score > .5) {
                        AddLog("You did an OK job cleaning. The store is slightly cleaner.", { color: "blue" });
                        setGame({ ...newGame, cleanliness: Clean(cleanliness, 1) });
                    }
                    else if (score > .25) {
                        AddLog("You did a poor job cleaning. The store doesn't look much cleaner.", { color: "blue" });
                        if (Math.random() < .5) { setGame({ ...newGame, cleanliness: Clean(cleanliness, 1) }); } else {
                            setGame(newGame);
                        }
                    }
                    else if (score > 0) {
                        AddLog("You did a terrible job cleaning. The store looks the same as it did before.", { color: "blue" });
                        if (Math.random() < .1) { setGame({ ...newGame, cleanliness: Clean(cleanliness, 1) }); }
                        else {
                            setGame(newGame);
                        }
                    }
                    else {
                        setGame(newGame);
                    }

                    ResetView();
                }} />;
            break;
        case "Supplies":
            centerMenu = <SupplyStore
                money={money}
                paperTowels={paperTowels}
                cleaningSpray={cleaningSprays}
                onCancel={ResetView}
                onBuy={(towels, sprays, cost) => {
                    setGame({ ...game, paperTowels: paperTowels + towels, cleaningSprays: cleaningSprays + sprays, money: money - cost });
                    ResetView();
                }}
            />;
            break;
        case "Chart":
            centerMenu = <BarDisplay values={infectionGraph} />;
            break;
        case "Bank":
            const paymentAmount = Math.min(1000, debt);
            const borrowAmount = 10000;
            centerMenu = <div style={{ padding: 5 }}>
                <div style={{ textAlign: "left" }}>Welcome to the bank</div>
                <div style={{ textAlign: "left" }}>You owe ${debt}</div>
                <div>
                    <button disabled={debt > 500000} style={{ ...buttonStyle, width: 150 }} onClick={() => setGame({ ...game, debt: debt + borrowAmount, money: money + borrowAmount })}>Borrow ${borrowAmount}</button>
                    <button style={{ ...buttonStyle, width: 150 }} onClick={() => setGame({ ...game, debt: debt - Math.round(paymentAmount), money: money - paymentAmount })} disabled={debt <= 0 || money < paymentAmount}>Pay ${paymentAmount}</button>
                </div>
            </div>;
            break;
        case "Status":
            centerMenu = <div style={{ padding: 5, ...bodyText, margin: "0 12px" }}>
                <div style={{}}>Status</div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
                    <div style={{ textAlign: "left", width: "40", marginRight: 10 }}>
                        <div style={{ marginBottom: 12 }}>Current Supplies:</div>
                        <div style={{ marginBottom: 7 }}>{paperTowels} paper towels</div>
                        <div style={{ marginBottom: 7 }}>{cleaningSprays} sprays of disinfectant</div>
                        <div style={{ marginBottom: 7 }}>5 masks</div>
                        <div style={{ marginBottom: 7 }}>1 set of gloves</div>
                        <div style={{ marginBottom: 7 }}>100 pounds of food</div>
                    </div>
                    <div style={{ textAlign: "right", width: "50%" }}>
                        <div style={{ marginBottom: 12 }}>Current Health:</div>
                        <div style={{ marginBottom: 5 }}>{yourName} - <span style={{ display: "inline-block", width: 45, textAlign: "center" }}>{yourStatus}</span></div>
                        {employees.map((e, i) => <div key={i} style={{ marginBottom: 5 }}>{e.name} - <span style={{ display: "inline-block", width: 45, textAlign: "center" }}>
                            {HealthMap[e.status] < HealthMap["Sick"] ? (e.mood == "Bad" ? "Angry" : e.status) : e.status}
                            </span></div>)}
                    </div>
                </div>
                <div style={{ marginTop: 16 }}>Business: Restaurant </div>
            </div>;
            break;
        case "News":
            centerMenu = <img width="100%" src={Tweet} />;
            break;
    }

    let avgHealth = 0;
    employees.forEach(e => avgHealth += HealthMap[e.status]);
    avgHealth /= employees.length;
    const avgStatus = ReverseHealthMap[Math.round(avgHealth)];

    return <div style={{ position: "relative", display: "flex", flexDirection: "row", alignItems: "stretch", backgroundColor: ColorBrown, height: "100%", padding: margin, border: MiniBorder }}>
        <VerticalMenu setView={setView} items={[
            { image: Buy, name: "Store" },
            { image: Help, name: "Guide" },
            { image: Status, name: "Status" },
            { image: Pay, name: "Pay" },
            { image: Graph, name: "Chart" },
        ]} />
        <div style={{ width: 290, display: "flex", flexDirection: "column" }}>
            <div style={{ ...basicBoxStyle, height: 240 }}>
                {centerMenu}
            </div>
            {/* TODO: Add Log here! */}
            <LogViewer />
        </div>

        <div style={{ display: "flex", flexDirection: "column", width: 140 }}>
            <div style={{ ...basicBoxStyle, flex: "auto", textAlign: "center" }}>
                <div style={{ ...headerStyle }}>Conditions</div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{date.toDateString()}</div>

                {isDev ? null : <img src={Placeholder} />}

                <div style={{ ...headerStyle }}>Virus</div>
                <div style={{ ...bodyStyle }}>
                    <BodyRow left="Status:" right={infectRate} />
                    <BodyRow left="Infected:" right={infected} />
                    <BodyRow left="Deceased:" right={deceased} />
                    {isDev ? <BodyRow left="Recovered:" right={recovered} /> : null}
                    {isDev ? <BodyRow left="Uninfected:" right={uninfected} /> : null}
                </div>

                <div style={{ ...headerStyle, marginTop: 10 }}>Store</div>
                <div style={{ ...bodyStyle }}>
                    <BodyRow left="Money:" right={`$${money}`} />
                    <BodyRow left="Pay:" right={payQ} />
                    <BodyRow left="Cleanliness:" right={cleanliness} />
                    <BodyRow left="Hours:" right={hourQ} />
                    <BodyRow left="Supplies:" right={cleaningSprays > 60 && paperTowels > 10 ? "Good" : <div style={{ color: "red" }}>Low</div>} />
                    <BodyRow left="Health:" right={avgStatus} />
                    <br />
                    <BodyRow left="Store:" right={paused ? <span style={{ color: "red" }}>Closed</span> : "Open"} />
                </div>
            </div>
            <div style={{ ...basicBoxStyle }}>
                <div style={{ padding: 5, margin: 6 }}>
                    <span style={buttonWrapperStyle}><button style={buttonStyle} onClick={paused ? UnPause : Pause}>{paused ? "Continue" : "Time out"}</button></span>
                </div>
                <div style={{ padding: 5, margin: 6 }}>
                    <span style={buttonWrapperStyle}><button style={buttonStyle} disabled>Options</button></span>
                </div>
            </div>
        </div>

        <VerticalMenu setView={setView} items={[
            { image: Supplies, name: "Supplies" },
            { image: News, name: "News" },
            { image: Hours, name: "Hours" },
            { image: Finances, name: "Bank" },
            { image: Cleaning, name: "Cleaning" },
        ]} />
    </div>;
}

export const LogViewer: React.FC = props => {
    let [logs, setLogs] = React.useState(Logs);
    React.useEffect(() => {
        setInterval(() => {
            if (Logs.length > logs.length) {
                logs = Logs;
                setLogs([...Logs]);
            }
        }, 500);
    }, [])

    return <div style={{ overflowY: "scroll", ...basicBoxStyle, flex: "auto" }}>
        {logs.map((log, i) =>
            <div key={i}
                style={{ textAlign: "left", fontSize: 12, fontWeight: 700, ...log.style }}
            >{log.message}
            </div>)}
    </div>;
}

export const BodyRow: React.FC<{ left: React.ReactNode, right: React.ReactNode }> = props => {
    return <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>{props.left}</div>
        <div>{props.right}</div>
    </div>;
}

export const MenuCircle: React.FC<{ image?: string }> = props => {
    return <div className="menuCircle" style={{ width: 30, height: 40, borderRadius: 80, backgroundColor: "white", border: `5px outset ${ColorBrown}`, boxShadow: "5px 1px 0 black", cursor: "pointer" }}>
        {props.image ? <img src={props.image} style={{ marginTop: 5 }} /> : null}
    </div>;
}

export const MenuItem: React.FC<{ name?: View, image?: string, onClick?: () => void }> = props => {
    return <div style={{ margin: 9, textAlign: "center", alignItems: "center", display: "flex", flexDirection: "column", cursor: "pointer" }} onClick={props.onClick}>
        <MenuCircle image={props.image} />
        {props.name ?
            <div>
                <img src={Banner} />
                {props.name ? <div style={{ marginTop: -20, fontSize: 12 }}>{props.name}</div> : null}
            </div>
            : null}
    </div>;
}

export const VerticalMenu: React.FC<{ items?: { name: View, image?: string }[], setView: (newView: View) => void }> = props => {
    return <div style={{ ...basicBoxStyle, width: 80, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {props.items?.map((item, index) => <MenuItem key={index} {...item} onClick={() => { props.setView(item.name) }} />)}
        {/* TODO: Add menu items here! */}
    </div>;
}

export function CenterMenuItem<T>(props: { name: T, image?: string, onClick?: () => void }) {
    return <div style={{ margin: 9, textAlign: "center", alignItems: "center", display: "flex", flexDirection: "row", cursor: "pointer" }} onClick={props.onClick}>
        <MenuCircle image={props.image} />
        {props.name ?
            <div>
                {props.name ? <div style={{ margin: "6px 12px" }}>{props.name}</div> : null}
            </div>
            : null}
    </div>;
}

export function CenterMenu<T>(props: { title: string, items?: { name: T, image?: string }[], setValue: (newValue: T) => void }) {
    return <div style={{ width: 280 }}>
        <div style={{ textAlign: "left", margin: "0 10px", fontSize: 14 }}>{props.title}</div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            {props.items?.map(item => <CenterMenuItem {...item} onClick={() => { props.setValue(item.name) }} />)}
        </div>
    </div>;
}