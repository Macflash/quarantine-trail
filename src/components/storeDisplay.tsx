
import React from 'react';
import Person1 from '../images/person1.png';
import Person2 from '../images/person2.png';
import { InRange } from '../utils';
import { BusinessView } from '../views/business';

export const Person: React.FC<{ top: number, left: number }> = props => {
    const { top, left } = props;
    return <div style={{ position: "absolute", height: 50, width: 30, top, left, background: `url(${Person1})`, backgroundBlendMode: "overlay", mixBlendMode: "multiply" }}>
    </div>
}

export const StoreDisplay: React.FC<{ customers: number, height?: number, width?: number }> = props => {
    const c = [];
    const height = props.height ?? 250;
    const width = props.width ?? 800;
    for (let i = 0; i < props.customers; i++) {
        c.push(<Person top={InRange(0, height - 50)} left={InRange(0, width - 30)} />)
    }

    return <div style={{ textAlign: "center", display: "flex", justifyContent: "center" }}><div style={{ height, width, position: "relative", border: "3px solid grey" }}>
        {c}
    </div>
    </div>;
}