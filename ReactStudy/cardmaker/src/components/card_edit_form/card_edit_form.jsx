import React,{useRef} from 'react';
import styles from './card_edit_form.module.css';
import Button from '../button/button';
import ImageFileInput from '../image_file_input/image_file_input';

const CardEditForm = ({ card }) => {

  const nameRef = useRef();
  const companyRef = useRef();
  const themeRef = useRef();
  const titleRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
  const {
    name,
    company,
    title,
    email,
    message,
    theme,
    fileName,
    fileURL,
  } = card;
  const onChange=(event)=>{
    if(event.currentTarget==null){
        return;
    }
    event.preventDefault();
    
  }
  const onSubmit = () => {};
  return (
    <form className={styles.form}>
      <input className={styles.input} type="text" name="name" value={name} ref={nameRef} onChange={onChange}/>
      <input
        ref={companyRef}
        onChange={onChange}
        className={styles.input}
        type="text"
        name="company"
        value={company}
      />
      <select className={styles.select} name="theme" value={theme} ref={themeRef} onChange={onChange}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="colorful">Colorful</option>
      </select>
      <input className={styles.input} type="text" name="title" value={title} ref={titleRef} onChange={onChange}/>
      <input className={styles.input} type="text" name="email" value={email} ref={emailRef} onChange={onChange}/>
      <textarea className={styles.textarea} name="message" value={message} ref={messageRef} onChange={onChange}/>
      <div className={styles.fileInput}>
        <ImageFileInput />
      </div>
      <Button name="Delete" onClick={onSubmit} />
    </form>
  );
};

export default CardEditForm;