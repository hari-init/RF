import {Handle, Position} from 'reactflow';
import React, { useState, useCallback } from 'react';
import OutlookClass from './Outlook.module.css';
import NodeHeader from '../../nodeHeader/NodeHeader';
import useStore from '../../../store';

export default function Outlook({id, data, icon}) {
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
        const {name, value} = e.target;
        setFormData(preFormData => ({...preFormData, [name]: (name === 'saveDraft' || name === 'sendAsHtml') ? e.target.checked : value}));

        console.log('Outlook Data:', formData);
    }


    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        console.log('Outlook Data Submitted:', formData);
        updateNodeData(id, {value: formData});

        edges.forEach(edge => {
            if (edge.source === id) {
                updateNodeData(edge.target, {value: formData});
            }
        });
    }, [id, formData, updateNodeData, edges]);




    return (
        <div className={OutlookClass.container}>
            <NodeHeader icon='vscode-icons:file-type-outlook' title='OutLook' details='v1.0' bg='#94c6ff80' />
            <div className={OutlookClass.nodeBody}>
                <form onSubmit={handleSubmit}>
                    <div className={OutlookClass.formGroup}>
                        <label htmlFor='body'>body:</label>
                        <textarea id='body' name='body' className={`${OutlookClass.input} nodrag`} placeholder='enter email body' onChange={handleChange} />
                    </div>
                    <div className={OutlookClass.formGroup}>
                        <label htmlFor='recipient'>recipient:</label>
                        <input type='email' name='recipient' id='recipient' className={`${OutlookClass.input} nodrag`} placeholder='xxxxx@outlook.com' onChange={handleChange} />
                    </div>
                    <div className={OutlookClass.formGroup}>
                        <label htmlFor='subject'>subject:</label>
                        <input type='text' name='subject' id='subject' className={`${OutlookClass.input} nodrag`} placeholder='email subject' onChange={handleChange} />
                    </div>
                    <div className={OutlookClass.formGroup}>
                        <label htmlFor='senderName'>sender display name:</label>
                        <input type='text' name='senderName' id='senderName' className={`${OutlookClass.input} nodrag`} placeholder='Your Name' onChange={handleChange} />
                    </div>
                    <div className={OutlookClass.formGroup}>
                        <label htmlFor='saveDraft'>save as draft:</label>
                        <input type='checkbox' name='saveDraft' id='saveDraft' className={`${OutlookClass.checkbox} nodrag`} defaultChecked onChange={handleChange} />
                    </div>
                    <div className={OutlookClass.formGroup}>
                        <label htmlFor='sendAsHtml'>send as html:</label>
                        <input type='checkbox' name='sendAsHtml' id='sendAsHtml' className={`${OutlookClass.checkbox} nodrag`} onChange={handleChange} />
                    </div>
                    <div className={OutlookClass.buttonSec}>
                        <button type='submit' className={OutlookClass.submit}>Test</button>
                    </div>
                </form>
            </div>
            <Handle type='source' position={Position.Bottom} />
        </div>
    )
}