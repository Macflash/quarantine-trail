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
import Hunt from '../images/hunt.png';

import PayBad from '../images/paybad.png';
import PayOk from '../images/payok.png';
import PayGreat from '../images/paygreat.png';

import { StoreDisplay } from './storeDisplay';

export const ColorYellow = "rgb(255,247,138)";
export const ColorOrange = "rgb(247,166,48)";
export const ColorBrown = "rgb(178,101,8)";
export const ColorDarkBrown = "rgb(69,20,0)";

export const OuterBorder = `10px ridge ${ColorBrown}`;
export const InnerBorder = `5px solid ${ColorBrown}`;
export const MiniBorder = `1px solid ${ColorDarkBrown}`;

const spacing = 5;
const margin = spacing / 2;

const basicBoxStyle = {
    backgroundColor: ColorYellow,
    margin,
    border: MiniBorder,
}

export type View = "Store" | "Chart" | "Guide" | "Status" | "Pay" | "Bank" | "Supplies" | "News" | "Cleaning" | "Hours" | "Hunt";



export const Layout: React.FC = props => {
    const [view, setView] = React.useState<View>("Store");

    let centerMenu = <StoreDisplay customers={40} height={220} width={280} />;
    switch (view) {
        case "Pay":
            centerMenu = <CenterMenu
                title="How much do you want to pay your employees?"
                items={[
                    { name: "Double Overtime", image: PayGreat },
                    { name: "Overtime", image: PayOk },
                    { name: "Bad", image: PayBad },
                ]}
            />;
            break;
    }

    return <div style={{ display: "flex", flexDirection: "row", alignItems: "stretch", backgroundColor: ColorBrown, height: "100%", padding: margin, border: MiniBorder }}>
        <VerticalMenu setView={setView} items={[
            { name: "Store" },
            { image: Help, name: "Guide" },
            { image: Status, name: "Status" },
            { image: Pay, name: "Pay" },
            { image: Graph, name: "Chart" },
        ]} />
        <div style={{ flex: "auto", display: "flex", flexDirection: "column" }}>
            <div style={{ ...basicBoxStyle }}>
                {/* TODO: Add main view here! */}
                {centerMenu}
            </div>
            <div style={{ ...basicBoxStyle, flex: "auto" }}>
                {/* TODO: Add Log here! */}
            </div>
        </div>
        <div style={{ ...basicBoxStyle, width: 140 }}></div>
        <VerticalMenu setView={setView} items={[
            { image: Buy, name: "Supplies" },
            { image: News, name: "News" },
            { image: Cleaning, name: "Cleaning" },
            { image: Hours, name: "Hours" },
            { image: Finances, name: "Bank" },
        ]} />
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
                {props.name ? <div style={{ margin: 12 }}>{props.name}</div> : null}
            </div>
            : null}
    </div>;
}

export function CenterMenu<T>(props: { title: string, items?: { name: T, image?: string }[] }) {
    return <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        {props.items?.map(item => <CenterMenuItem {...item} />)}
        {/* TODO: Add menu items here! */}
    </div>;
}

