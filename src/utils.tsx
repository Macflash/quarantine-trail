import React from 'react';

export function InRange(low: number, high: number): number {
    return Math.round((Math.random() * (high - low)) + low);
}

export function PickRandom<T>(input: T[]) {
    return input[InRange(0, input.length - 1)];
}

export function ConstrainRange(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

export function ParseConstrainRange(value: string, min: number, max: number): number {
    return ConstrainRange(parseFloat(value), min, max);
}

export type Setter<T> = (newV: T) => void;
export type ArraySetter<T> = (newV: T, index: number) => void;


export function useHistory<T>(initial: T[] = []): [T[], Setter<T>] {
    const [history, setHistory] = React.useState(initial);
    const add = React.useCallback((newValue: T) => {
        setHistory([...history, newValue]);
    }, [history, setHistory]);

    return [history, add];
}

export function shuffle<T>(items: T[]): T[] {
    const shuffle = items.map(item => ({ item, random: Math.random() }));
    const newItems = [...shuffle].sort((a, b) => {
        if (a.random > b.random) {
            return 1;
        }
        if (a.random == b.random) {
            return 0;
        }
        return -1;
    });

    return newItems.map(wrapper => wrapper.item);
}
