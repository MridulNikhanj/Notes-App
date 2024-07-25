import React from 'react'
import styles from './note.module.scss';
import { formatDate } from '../../../utils/formatDate';
import { useState } from 'react';
// import Button from '../../atoms/button';
import Button from '../../atoms/button';
import utils from '../../../utils/localStorage';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Note(props) {
    const { text, date, color } = props;
    const [expand, setExpand] = useState(false);
    const [noteText, setNoteText] = useState("");

    const handleSave = () => {
        const authToken = utils.getFromLocalStorage('auth_key');
        if(!authToken) toast.error("User should be authenticated!");
        if (!noteText.length || noteText.split(' ').length<2) toast.error('Note text should atleast contain 2 words!');
        fetch('http://localhost:3001/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: authToken,
            },
            body: JSON.stringify({text: noteText, color }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if(data?.success === 201) {
                toast.success('Notes added successfully!'); 
                
            } else {
                toast.error(data?.message);
            }
        }).catch((err) => {
            console.log(err);
            toast.error('Notes creation Failed');
        })

    }

    return (
        <article className={styles.container} style={{ backgroundColor: color }}>
            <div className={styles.content}>

                {

                    !text.length ? <>
                    <textarea 
                        placeholder="Start typing..." 
                        value={noteText} 
                        onChange={(e)=> setNoteText(e.target.value)} 
                        className={styles.textarea}
                    />
                    </> : 
                    <>
                    <p className={expand ? styles.expanded : ""}>{text.substring(0,150)}</p>
                    {text.length>150 ? <button onClick={()=>setExpand((prev) => !prev)}>
                        Read {expand ? "less" : "more"}
                    </button> : null}
                    </>

                }


            </div>
            <footer className={styles.footer}>
                <div>Sun Jul 07 2024</div>
                {noteText.length ? (<Button text={'save'} className={styles.saveBtn} handleClick={handleSave}/>) : null}
            </footer>
        </article>
    )
}

export default Note
