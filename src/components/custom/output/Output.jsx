import { useCallback } from 'react';
import NodeHeader from '../../nodeHeader/NodeHeader';
import { Handle, Position } from 'reactflow';
import OutputClass from './Output.module.css';


export default function Output({ data }) {
  console.log('output',data)
  return (
    <div className={OutputClass.outputNode}>
      <Handle type="target" position={Position.Top} />
      <div className={OutputClass.inputHeader}>
        <NodeHeader icon='vscode-icons:file-type-text' title='Onput' details='v1.0' bg='#a5dbff80' />
      </div>
      <div className={OutputClass.inputBody}>
        <label htmlFor="text">Output Text:</label>
        <textarea className={`${OutputClass.input} nodrag`} id="text" name="text" value={data.value} onChange={() => {}} />
      </div>
      {/* <div>
            <label htmlFor="text">Output Text:</label>
            <textarea id="text" name="text" className="nodrag" value={data.value} onChange={() => {}}/>
          </div> */}

    </div>
  );
}
