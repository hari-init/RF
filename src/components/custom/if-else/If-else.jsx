import { Handle, Position } from 'reactflow';
import React, { useState, useCallback, useEffect } from 'react';
import IfElseClass from './If-else.module.css';
import NodeHeader from '../../nodeHeader/NodeHeader';
import useStore from '../../../store';



export default function IF({ id, data, icon }) {
    const updateNodeData = useStore((state) => state.updateNodeData);
    const edges = useStore((state) => state.edges);
    const nodes = useStore((state) => state.nodes);
    const [condition, setCondition] = useState('isTrue');
    const [conditionValue, setConditionValue] = useState('');
    const [conditionSrc, setConditionSrc] = useState('');
    const [targetData, setTargetData] = useState('');


    // Extract dropdown options from props object
    const dropdownOptions = Object.keys(data.value);

    // Set initial state with the first option
    useEffect(() => {
        if (dropdownOptions.length > 0) {
            setConditionSrc(dropdownOptions[0]);
        }
    }, [data]);

    useEffect(() => {
        // updateNodeData(id, { value: targetData });
        edges.forEach(edge => {
            if (edge.source === id) {
                updateNodeData(edge.target, { value: targetData });
            }
        });
    }, [targetData]);

    useEffect((event) => {
        nodes.forEach((node) => {
            if (node.type === 'pathNode') {
                const source = data.value[conditionSrc]

                if (condition === 'isTrue' && conditionValue === source) {
                    console.log('true');
                    setTargetData( source );
                } else if (condition === 'isFalse' && conditionValue !== source) {
                    console.log('false');
                } else if (condition === 'isEmpty' && source === '') {
                    console.log('empty');
                } else if (condition === 'isNotEmpty' && source !== '') {
                    console.log('not empty');
                } else {
                    console.log('else');
                    //     updateNodeData(id, { value: '' });
                    //     edges.forEach(edge => {
                    //         if (edge.source === id) {
                    //             updateNodeData(edge.target, { value: '' });
                    //         }
                    //     });
                }
            }
        });
    }, [conditionValue, condition, conditionSrc]);


    // useEffect((event) => {
    //     console.log('data', data);
    //     nodes.forEach((node) => {
    //         if (node.type === 'pathNode') {
    //             const { value } = node.data;

    //             if (condition === 'isTrue' && conditionValue === value) {
    //                 updateNodeData(id, { value: value });
    //                 edges.forEach(edge => {
    //                     if (edge.source === id) {
    //                         updateNodeData(edge.target, { value: value });
    //                     }
    //                 });
    //             } else if (condition === 'isFalse' && conditionValue !== value) {
    //                 console.log('false');
    //             } else if (condition === 'isEmpty' && value === '') {
    //                 console.log('empty');
    //             } else if (condition === 'isNotEmpty' && value !== '') {
    //                 console.log('not empty');
    //             }
    //         }
    //     });
    //     // updateNodeData(id, { value: event.target.value });
    //     // edges.forEach(edge => {
    //     //     if (edge.source === id) {
    //     //       updateNodeData(edge.target, { value: event.target.value });
    //     //     }
    //     //   });
    // }, [data, conditionValue]);



    return (
        <>
            <div className={IfElseClass.labelStyleTop}>external condition from the node</div>
            <div className={IfElseClass.container}>
                <Handle type="target"
                    position="top"
                />
                <NodeHeader icon='solar:branching-paths-down-line-duotone' title='Path' details='v1.0' bg='#807f7580' />
                <div className={IfElseClass.nodeBody}>
                    <div className={IfElseClass.formGroup}>
                        <label htmlFor='condition'>Condition Source:</label>
                        <select value={conditionSrc} className={`${IfElseClass.input} nodrag`} onChange={(e) => setConditionSrc(e.target.value)}>
                            {Object.keys(data.value).map((key) => (
                                <option key={key} value={key}>
                                    {key} - {data.value[key]}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={IfElseClass.formGroup}>
                        <label htmlFor='condition'>Condition Type:</label>
                        <select value={condition} className={`${IfElseClass.input} nodrag`} onChange={(e) => setCondition(e.target.value)}>
                            <option value='isTrue'>Is True</option>
                            <option value='isFalse'>Is False</option>
                            <option value='isEmpty'>Is Empty</option>
                            <option value='isNotEmpty'>Is Not Empty</option>
                        </select>
                    </div>
                    <div className={IfElseClass.formGroup}>
                        <label htmlFor='conditionText'>Condition Text:</label>
                        <input
                            id='conditionText'
                            name='conditionText'
                            onChange={(e) => setConditionValue(e.target.value)}
                            className={`${IfElseClass.input} nodrag`}
                            placeholder='Enter the condition' />
                    </div>
                    <div className={IfElseClass.innerContainer}>
                        <p>Drag and drop the nodes here</p>
                    </div>
                </div>

                <Handle type="source"
                    position="bottom"
                />
                <div className={IfElseClass.buttonSec}>
                    <button type='button' className={IfElseClass.submit} >Execute</button>
                </div>

                {/* <Handle type="source"
                    position="bottom"
                    id="b"
                    style={{ left: '75%', backgroundColor: '#555' }} /> */}
            </div>
            <div className={IfElseClass.labelStyleLeft}>Outputs when condition is true</div>
            {/* <div className={IfElseClass.labelStyleRight}>else - condition satisfies to false</div> */}

        </>
    );
}