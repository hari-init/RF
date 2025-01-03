import VectorClass from './VectorDB.module.css';
import NodeHeader from '../../nodeHeader/NodeHeader';
import useStore from '../../../store';
import { useState } from 'react';
import { Handle, Position } from 'reactflow';

export default function VectorDB() {
    const updateNodeData = useStore((state) => state.updateNodeData);
    const edges = useStore((state) => state.edges);
    const [dbName, setDbName] = useState('vectorDB');
    const [vectorType, setVectorType] = useState('float');
    const [vectorDim, setVectorDim] = useState('100');
    const [queryType, setQueryType] = useState('SELECT');
    const [vectorData, setVectorData] = useState('1,2,3,4,5,6,7,8,9,10');

    const handleExecute = () => {
        console.log('VectorDB Data Submitted:', dbName, vectorType, vectorDim, queryType, vectorData);
        updateNodeData(id, { value: { dbName, vectorType, vectorDim, queryType, vectorData } });

        edges.forEach(edge => {
            if (edge.source === id) {
                updateNodeData(edge.target, { value: { dbName, vectorType, vectorDim, queryType, vectorData } });
            }
        });
    };


    return (
    <div className={VectorClass.container}>
            <NodeHeader icon='vscode-icons:file-type-sql' title='VectorDB' details='v1.0' bg='#807f7580' />
            <div className={VectorClass.nodeBody}>
                <div className={VectorClass.formGroup}>
                    <label htmlFor='dbName'>Database Name:</label>
                    <input
                        id='dbName'
                        name='dbName'
                        value={dbName}
                        className={`${VectorClass.input} nodrag   `}
                        placeholder='Enter database name' />
                </div>
                <div className={VectorClass.formGroup}>
                    <label htmlFor='vectorType'>Vector Type: </label>
                    <input
                        id='vectorType'
                        name='vectorType'
                        value={vectorType}
                        className={`${VectorClass.input} nodrag`}
                        placeholder='Enter vector type'
                    />
                </div>
                <div className={VectorClass.formGroup}>
                    <label htmlFor='vectorDim'>Vector Dimensions:</label>
                    <input
                        id='vectorDim'
                        name='vectorDim'
                        value={vectorDim}
                        className={`${VectorClass.input} nodrag`}
                        placeholder='Enter vector dimensions'
                    />
                </div>
                <div className={VectorClass.formGroup}>
                    <label htmlFor='queryType'>Query Type:</label>
                    <input
                        id='queryType'
                        name='queryType'
                        value={queryType}
                        className={`${VectorClass.input} nodrag`}
                        placeholder='Enter query type'
                    />
                </div>
                <div className={VectorClass.formGroup}>
                    <label htmlFor='vectorData'>Vector Data:</label>
                    <input
                        id='vectorData'
                        name='vectorData'
                        value={vectorData}
                        className={`${VectorClass.input} nodrag`}
                        placeholder='Enter vector data'
                    />
                </div>
                <div className={VectorClass.buttonSec}>
                    <button type='button' className={VectorClass.submit} onClick={handleExecute}>Execute</button>
                </div>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}