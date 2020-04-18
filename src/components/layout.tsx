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

export const ColorYellow = "rgb(255,247,138)";
export const ColorOrange = "rgb(247,166,48)";
export const ColorBrown = "rgb(178,101,8)";
export const ColorDarkBrown = "rgb(69,20,0)";

export const OuterBorder = `10px ridge ${ColorBrown}`;
export const InnerBorder = `5px solid ${ColorBrown}`;
export const MiniBorder = `1px solid ${ColorDarkBrown}`;

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

export type PayQuality = "Double Overtime" | "Overtime" | "Minimum Wage";
export type HourQuality = "Short Shifts" | "Normal Shifts" | "Grueling shifts";
export type CleaningQuality = "Pristine" | "Ok" | "Dirty";

export type Callback = () => void;
export type Setter<T> = (newValue: T) => void;

export type Health = "Good" | "Fair" | "Poor" | "Angry" | "Sick" | "Coronavirus" | "Deceased";
export interface Employee {
    name: string,
    status: Health,
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
    cleanliness: "Pristine" | "Fair" | "Poor" | "Dirty" | "Filthy" | "Dangerous!",
    cleaningSupplies: number,
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

export const Layout: React.FC = props => {
    const [paused, setPaused] = React.useState(false);
    const Pause = React.useCallback(() => setPaused(true), [setPaused]);

    const [view, setView] = useStateAndView<View>("Store", Pause);
    const ResetView = React.useCallback(() => setView("Store"), [setView]);

    const UnPause = React.useCallback(() => { ResetView(); setPaused(false); }, [setPaused, ResetView]);

    const [payQ, setPayQ] = useStateAndView<PayQuality>("Overtime", ResetView, val => AddLog(`You decided to change the the pay to ${val}.`));
    const [hourQ, setHourQ] = useStateAndView<HourQuality>("Normal Shifts", ResetView, val => AddLog(`You decided to change the the hours to ${val}.`));
    const [cleanQ, setCleanQ] = useStateAndView<CleaningQuality>("Dirty", ResetView, val => AddLog(`You decided to clean.`));

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
        cleaningSupplies: 5,
    });

    const { infectRate, date, infected, deceased, uninfected, recovered, money, debt, employees, yourName, yourStatus, businessName } = game;

    React.useEffect(() => {
        // advance the days!
        setTimeout(() => {
            //console.log("running")
            if (!paused) {
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
                if(busyEvent){
                    AddLog("Today was really busy!");
                    transactions *= 1.3;
                }
                else if(slowEvent){
                    AddLog("Today was slow.");
                    transactions /= 1.5;
                }

                let sales = 0;
                for (var i = 0; i < transactions; i++) {
                    sales += Randomize(dayTicket[date.getDay()], .15);
                }

                if(busyEvent|| slowEvent){
                    AddLog(`You made $${sales}.`);
                }

                customers = transactions / 6;

                // do costs like employees and stuff
                let employeeWage = 15;
                switch (payQ) {
                    case "Minimum Wage":
                        employeeWage = 14;
                        break;
                    case "Overtime":
                        employeeWage = 18;
                        break;
                    case "Double Overtime":
                        employeeWage = 23;
                        break;
                }

                let hours = 8;
                switch (hourQ) {
                    case "Short Shifts":
                        hours = 12;
                        break;
                    case "Normal Shifts":
                        hours = 9;
                        break;
                    case "Grueling shifts":
                        hours = 7;
                        break;
                }

                const cost = hours * employeeWage * 5; //5 employees

                // RENT
                let rentPayment = 0;
                const costperfoot = 2.33;
                const sqfoot = 2500;
                if (date.getDate() == 1) {
                    rentPayment = costperfoot * sqfoot;
                    console.log("RENT!", rentPayment);
                }

                // Utilities
                let utiltiiesPayment = 0;
                const electricityPerFoot = 2.9 / 12;
                const gasPerfoot = .85 / 12;
                if (date.getDate() == 1) {
                    utiltiiesPayment = sqfoot * (gasPerfoot + electricityPerFoot) + 150;
                    console.log("utilities!", utiltiiesPayment);
                }

                // DEBT
                let debtPayment = 0;
                const monthlyInterest = .007;
                if (date.getDate() == 1) {
                    debtPayment = debt * monthlyInterest;
                    console.log("DEBT!", debtPayment);
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

                    AddLog(`${date.toDateString()}`, {marginTop: 8});
                    AddLog(`You made $${month}.00 in revenue this month.`);
                    AddLog(`Rent: $${rentPayment}`);
                    AddLog(`Utilities: $${utiltiiesPayment}`);
                    AddLog(`Interest Payments: $${debtPayment}`);
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

                setGame({
                    ...game,
                    date: newDate,
                    uninfected: uninfected - increase,
                    recovered: recovered + recoveries,
                    infected: infected + increase - (recoveries + deaths),
                    deceased: deceased + deaths,
                    infectRate: newInfectRate,

                    money: money + (sales - cost) - (rentPayment + debtPayment + foodCost),
                });
            }
        }, isDev ? 500 : 4000);
    }, [paused, game])

    let centerMenu = <StoreDisplay customers={customers} height={220} width={280} />;
    switch (view) {
        case "Pay":
            centerMenu = <CenterMenu<PayQuality>
                setValue={setPayQ}
                title="How much do you want to pay your employees?"
                items={[
                    { name: "Double Overtime", image: PayGreat },
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
            centerMenu = <CenterMenu<CleaningQuality>
                setValue={setCleanQ}
                title="How clean should your employees keep the store?"
                items={[
                    { name: "Pristine", image: CleanGreat },
                    { name: "Ok", image: CleanOk },
                    { name: "Dirty", image: CleanBad },
                ]}
            />;
            break;
        case "Chart":
            centerMenu = <BarDisplay values={[1, 3, 6, 13]} />;
            break;
        case "Bank":
            const paymentAmount = Math.min(1000, debt);
            centerMenu = <div style={{ padding: 5 }}>
                <div style={{ textAlign: "left" }}>Welcome to the bank</div>
                <div style={{ textAlign: "left" }}>You owe ${debt}</div>
                <div>
                    <button style={{ ...buttonStyle, width: 150 }} onClick={() => setGame({ ...game, debt: debt + 1000 })}>Borrow $1000</button>
                    <button style={{ ...buttonStyle, width: 150 }} onClick={() => setGame({ ...game, debt: debt - paymentAmount, money: money - paymentAmount })} disabled={debt <= 0 || money < paymentAmount}>Pay ${paymentAmount}</button>
                </div>
            </div>;
            break;
            case "Status":
                centerMenu = <div style={{ padding: 5, ...bodyText, margin: "0 12px" }}>
                    <div style={{ }}>Status</div>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 8}}>
                        <div style={{textAlign: "left", width: "40", marginRight: 10}}>
                            <div style={{marginBottom: 12}}>Current Supplies:</div>
                            <div style={{marginBottom: 7}}>5 masks</div>
                            <div style={{marginBottom: 7}}>1 set of gloves</div>
                            <div style={{marginBottom: 7}}>1 paper towel</div>
                            <div style={{marginBottom: 7}}>30 sprays of disinfectant</div>
                            <div style={{marginBottom: 7}}>100 pounds of food</div>
                        </div>
                        <div style={{textAlign: "right", width: "50%"}}>
                            <div style={{marginBottom: 12}}>Current Health:</div>
                            <div style={{marginBottom: 5}}>{yourName} - <span style={{display: "inline-block", width: 45, textAlign: "center"}}>{yourStatus}</span></div>
                            {employees.map((e,i) => <div key={i} style={{marginBottom: 5}}>{e.name} - <span style={{display: "inline-block", width: 45, textAlign: "center"}}>{e.status}</span></div>)}
                        </div>
                    </div>
                    <div style={{marginTop: 16}}>Business: Restaurant </div>
                </div>;
                break;
        case "News":
            centerMenu = <img width="100%" src={Tweet} />;
            break;
    }

    return <div style={{ display: "flex", flexDirection: "row", alignItems: "stretch", backgroundColor: ColorBrown, height: "100%", padding: margin, border: MiniBorder }}>
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
                    <BodyRow left="Cleaning:" right={cleanQ} />
                    <BodyRow left="Hours:" right={hourQ} />
                    <BodyRow left="Supplies:" right="12" />
                    <BodyRow left="Health:" right="Fair" />
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
            { image: Cleaning, name: "Cleaning" },
            { image: Hours, name: "Hours" },
            { image: Finances, name: "Bank" },
        ]} />
    </div>;
}

export const LogViewer: React.FC = props => {
    let [logs, setLogs] = React.useState(Logs);
    React.useEffect(()=>{
        setInterval(()=>{
            if(Logs.length > logs.length){
                logs = Logs;
                setLogs([...Logs]);
            }
        }, 500);
    }, [])
    
    return <div style={{ overflowY: "scroll", ...basicBoxStyle, flex: "auto" }}>
        {logs.map((log, i) => 
        <div key={i} 
        style={{ textAlign: "left", fontSize: 12, fontWeight: 700 ,...log.style}}
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
            {/* TODO: Add menu items here! */}
        </div>
    </div>;
}