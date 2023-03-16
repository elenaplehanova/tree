import "./App.css";
import Node from "./components/Node/Node";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { addNewNode } from "./store/reducers/TreeSlice";

function App() {
    const dispatch = useAppDispatch();
    const { tree } = useAppSelector((state) => state.userReducer);

    return (
        <div className="app">
            <header className="app-header">Tree</header>
            {tree.map((node) => (
                <Node key={node.id} node={node}></Node>
            ))}

            <div className="dashboard">
                <button className="dashboard-button" onClick={() => dispatch(addNewNode())}>
                    Add
                </button>
                <button className="dashboard-button">Reset</button>
            </div>
        </div>
    );
}

export default App;
