import nodeClass from './Node.module.css';

export default function Node({ name, onDragStart, draggable, details, icon}) {
    return (
        <div className={`${nodeClass.parentContainer} border-b`} onDragStart={onDragStart} draggable={draggable}>
            <div className={nodeClass.container}>
            <div className={nodeClass.svgContainer}>
            <iconify-icon icon={icon} noobserver width='40' height='40'></iconify-icon>
            </div>
            <div className={nodeClass.infoContainer}>
                <h3>{name}</h3>
                <p>{details}</p>
            </div>
            </div>
        </div>
    )
}