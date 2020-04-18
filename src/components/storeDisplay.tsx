
import React from 'react';
import { InRange, PickRandom, ConstrainRange } from '../utils';
import StoreBackground from '../images/floorwithsky.png';

const people: any[] = [];
for (var i = 1; i <= 4; i++) {
    people.push(require(`../images/person${i}.png`));
}

export const Person: React.FC<{ top: number, left: number, img?: string }> = props => {
    const { top, left } = props;
    let image = props.img ?? PickRandom(people);
    return <div style={{ zIndex: top, position: "absolute", height: 50, width: 30, top, left, background: `url(${image})` }}>
    </div>
}

type Direction = "up" | "down" | "left" | "right";
var customers: { x: number, y: number, img: string, dir: Direction, dist: number }[] = [];
var interval: any = null;

export const StoreDisplay: React.FC<{ customers: number, height?: number, width?: number }> = props => {
    const height = props.height ?? 250;
    const width = props.width ?? 800;
    const [c, setC] = React.useState(customers);
    const minX = height / 2;
    const maxX = height - 50;
    React.useEffect(() => {
        if (interval) { clearInterval(interval) }
        interval = setInterval(() => {
            //update locations
            if (customers.length < props.customers && Math.random() < .1) {
                // have someone walk in
                customers.push({
                    x: InRange(minX, maxX),
                    y: width,
                    img: PickRandom(people),
                    dir: "left",
                    dist: 50,
                });
            }
            else if(customers.length > props.customers){
                let leaver = customers[0];
                leaver.dist = 1000;
                leaver.dir = "right";
            }

            customers = customers.filter(c => c.y < width + 5);
            
            const speed = 3;
            customers.forEach(c => {
                if (c.dist > 0 && c.dir) {
                    c.dist--;
                    switch (c.dir) {
                        case "up":
                            c.x -= speed;
                            break;
                        case "down":
                            c.x +=speed;
                            break;
                        case "left":
                            c.y -= speed;
                            break;
                        case "right":
                            c.y += speed;
                            break;
                    }
                }
                else {
                    // new dist
                    c.dir = PickRandom<Direction>(["up", "down", "left", "right"]);
                    c.dist = Math.round(PickRandom([10, 25, 50])/ speed);
                }

                c.x = ConstrainRange(c.x, minX, maxX);
                c.y = ConstrainRange(c.y, 0, width);
            })

            setC([...customers]);
        }, 100);

        return () => clearInterval(interval);
    })

    const view = [];
    for (let i = 0; i < props.customers; i++) {
        view.push(<Person key={i} top={InRange(height / 2, height - 50)} left={InRange(0, width - 30)} />)
    }

    return <div style={{ textAlign: "center", display: "flex", justifyContent: "center", border: "10px solid grey" }}>
        <div style={{ height, width, position: "relative", overflow: "hidden" }}>
            <img src={StoreBackground} />
            {c.map((x, i) => <Person key={i} top={x.x} left={x.y} img={x.img} />)}
        </div>
    </div>;
}