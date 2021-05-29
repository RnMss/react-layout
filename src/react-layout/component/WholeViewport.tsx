import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { LayoutContext } from '../context/LayoutContext';

const styles: React.CSSProperties = {
    position: "absolute",
    left: 0, top: 0,
    width: "100%", height: "100%"
};

export const WholeViewport = (props: React.PropsWithChildren<{}>) => {
    const mainElem = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    
    useEffect(() => {
        const handler = () => {
            setSize({ 
                width: mainElem.current.clientWidth,
                height: mainElem.current.clientHeight
            });
        };

        handler();
        window.addEventListener("resize", handler, true);
        return () => {
            window.removeEventListener("resize", handler, true);
        };
    }, [mainElem.current]);

    const layoutEnv = useMemo(() => ({ x: 0, y: 0, width: size.width, height: size.height }), [size.width, size.height]);

    return <div ref={mainElem} style={styles}>
        <LayoutContext.Provider value={layoutEnv}>
            { props.children }
        </LayoutContext.Provider>
    </div>;

};

export default WholeViewport;