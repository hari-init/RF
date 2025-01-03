import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import NodeHeader from '../../nodeHeader/NodeHeader';
import InputClass from './Input.module.css';
import useStore from '../../../store';


export default function Input({ id, data }) {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const edges = useStore((state) => state.edges);

  const onChange = useCallback((event) => {
    updateNodeData(id, { value: event.target.value });

    edges.forEach(edge => {
      if (edge.source === id) {
        updateNodeData(edge.target, { value: event.target.value });
      }
    });
  }, [id, updateNodeData, edges]);

  

  return (
    <>
    <div className={InputClass.inputNode}>
      <div className={InputClass.inputHeader}>
      <NodeHeader icon='vscode-icons:file-type-text' title='Input' details='v1.0' bg='#a5dbff80'/>
      </div>
      <div className={InputClass.inputBody}>
        <label htmlFor="text">Text:</label>
        <input className={`${InputClass.input} nodrag`} id="text" name="text" value={data.value} onChange={onChange}  placeholder='Enter the Input Text'/>
      </div>
      <Handle type="source" position={Position.Bottom}/>
    </div>
    </>
  );
}

