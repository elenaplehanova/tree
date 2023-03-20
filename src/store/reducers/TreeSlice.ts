import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INode } from "../../components/Node/Node";
import uuid from "react-uuid";

type ITree = {
    tree: INode[];
};

const initialState: ITree = {
    tree: [],
};

const initialNodeName = "new node";

const treeSlice = createSlice({
    name: "tree",
    initialState,
    reducers: {
        addRootNode(state) {
            state.tree.push({ id: uuid(), name: initialNodeName });
        },
        resetRootNode(state) {
            state.tree = initialState.tree;
        },
        addChildNode(state, action: PayloadAction<INode>) {
            let id = action.payload.id;
            const addChildren = (tree: any) =>
                tree.map((node: INode) => {
                    if (node.id === id) {
                        let newNode = { id: uuid(), name: initialNodeName };
                        let children = node.children ? [...node.children, newNode] : [newNode];

                        return { ...node, children: children };
                    } else {
                        if (node.children) {
                            node.children = addChildren(node.children);
                        }

                        return node;
                    }
                });

            state.tree = addChildren(state.tree);
        },
        resetChildNode(state, action: PayloadAction<INode>) {
            let id = action.payload.id;
            const reset = (tree: any) =>
                tree.map((node: INode) => {
                    if (node.id === id) {
                        return { id: node.id, name: initialNodeName };
                    } else {
                        if (node.children) {
                            node.children = reset(node.children);
                        }

                        return node;
                    }
                });

            state.tree = reset(state.tree);
        },
        removeNode(state, action: PayloadAction<INode>) {
            let id = action.payload.id;
            const remove = (tree: INode[]) => {
                let index = tree.findIndex((node) => node.id === id);
                if (index > -1) {
                    tree.splice(index, 1);
                } else {
                    tree.forEach((node) => {
                        if (node.children) {
                            node.children = remove(node.children);
                        }
                    });
                }
                return tree;
            };

            state.tree = remove(state.tree);
        },
        editNodeName(state, action: PayloadAction<INode>) {
            let id = action.payload.id;
            let name = action.payload.name;

            const edit = (tree: any) =>
                tree.map((node: INode) => {
                    if (node.id === id) {
                        return { id: node.id, name: name, children: node.children };
                    } else {
                        if (node.children) {
                            node.children = edit(node.children);
                        }

                        return node;
                    }
                });

            state.tree = edit(state.tree);
        },
    },
});

export const {
    addRootNode,
    resetRootNode,
    addChildNode,
    resetChildNode,
    removeNode,
    editNodeName,
} = treeSlice.actions;

export default treeSlice.reducer;
