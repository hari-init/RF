import Json from '../custom/jsonViewer/Json';
import MNodeClass from './MNode.module.css';

export default function MNode({ icon, name, isProcessing, output }) {
    return (
        <div className={`${MNodeClass.container} border shadow-sm outline-rf-outline hover:border-rf-outline`} >
            <div className={MNodeClass.svgContainer}>
            <iconify-icon icon={icon} noobserver width='20' height='20'></iconify-icon>
            </div>
            <div className={MNodeClass.infoContainer}>
                <p>{name}</p>
            <h5>{isProcessing ? 'Processing...' : 'done'}</h5>
            <pre>{JSON.stringify(output)}</pre>
            </div>
        </div>
    )
}