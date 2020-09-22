## React-Hook 

 -   Hook 是一个特殊的函数

 -   应用场景: 编写函数组件并意识到需要向其添加一些 state  可以在现有的函数组件中使用 Hook

###   useState
 -    函数组件中，没有 this  
         不能分配或读取 this.state  
         直接在组件中调用 useState Hook：
```javascript
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 “count” 的 state 变量  初始化值为0 
  const [count, setCount] = useState(0);
}
```

 -   调用 useState 方法的时候做了什么

     1.  定义了一个 state 变量  这里为 count    是一种在函数调用时保存变量的方式 —— useState

     2.  与 class 里面的 this.state 提供的功能完全相同

     3.  函数退出后变量就会”消失”，而 state 中的变量会被 React 保留。

 -   useState 需要哪些参数

     1.  唯一的参数是 初始 state

            可以按照需要使用数字或字符串对其进行赋值，而不一定是对象

            想要在 state 中存储两个不同的变量，只需调用 useState() 两次即可。

 -   useState 方法的 返回值
    
     1.  返回值: 当前 state 以及 更新 state 的函数   使用数组结构 解构返回值

            与 class 里面 this.state.count 和 this.setState 类似

 -   读取 State

     1.  class :    this.state.count

     2.  function :   count

 -   更新 State

     1.   class :   ()=> this.setState({count: this.state.count +1 })

     2.   function :   ()=> setCount(count+1)

 -   总结 步骤

     1. 引入 React 中的 useState Hook。它让我们在函数组件中存储内部 state

     2. 创建一个函数  调用 useState,  传递 初始化参数,   接收 返回值 count (值) 和 setCount (更改值的函数)

     3. 更改 count 数据 ()=>setCount(count +1)  会更新 count 值 React 会重新渲染 这个函数  并把最新的 count 传给他


### effect

###### React 组件中 两种常见的 effect 操作

###  无需清除 effect

 -    应用场景:  只想在 react 更新 DOM 之后 运行一些额外代码

            发送网络请求   手动变更 DOM    记录日志

 -   示例: 手动更新 DOM
**Class**
```javascript
class Example extends Component {

    construvtor(props) {
        super(props)
        this.state={
            count: 0
        }
    }

    componentDidMount() {
        document.title = `${count} times`;
    }

    componentDidUpdate() {
        document.title = `${count} times`;
    }

    render() {
        return (
            <button onClick={()=>this.setState({count: this.state.count +1})}><button>
        )
    }
}
```
**需要在两个生命周期函数中编写重复的代码。**

**Hook**
```javascript
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <button onClick={()=>setCount(count+1)}></button>
  );
}
```

 -   useEffect 做了什么?

     1. 知道  React 组件需要在渲染后执行某些操作 
      
        React 会保存传递的函数 (effect)  
        
        并且在执行 DOM 更新后 调用它

 -   为什么在组件内部调用  useEffect ?
     
     1. 可以在 effect 访问 state 变量(其他props)  以及保存在函数作用域中

     2. Hook 使用了 JavaScript 的闭包机制

 -   useEffect 会在每次渲染后都执行吗 ?
    
     1.  默认情况下  第一渲染后 和 每次更新之后 都会执行  

     2.  每次运行 effect 的同时  DOM 都已经更新完毕

 -   使用 useEffect 调度的 effect 不会阻塞浏览器更新屏幕  应用看起来响应更快  effect 不需要同步执行

 -    为什么每次更新的时候都要运行 effect


     1.  当组件已经显示在屏幕上时，friend prop 发生变化时会发生什么？ 
            
            我们的组件将继续展示原来的好友状态。这是一个 bug。

     2.  还会因为取消订阅时使用错误的好友 ID 导致内存泄露或崩溃的问题。


### 需要清除的 effect

 -   应用场景: 订阅外部数据源

 -   示例
**Hook**

 -   返回一个 cleanup 函数进行清除操作
```javascript
useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `${todos.text}`;
    // console.log(age, fruit)
    // setAge(age)
    return () => {
        console.log(111)
    }
})
```

 -   为什么要在 effect 中返回一个函数 
    
     1.  effect 可选的清除机制  每个 effect 都可以返回一个 清除函数

###### 并不是必须为 effect 中返回的函数命名。


### Hook 规则

 -    Hook 本质是 js 函数  遵循两条规则   使用 eslint-plugin-react-hooks 进行约束

     1.  只在最顶层使用 Hook

     2.  直再 React 函数中调用 Hook

 -  只在最顶层使用 Hook
    
     1.  不用在循环  条件 或者嵌套函数中调用 Hook

     2.  确保 Hook 在每一次渲染中都按照同样的顺序被调用

     3.  React 能够多次的 useState 和 useEffect 调用之间确保 Hook 状态正确

 

    **错误示范**
    ```javascript
     // 🔴 在条件语句中使用 Hook 违反第一条规则
      if (name !== '') {
        useEffect(function persistForm() {
          localStorage.setItem('formData', name);
        });
      }
    
    // 结果
    useState('Mary')           // 1. 读取变量名为 name 的 state（参数被忽略）
    // useEffect(persistForm)  // 🔴 此 Hook 被忽略！
    useState('Poppins')        // 🔴 2 （之前为 3）。读取变量名为 surname 的 state 失败
    useEffect(updateTitle)     // 🔴 3 （之前为 4）。替换更新标题的 effect 失败
    ```


 -   只在 React 函数中 调用 Hook

     1.  只在 React 函数组件中调用 Hook

     2.  只在自定义的 Hook 中 调用其他 Hook




####  **eslint-plugin-react-hooks** 插件

 -  安装 npm install eslint-plugin-react-hooks --save-dev

 -  Eslint 配置
```javascript
// 你的 ESLint 配置
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
    "react-hooks/exhaustive-deps": "warn" // 检查 effect 的依赖
  }
}
```


 - 单个组件中使用多个 State Hook 和 Effect Hook  React 如何知道 state 对应哪个 useState?
    
     1.  React 依靠 Hook 调用的顺序

     2.  只要 Hook 的调用顺序在多次渲染之间保持一致，React 就能正确地将内部 state 和对应的 Hook 进行关联。



###  自定义 Hook

 -   作用 :  自定义 Hook 可以将 React 提供的 Hook 组合到 定制的 Hook 中 以复用不同组件之间常见的状态逻辑

 -   React 两种流行的方式 来共享组件的状态逻辑  **render props** 和 **高阶组件**

 -   Hook 可以在不增加组建的情况下解决  共享组件之间大的状态逻辑


 -   初始代码
```javascript
function FriendListItem(props) {
  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```


 -   提取自定义 Hook
```javascript

// 第一部分
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // ...

  return isOnline;
}


// 第二部分
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}


// 第三部分
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}

```

 -    自定义 Hook 必须以 use 开头吗?
     
     1. 必须如此   不遵循  无法判断某个函数是否包含对其内部 Hook的调用  React 无法自动检查你的 Hook 是否违反了 Hook 规则

 -    两个组件中使用i想听的 Hook 会共享 state 吗 ?
    
     1.  不会    自定义 Hook 是以重重用状态逻辑的机制 

     2.  每次使用自定义 Hook 时  其中的所有 state 和 effect 都是完全隔离的

 -   自定义 Hook 如何 获取 独立的 state ?

     1.  每次 调用 Hook 都会获取独立 state   直接调用 useFeroendStatus  从 React 角度 组件只是调用了 useState 和 yse Effect  (一个组件中多次调用 是完全独立的)


 - 创建自定义 Hook 就像使用 React 内置的功能一样简单。

 