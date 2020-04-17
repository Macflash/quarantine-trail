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

import { StoreDisplay } from './storeDisplay';
import { BarDisplay } from './barDisplay';

const intro_theme = require("../sounds/QT Intro Theme.wav");

export const ColorYellow = "rgb(255,247,138)";
export const ColorOrange = "rgb(247,166,48)";
export const ColorBrown = "rgb(178,101,8)";
export const ColorDarkBrown = "rgb(69,20,0)";

export const OuterBorder = `10px ridge ${ColorBrown}`;
export const InnerBorder = `5px solid ${ColorBrown}`;
export const MiniBorder = `1px solid ${ColorDarkBrown}`;

const buttonStyle: React.CSSProperties = {
    width: "calc(100% - 4px)",
    backgroundColor: ColorYellow,
    border: InnerBorder,
    borderRadius: 5,
    margin: 2,
    cursor: "pointer",
}

const buttonWrapperStyle: React.CSSProperties = {
    width: "100%",
    display: "inline-block",
    backgroundColor: ColorYellow,
    border: MiniBorder,
    borderRadius: 5
}

const headerStyle: React.CSSProperties = {
    fontWeight: 600,
    fontSize: 18
}

const bodyStyle: React.CSSProperties = {
    fontWeight: 700,
    fontSize: 10,
    textAlign: "left",
    margin: "0 10px"
}

const spacing = 5;
const margin = spacing / 2;

const basicBoxStyle = {
    backgroundColor: ColorYellow,
    margin,
    border: MiniBorder,
}

export type View = "Store" | "Chart" | "Guide" | "Status" | "Pay" | "Bank" | "Supplies" | "News" | "Cleaning" | "Hours" | "Hunt";

export type PayQuality = "Double Overtime" | "Overtime" | "Minimum Wage";
export type HourQuality = "Short Shifts" | "Normal Shifts" | "Grueling shifts";
export type CleaningQuality = "Pristine" | "Ok" | "Dirty";

export const Layout: React.FC = props => {
    const [payQ, setPayQ] = React.useState<PayQuality>("Overtime");
    const [hourQ, setHourQ] = React.useState<HourQuality>("Normal Shifts");
    const [cleanQ, setCleanQ] = React.useState<CleaningQuality>("Dirty");

    React.useEffect(() => {
        var audio = new Audio(intro_theme);
        audio.volume = .25;
        audio.play();
    }, []);

    const [view, setView] = React.useState<View>("Store");

    let centerMenu = <StoreDisplay customers={40} height={220} width={280} />;
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
            centerMenu = <div style={{padding: 5}}>
                <div style={{textAlign: "left"}}>Welcome to the bank</div>
                <div style={{textAlign: "left"}}>You owe $0</div>
                <div>
                    <button style={{...buttonStyle, width: 150}}>Borrow $1000</button>
                </div>
            </div>;
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
            <div style={{ ...basicBoxStyle, flex: "auto" }}>
                {/* TODO: Add Log here! */}
            </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", width: 140 }}>
            <div style={{ ...basicBoxStyle, flex: "auto", textAlign: "center" }}>
                <div style={{ ...headerStyle }}>Conditions</div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>April 3, 2020</div>

                <img src={Placeholder} />

                <div style={{ ...headerStyle, marginTop: 10 }}>Virus</div>
                <div style={{ ...bodyStyle }}>
                <BodyRow left="Positive:" right="100" />
                    <BodyRow left="Positive:" right="100" />
                    <BodyRow left="Deceased:" right="12" />
                </div>

                <div style={{ ...headerStyle, marginTop: 10 }}>Store</div>
                <div style={{ ...bodyStyle }}>
                <BodyRow left="Money:" right="$1600" />
                    <BodyRow left="Pay:" right={payQ} />
                    <BodyRow left="Cleaning:" right={cleanQ} />
                    <BodyRow left="Hours:" right={hourQ} />
                    <BodyRow left="Supplies:" right="12" />
                    <BodyRow left="Health:" right="Fair" />
                    <br />
                    <BodyRow left="Store:" right="Open" />
                </div>
            </div>
            <div style={{ ...basicBoxStyle }}>
                <div style={{ padding: 5, margin: 6, marginBottom: 12 }}>
                    <span style={buttonWrapperStyle}><button style={buttonStyle}>Continue</button></span>
                </div>
                <div style={{padding: 5, margin: 6 }}>
                    <span style={buttonWrapperStyle}><button style={buttonStyle}>Options</button></span>
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

export const BodyRow: React.FC<{left: string, right: string}> = props => {
    return <div style={{display: "flex", justifyContent: "space-between"}}>
        <div>{props.left}</div>
        <div>{props.right}</div>
    </div>;
}

export const MenuCircle: React.FC<{ image?: string }> = props => {
    return <div style={{ width: 30, height: 40, borderRadius: 80, backgroundColor: "white", border: `5px outset ${ColorBrown}`, boxShadow: "5px 1px 0 black" }}>
        {props.image ? <img src={props.image} style={{ marginTop: 5 }} /> : null}
    </div>;
}

export const MenuItem: React.FC<{ name?: View, image?: string, onClick?: () => void }> = props => {
    return <div style={{ margin: 9, textAlign: "center", alignItems: "center", display: "flex", flexDirection: "column", cursor: "pointer" }} onClick={props.onClick} tabIndex={0}>
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
        {props.items?.map(item => <MenuItem {...item} onClick={() => { props.setView(item.name) }} />)}
        {/* TODO: Add menu items here! */}
    </div>;
}

export function CenterMenuItem<T>(props: { name: T, image?: string, onClick?: () => void }) {
    return <div style={{ margin: 9, textAlign: "center", alignItems: "center", display: "flex", flexDirection: "row", cursor: "pointer" }} onClick={props.onClick} tabIndex={0}>
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