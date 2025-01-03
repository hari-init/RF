import { Handle, Position } from 'reactflow';
import React, { useState, useCallback, useEffect } from 'react';
import GmailClass from './Gmail.module.css'
import NodeHeader from '../../nodeHeader/NodeHeader';
import useStore from '../../../store';

export default function Gmail({ id, data, icon }) {
    const updateNodeData = useStore((state) => state.updateNodeData);
    const edges = useStore((state) => state.edges);
    const [formData, setFormData] = useState({
        body: '',
        recipient: '',
        subject: '',
        senderName: '',
        saveDraft: true,
        sendAsHtml: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(preFormData => ({ ...preFormData, [name]: (name === 'saveDraft' || name === 'sendAsHtml') ? e.target.checked : value }));

        console.log('Gmail Data:', formData);
    }

    useEffect((event) => {
        // event.preventDefault();
        console.log('Gmail Data Submitted:', formData);
        updateNodeData(id, { value: formData });

        edges.forEach(edge => {
            if (edge.source === id) {
                updateNodeData(edge.target, { value: formData });
            }
        });
    }, [formData]);

    return (
        <div className={GmailClass.container}>
            <NodeHeader icon='logos:google-gmail' title='Gmail sender' details='v1.0' bg='#ffaaa580' />
            <div className={GmailClass.nodeBody}>
                <form >
                    <div className={GmailClass.formGroup}>
                        <label htmlFor='body'>body:</label>
                        <textarea id='body' name='body' className={`${GmailClass.input} nodrag`} placeholder='enter email body' onChange={handleChange} />
                    </div>
                    <div className={GmailClass.formGroup}>
                        <label htmlFor='recipient'>recipient:</label>
                        <input type='email' name='recipient' id='recipient' className={`${GmailClass.input} nodrag`} placeholder='xxxxx@gmail.com' onChange={handleChange} />
                    </div>
                    <div className={GmailClass.formGroup}>
                        <label htmlFor='subject'>subject:</label>
                        <input type='text' name='subject' id='subject' className={`${GmailClass.input} nodrag`} placeholder='email subject' onChange={handleChange} />
                    </div>
                    <div className={GmailClass.formGroup}>
                        <label htmlFor='senderName'>sender display name:</label>
                        <input type='text' name='senderName' id='senderName' className={`${GmailClass.input} nodrag`} placeholder='Your Name' onChange={handleChange} />
                    </div>
                    <div className={GmailClass.formGroup}>
                        <label htmlFor='saveDraft'>save as draft:</label>
                        <input type='checkbox' name='saveDraft' id='saveDraft' className={`${GmailClass.checkbox} nodrag`} defaultChecked onChange={handleChange} />
                    </div>
                    <div className={GmailClass.formGroup}>
                        <label htmlFor='sendAsHtml'>send as html:</label>
                        <input type='checkbox' name='sendAsHtml' id='sendAsHtml' className={`${GmailClass.checkbox} nodrag`} onChange={handleChange} />
                    </div>
                    <div className={GmailClass.buttonSec}>
                        <button type='submit' className={GmailClass.submit}>Test</button>
                    </div>
                </form>
            </div>
            <Handle type='source' position={Position.Bottom} />
        </div>
    );
}