
import React from 'react';
import { PickRandom, InRange, ArraySetter } from '../utils';
import { ScaleRange } from '../components/scaleDisplay';
import { Business } from './business';
import { City } from './city';

export type EmploymentStatus = "fulltime" | "parttime" | "paidleave" | "unpaidleave" | "fired" | "quit";

export interface Employee {
    name: string,
    age: number;
    yearsOnStaff: number;
    pay: number;

    isSick?: boolean;
    hasVirus?: boolean;
    hasKids?: boolean;

    status: EmploymentStatus;
    morale: number;
}

const EmployeeNames = ["Bob", "Jill", "Jermaine", "Simon", "Jennifer", "Marten", "Ashish", "Sayyid", "Ginna", "Lise", "Sally"];

export function CreateEmployee(): Employee {
    return {
        name: PickRandom(EmployeeNames),
        age: InRange(16, 70),
        yearsOnStaff: InRange(0, 15),
        pay: InRange(15, 20),

        hasKids: Math.random() > .5,
        isSick: false,
        hasVirus: false,

        //
        status: "fulltime",
        morale: InRange(80, 100),
    }
}

export function CreateEmployees(n: number): Employee[] {
    let result = [];
    for (let i = 0; i < n; i++) {
        result.push(CreateEmployee());
    }

    return result;
}

const Pay: React.FC<{ e: Employee }> = props => {
    const p = props.e.pay;
    return <ScaleRange value={p} min={13} max={25} />
}

const Morale: React.FC<{ e: Employee }> = props => {
    const m = props.e.morale;
    let color = "unset";
    let s = "?";
    if (m > 90) { s = "😄"; color = "green" }
    else if (m > 80) { s = "🙂"; color = "blue" }
    else if (m > 70) { s = "😐"; color = "lightblue" }
    else if (m > 60) { s = "😕"; color = "yellow" }
    else if (m > 50) { s = "😟"; color = "tan"; }
    else if (m > 40) { s = "😣"; color = "orange"; }
    else if (m > 30) { s = "😠"; color = "red" }
    else if (m <= 30) { s = "🤬"; color = "black"; }

    if (props.e.isSick) {
        s = "🤒";
    }

    if (props.e.hasVirus) {
        s = "😷";
    }

    return <span style={{ display: "inline-block", fontSize: "24px", backgroundColor: color, padding: 1, paddingBottom: 3, margin: 5 }}>{s}</span>
}

export const EmployeeView: React.FC<{ e: Employee, i: number, setEmployee?: ArraySetter<Employee> }> = props => {
    const { e, i, setEmployee } = props;
    return <div style={{ border: "1px solid black", padding: 10 }} key={i}>


        <div>{e.name}</div>
        <div>${e.pay}/hr</div>
        <Pay e={e} />

        <div>Age: {e.age}</div>
        <div>Employed: {e.yearsOnStaff}</div>
        <div><Morale e={e} /></div>

        {e.hasKids && <div>Has kids</div>}
        {(e.isSick || e.hasVirus) && <div style={{ fontWeight: 800 }}>Is Sick</div>}
        {e.hasVirus && <div style={{ color: "red", fontWeight: 800 }}>Has Virus</div>}


        <label>
            Status:
            <select
                value={e.status}
                disabled={e.status == "fired" || e.status == "quit" || !setEmployee}
                onChange={ev => setEmployee?.({ ...props.e, status: ev.target.value as EmploymentStatus }, props.i)}
            >
                <option value="fulltime">Full time</option>
                <option value="parttime">Part time</option>
                <option value="paidleave">Paid Leave</option>
                <option value="unpaidleave">Unpaid Leave</option>
                <option value="fired">Fire</option>
                <option disabled value="quit">Quit</option>
            </select>
        </label>

        <br />
        <br />
    </div>;
}

export function advanceEmployee(e: Employee, b: Business, c: City): Employee {
    const newEmployee = { ...e };
    if (newEmployee.morale < 20) {
        newEmployee.status = "quit";
    }

    return newEmployee;
}