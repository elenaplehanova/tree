import { combineReducers, configureStore } from "@reduxjs/toolkit";
import treeReducer from "./reducers/TreeSlice";

const rootReducer = combineReducers({
    treeReducer,
});

export const setupStore = () => {
    return configureStore({ reducer: rootReducer });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
