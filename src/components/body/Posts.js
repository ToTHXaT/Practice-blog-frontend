import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'

import ListOfPosts from './posts/ListOfPosts'

function Updater(){
    const [, setValue] = useState(0);
    return () => setValue(value => ++value);
}

const getPosts = async (f) => {
    if(!document.globalState.page) document.globalState.page = 1;

    let skip = (document.globalState.page - 1) * 10;
    let offset = 1000;

    let a = await fetch(`http://${document.serverUrl}/api/user/posts/?skip=${skip}&offset=${offset}`, {
        method : 'GET',
        headers : {
            'Authorization' : `Bearer ${document.globalState.token}`
        }
    });

    a = await a.json()

    document.globalState.userPosts = a

    f()
}

const Posts = () => {
    if(!document.globalState.token) return <Redirect to="/login"/>

    const forceUpdate = Updater();

    if(!document.globalState.userPosts)
    {
        getPosts(forceUpdate)
        return null;
    }
    else {
        return <ListOfPosts lop={document.globalState.userPosts}/>
    }
}


export default Posts