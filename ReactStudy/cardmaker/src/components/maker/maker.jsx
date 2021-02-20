import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from "./maker.module.css"

const Maker = ({authService,FileInput,cardRepository}) => {
    const historyState=useHistory().state;
    const [cards,setCards]=useState({
        
    });
    const [userId,setUserId]=useState()
    const history=useHistory(historyState && historyState.id);
    const onLogout=()=>{
        authService.logout();
    };

    useEffect(()=>{
        if(!userId){
            return;
        }
        const stopSync=cardRepository.syncCards(userId, cards =>{
            setCards(cards);
        })
        // useEffect에서 return은 component가 unmount될때 호출된다.
        return ()=>{stopSync();}
    },[userId])
    useEffect(()=>{
        authService.onAuthChange(user=>{
            if(user){
                setUserId(user.uid)
            }
            else{
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
        cardRepository.saveCard(userId,card)
    }
    const deleteCard=(card)=>{
        setCards(cards=>{
            const update={...cards};
            delete update[card.id];
            return update;
        });
        cardRepository.removeCard(userId,card);
    }
    return <section className={styles.maker}>
        <Header onLogout={onLogout}></Header>
        <div className={styles.container}>
            <Editor cards={cards} addCard={createOrUpdateCard} updateCard={createOrUpdateCard} deleteCard={deleteCard} FileInput={FileInput}></Editor>
            <Preview cards={cards}></Preview>
        </div>
        <Footer></Footer>
    </section>
}

export default Maker;