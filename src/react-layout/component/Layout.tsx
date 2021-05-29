import React, { useContext, PropsWithChildren } from "react";
import { LayoutContext, LayoutContextData } from "../context/LayoutContext";
import { useMemoShallowCompared } from "../util/useMemoShallowCompared";


export type LayoutFunc = (out: LayoutContextData) => LayoutContextData;

export const Layout = (props: PropsWithChildren<{
    func: LayoutFunc
}>) => {
    const envLayout = useContext(LayoutContext);
    const innerLayout = useMemoShallowCompared(() => props.func(envLayout), [ envLayout, props.func ])

    return (
        <LayoutContext.Provider value={innerLayout}>
            { props.children }
        </LayoutContext.Provider>
    )
};