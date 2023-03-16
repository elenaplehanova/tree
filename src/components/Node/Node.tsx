import { FC } from "react";
import "./Node.css";

export type INode = {
    id: string;
    name: string;
    children?: INode[];
};

const Node: FC<{ node: INode }> = ({ node }) => {
    return (
        <div className="node">
            <div className="node-parent">
                <p className="node-text">{node.name}</p>
                <div className="dashboard">
                    <button className="dashboard-button">Add</button>
                    <button className="dashboard-button">Remove</button>
                    <button className="dashboard-button">Edit</button>
                    <button className="dashboard-button">Reset</button>
                </div>
            </div>
            <div className="node-children">
                {node.children && node.children.map((n) => <Node key={n.id} node={n} />)}
            </div>
        </div>
    );
};

export default Node;
