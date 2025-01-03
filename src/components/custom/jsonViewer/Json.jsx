import { JsonView, allExpanded, darkStyles, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import NodeHeader from '../../nodeHeader/NodeHeader';
import { Handle, Position } from 'reactflow';
import JsonClass from './Json.module.css';

const json = 'hari';

export default function Json({ data }) {
    console.log('Json Data:', data);
    return (
    
        <div className={JsonClass.viewNode}>
            <Handle type="target" position={Position.Left} />
            <div className={JsonClass.viewHeader}>
                <NodeHeader icon='vscode-icons:file-type-json' title='JSON Viewer' details='v1.0' bg='#ffe6a580' />
            </div>
            <div className={JsonClass.viewBody}>
                <JsonView data={data.value} shouldExpandNode={allExpanded} style={defaultStyles} />
            </div>
        </div>
    )
}