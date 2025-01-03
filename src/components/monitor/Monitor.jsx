import React, { useEffect, useState } from 'react';
import MonitorClass from './Monitor.module.css';
import useStore from '../../store';
import MNode from '../monitorNode/MNode';
import CNodes from '../../customNode.json';



export default function Monitor() {
    const monitorNodes = useStore((state) => state.monitorNodes);
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const [toggleMonitor, setToggleMonitor] = useState(false);
    const [connection, setConnection] = useState([]);

    const handleToggleMonitor = () => {
        setToggleMonitor(!toggleMonitor);
    }

    const cnObject = CNodes.reduce((acc, item) => {
        acc[item.type] = item;
        return acc;
    }, {});

    const customNodes = monitorNodes.map((node, index) => {
        let mnodeObj = cnObject[node?.type];
        return <MNode
            key={node.type}
            icon={mnodeObj?.icon}
            name={mnodeObj?.name}
            isProcessing={node?.data?.value?.isProcessing}
            output={node?.data?.value?.queryResult}
        />
    });

    const connectedNodes = connection.map((node, index) => {
        const cnode = nodes.find((n) => n.id === node);
        let nodePosition = 'input';
        if (index === 0) {
            nodePosition = 'input';
        } else if (index === connection.length - 1) {
            nodePosition = 'output';
        } else {
            nodePosition = 'transition';
        }

        if (!cnode) return null;
        let mnodeObj = cnObject[cnode?.type];

        monitorNodes.map((mnode, index) => {
            if (mnode.id === cnode.id) {
                monitorNodes.splice(index, 1);
            }
        })

        
        return <MNode
            key={cnode?.type}
            icon={mnodeObj?.icon}
            name={`${mnodeObj?.name} [${nodePosition}]`}
            isProcessing={''}
            output={node?.data?.value?.queryResult}
        />
    });

    useEffect(() => {
        if (edges.length) {
            setConnection([]);
        }

        if (edges.length < 2) {
            for (let i = 0; i < edges.length; i++) {
                const edge = edges[i];
                setConnection([edge.source, edge.target]);
            }
        } else {
            for (let i = 0; i < edges.length - 1; i++) {
                const currentEdge = edges[i];
                const nextEdge = edges[i + 1];

                if (currentEdge.target === nextEdge.source) {
                    setConnection([currentEdge.source, currentEdge.target, nextEdge.target]);
                }
            }

        }
    }, [edges]);

    return (
        <>
            <div>
                <button onClick={handleToggleMonitor} className={`${toggleMonitor ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-95'} ${MonitorClass.toggleButtonClose} transition-all ease-in-out  hover:-translate-x-1 hover:scale-105 delay-0`}>
                    <div className='rounded-full hover:bg-rf-outline/25 text-rf-outline  px-1.5 py-1.5 flex items-center mb-1.5 hover:bg-gray-100 '>
                        <iconify-icon icon='radix-icons:double-arrow-right' noobserver width='25' height='25'></iconify-icon>
                    </div>
                </button>

                <div className={`${toggleMonitor ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-95'} ${MonitorClass.container} shadow-md border shadow-md border
                transition-all duration-200 ease-in-out
                transform origin-top-right`}>
                    {customNodes}
                    {
                        connectedNodes.length > 0 && <div className='p-3 border border-dashed  border-rf-outline/50 m-5 rounded-md'  >
                            {connectedNodes}
                        </div>
                    }

                </div>
            </div>

            <button onClick={handleToggleMonitor} className={`${toggleMonitor ? 'invisible opacity-0' : 'visible opacity-100'} ${MonitorClass.toggleButtonOpen} transition-all ease-in-out duration-500 hover:-translate-x-1 hover:scale-105 delay-0 `}>
                <div className='rounded-full hover:bg-rf-outline/25 text-rf-outline  px-1.5 py-1.5 flex items-center mb-1.5 hover:bg-gray-100'>
                    <iconify-icon icon='radix-icons:double-arrow-left' noobserver width='25' height='25'></iconify-icon>
                </div>
            </button>

        </>

    )
}