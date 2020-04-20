import * as React from "react";
import Background from "../images/storeback.png";
import { basicBoxStyle, ColorYellow, Callback, buttonStyle, MiniBorder, PrintMoney } from "./layout";
import { ConstrainRange, ParseConstrainRange, PickRandom } from "../utils";

export const SupplyStore: React.FC<{ money: number, paperTowels: number, cleaningSpray: number, onCancel: Callback, onBuy: (towels: number, sprays: number, cost: number) => void }> = props => {
    const [buySpray, setBuySpray] = React.useState(0);
    const [buyTowel, setBuyTowel] = React.useState(0);
    const [priceTowel] = React.useState(PickRandom([10, 12, 11, 15, 25, 54]));
    const [priceSpray] = React.useState(PickRandom([15, 17, 16, 23, 76, 34]));

    const perRoll = 10;
    const perBottle = 20;

    const costTowel = priceTowel * buyTowel;
    const costSpray = priceSpray * buySpray;

    const total = costTowel + costSpray;

    return <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: ColorYellow, fontWeight: 700 }}>
        <img src={Background} />
        <div style={{ position: "absolute", right: 0, bottom: 0, backgroundColor: ColorYellow, border: MiniBorder, width: 420, height: 300 }}>
            <div style={{ marginBottom: 16 }}>Alex's General Store</div>
            <table style={{ width: "100%" }}>
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
                    onClick={() => props.onBuy(buyTowel * perRoll, buySpray * perBottle, total)}>Buy</button>
            </div>
        </div>
    </div>
}
