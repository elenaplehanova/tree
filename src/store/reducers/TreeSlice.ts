import { createSlice } from "@reduxjs/toolkit";
import { INode } from "../../components/Node/Node";
import uuid from "react-uuid";

type ITree = {
    tree: INode[];
};

const initialState: ITree = {
    tree: [],
};

const treeSlice = createSlice({
    name: "tree",
    initialState,
    reducers: {
        addNewNode(state) {
            state.tree.push({ id: uuid(), name: "new node" });
        },
    },
});

export const { addNewNode } = treeSlice.actions;

export default treeSlice.reducer;
