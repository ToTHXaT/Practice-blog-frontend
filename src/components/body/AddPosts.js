import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'

import style from '../../styles/body/AddPost.module.css'

function Updater(){
    const [, setValue] = useState(0);
    return () => setValue(value => ++value);
}

const collectData = () => {
    return {
        title : document.getElementById("title").value,
        body : document.getElementById("body").value
    }
}

const sendData = async (f) => {
    await fetch(`http://${document.serverUrl}/api/posts`, {
        method : 'POST',
        headers : {
            'Authorization' : `Bearer ${document.globalState.token}`,
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(collectData())
    })

    document.globalState.userPosts = null;

    document.getElementById("title").value = ""
    document.getElementById("body").value = ""

    f()
}

const AddPosts = () => {
    if(!document.globalState.token) return <Redirect to="/login"/>
    const forceUpdate = Updater()
    return (
        <div className={style.addpost_form}>
            <input className={style.title} type="text" placeholder="Title" id="title"/>
            <textarea className={style.body} placeholder="Body" id="body"></textarea>
            <button className={style.submit} onClick={()=>sendData(forceUpdate)}>Submit</button>
        </div>
    )
}

export default AddPosts