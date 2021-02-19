import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from "./maker.module.css"

const Maker = ({authService}) => {
    const [cards,setCards]=useState([
        {
            id:"1",
            name:"ellie",
            company:"sansung",
            theme:"light",
            title:"software Enginner",
            email:"ejrdnjs96@gmail.com",
            message: "go for it",
            fileName:"ellie",
            fileURL:null
        },
        {
            id:"2",
            name:"ellie",
            company:"sansung",
            theme:"dark",
            title:"software Enginner",
            email:"ejrdnjs96@gmail.com",
            message: "go for it",
            fileName:"ellie",
            fileURL:null
        },
        {
            id:"3",
            name:"ellie",
            company:"sansung",
            theme:"colorful",
            title:"software Enginner",
            email:"ejrdnjs96@gmail.com",
            message: "go for it",
            fileName:"ellie",
            fileURL:"ellie.png"
        }
    ])
    const history=useHistory();
    const onLogout=()=>{
        authService.logout();
    };

    useEffect(()=>{
        authService.onAuthChange(user=>{
            if(!user){
                history.push("/");
            }
        })
    });

    const addCard=(card)=>{
        const updated=[...cards,card];
        setCards(updated);
    }

    const updateCard=(card)=>{
        console.log(card);
    }
    const deleteCard=(card)=>{
        console.log(card);
    }
    return <section className={styles.maker}>
        <Header onLogout={onLogout}></Header>
        <div className={styles.container}>
            <Editor cards={cards} addCard={addCard} updateCard={updateCard} deleteCard={deleteCard}></Editor>
            <Preview cards={cards}></Preview>
        </div>
        <Footer></Footer>
    </section>
}

export default Maker;