import { Handle, Position } from 'reactflow';
import React, { useState, useCallback, useEffect } from 'react';
import SQLClass from './SQL.module.css';
import NodeHeader from '../../nodeHeader/NodeHeader';
import useStore from '../../../store';

export default function SQL({ id, data }) {
    const updateNodeData = useStore((state) => state.updateNodeData);
    const edges = useStore((state) => state.edges);
    const [tableName, setTableName] = useState('users');
    const [columns, setColumns] = useState('id,name,email');
    const [queryType, setQueryType] = useState('SELECT');
    const [condition, setCondition] = useState('');
    const [queryResult, setQueryResult] = useState([]);


    const handleExecute = useCallback((event) => {
        event.preventDefault();
        console.log('SQL Data Submitted:', tableName, columns, queryType);
        updateNodeData(id, { value: { tableName, columns, queryType } });

        edges.forEach(edge => {
            if (edge.source === id) {
                updateNodeData(edge.target, { value: { tableName, columns, queryType } });
            }
        });
    });

    return (
        <div className={SQLClass.container}>
            <NodeHeader icon='vscode-icons:file-type-sql' title='SQL' details='v1.0' bg='#807f7580' />
            <div className={SQLClass.nodeBody}>
                <div className={SQLClass.formGroup}>
                    <label htmlFor='tableName'>Table Name</label>
                    <input
                        id='tableName'
                        name='tableName'
                        value={tableName}
                        className={`${SQLClass.input} nodrag`}
                        onChange={(e) => setTableName(e.target.value)}
                        placeholder='Enter table name' />
                </div>
                <div className={SQLClass.formGroup}>
                    <label htmlFor='columns'>Columns (comma-separated):</label>
                    <input
                        id='columns'
                        name='columns'
                        value={columns}
                        className={`${SQLClass.input} nodrag`}
                        onChange={(e) => setColumns(e.target.value)}
                        placeholder='Enter columns'
                    />
                </div>
                <div className={SQLClass.formGroup}>
                    <label htmlFor='query'>Query Type:</label>
                    <select className={`${SQLClass.input} nodrag`}
                        onChange={(e) => setQueryType(e.target.value)}
                    >
                        <option value='SELECT'>SELECT</option>
                        <option value='INSERT'>INSERT</option>
                        <option value='UPDATE'>UPDATE</option>
                        <option value='DELETE'>DELETE</option>
                    </select>
                </div>
                {
                queryType !== 'INSERT' && (
                    <div className={SQLClass.formGroup}>
                    <label htmlFor='condition'>Condition:</label>
                    <input
                        id='condition'
                        name='condition'
                        value={condition}
                        className={`${SQLClass.input} nodrag`}
                        onChange={(e) => setCondition(e.target.value)}
                        placeholder='Enter condition'
                    />
                </div>
                )
                }
                <div className={SQLClass.buttonSec}>
                    <button type='button' className={SQLClass.submit} onClick={handleExecute}>Execute</button>
                </div>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}