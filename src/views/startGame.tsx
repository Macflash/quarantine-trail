
import React from 'react';
import { Business, BusinessType } from './business';
import { CreateEmployees } from './employee';

export const StartGame: React.FC<{ onCreate: (newB: Business) => void }> = props => {
    const [name, setName] = React.useState("Ok Food Products");
    const [businessType, setBusinessType] = React.useState<BusinessType>("grocery");
    return <div>
        <label>
            Business Name:&nbsp;
        <input type="text" placeholder="Name your business" value={name} onChange={ev => setName(ev.target.value)} />
        </label>
        <br />

        <label>
            Business type:&nbsp;
        <select value={businessType} onChange={ev => setBusinessType(ev.target.value as BusinessType)}>
                <option value="grocery">Grocery</option>
            </select>
        </label>

        <br />
        <button disabled={!name} onClick={() => name && props.onCreate({ name, businessType, money: 10000, employees: CreateEmployees(10), openHours: 10, cleanHours: 0, customers: 0 })}>Start!</button>
    </div>
}