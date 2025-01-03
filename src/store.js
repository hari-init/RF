import { create } from "zustand";
import { nanoid } from "nanoid";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "reactflow";

const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  monitorNodes: [],
  connections: [],

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    console.log("onEdgesChange", changes);
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    console.log("connection", connection);
    set({
      edges: addEdge({...connection, animated: true}, get().edges),
    });
    set({
      connections: [...get().connections, connection],
    });
  },

  setNodes: (nodes) => {
    set({ nodes });
  },

  setEdges: (edges) => {
    console.log("setEdges", edges);
    set({ edges });
  },

  setMonitorNodes: () => {
    set({
      monitorNodes: [...get().nodes],
    });
  },

  addNode: (event, screenToFlowPosition, isPath) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("application/reactflow");

    if (typeof type === "undefined" || !type) {
      return;
    }

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode = {
      id: nanoid(),
      type,
      position,
      data: { label: `${type} node`, onChange: () => {}, value:""},
    };

    set((state) => ({
      nodes: [newNode, ...state.nodes],
      monitorNodes: [newNode, ...state.monitorNodes],
    }));
  },

  updateMonitorNode: (id, data) =>
    set((state) => ({
      monitorNodes: state.monitorNodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    }), 
  ),

  updateNodeData: (id, data) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    })),
}));

export default useStore;
