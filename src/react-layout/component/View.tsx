import React, { useContext, useMemo } from "react"
import { LayoutContext } from "../context/LayoutContext";
import { Layout } from "./Layout";

export const View = React.memo((props: React.HTMLAttributes<HTMLDivElement>) => {
    const { style, children, ...otherProps } = props;

    const env = useContext(LayoutContext);
    const layoutStyles: React.CSSProperties = {
        position: "absolute",
        left: env.x,
        top: env.y,
        width: Number.isFinite(env.width) ? env.width : 0,
        height: Number.isFinite(env.height) ? env.height : 0,
    };

    const innerLayout = useMemo(
        () => ({ x: 0, y: 0, width: env.width, height: env.height }), 
        [env.width, env.height]
    );

    return (
        <div {...otherProps} style={{...style, ...layoutStyles}}>
            <LayoutContext.Provider value={innerLayout}>
                {children}
            </LayoutContext.Provider>
        </div>
    )
})