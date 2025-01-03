import header from './Header.module.css';

export default function Header() {
    return(
        <div className={header.headerContainer}>
            <div className={`${header.header} shadow-md border`}>
                <div className={header.content}>
                <h2 className='font-bold'>React Flow - POC</h2>
                <button className={`${header.button} outline hover:outline-rf-outline hover:bg-rf-outline/25 text-rf-outline`}>
                    Run
                    <iconify-icon icon='ic:round-play-arrow' noobserver width='25' height='25'></iconify-icon>
                    </button> 
                </div>
            </div>
        </div>
    )
}