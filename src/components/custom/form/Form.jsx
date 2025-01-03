import FormClass from './Form.module.css';
import React, { useState, useCallback } from 'react';
import NodeHeader from '../../nodeHeader/NodeHeader';
import { Handle, Position } from 'reactflow';
import useStore from '../../../store';

export default function Form({ id, data }) {
    const updateNodeData = useStore((state) => state.updateNodeData);
    const edges = useStore((state) => state.edges);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(preFormData => ({ ...preFormData, [name]: value }));
        console.log('Form Data:', formData);
    };

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        console.log('Form Data Submitted:', formData);
        updateNodeData(id, { value: formData });

        edges.forEach(edge => {
            if (edge.source === id) {
                updateNodeData(edge.target, { value: formData });
            }
        });
    }, [id, formData, updateNodeData, edges]);


    return (
        <div className={FormClass.container}>
            <NodeHeader icon='clarity:form-line' title='User Form' details='v1.0' bg='#ffd0a580'/>        
            <div className={FormClass.nodeBody}>
                <form onSubmit={handleSubmit}>
                    <div className={FormClass.formGroup}>
                        <label htmlFor='name'>Name:</label>
                        <textarea id='name' name='name' className={`${FormClass.input} nodrag`} placeholder='Enter user name' onChange={handleChange} />
                    </div>
                    <div className={FormClass.formGroup}>
                        <label htmlFor='email'>Email:</label>
                        <input type='email' name='email' id='email' className={`${FormClass.input} nodrag`} placeholder='xxxxx@gmail.com' onChange={handleChange} />
                    </div>
                    <div className={FormClass.formGroup}>
                        <label htmlFor='Age'>User age:</label>
                        <input type='text' name='age' id='age' className={`${FormClass.input} nodrag`} placeholder='Your Age' onChange={handleChange} />
                    </div>
                    <div className={FormClass.buttonSec}>
                        <button type='submit' className={FormClass.submit}>Test</button>
                    </div>
                    <Handle type="source" position={Position.Bottom} />
                </form>
            </div>
        </div>
    );
}