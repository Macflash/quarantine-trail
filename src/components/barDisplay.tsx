
import React from 'react';

export const BarBlock: React.FC<{ value: number, max: number, color?: string }> = props => {
    return <div title={props.value +""} style={{ flex: "auto", border: `1px solid ${props.color || "orange"}`, backgroundColor: props.color || "orange", height: `${100 * props.value / props.max}%`, minWidth: 2, maxWidth: 100, margin: 2 }}></div>
}

export const BarDisplay: React.FC<{ values: number[], fillColor?: string }> = props => {
    const { values, fillColor = "green" } = props;

    let max = 0;
    values.forEach(v => max = Math.max(v, max));

    const c = [];
    for (let i = 0; i < props.values.length; i++) {
        c.push(<BarBlock key={i} value={values[i]} max={max} />)
    }

    return <div style={{ display: "flex", flexDirection: "row", height: 50, alignItems: "flex-end", justifyContent: "center", margin: 10 }}>{c}</div>
}