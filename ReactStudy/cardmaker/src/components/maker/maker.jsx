import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from "./maker.module.css"

const Maker = ({authService}) => {
    const [cards,setCards]=useState({
        "1":{
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
        "2":{
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
        "3":{
            id:"3",
            name:"ellie",
            company:"sansung",
            theme:"colorful",
            title:"software Enginner",
            email:"ejrdnjs96@gmail.com",
            message: "go for it",
            fileName:"ellie",
            fileURL:"ellie.png"
        },
    });
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


    const createOrUpdateCard=(card)=>{
        setCards(cards=>{
            const update={...cards};
            update[card.id]=card;
            return update;
        });
    }
    const deleteCard=(card)=>{
        setCards(cards=>{
            const update={...cards};
            delete update[card.id];
            return update;
        });
    }
    return <section className={styles.maker}>
        <Header onLogout={onLogout}></Header>
        <div className={styles.container}>
            <Editor cards={cards} addCard={createOrUpdateCard} updateCard={createOrUpdateCard} deleteCard={deleteCard}></Editor>
            <Preview cards={cards}></Preview>
        </div>
        <Footer></Footer>
    </section>
}

export default Maker;