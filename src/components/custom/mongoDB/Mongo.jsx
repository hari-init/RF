import { Handle, Position } from 'reactflow';
import React, { useState, useCallback, useEffect } from 'react';
import MongoClass from './Mongo.module.css';
import NodeHeader from '../../nodeHeader/NodeHeader';
import useStore from '../../../store';

export default function Mongo({ id, data }) {
    const updateNodeData = useStore((state) => state.updateNodeData);
    const edges = useStore((state) => state.edges);
    const [databaseName, setDatabaseName] = useState('');
    const [collection, setCollection] = useState('');
    const [uri, setUri] = useState('');
    const [auth, setAuth] = useState({ user: '', password: '' });


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
        <div className={MongoClass.container}>
            <NodeHeader icon='vscode-icons:file-type-mongo' title='MongoDB' details='v1.0' bg='##9bf2aa80' />
            <div className={MongoClass.nodeBody}>
                <div className={MongoClass.formGroup}>
                    <label htmlFor='databaseName'>Database name</label>
                    <input
                        id='databaseName'
                        name='databaseName'
                        value={databaseName}
                        className={`${MongoClass.input} nodrag`}
                        onChange={(e) => setDatabaseName(e.target.value)}
                        placeholder='Enter database name' />
                </div>
                <div className={MongoClass.formGroup}>
                    <label htmlFor='collection'>Collection name</label>
                    <input
                        id='collection'
                        name='collection'
                        value={collection}
                        className={`${MongoClass.input} nodrag`}
                        onChange={(e) => setCollection(e.target.value)}
                        placeholder='Enter collection name' 
                    />
                </div>
                <div className={MongoClass.formGroup}>
                    <label htmlFor='uri'>Uri</label>
                    <input
                        id='uri'
                        name='uri'
                        value={collection}
                        className={`${MongoClass.input} nodrag`}
                        onChange={(e) => setUri(e.target.value)}
                        placeholder='Enter collection name' 
                    />
                </div>
                <div className={MongoClass.formGroup}>
                    <label>Auth:</label>
                    <br />
                    <label htmlFor='authUser'>User</label>
                    <input
                        id='authUser'
                        name='authUser'
                        value={auth.user}
                        className={`${MongoClass.input} nodrag`}
                        onChange={(e) => setAuth({ ...auth, user: e.target.value })}
                        placeholder='Enter user name' 
                    />
                    <label htmlFor='authPassword'>Password</label>
                    <input
                        id='authPassword'
                        name='authPassword'
                        value={auth.password}
                        className={`${MongoClass.input} nodrag`}
                        onChange={(e) => setAuth({ ...auth, password: e.target.value })}
                        placeholder='Enter password'
                    />
                </div>
                <div className={MongoClass.buttonSec}>
                    <button type='button' className={MongoClass.submit} onClick={handleExecute}>Execute</button>
                </div>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}