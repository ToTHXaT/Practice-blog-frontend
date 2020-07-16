import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'

import style from '../../styles/body/Login.module.css'


function Updater(){
    const [, setValue] = useState(0);
    return () => setValue(value => ++value);
}


const Signup = () => {

    const forceUpdate = Updater()

    if(document.globalState.token) return <Redirect to='posts'/>

    return (
        <div className={style.login_form}>
            <input type="text" placeholder="username" id="username" className={style.username}/>
            <input type="password" placeholder="password" id="password" className={style.password}/>
            <button className={style.submit} onClick={async () => {
                let res = await fetch(
                    `http://${document.serverUrl}/api/signup`,
                    {
                        method:"POST",
                        headers :
                            {
                                "Content-Type" : "application/json"
                            },
                        body : JSON.stringify({
                            username : document.getElementById('username').value,
                            password : document.getElementById('password').value
                        })
                    }
                )

                if(!(res.status === 201)) {alert("Not created, check you input"); return;}

                res = await fetch(
                    `http://${document.serverUrl}/api/auth/token`,
                    {
                        method:"POST",
                        headers :
                            {
                                "Content-Type" : "application/x-www-form-urlencoded"
                            },
                        body : `username=${ document.getElementById('username').value }&password=${ document.getElementById('password').value }`
                    }
                )

                if(res.status !== 200) {alert("Not authenticated, check you input"); return}

                res = await res.json()

                document.globalState.token = res.access_token
                document.globalState.username = document.getElementById('username').value

                forceUpdate()
            }}>Submit</button>
        </div>
    )

}

export default Signup