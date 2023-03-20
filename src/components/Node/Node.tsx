import { FC, useEffect, useState } from "react";
import "./Node.css";
import { useAppDispatch } from "../../hooks/redux";
import {
    addChildNode,
    editNodeName,
    removeNode,
    resetChildNode,
} from "../../store/reducers/TreeSlice";

export type INode = {
    id: string;
    name: string;
    children?: INode[];
};

const Node: FC<{ node: INode }> = ({ node }) => {
    const dispatch = useAppDispatch();

    const [name, setName] = useState(node.name);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => setName(node.name), [node]);

    function handleKeyDown(e: any) {
        if (e.key === "Enter") {
            dispatch(editNodeName({ ...node, name: name }));
            setIsEdit(false);
        }
    }

    return (
        <div className="node">
            <div className="node-parent">
                {isEdit ? (
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                ) : (
                    <p className="node-text">{node.name}</p>
                )}
                <div className="dashboard">
                    <button
                        className="dashboard-button"
                        onClick={() => dispatch(addChildNode(node))}
                    >
                        Add
                    </button>
                    <button className="dashboard-button" onClick={() => dispatch(removeNode(node))}>
                        Remove
                    </button>
                    <button className="dashboard-button" onClick={() => setIsEdit(true)}>
                        Edit
                    </button>
                    <button
                        className="dashboard-button"
                        onClick={() => dispatch(resetChildNode(node))}
                    >
                        Reset
                    </button>
                </div>
            </div>
            <div className="node-children">
                {node.children && node.children.map((n) => <Node key={n.id} node={n} />)}
            </div>
        </div>
    );
};

export default Node;
