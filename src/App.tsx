import "./App.css";
import Node from "./components/Node/Node";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { addRootNode, resetRootNode } from "./store/reducers/TreeSlice";

function App() {
    const dispatch = useAppDispatch();
    const { tree } = useAppSelector((state) => state.treeReducer);

    return (
        <div className="app">
            <header className="app-header">Tree</header>
            {tree.map((node) => (
                <Node key={node.id} node={node}></Node>
            ))}

            <div className="dashboard">
                <button className="dashboard-button" onClick={() => dispatch(addRootNode())}>
                    Add
                </button>
                <button className="dashboard-button" onClick={() => dispatch(resetRootNode())}>
                    Reset
                </button>
            </div>
        </div>
    );
}

export default App;
