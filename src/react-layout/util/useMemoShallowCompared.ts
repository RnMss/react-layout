import { DependencyList, useMemo, useRef } from "react";

export function simpleShallowEqual(a: any, b: any): boolean {
    if (a === b) return true;
    if (a === null || b === null) return false;

	if (Object.keys(a).length !== Object.keys(b).length) return false;
    if (a.prototype !== b.prototype) return false;
	for (const key in a) {
        if (a[key] !== b[key]) return false;
	}

    return true;
}


export function useMemoShallowCompared<T>(calc: () => T, dep: DependencyList, equal: (a: T, b: T) => boolean = simpleShallowEqual) {
    const newValue = useMemo(calc, dep);
    const oldValue = useRef(newValue);
    const stablerNewValue = useMemo(() => {
        if (!equal(oldValue.current, newValue)) {
            oldValue.current = newValue
        }
        return oldValue.current;
    }, [equal, newValue]);
    return stablerNewValue;
}