import React from "react";

export type LayoutContextData = {
    x: number;
    y: number;
    width: number;
    height: number;
}

export const LayoutContext = React.createContext<LayoutContextData>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
});

export type Size = {
    width: number;
    height: number;
};

export interface SizeFeedback {
    (size: Partial<Size>): void;
}

export const SizeFeedbackContext = React.createContext<SizeFeedback>(_ => {});