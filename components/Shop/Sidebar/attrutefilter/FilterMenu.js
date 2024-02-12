import { useCallback, useEffect, useState } from 'react';
import styles from './styles/filtermenu.module.css';
import { Check, ChevronDown, ChevronUp, ChevronRight } from '@styled-icons/bootstrap'

function FilterMenu({ attrData, updateData }) {
    const [showBy, setShowBy] = useState([]);
    const [selectAttr, setSelectAttr] = useState({});
    // manage Toggle 
    const setSelectedAttrName = (v) => {
        if (showBy.includes(v)) {
            const data = showBy.filter(e => e !== v);
            setShowBy(data);
        } else {
            const data = new Set([...showBy, v]);
            setShowBy([...data]);
        }
    }

    // set data Selected
    const setSelectedAttrData = (name, data) => {
        setSelectAttr(prevSelectAttr => {
            const existField = Object.keys(prevSelectAttr).includes(name);
            if (existField) {
                if (selectAttr[name].includes(data)) {
                    const newData = selectAttr[name].filter(e => e !== data);
                    return { ...prevSelectAttr, [name]: [...newData] };
                } else {
                    const newData = new Set([...prevSelectAttr[name], data]);
                    return { ...prevSelectAttr, [name]: [...newData] };
                }
            } else {
                return { ...prevSelectAttr, [name]: [data] };
            }
        });
    };

    useEffect(() => {
        const data = Object.keys(selectAttr);
        var makeData = [];
        for (let i = 0; i < data.length; i++) {
            const name = data[i];
            makeData = [...makeData, ...selectAttr[name]];
        }
        if (data.length != 0) {
            updateData(makeData);
        }
    }, [selectAttr]);


    // get toggle data 
    const getToggle = useCallback(
        (i) => {
            return showBy.includes(i);
        },
        [showBy],
    )

    return (
        <div className={styles.filterMenu} >
            {
                attrData.map((e, i) => <div className={styles.menu}>
                    <div className={styles.view} onClick={() => setSelectedAttrName(i)} >
                        <p>{e.name}</p>
                        {getToggle(i) ? <ChevronUp size={13} color='#000' /> : <ChevronDown size={13} color='#000' />}
                    </div>
                    {getToggle(i) ? <div className={styles.subMenu}>
                        <ul>
                            {
                                e.values.map((d, i) => (<li onClick={() => setSelectedAttrData(e.name, d.value)}>
                                    <span className={selectAttr[e.name]?.includes(d.value) ? styles.active : null} ></span>
                                    {d.name}
                                </li>))
                            }
                        </ul>
                    </div> : null}
                </div>)
            }
        </div>
    )
}
export default FilterMenu
