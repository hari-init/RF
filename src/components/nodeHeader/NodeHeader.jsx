import NHClass from './NodeHeader.module.css';
export default function NodeHeader({ icon, title, details, bg }) {
    return (
        <div className={NHClass.nodeHeader} style={{backgroundColor:bg}}>
            <div className={NHClass.header}>
                <div className={NHClass.headerIcon}>
                    <iconify-icon icon={icon} noobserver width='40' height='40'></iconify-icon>
                </div>
                <div>
                    <p className={NHClass.headerTitle}>{title}</p>
                    <p className={NHClass.headerDetails}>{details}</p>
                </div>
            </div>
        </div>
    )
}