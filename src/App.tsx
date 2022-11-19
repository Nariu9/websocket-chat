import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import './App.css';
import male from './assets/male.png'
import female from './assets/female.png'

type UserType = {
    userId: number
    userName: string
    photo: string
    message: string
}

function App() {

    const [value, setValue] = useState('')
    const [ws, setWS] = useState<null | WebSocket>(null)
    const [users, setUsers] = useState<UserType[]>([])
    const messagesBlock = useRef<any>(null)

    console.log('App rerender')

    if (ws) {
        ws.onmessage = (messageEvent) => {
            let newUsers = JSON.parse(messageEvent.data)
            console.log(messageEvent)
            setUsers([...users, ...newUsers])
            messagesBlock.current && messagesBlock.current.scrollTo(0, messagesBlock.current.scrollHeight)
        }
    }

    useEffect(() => {
        console.log('WS rerender')
        let localWS = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
        setWS(localWS)
    }, [])

    const sendMessage = () => {
        value && ws!.send(value)
        setValue('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value)
    }

    return (
        <div className="App">
            <div className={'chat'}>
                <div className={'messages'} ref={messagesBlock}>
                    {users.map((u, index) => <div key={index} className={'message'}>
                        <img src={u.photo} alt="user"/>
                        <span><strong>{u.userName} </strong></span>
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
