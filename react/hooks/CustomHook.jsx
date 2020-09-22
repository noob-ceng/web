import React, { Component, useState, useEffect } from 'react'

export default class CustomHook extends Component {

    render() {
        return (
            <div>
                <h1>123</h1>
                <div>
                    <ChatRecipientPicker />
                </div>
            </div>
        )
    }
}

const friendList = [
    { id: 1, name: 'Phoebe' },
    { id: 2, name: 'Rachel' },
    { id: 3, name: 'Ross' },
];

function ChatRecipientPicker() {
    const [recipientID, setRecipientID] = useState(1);
    const isRecipientOnline = useFriendStatus(recipientID);

    return (
        <>
            <Circle color={isRecipientOnline ? 'green' : 'red'} />
            <select
                value={recipientID}
                onChange={e => setRecipientID(Number(e.target.value))}
            >
                {friendList.map(friend => (
                    <option key={friend.id} value={friend.id}>
                        {friend.name}
                    </option>
                ))}
            </select>
        </>
    );
}

function useFriendStatus (flag) {
    const [isOnline, setIsOnline] = useState(null);

    // ...
  
    return isOnline;
}

const Circle = ({color}) => <h1 style={color={color}}>Hello Hook</h1>