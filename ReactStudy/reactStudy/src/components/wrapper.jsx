import React from 'react';
import style from './wrapper.module.css';

const Wrapper = (props) => {
    return <div className={style.wrapBox}>
        {props.children}
    </div>
}

export default Wrapper;