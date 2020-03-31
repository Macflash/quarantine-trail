import React from 'react';
import { InRange } from '../utils';

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
    <div>recovered: {c.recovered}</div>
    <div>deceased: {c.deceased}</div>
    <div>tested positive: {c.deceased}</div>
  </div>
}

export function AdvanceCity(c: City): City {
  const spreadChance = .005;

  const newCity = { ...c };

  // city spread
  const newInfections = Math.floor(c.infected * spreadChance * c.interaction);
  const newRecovered = Math.floor(c.infected / 18 + 1); // 14 days to recover...
  const newDeceased = Math.floor(c.infected * .05 / 18 + 1); // 6% die?

  newCity.infected += newInfections - newRecovered - newDeceased;
  newCity.deceased += newDeceased;
  newCity.recovered += newRecovered;
  newCity.testedPositive += InRange(.1 * newInfections, .5 *newInfections);
  newCity.day++;

  return newCity;
}