import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'

import style from '../../styles/body/PostDetail.module.css'


function Updater(){
    const [, setValue] = useState(0);
    return () => setValue(value => ++value);
}

const collectData = () => {
    return {
        new_title : document.getElementById("ntitle").value,
        new_body : document.getElementById("nbody").value
    }
}


const sendData = async (postid,f) => {

    let data = collectData()
    data.id = postid

    let res = await fetch("http://localhost:8080/api/posts/update", {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json",
            'Authorization' : `Bearer ${document.globalState.token}`
        },
        body : JSON.stringify(data)
    })

    if(res.status !== 200) {alert("Not updated, check your input"); return;}

    document.globalState.userPosts = undefined;

    f()
}

const deletePost = async (postid, f) => {
    if(window.confirm("Are you sure?")) {

        let res = await fetch("http://localhost:8080/api/post/delete/", {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                'Authorization' : `Bearer ${document.globalState.token}`
            },
            body : JSON.stringify({post_id : postid})
        })

        if(res.status !== 200) {alert("Smth went wrong"); return;}

        document.globalState.userPosts = undefined;

        f()
    }
}


const PostDetail = ({match : { params : {postid}}}) => {

    if(!document.globalState.userPosts && !document.globalState.allPosts) return <Redirect to="/allposts"/>

    const forceUpdate = Updater()

    let post

    if(document.globalState.userPosts) {
        post = document.globalState.userPosts.filter((post) => {
            return post.id == postid
        })[0]
    }

    if(!post) {
        post = document.globalState.allPosts.filter((post) => {return post.id == postid})[0]
    }


    if(post) {
        let isOwner = document.globalState.username === post.user_id;
        if(!isOwner)
            return (
                <div className={style.view}>
                    <h3 className={style.title}>{post.title}</h3>
                    <p className={style.body}>{post.body}</p>
                    <p className={style.pub_date}> Published by {isOwner ? "you" : post.user_id} at {new Date(post.pub_date).toLocaleString("ru")}</p>
                </div>
            )
        else if(isOwner)
            return (
                <div className={style.edit}>
                    <input className={style.title} type="text" defaultValue={post.title} id="ntitle"/>
                    <textarea className={style.body} id="nbody" defaultValue={post.body}></textarea>
                    <button className={style.update} onClick={()=>{sendData(post.id, forceUpdate)}}>Update</button>
                    <button className={style.delete} onClick={()=>{deletePost(post.id, forceUpdate)}}>Delete</button>
                </div>
            )
    }
    else return <div> Not found. Try to reach it via interface, not by typing into bar </div>
}


export default PostDetail