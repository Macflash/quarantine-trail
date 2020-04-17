
import React from 'react';
import { InRange, PickRandom } from '../utils';

const people: any[] = [ ];
for(var i =1; i <= 4; i++){
    people.push(require(`../images/person${i}.png`));
}

export const Person: React.FC<{ top: number, left: number }> = props => {
    const { top, left } = props;
    let image = PickRandom(people);
    return <div style={{ position: "absolute", height: 50, width: 30, top, left, background: `url(${image})` }}>
    </div>
}

export const StoreDisplay: React.FC<{ customers: number, height?: number, width?: number }> = props => {
    const c = [];
    const height = props.height ?? 250;
    const width = props.width ?? 800;
    for (let i = 0; i < props.customers; i++) {
        c.push(<Person key={i} top={InRange(0, height - 50)} left={InRange(0, width - 30)} />)
    }

    return <div style={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
        <div style={{ height, width, position: "relative" }}>
            {c}
        </div>
    </div>;
}