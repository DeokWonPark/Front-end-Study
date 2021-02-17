import React, { useEffect } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import styles from './login.module.css';
import { useHistory } from 'react-router-dom';

const Login = ({authService}) => {

    const history=useHistory();
    const goToMaker=(uid)=>{
        history.push({
            pathname:"/maker",
            state:{id : uid}
        });
    };
    const onLogin=(e)=>{
        authService.login(e.currentTarget.textContent).then(data=>goToMaker(data.user.uid))
    }

    useEffect(()=>{
        authService.onAuthChange(user=>{
            user && goToMaker(user.uid);
        })
    });

    return<section className={styles.login}>
        <Header></Header>
        <section>
            <h1>Login</h1>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <button onClick={onLogin} className={styles.button}>Google</button>
                </li>
                <li className={styles.item}>
                    <button onClick={onLogin} className={styles.button}>Github</button>
                </li>
            </ul>
        </section>
        <Footer></Footer>
    </section>
}

export default Login;