
import React from 'react';

export const ScaleBlock: React.FC<{ color: string }> = props => {
    return <div style={{ border: "1px solid black", backgroundColor: props.color, height: 20, width: 20, margin: 2 }}></div>
}


export const ScaleRange: React.FC<{ value: number, min?: number, max?: number, stops?: number, fillColor?: string }> = props => {
    const { value, min = 0, max = 100, stops = 5, fillColor = "green" } = props;

    const c = [];
    for (let i = 0; i < stops; i++) {
        let x = min + i * (max - min) / stops;
        c.push(<ScaleBlock key={i} color={x < value ? fillColor : "lightgrey"} />)
    }

    return <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>{c}</div>
}