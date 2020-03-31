import React from 'react';

export function InRange(low: number, high: number): number {
    return Math.floor((Math.random() * (high - low)) + low);
}

export function PickRandom<T>(input: T[]) {
    return input[InRange(0, input.length - 1)];
}

export type Setter<T> = (newV: T) => void;
export type ArraySetter<T> = (newV: T, index: number) => void;