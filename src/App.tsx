import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import male from './assets/male.png'
import female from './assets/female.png'

function App() {

    const [value, setValue] = useState('')
    const [users, setUsers] = useState([
        {id: 1, name: 'Alex', photo: male, message: 'Hi man'},
        {id: 2, name: 'Hannah', photo: female, message: 'Hi girl'},
    ])

    let ws: WebSocket;

    console.log('App rerender')
    useEffect(() => {
        console.log('WS rerender')
        ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
        ws.onmessage = (messageEvent) => {
            console.log(messageEvent)
        }
    }, [])

    const sendMessage = () => {
        value && ws.send(value)
        setValue('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value)
    }

    return (
        <div className="App">
            <div className={'chat'}>
                <div className={'messages'}>
                    {users.map(u => <div key={u.id} className={'message'}>
                        <img src={u.photo} alt="user"/>
                        <span><strong>{u.name} </strong></span>
                        <span>{u.message}</span>
                    </div>)}
                </div>
            </div>
            <div className={'footer'}>
                <textarea value={value} onChange={onChangeHandler}/>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default App;
