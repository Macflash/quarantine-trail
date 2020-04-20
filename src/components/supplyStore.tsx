import * as React from "react";
import Background from "../images/storeback.png";
import { basicBoxStyle, ColorYellow, Callback, buttonStyle, MiniBorder, PrintMoney } from "./layout";
import { ConstrainRange, ParseConstrainRange, PickRandom, shuffle } from "../utils";

export function GetPerDate<T>(input: T[], date: Date) {
    return input[(Math.floor(date.getDate() / 7) + ((date.getMonth() * 13) % 23)) % input.length];
}

var orderedPrices = shuffle([10, 11, 15, 25, 54, 38]);
var orderedPrices2 = shuffle([15, 17, 9, 23, 76, 34, 93]);
var orderedPrices3 = shuffle([13, 46, 72, 23, 39, 142, 66]);
var orderedPrices4 = shuffle([15, 71, 90, 32, 67, 43, 39]);

console.log(orderedPrices);

export const SupplyStore: React.FC<{ date: Date, money: number, paperTowels: number, cleaningSpray: number, masks: number, gloves: number, onCancel: Callback, onBuy: (cost: number, towels: number, sprays: number, masks: number, gloves: number) => void }> = props => {
    const [buySpray, setBuySpray] = React.useState(0);
    const [buyTowel, setBuyTowel] = React.useState(0);
    const [buyMask, setBuyMask] = React.useState(0);
    const [buyGloves, setBuyGloves] = React.useState(0);

    const [priceTowel] = React.useState(GetPerDate(orderedPrices, props.date));
    const [priceSpray] = React.useState(GetPerDate(orderedPrices2, props.date));
    const [priceMask] = React.useState(GetPerDate(orderedPrices3, props.date));
    const [priceGloves] = React.useState(GetPerDate(orderedPrices4, props.date));

    const perRoll = 10;
    const perBottle = 20;
    const perSet = 10;
    const perBox = 50;

    const costTowel = priceTowel * buyTowel;
    const costSpray = priceSpray * buySpray;
    const costMask = priceMask * buyMask;
    const costGloves = priceGloves * buyGloves;
    const total = costTowel + costSpray + costMask + costGloves;

    return <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: ColorYellow, fontWeight: 700 }}>
        <img src={Background} />
        <div style={{ position: "absolute", right: 0, bottom: 0, backgroundColor: ColorYellow, border: MiniBorder, width: 420, height: 300 }}>
            <div style={{ marginBottom: 16 }}>Alex's General Store</div>
            <table style={{ width: "100%" }}>
                <tbody>
                    <tr style={{ textAlign: "left" }}>
                        <th>Have</th>
                        <th>Buy</th>
                        <th>Item</th>
                        <th>Unit Price</th>
                        <th>Cost</th>
                    </tr>
                    <tr>
                        <td style={{ textAlign: "right" }}>{props.cleaningSpray}</td>
                        <td><input type="number" value={buySpray} onChange={ev => setBuySpray(ParseConstrainRange(ev.target.value, 0, 100))} style={{ ...basicBoxStyle, width: 50 }} /></td>
                        <td style={{ fontSize: 12, textAlign: "left" }}>Cleaning spray ({perBottle}/bottle)</td>
                        <td style={{ textAlign: "right" }}>{PrintMoney(priceSpray)}</td>
                        <td style={{ textAlign: "right" }}>{PrintMoney(costSpray)}</td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: "right" }}>{props.paperTowels}</td>
                        <td><input type="number" value={buyTowel} onChange={ev => setBuyTowel(ParseConstrainRange(ev.target.value, 0, 100))} style={{ ...basicBoxStyle, width: 50 }} /></td>
                        <td style={{ fontSize: 12, textAlign: "left" }}>Paper Towels ({perRoll}/roll)</td>
                        <td style={{ textAlign: "right" }}>{PrintMoney(priceTowel)}</td>
                        <td style={{ textAlign: "right" }}>{PrintMoney(costTowel)}</td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: "right" }}>{props.masks}</td>
                        <td><input type="number" value={buyMask} onChange={ev => setBuyMask(ParseConstrainRange(ev.target.value, 0, 100))} style={{ ...basicBoxStyle, width: 50 }} /></td>
                        <td style={{ fontSize: 12, textAlign: "left" }}>Masks ({perSet}/set)</td>
                        <td style={{ textAlign: "right" }}>{PrintMoney(priceMask)}</td>
                        <td style={{ textAlign: "right" }}>{PrintMoney(costMask)}</td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: "right" }}>{props.gloves}</td>
                        <td><input type="number" value={buyGloves} onChange={ev => setBuyGloves(ParseConstrainRange(ev.target.value, 0, 100))} style={{ ...basicBoxStyle, width: 50 }} /></td>
                        <td style={{ fontSize: 12, textAlign: "left" }}>Disposable Gloves ({perBox}/box)</td>
                        <td style={{ textAlign: "right" }}>{PrintMoney(priceGloves)}</td>
                        <td style={{ textAlign: "right" }}>{PrintMoney(costGloves)}</td>
                    </tr>
                </tbody>
            </table>
            <div style={{ textAlign: "right" }}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", margin: 5 }}>
                    <div>Total: </div>
                    <div style={{ width: 100 }}>{PrintMoney(total)}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", margin: 5 }}>
                    <div>You have: </div>
                    <div style={{ width: 100 }}>{PrintMoney(props.money)}</div>
                </div>
            </div>
            <div style={{ textAlign: "left", margin: 10 }}>
                <button style={{ ...buttonStyle, border: MiniBorder, margin: 10, width: undefined, display: "inline-block" }} onClick={props.onCancel}>Cancel</button>
                <button
                    disabled={total > props.money || total < 0}
                    style={{ ...buttonStyle, border: MiniBorder, margin: 10, width: undefined, display: "inline-block" }}
                    onClick={() => props.onBuy(total, buyTowel * perRoll, buySpray * perBottle, buyMask * perSet, buyGloves * perBox)}>Buy</button>
            </div>
        </div>
    </div>
}
