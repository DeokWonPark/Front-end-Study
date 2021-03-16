import React, { memo } from 'react';
import style from './wrapper.module.css';

const Wrapper = memo((props) => {
    return <div className={style.wrapBox}>
        {props.children}
    </div>
})

export default Wrapper;