import React, { useContext } from "react"
import { Padding } from "../react-layout/component/CommonLayouts"
import { View } from "../react-layout/component/View"
import WholeViewport from "../react-layout/component/WholeViewport"
import { LayoutContext } from "../react-layout/context/LayoutContext"
import "./index.css"

export const App = () => {
    return (
        <WholeViewport>
            <Padding value={20}>
                <View className="box"><B /></View>
            </Padding>
        </WholeViewport>
    )
}

const B = () => {
    return <Padding value={10}>
        <View style={{backgroundColor:"red"}}>
            <C />
        </View>
    </Padding>
}

const C = () => {
    return <Padding value={10}>
        <View style={{backgroundColor:"green"}}>
            <D />
        </View>
    </Padding>
}

const D = () => {
    const { x, y, width, height } = useContext(LayoutContext);

    const w = width / 5;
    const h = height / 5;
    return <>{[0,1,2,3,4].map(i => 
        [0,1,2,3,4].map(j => 
            <LayoutContext.Provider value={{ x: x + j * w, y: y + i * h, width: w, height: h }}>
                <E />
            </LayoutContext.Provider>
        )
    )}</>
}

const E = () => {
    return <Padding value={10}>
        <View style={{backgroundColor:"black"}} />
    </Padding>
};

export default App;