import React from 'react';

export interface City {
    day: number;
    name: string;
    population: number;
    infected: number;
    recovered: number;
    interaction: number; // estimated numbers out each day, which will determine spread speed
    protection: number; // some scale for gloves and masks etc

    testedPositive: number;
    deceased: number;
}

export const CityView: React.FC<{ c: City }> = props => {
  const { c } = props;
  return <div>
    <div>City: {c.name}</div>
    <div>day: {c.day}</div>
    <div>Population: {c.population}</div>
    <div>infected: {c.infected}</div>
  </div>
}