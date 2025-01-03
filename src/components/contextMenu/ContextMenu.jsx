import React, { useCallback, useState } from 'react';
import { useReactFlow } from 'reactflow';
import ContextMenuClass from './ContextMenu.module.css';
import useStore from '../../store';

export default function ContextMenu({
  id,
  top,
  left,
  right,
  bottom,
  ...props
}) {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
  const setMonitorNodes = useStore((state) => state.setMonitorNodes);
  const duplicateNode = useCallback(() => {
    const node = getNode(id);
    const position = {
      x: node.position.x + 50,
      y: node.position.y + 50,
    };

    addNodes({
      ...node,
      selected: false,
      dragging: false,
      id: `${node.id}-copy`,
      position,
    });
  }, [id, getNode, addNodes]);


  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
    setMonitorNodes();
  }, [id, setNodes, setEdges]);

  return (
    <div
      style={{ top, left, right, bottom }}
      className={`${ContextMenuClass.contextMenu} border rounded-md`}
      {...props}
    >
      <button onClick={duplicateNode} className='flex items-center justify-start border-b'>
      <div className='flex items-center justify-start text-rf-outline'>
        <iconify-icon icon="mdi:content-copy" width='18' height='18'/>
        <p className='ml-3 text-black'>Duplicate</p>
      </div>
      </button>
      <button onClick={deleteNode}>
        <div className='flex items-center justify-start text-rf-outline'>
        <iconify-icon icon="mdi:delete" width='18' height='18'/>
        <p className='ml-3 text-black'>Delete</p>
        </div>
      </button>
    </div>
  );
}
