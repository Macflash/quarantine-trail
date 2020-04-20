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
import { isDev, yourName as StartingName, businessName as StartingBusinessName, Logs, AddLog, tickSpeed, OptionsMenu, startingGame } from '../App';

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

export type View = "Store" | "Chart" | "Guide" | "Status" | "Pay" | "Bank" | "Supplies" | "News" | "Cleaning" | "Pace" | "Hunt" | "OptionsMenu";

export type PayQuality = "Paid Sick Leave" | "Overtime" | "Minimum Wage";
const PayMap: Lookup<PayQuality> = {
    "Minimum Wage": 14,
    "Overtime": 18,
    "Paid Sick Leave": 22,
};

export type HourQuality = "Relaxed Pace" | "Normal Pace" | "Grueling Pace";
const HourMap: Lookup<HourQuality> = {
    "Relaxed Pace": 12,
    "Normal Pace": 9,
    "Grueling Pace": 7,
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

export const HealthScoreMap: { [P in Health]: number } = {
    "Good": 10000,
    "Fair": 5000,
    "Poor": 1000,
    "Sick": -1000,
    "Coronavirus": -5000,
    "Severe Coronavirus": -10000,
    "Deceased": -50000,
}

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

export const MoodScoreMap: { [P in Mood]: number } = {
    "Good": 500,
    "Ok": 200,
    "Bad": -100,
}

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


export const CleanColorMap: { [P in Cleanliness]: string | undefined } = {
    "Pristine": "blue",
    "Fair": undefined,
    "Poor": undefined,
    "Dirty": "darkred",
    "Filthy": "darkred",
    "Dangerous!": "red",
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
    masks: number,
    gloves: number,
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

// TODO: all of this needs to be in the SAVED game....
var month = 0;
var customers = 0;
var infectionGraph = [0];
var deceasedGraph = [0];
var moneyGraph = [1600];

var totalYouInfected = 0;

const MaxDebt = 100000;

export const PrintMoney = (money: number): string => {
    return `$${Number(Math.round(money)).toLocaleString()}.00`
}

const startDate = new Date("02/02/2020");

var reallyPaused = false;
var gameinterval: any | null = null;
var realGame: Game | null = null;

export const Layout: React.FC<{ gameOver?: Callback }> = props => {
    const [paused, setPaused] = React.useState(false);
    const Pause = React.useCallback(() => { reallyPaused = true; clearInterval(gameinterval); gameinterval = null; setPaused(true); }, [setPaused]);

    const [view, setView] = useStateAndView<View>("Store", Pause);
    const ResetView = React.useCallback(() => setView("Store"), [setView]);

    const UnPause = React.useCallback(() => { ResetView(); reallyPaused = false; setPaused(false); }, [setPaused, ResetView]);

    const [payQ, setPayQ] = useStateAndView<PayQuality>("Overtime", ResetView, val => AddLog(`You decided to change the the pay to ${val}.`));
    const [hourQ, setHourQ] = useStateAndView<HourQuality>("Normal Pace", ResetView, val => AddLog(`You decided to change the the hours to ${val}.`));

    const [game, setGame] = useStateAndView<Game>(startingGame ? { ...startingGame, date: new Date(startingGame.date) } : {
        infectRate: "Normal",

        date: startDate,
        uninfected: 2000000,
        infected: 1,
        deceased: 0,
        recovered: 0,

        money: 1600,
        debt: 0,
        yourName: StartingName,
        yourStatus: "Good",
        businessName: StartingBusinessName,
        employees: StartEmployees,

        cleanliness: "Fair",
        paperTowels: isDev ? 100 : 10,
        cleaningSprays: isDev ? 1000 : 25,
        masks: 10,
        gloves: 50,
    }, undefined, gameToSave => realGame = gameToSave);

    React.useEffect(() => {
        if (gameinterval && !reallyPaused) {
            console.log("already running");
            return;
        }
        // advance the days!
        console.log("starting the loop!");
        gameinterval = setInterval(() => {
            const { infectRate, date, infected, deceased, uninfected, recovered, money, debt, employees, yourName, yourStatus, businessName, cleanliness, paperTowels, cleaningSprays, masks, gloves } = realGame ?? game;
            if (reallyPaused) { clearInterval(gameinterval); return; }
            if (debt <= 0 && infected == 0 && date > new Date("04/04/2020")) {
                props.gameOver?.();
                let score = 0;
                score += money;
                let empHp = 0;
                employees.forEach(e => {
                    empHp += HealthScoreMap[e.status];
                    empHp += e.status == "Deceased" ? 0 : MoodScoreMap[e.mood];
                });

                score += empHp;
                score -= totalYouInfected * 500;
                score *= Number(startDate) / Number(date);

                alert(`You win! 
                You survived the pandemic and stayed in business! 
                You scored ${Math.round(score)}pts!
                Money: $${money} -> ${money}pts
                Employee Health: ${empHp} pts
                Customers you got sick: ${totalYouInfected} -> -${totalYouInfected * 500}pts
                `);
            }
            if (!paused) {
                if (money < 0 && debt < MaxDebt) {
                    Pause();
                    alert("Oh no, you are out of money! Better go to the bank!");
                    //props.gameOver?.();
                }
                else if (money < 0) {
                    props.gameOver?.();
                    alert("Oh no, you went bankrupt!");
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

                let newMasks = masks;
                let newGloves = gloves;
                let usingMasks = false;
                if (masks > employees.length) {
                    usingMasks = true;
                    newMasks -= employees.length;
                }

                //UPDATE cleanliness
                // for each customer check if they were sick
                let youInfected = 0;
                let newCleanliness = cleanliness;
                let sickCustomers = 0;

                let sales = 0;
                let availableEmployees = employees.filter(e => payQ !== "Paid Sick Leave" || HealthMap[e.status] < HealthMap["Sick"]);
                let youWorked = false;
                if (availableEmployees.length == 0) {
                    //you gotta do it!
                    youWorked = true;
                    availableEmployees = [{ name: yourName, status: yourStatus, mood: "Ok" }];
                }
                for (var i = 0; i < transactions; i++) {
                    // pick a random employee to have them interact with!
                    // if there is PTO then only use NOT sick employees
                    const server = PickRandom(availableEmployees);
                    const serverIsSick = HealthMap[server.status] > HealthMap["Sick"];

                    let sickModifier = 1;
                    if (serverIsSick) {
                        sickModifier = .9;
                    }

                    var customerIsSick = Math.random() < (2 * infected / (uninfected + recovered + infected));
                    if (Math.random() < .5) {
                        customerIsSick = customerIsSick || Math.random() < (2 * infected / (uninfected + recovered + infected));
                    }

                    let spreadChance = .1;
                    if (cleanliness == "Dangerous!") {
                        spreadChance = .7;
                    }
                    else if (cleanliness == "Filthy") {
                        spreadChance = .5;
                    }
                    else if (cleanliness == "Dirty") {
                        spreadChance = .25;
                    }
                    else if (cleanliness == "Poor") {
                        spreadChance = .15;
                    }
                    else if (cleanliness == "Fair") {
                        spreadChance = .1;
                    }
                    else if (cleanliness == "Pristine") {
                        spreadChance = .09;
                    }

                    if (usingMasks) {
                        spreadChance /= 2;
                    }

                    if (newGloves > 0) {
                        spreadChance /= 2;
                        if (Math.random() < .3) {
                            newGloves--;
                        }
                    }

                    if (serverIsSick && Math.random() < spreadChance) {
                        customerIsSick = true; // You spread it!
                        youInfected++;
                    }

                    if (customerIsSick) {
                        sickCustomers++;
                        if (Math.random() < spreadChance) {
                            if (HealthMap[server.status] < HealthMap["Coronavirus"]) {
                                console.log(`A sick customer made ${server.name} sick!`);
                                server.status = "Coronavirus";
                            }
                        }
                    }

                    // if the employee was sick they might make the customer sick
                    // if customer was sick they might make the employee sick

                    // the employee's mood affects sale amount
                    let moodModifier = 1;
                    if (server.mood == "Good") { moodModifier = 1.15; }
                    if (server.mood == "Bad") { moodModifier = .8; }

                    sales += Randomize(dayTicket[date.getDay()] * moodModifier * sickModifier, .15);
                }

                // update your health if you got sick
                let yourNewStatus = yourStatus;
                if (youWorked) {
                    yourNewStatus = availableEmployees[0].status;
                }

                if (busyEvent || slowEvent) {
                    AddLog(`You made ${PrintMoney(sales)}.`);
                }

                if (sickCustomers > 0) { console.log("SICK customerS!", sickCustomers) }

                if (sickCustomers == 0) {
                    // small chance the store gets dirty
                    if (Math.random() < .05) {
                        newCleanliness = Clean(newCleanliness, -1);
                    }
                }
                else if (sickCustomers < 5) {
                    // small chance the store gets dirty
                    if (Math.random() < .075) {
                        newCleanliness = Clean(newCleanliness, -1);
                    }
                }
                else if (sickCustomers < 20) {
                    // small chance the store gets dirty
                    if (Math.random() < .1) {
                        newCleanliness = Clean(newCleanliness, -1);
                    }
                }
                else if (sickCustomers > 40) {
                    // small chance the store gets dirty
                    if (Math.random() < .15) {
                        newCleanliness = Clean(newCleanliness, -1);
                    }
                }

                // employee health
                const newEmployees = employees.map(e => {
                    if (e.status == "Deceased") { return e; }

                    // handle mood
                    // TODO: Handle shifts!
                    const originalMood = e.mood;
                    if (payQ == "Paid Sick Leave") {
                        if (Math.random() < .25) {
                            e.mood = Mood(e.mood, 1);
                        }
                    }
                    else if (payQ == "Overtime") {
                        if (Math.random() < .1) {
                            e.mood = Mood(e.mood, 1);
                        }
                        else if (Math.random() < .05) {
                            e.mood = Mood(e.mood, -1);
                        }
                    }
                    else if (payQ == "Minimum Wage") {
                        if (Math.random() < .08) {
                            e.mood = Mood(e.mood, 1);
                        }
                        else if (Math.random() < .1) {
                            e.mood = Mood(e.mood, -1);
                        }
                    }

                    if (e.mood != originalMood) {
                        if (e.mood == "Bad") {
                            // still pretty noisy!
                            AddLog(`${e.name} is upset about their pay.`, { color: "brown" });
                        }
                        if (e.mood == "Good") {
                            // Kind of noisy: AddLog(`${e.name} is happy with their pay.`);
                        }
                    }

                    //handle sick chance & PTO
                    const originalHealth = e.status;
                    if (payQ == "Paid Sick Leave" && HealthMap[e.status] >= HealthMap["Sick"]) {
                        // employee is sick and so is not at work
                        // chance to recover, but it could still get worse
                        if (Math.random() < .1) {
                            e.status = Health(e.status, 1);
                        }
                        else if (Math.random() < .05) {
                            e.status = Health(e.status, -1);
                        }
                    }
                    else {
                        // TODO Make this not terrible!
                        var ppeMultiplier = 1;
                        if (usingMasks) { ppeMultiplier *= 1.5 }
                        if (newGloves > 0) { ppeMultiplier *= .125 }
                        var cVal = CleanMap[cleanliness];
                        var combo = Math.sqrt(((sickCustomers / ppeMultiplier) + 1) / transactions) * Math.pow(cVal + 1, .6);
                        const chance = Math.pow(Math.random(), 1 / combo);

                        let SickChance = .9;
                        let HealChance = .1;

                        if (hourQ == "Relaxed Pace") {
                            // better chances for health
                            SickChance = .95;
                            HealChance = .12;
                        }
                        else if (hourQ == "Grueling Pace") {
                            // worse chances for health
                            SickChance = .85;
                            HealChance = .05;
                        }

                        if (chance > SickChance) {
                            //console.log(`${e.name} sicker -`);
                            e.status = Health(e.status, -1);
                        }
                        else if (chance < HealChance) {
                            //console.log(`${e.name} better +`);
                            e.status = Health(e.status, 1);
                        }
                    }

                    if (e.status != originalHealth) {
                        // Health has gotten worse
                        if (HealthMap[e.status] > HealthMap[originalHealth]) {
                            if (e.status == "Sick") {
                                AddLog(`${e.name} is sick.`, { color: "darkred" });
                            }
                            if (e.status == "Coronavirus") {
                                AddLog(`${e.name} has Coronavirus.`, { color: "red" });
                            }
                            if (e.status == "Severe Coronavirus") {
                                AddLog(`${e.name} is severely ill from the Coronavirus.`, { color: "red" });
                            }
                            if (e.status == "Deceased") {
                                AddLog(`${e.name} has died from the Coronavirus.`, { color: "red" });
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
                }

                // Utilities
                let utiltiiesPayment = 0;
                const electricityPerFoot = 2.9 / 12;
                const gasPerfoot = .85 / 12;
                if (date.getDate() == 1) {
                    utiltiiesPayment = sqfoot * (gasPerfoot + electricityPerFoot) + 150;
                }

                // DEBT
                let debtPayment = 0;
                let debtPrinciple = 0;
                const monthlyInterest = .007;
                if (date.getDate() == 1) {
                    debtPayment = debt * monthlyInterest;
                    debtPrinciple = debt / 120;
                }

                let monthylpayments = rentPayment + utiltiiesPayment + debtPayment;

                //TODO PURCHASE FOOD as supplies! compare BULK prices vs spoilage and stuff
                // for now lets say ~30% of the sale is food cost
                // this value made things hard in the game, so I set it to 20% instead lol
                let foodCost = Math.round(sales * .2);
                const profit = sales - cost - foodCost;

                month += profit;
                if (date.getDate() == 1) {
                    debtPayment = debt * monthlyInterest;

                    AddLog(`${date.toDateString()}`, { marginTop: 8 });
                    AddLog(`You made ${PrintMoney(month)} in revenue this month.`);
                    AddLog(`Rent: ${PrintMoney(rentPayment)}`);
                    AddLog(`Utilities: ${PrintMoney(utiltiiesPayment)}`);
                    AddLog(`Interest Payments: ${PrintMoney(debtPayment + debtPrinciple)}`);
                    AddLog(`Net: ${PrintMoney(month - monthylpayments)}`);

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
                deceasedGraph.push(deceased + deaths);
                moneyGraph.push(money);
                totalYouInfected += youInfected;
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

                    masks: newMasks,
                    gloves: newGloves,
                });
            }
        }, isDev ? 500 : tickSpeed);
    }, [paused]);

    const { infectRate, date, infected, deceased, uninfected, recovered, money, debt, employees, yourName, yourStatus, businessName, cleanliness, paperTowels, cleaningSprays, masks, gloves } = realGame ?? game;

    if (employees.filter(e => e.status != "Deceased").length == 0) {
        alert("Game Over! All your employees died.");
        props.gameOver?.();
    }

    let centerMenu = <StoreDisplay paused={paused} customers={customers} height={220} width={280} />;
    switch (view) {
        case "OptionsMenu":
            centerMenu = <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
                <OptionsMenu onClick={ResetView} game={game} />
            </div>
            break;
        case "Pay":
            centerMenu = <CenterMenu<PayQuality>
                helpContent={<div style={{fontSize: 11}}>
                    <div>Paid Sick Leave - Pay is respectful and generous. Sick employees can stay home to recover.</div>
                    <br />
                    <br />
                    <div>Overtime - Pay is low, but adequate.</div>
                    <br />
                    <br />
                    <div>Minimum Wage - Pay is very low. Everyone can barely make ends meet and their performance on the job may suffer.</div>
                </div>}
                setValue={setPayQ}
                title="How much do you want to pay your employees?"
                items={[
                    { name: "Paid Sick Leave", image: PayGreat },
                    { name: "Overtime", image: PayOk },
                    { name: "Minimum Wage", image: PayBad },
                ]}
            />;
            break;
        case "Pace":
            centerMenu = <CenterMenu<HourQuality>
                helpContent={<div style={{fontSize: 11}}>
                    <div>Relaxed Pace - Your employees work 8 hours a day. They can take many breaks and rarely get tired.</div>
                    <br />
                    <div>Normal Pace - Your employees work 12 hours a day, starting at sunrise and stopping at sunset. They stop to rest only when you allow it. They finish each day very tired.</div>
                    <br />
                    <div>Grueling Pace - Your employees work 16 hours a day, starting before dawn and going until dark. They rarely rest or see their families. They finish each day exhausted and their health suffers.</div>
                </div>}
                setValue={setHourQ}
                title="How long should your employees work each day?"
                items={[
                    { name: "Relaxed Pace", image: ShortShift },
                    { name: "Normal Pace", image: RegularShift },
                    { name: "Grueling Pace", image: LongShift },
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
                date={date}
                money={money}
                paperTowels={paperTowels}
                cleaningSpray={cleaningSprays}
                masks={masks}
                gloves={gloves}
                onCancel={ResetView}
                onBuy={(cost, towels, sprays, m, g) => {
                    setGame({
                        ...game,
                        paperTowels: paperTowels + towels,
                        cleaningSprays: cleaningSprays + sprays,
                        masks: masks + m,
                        gloves: gloves + g,
                        money: money - cost,
                    });
                    ResetView();
                }}
            />;
            break;
        case "Chart":
            centerMenu = <div>
                <div>Infection</div>
                <BarDisplay values={infectionGraph} fillColor="orange" />
                <div>Money</div>
                <BarDisplay values={moneyGraph} fillColor="green" />
            </div>;
            break;
        case "Bank":
            const paymentAmount = Math.min(1000, debt);
            const borrowAmount = 10000;
            centerMenu = <div style={{ textAlign: "left" }}>
                <div style={{ margin: 5 }}>
                    <div >Welcome to the bank</div>
                    <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 16 }}>You can borrow up to $100,000.00 dollars. Each month on the 1st of the month you will have to pay back a portion of your debt as well as interest.</div>
                    <div >You have {PrintMoney(money)}</div>
                    <div >You owe {PrintMoney(debt)}</div>
                </div>
                <div style={{ textAlign: "right", marginTop: 4 }}>
                    <button
                        disabled={debt > MaxDebt}
                        style={{ ...buttonStyle, border: MiniBorder, width: undefined, marginTop: 4, marginBottom: 4 }}
                        onClick={() => setGame({ ...game, debt: debt + (borrowAmount * 1.1), money: money + borrowAmount })}
                    >
                        Borrow {PrintMoney(borrowAmount)}
                    </button>
                    <button
                        style={{ ...buttonStyle, border: MiniBorder, width: undefined }}
                        onClick={() => setGame({ ...game, debt: debt - Math.round(paymentAmount), money: money - paymentAmount })}
                        disabled={debt <= 0 || money < paymentAmount}
                    >
                        Pay ${paymentAmount}
                    </button>

                </div>
            </div>;
            break;
        case "Guide":
            centerMenu = <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
                <div style={{ flex: "auto", textAlign: "left", position: "relative" }}>
                    <div style={{ width: 200, margin: 4, padding: 4, paddingBottom: 12, borderBottom: "2px solid black" }}>Coronavirus</div>
                    <div style={{ padding: 2, fontSize: 10, fontWeight: 700 }}>
                        Coronavirus (Covid-19) is a virus that affects the lungs. Originating from an unknown animal species in China, the virus quickly spread around the world.
                        The virus can be spread through the air or by touch, though it only lasts a few hours to a few days on a given surface.
                        People with the disease can be contagious before showing symptoms. Thorough cleaning using disinfecting spray and wipes can help clean surfaces.
                        Masks and gloves can help limit the spread between people and surfaces when used properly.
                    </div>
                    <div style={{ position: "absolute", bottom: 10, left: 0, right: 0, textAlign: "center" }}>
                        <button onClick={ResetView} style={{ cursor: "pointer", width: 75, backgroundColor: ColorYellow, borderRadius: 5, border: MiniBorder, fontWeight: 700 }}>OK</button>
                    </div>
                </div>
                <div style={{ flex: "none", backgroundColor: "black", height: "100%", overflow: "hidden" }}>
                    <div style={{ backgroundColor: "black", height: "100%", paddingLeft: 2, paddingTop: 2, borderLeft: `2px solid ${ColorYellow}` }}>
                        <div style={{ backgroundColor: "black", height: "100%", paddingLeft: 2, paddingTop: 2, borderLeft: `2px solid ${ColorYellow}` }}>
                            <div style={{ backgroundColor: "black", height: "100%", paddingLeft: 2, paddingTop: 2, borderLeft: `2px solid ${ColorYellow}` }}>
                                <div style={{ backgroundColor: "black", height: "100%", paddingLeft: 2, paddingTop: 2, borderLeft: `2px solid ${ColorYellow}` }}>
                                    <div style={{ backgroundColor: "black", height: "100%", paddingLeft: 2, paddingTop: 2, borderLeft: `2px solid ${ColorYellow}` }}>
                                        <div style={{ backgroundColor: "black", height: "100%", paddingLeft: 2, paddingTop: 2, borderLeft: `2px solid ${ColorYellow}` }}>
                                            <div style={{ backgroundColor: "black", height: "100%", paddingLeft: 2, paddingTop: 2, borderLeft: `2px solid ${ColorYellow}` }}>
                                                <div style={{ backgroundColor: "black", height: "100%", paddingLeft: 2, paddingTop: 2, borderLeft: `2px solid ${ColorYellow}` }}>
                                                    <div style={{ backgroundColor: "black", height: "100%", paddingLeft: 2, paddingTop: 2, borderLeft: `2px solid ${ColorYellow}` }}>
                                                        <div style={{ backgroundColor: "black", height: "100%", paddingLeft: 2, paddingTop: 2, borderLeft: `2px solid ${ColorYellow}` }}>
                                                            <div style={{ backgroundColor: "black", height: "100%", paddingLeft: 2, paddingTop: 2, borderLeft: `2px solid ${ColorYellow}` }}>
                                                                <div style={{ backgroundColor: "black", height: "100%", paddingLeft: 2, paddingTop: 2, borderLeft: `2px solid ${ColorYellow}` }}>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            break;
        case "Status":
            centerMenu = <div style={{ padding: 5, ...bodyText, margin: "0 12px" }}>
                <div style={{}}>Status</div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
                    <div style={{ textAlign: "left", width: "40", marginRight: 10 }}>
                        <div style={{ marginBottom: 12 }}>Current Supplies:</div>
                        <div style={{ marginBottom: 7 }}>{paperTowels} paper towels</div>
                        <div style={{ marginBottom: 7 }}>{cleaningSprays} sprays of disinfectant</div>
                        <div style={{ marginBottom: 7 }}>{masks} masks</div>
                        <div style={{ marginBottom: 7 }}>{gloves} set of gloves</div>
                    </div>
                    <div style={{ textAlign: "right", width: 160 }}>
                        <div style={{ marginBottom: 12 }}>Current Health:</div>
                        <div style={{ marginBottom: 5 }}>{yourName} - <span style={{ display: "inline-block", width: 55, textAlign: "center" }}>{yourStatus}</span></div>
                        {employees.map((e, i) => <div key={i} style={{ marginBottom: 5 }}><span style={{ display: "inline-block" }}>{e.name} - </span><span style={{ display: "inline-block", width: 55, textAlign: "center" }}>
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
    const avgStatus = ReverseHealthMap[Math.floor(avgHealth)];

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
                    <BodyRow left="Money:" right={PrintMoney(money)} />
                    <BodyRow left="Pay:" right={payQ} />
                    <BodyRow left="Pace:" right={hourQ} />
                    <BodyRow left="Cleanliness:" right={<div style={{ color: CleanColorMap[cleanliness] }}>{cleanliness}</div>} />
                    <BodyRow left="Supplies:" right={cleaningSprays > 60 && paperTowels > 10 ? "Good" && masks > employees.length * 3 && gloves > employees.length * 5 : <div style={{ color: "red" }}>Low</div>} />
                    <BodyRow left="Health:" right={<div style={{ textAlign: "right" }}>{avgStatus}</div>} />
                    <br />
                    <BodyRow left="Store:" right={paused ? <span style={{ color: "red" }}>Closed</span> : "Open"} />
                </div>
            </div>
            <div style={{ ...basicBoxStyle }}>
                <div style={{ padding: 5, margin: 6 }}>
                    <span style={buttonWrapperStyle}><button style={buttonStyle} onClick={paused ? UnPause : Pause}>{paused ? "Continue" : "Time out"}</button></span>
                </div>
                <div style={{ padding: 5, margin: 6 }}>
                    <span style={buttonWrapperStyle}><button style={buttonStyle} onClick={() => setView("OptionsMenu")}>Options</button></span>
                </div>
            </div>
        </div>

        <VerticalMenu setView={setView} items={[
            { image: Supplies, name: "Supplies" },
            { image: News, name: "News" },
            { image: Hours, name: "Pace" },
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
                var el = document.getElementById("logviewer");
                if (el) {
                    el!.scrollTop = el!.scrollHeight;
                }
            }
        }, 500);
    }, [])

    return <div id="logviewer" style={{ overflowY: "scroll", ...basicBoxStyle, flex: "auto" }}>
        <div style={{ display: "flex", flexDirection: "column-reverse" }}>
            {logs.map((log, i) =>
                <div key={i}
                    style={{ flex: "none", textAlign: "left", fontSize: 12, fontWeight: 700, ...log.style }}
                >{log.message}
                </div>)}
        </div>
    </div>;
}

export const BodyRow: React.FC<{ left: React.ReactNode, right: React.ReactNode }> = props => {
    return <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>{props.left}</div>
        <div>{props.right}</div>
    </div>;
}

export const MenuCircle: React.FC<{ image?: string, onClick?: Callback }> = props => {
    return <div className="menuCircle" onClick={props.onClick} style={{ width: 30, height: 40, borderRadius: 80, backgroundColor: "white", border: `5px outset ${ColorBrown}`, boxShadow: "5px 1px 0 black", cursor: "pointer" }}>
        {props.image ? <img onClick={props.onClick} src={props.image} style={{ marginTop: 5 }} /> : null}
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

export function CenterMenu<T>(props: { title: string, items?: { name: T, image?: string }[], setValue: (newValue: T) => void, helpContent?: React.ReactNode }) {
    const [viewingHelp, setViewHelp] = React.useState(false);

    if (viewingHelp && props.helpContent) {
        return <div style={{ ...bodyText, fontSize: 12, padding: "10px 2px", textAlign: "left", position: "relative", height: "100%" }}>
            {props.helpContent}
            <div style={{ position: "absolute", bottom: 30, left: 0, right: 0, textAlign: "center" }}>
                <span style={{ border: "3px solid black", padding: 3, borderRadius: 8 }}>
                    <button onClick={() => setViewHelp(false)} style={{ cursor: "pointer", width: 75, backgroundColor: ColorYellow, borderRadius: 5, border: MiniBorder, fontWeight: 700 }}>OK</button>
                </span>
            </div>
        </div>
    }

    return <div style={{ width: 280, position: "relative" }}>
        <div style={{ textAlign: "left", margin: "0 10px", fontSize: 14 }}>{props.title}</div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            {props.items?.map((item, index) => <CenterMenuItem key={index} {...item} onClick={() => { props.setValue(item.name) }} />)}
        </div>

        {props.helpContent
            ? <div style={{ position: "absolute", top: 0, bottom: 0, right: 16, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <MenuCircle image={Help} onClick={() => setViewHelp(true)} />
            </div>
            : null}
    </div>;
}