import React, { Component, useState, useEffect } from 'react';

export default class Hooks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0,

        };
    }
    componentDidMount() {
        document.title = `Hello World`;
    }
    componentDidUpdate() {
        document.title = `Hello React`;
    }

    render() {

        return (
            <div>
                <h1>HOOKS</h1>
                <br />
                <ExampleHooks count="Hello World" />
            </div>
        )
    }
}


function ExampleHooks() {

    // useState 会返回一对值：当前状态和一个让你更新它的函数

    const [age, setAge] = useState(42)
    const arr = useState(0)

    const [fruit, setFruit] = useState('banana')

    const [todos, setTodos] = useState({ text: 'Learn Hooks' })


    // console.log(useState instanceof Function)
    // console.log(arr instanceof Array)

    // 相当于 componentDidMount 和 componentDidUpdate:




    // useEffect 就是一个 Effect Hook
    useEffect(() => {
        // 使用浏览器的 API 更新页面标题
        document.title = `${todos.text}`;
        // console.log(age, fruit)
        // setAge(age)

        return function cleanup() {
            console.log(111)
        }

    })

    console.log(123)

    return (

        <div>
            <div>{age}</div>
            <button onClick={() => setAge(age + 1)}>点鸡</button>
        </div>
    )

}
