import React, { PropsWithChildren } from "react";
import { useMemo } from "react";
import { Layout, LayoutFunc } from "./Layout";

export type BoxSideOption = [number] | [number, number] | [number, number, number, number];

export function paddingLayoutFunc(...padding: BoxSideOption): LayoutFunc {
    switch (padding.length) {
        case 1: {
            const [p] = padding;
            return (out) => ({
                x: out.x + p,
                y: out.y + p,
                width: out.width - p * 2,
                height: out.height - p * 2,
            });
        }
        case 2: {
            const [v, h] = padding;
            return (out) => ({
                x: out.x + h,
                y: out.y + v,
                width: out.width - h * 2,
                height: out.height - v * 2,
            })
        }
        case 4: {
            const [t, r, d, l] = padding;
            return (out) => ({
                x: out.x + l,
                y: out.y + t,
                width: out.width - l - r,
                height: out.height - t - d,
            })
        }
    }
}

export const Padding = (props: PropsWithChildren<{
    value: BoxSideOption | number
}>) => {
    const func = useMemo(() => {
        const v = props.value;
        return typeof v === "number" 
            ? paddingLayoutFunc(v)
            : paddingLayoutFunc(...v)
    }, [props.value]);
    return <Layout func={func}>{ props.children }</Layout>
}