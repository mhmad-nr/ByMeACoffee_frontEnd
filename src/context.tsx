import React, { useState, ReactNode, useContext } from "react";
import { constextType, initStore, storeType } from "./types";

type propsType = {
    children: ReactNode
};

// enum CountActionKind {
//     INCREASE = 'INCREASE',
//     DECREASE = 'DECREASE',
// }

// // An interface for our actions
// interface CountAction {
//     type: CountActionKind;
//     payload: number;
// }

// // An interface for our state
// interface CountState {
//     count: number;
// }

// function counterReducer(state: CountState, action: CountAction) {
//     const { type, payload } = action;
//     switch (type) {
//         case CountActionKind.INCREASE:
//             return {
//                 ...state,
//                 value: state.count + payload,
//             };

//         default:
//             return state;
//     }
// }
const Context = React.createContext({} as constextType);

export const StoreProvider: React.FC<propsType> = ({ children }) => {
    const [store, setStore] = useState<storeType>(initStore);
    // const [sreducer, setReducer] = useReducer(counterReducer, { count: 0 });
    return (
        <Context.Provider value={{ store, setStore }}>
            {children}
        </Context.Provider>
    );
};

export const useStore = () => useContext(Context);
