import { useState } from 'react';
import sideBar from './SideBar.module.css';
import Node from '../node/Node';
import CNodes from '../../customNode.json';

export default function SideBar() {
    const [toggleSideBar, setToggleSideBar] = useState(false);
    const [filter, setFilter] = useState(CNodes);
    const [filterQuery, setFilterQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleToggleSideBar = () => {
        setToggleSideBar(!toggleSideBar);
    }

    const handleFilter = (event) => {
        const query = event.target.value;
        setSelectedCategory('');
        setFilter(CNodes);
        setFilterQuery(query);
        const filteredNodes = CNodes.filter((node) => {
            return node.name.toLowerCase().includes(query.toLowerCase());
        });
        setFilter(filteredNodes);
    }

    const handleCategoryFilter = (category) => {
        if (category === selectedCategory) {
            setSelectedCategory('');
            setFilter(CNodes);
            return;
        }
        setSelectedCategory(category);
        const filteredNodes = CNodes.filter((node) => {
            return node.category === category;
        });
        setFilter(filteredNodes);
    }

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const categories = [...new Set(CNodes.map((node) => node.category))];

    const categoryFilter = categories.map((category, index) => {
        let color = '';
        if (category === 'Database') {
            color = '#3B82F6'; // blue-500
        } else if (category === 'api') {
            color = '#22C55E'; // green-500
        } else if (category === 'Control') {
            color = '#EAB308'; // yellow-500
        } else if (category === 'Email') {
            color = '#EF4444'; // red-500
        } else if (category === 'Form') {
            color = '#A855F7'; // purple-500
        } else if (category === 'Data') {
            color = '#6366F1'; // indigo-500
        } else if (category === 'Text') {
            color = '#EC4899'; // pink-500
        } else {
            color = '#6B7280'; // gray-500, default color
        }

        const baseStyle = {
            color: color,
            backgroundColor: `${color}33`, // 20% opacity
        };

        const selectedStyle = {
            ...baseStyle,
            outlineColor: `${color}80`, // 50% opacity
            outlineWidth: '2px',
            outlineStyle: 'solid',
            backgroundColor: 'white',
        };

        return (
            <button
                key={index}
                onClick={() => handleCategoryFilter(category)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${selectedCategory === category ? 'outline' : ''}`}
                style={selectedCategory === category ? selectedStyle : baseStyle}
            >
                {category}
            </button>
        );
    });

    const customNodes = filter.map((node, index) => {
        return <Node key={index} name={node.name} details={node.details} onDragStart={(event) => onDragStart(event, node.type)} draggable icon={node.icon} />
    });

    return (
        <>
            <div className={`
                ${toggleSideBar ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-95'}
                ${sideBar.container}
                shadow-md border
                transition-all duration-200 ease-in-out
                transform origin-top-left
            `}>
                <button onClick={handleToggleSideBar} className={`${sideBar.closeButton}`}>
                    <div className='rounded-full px-1.5 py-1.5 flex items-center mb-1.5 hover:bg-rf-outline/25'>
                        <iconify-icon icon='material-symbols:close' noobserver width='20' height='20'></iconify-icon>
                    </div>
                </button>
                <div className={`${sideBar.nodeContainer}`}>
                    <input type="text" placeholder="Search" className={`${sideBar.searchBar} hover:border-rf-outline`} value={filterQuery} onChange={handleFilter} />
                    <div className={sideBar.categoryContainer}>
                        {categoryFilter}
                    </div>
                    <aside>
                        {customNodes}
                    </aside>
                </div>
            </div>
            <button onClick={handleToggleSideBar} className={`
                ${toggleSideBar ? 'invisible opacity-0' : 'visible opacity-100'}
                ${sideBar.addButton}
                transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-105
                outline text-rf-outline flex items-center justify-center rounded-lg shadow-md
                hover:outline-rf-outline hover:bg-rf-outline/25 duration-200
            `}>
                <iconify-icon icon='akar-icons:plus' noobserver width='20' height='20'></iconify-icon>
            </button>
        </>
    )
}


