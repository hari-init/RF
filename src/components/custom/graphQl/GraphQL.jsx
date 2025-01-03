import React, { useState, useCallback, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import GraphQLClass from './GraphQL.module.css';
import NodeHeader from '../../nodeHeader/NodeHeader';
import useStore from '../../../store';

export default function GraphQL({ id, data }) {
    const updateNodeData = useStore((state) => state.updateNodeData);
    const updateMonitorNode = useStore((state) => state.updateMonitorNode);
    const edges = useStore((state) => state.edges);
    const [characterName, setCharacterName] = useState('');
    const [resultField, setResultField] = useState('');
    const[isProcessing, setIsProcessing] = useState(false);
    const [queryResult, setQueryResult] = useState(null);

    // const setRequiredField = (value) => {
    //     setResultField((prevVal) => {
    //         const newVal = value;
    //         return newVal
    //     });
    // }

    useEffect(() => {
        updateMonitorNode(id, { value: { characterName, queryResult, resultField, isProcessing } });
    }, [isProcessing]);

    const handleExecute = useCallback(async (event) => {
        event.preventDefault();
        console.log('GraphQL Data Submitted:', characterName, resultField);
        let result = resultField.replace(/,/g, ' ');
        console.log('Result:', result);
        try {
            setIsProcessing(true);
            const response = await fetch(`https://rickandmortyapi.com/graphql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        query {
                            characters(page: 1 , filter: { name: "${characterName}" }) {
                                results {${result}}
                            }
                        }
                    `
                }),
            });

            const { data } = await response.json();
            setQueryResult(data.characters.results);

            console.log('GraphQL Data Submitted:', characterName, resultField, queryResult);
            updateNodeData(id, { value: { characterName, queryResult, resultField } });
            updateMonitorNode(id, { value: { characterName, queryResult, resultField } });

            // edges.forEach(edge => {
            //     if (edge.source === id) {
            //         updateNodeData(edge.target, { value: { characterName } });
            //     }
            // });
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsProcessing(false);
        } finally {
            setIsProcessing(false);
        }
    }, [characterName, edges, id, updateNodeData, resultField]);

    return (
        <div className={GraphQLClass.container}>
            <NodeHeader icon='vscode-icons:file-type-graphql' title='GraphQL' details='v1.0' bg='#807f7580' />
            <div className={GraphQLClass.nodeBody}>
                <div className={GraphQLClass.formGroup}>
                    <label htmlFor='characterName'>Character Name:</label>
                    <input
                        id='characterName'
                        name='characterName'
                        value={characterName}
                        className={`${GraphQLClass.input} nodrag`}
                        onChange={(e) => setCharacterName(e.target.value)}
                        placeholder='Enter character name from Rick and Morty'
                    />
                </div>
                <div className={GraphQLClass.formGroup}>
                    <label htmlFor='requiredResults'>Required Result (Comma separated):  </label>
                    <input
                        id='requiredResults'
                        name='requiredResults'
                        value={resultField}
                        className={`${GraphQLClass.input} nodrag`}
                        onChange={(e) => setResultField(e.target.value)}
                        placeholder='id, name, species, status'
                    />
                </div>
                <div className={GraphQLClass.buttonSec}>
                    <button type='button' className={GraphQLClass.submit} onClick={handleExecute}>Execute</button>
                </div>
                {/* {queryResult && (
                    <div className={GraphQLClass.results}>
                        <strong>Results:</strong>
                        <ul>
                            {queryResult.map(character => (
                                <li key={character.id}>
                                    {character.name} - {character.species}
                                </li>
                            ))}
                        </ul>
                    </div>
                )} */}
            </div>

            {/* <Handle type="source" position={Position.Bottom} /> */}
        </div>
    );
}
