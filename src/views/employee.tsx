
import React from 'react';
import { PickRandom, InRange, ArraySetter } from '../utils';

export type EmploymentStatus = "fulltime" | "parttime" | "paidleave" | "unpaidleave" | "fired";

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

const Morale: React.FC<{ e: Employee }> = props => {
    const m = props.e.morale;
    let color = "unset";
    let s = "?";
    if (m > 90) { s = ":D"; color = "green" }
    else if (m > 80) { s = ":)"; color = "blue" }
    else if (m > 80) { s = ":)"; }
    else if (m > 70) { s = ":/"; }
    else if (m > 60) { s = ":("; color = "orange" }
    else if (m > 50) { s = ">:("; color = "red"; }
    else if (m <= 50) { s = ">:O !!"; color = "red"; }


    return <b style={{ color }}>{s}</b>
}

export const EmployeeView: React.FC<{ e: Employee, i: number, setEmployee?: ArraySetter<Employee> }> = props => {
    const { e } = props;
    return <div style={{ border: "1px solid black", padding: 10 }} key={props.i}>


        <div>{e.name}</div>
        <div>${e.pay}/hr</div>
        <div>Age: {e.age}</div>
        <div>Employed: {e.yearsOnStaff}</div>
        <div><Morale e={e} /></div>

        {e.hasKids && <div>Has kids</div>}
        {e.hasVirus && <div style={{ color: "red", fontWeight: 800 }}>Has Virus</div>}


        <label>
            Status:
            <select
                value={e.status}
                disabled={e.status == "fired" || !props.setEmployee}
                onChange={ev => props.setEmployee?.({ ...props.e, status: ev.target.value as EmploymentStatus }, props.i)}
            >
                <option value="fulltime">Full time</option>
                <option value="parttime">Part time</option>
                <option value="paidleave">Paid Leave</option>
                <option value="unpaidleave">Unpaid Leave</option>
                <option value="fired">Fire</option>
            </select>
        </label>

        <br />
        <br />
    </div>;
}