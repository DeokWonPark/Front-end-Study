import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from "./maker.module.css"

const Maker = ({authService,FileInput,cardRepository}) => {
    const historyState=useHistory().state;
    const [cards,setCards]=useState({});
    const [userId,setUserId]=useState()
    const history=useHistory(historyState && historyState.id);

    /* 중요한 포인트 */
    //authService의 변화가 생긴다면 함수를 새롭게 만들겠다.
    const onLogout=useCallback(()=>{
        authService.logout();
    },[authService]);

    useEffect(()=>{
        if(!userId){
            return;
        }
        const stopSync=cardRepository.syncCards(userId, cards =>{
            setCards(cards);
        })
        // useEffect에서 return은 component가 unmount될때 호출된다.
        return ()=>{stopSync();}
    },[userId,cardRepository])

    useEffect(()=>{
        authService.onAuthChange(user=>{
            if(user){
                setUserId(user.uid)
            }
            else{
                history.push("/");
            }
        })
    },[authService,userId,history]);


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