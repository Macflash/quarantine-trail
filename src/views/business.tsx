import React from 'react';
import { Employee, EmployeeView } from './employee';
import { Setter } from '../utils';

export type BusinessType = "grocery";


export interface Business {
    name: string;
    money: number;
    employees: Employee[];
    businessType: BusinessType; // Store is default. Restaurant is closed to take out only mid way, grocery has extra business but more customers = more risk for spread;
    customerLimit?: number;

    openHours: number;
    cleanHours: number;
}

export const BusinessView: React.FC<{ b: Business, setBusiness?: Setter<Business> }> = props => {
    const { b } = props;
    return <div>
        <div>Business: {b.name}</div>
        <div>Money: ${b.money}</div>

        <div>
            <h3>Hours</h3>
            Open: <input value={b.openHours} type="number" />
            &nbsp;
            Clean: <input value={b.cleanHours} type="number" />
        </div>

        <div>
            <h3>Employees</h3>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                {b.employees.map((e, i) =>
                    <EmployeeView
                        e={e}
                        i={i}
                        setEmployee={props.setBusiness ? (newE, i) => {
                            const employees = [...b.employees];
                            employees[i] = newE;
                            props.setBusiness?.({ ...b, employees });
                        } : undefined}
                    />)}</div>
        </div>

        <br />
        <br />
    </div>;
}