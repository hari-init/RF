import React, { useRef, useCallback, useState,useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import ReactFlow, { ReactFlowProvider, useReactFlow, Controls, MiniMap, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import './app.css';

import useStore from './store';
import Sidebar from './components/sideBar/SideBar';
import Header from './components/header/Header';
import Input from './components/custom/input/Input';
import Output from './components/custom/output/Output';
import Json from './components/custom/jsonViewer/Json';
import Form from './components/custom/form/Form';
import Gmail from './components/custom/gmail/Gmail';
import Monitor from './components/monitor/Monitor';
import Outlook from './components/custom/outlook/Outlook';
import SQL from './components/custom/sql/SQL';
import VectorDB from './components/custom/vectorDb/VectorDB';
import IfElse from './components/custom/if-else/If-else';
import GraphQL from './components/custom/graphQl/GraphQL';
import ContextMenu from './components/contextMenu/ContextMenu';
import Mongo from './components/custom/mongoDB/Mongo';



const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  addNode: state.addNode,
  setMonitorNodes: state.setMonitorNodes,
});

const nodeTypes = {
  inputNode: Input,
  outputNode: Output,
  jsonNode: Json,
  formNode: Form,
  gmailNode: Gmail,
  outlookNode: Outlook,
  sqlNode: SQL,
  vectorDb: VectorDB,
  pathNode: IfElse,
  graphQlNode: GraphQL,
  mongoDbNode: Mongo,
};

const DnDFlow = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode } = useStore(useShallow(selector));
  const [menu, setMenu] = useState(null);
  const reactFlowWrapper = useRef(null);
  const ref = useRef(null);
  const { screenToFlowPosition } = useReactFlow();
  const { setViewport } = useReactFlow();
  const updateMonitorNode = useStore((state) => state.updateMonitorNode);

  useEffect(() => {
    setViewport({ x: 0, y: 0, zoom: 0.5 }); 
  }, [setViewport]);


  const onNodeContextMenu = useCallback(
    (event, node) => {
      event.preventDefault();

      const pane = ref.current.getBoundingClientRect();
      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });
    },
    [setMenu],
  );

  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDragStop = useCallback(
    (event, node) => {
      const groupNode = nodes.find((n) => n.type === 'pathNode');
      if (groupNode) {
        const isInsideGroup =
          node.position.x > groupNode.position.x &&
          node.position.x < groupNode.position.x + groupNode.width &&
          node.position.y > groupNode.position.y &&
          node.position.y < groupNode.position.y + groupNode.height;

        if (isInsideGroup && node.type !== 'pathNode') {
          addNode(event,(nds) =>
            nds.map((nd) =>
              nd.type === node.type
                ? {
                  ...nd,
                  position: {
                    x: node.position.x - groupNode.position.x,
                    y: node.position.y - groupNode.position.y,
                  },
                  parentNode: 'pathNode',
                }
                : nd
            )
          );
        }
      }
    },
    [nodes, addNode]
  );

  const onDeleteNode = useCallback((nodeId) => {
    updateMonitorNode(nodeId, { value: { characterName: '', queryResult: null, resultField: '', isProcessing: false } });
  }, [nodes]);

  const onDrop = useCallback((event) => addNode(event, screenToFlowPosition), [screenToFlowPosition]);
  return (
    <div className="dndflow">
      <Header />
      <Sidebar />
      <Monitor />
      <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
         ref={ref}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodesDelete={onDeleteNode}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeDragStop={onDragStop}
          onDrag={onPaneClick}
          onPaneClick={onPaneClick}
          onNodeContextMenu={onNodeContextMenu}
          // onNodeMouseEnter={onNodeContextMenu}
          // onNodeMouseLeave={onPaneClick}
          // fitView
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
          
          {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
        </ReactFlow>
      </div>

    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <DnDFlow />
  </ReactFlowProvider>
);
