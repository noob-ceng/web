# React -- 用于构建用户界面的 JavaScript 库


## React 基础
```javascript
// 导入 react
import React from 'react'  // React 核心库
import ReactDOM from 'react-dom' // Web 应用

// 创建 react 元素
const title = React.createElement('h1', null, 'Hello React')

// 渲染 react 元素

// React Web 应用渲染页面专用库
ReactDOM.render(title, document.querySelector('div#root'))
```

## jsx

 - createElement() 存在问题

     -   繁琐不简洁

     -   不直观  无法一样看出所描述的解构


 -  使用jsx 创建元素

```javascript
const h2 = (
    <div>
        <h2>Hello Jsx</h2>
        <p>我是正文</p>
        <div />
    </div>
)
```

 -  jsx 注意点

     -   React元素 的属性名 使用 驼峰命名法

     -   类名关键字 class --> className

     -   没有子节点的React 元素 可以使用 /> 结束

     -   小括号包裹 jsx

 -  嵌入 js 表达式

     -   语法  { javascript 表达式 }

     -   {}  可以使用任何 javascript 表达式

     -   JS 中的对象 不能放在 {} 中

     -   语句不能放在 {}  中


## 渲染

 -    条件渲染
```javascript
const isVip = true

const vipContent = () => isVip ? <div>点此领取礼包</div> : <div>会员注册停止</div>
```

 -   循环渲染

```javascript
 const list = [
    {id: 1, name: '情深缘浅', children: [1, 2, 3]},
    {id: 2, name: '断点', children: [4, 5, 6]},
    {id: 3, name: '夏天的风', children: [7, 8, 9]}
]


<ul>
    {
        list.map( item => <div key={item.id}>{item.name} :
        {
            item.children.map( value => <li key="index">{value}</li> )
        }
        </div> )
    }
</ul>
```


## 组件

 -  特点 :  客服也  独立  可结合

 -  组件表示页面中的部分功能

 -  组合多个组件实现完整的页面功能

 ####  函数创建组件

  -   约定1  函数名称必须 大写字母开头  区分 组件和 元素

  -   约定2  必须有返回值

  -   用函数名渲染组件

  -   函数组件

```javascript
const Com = () => {
    return (
        <Fragment>
            <h2>Hello</h2>
            <Test1 />
        </Fragment>
    )
}

const Test1 = () => <div>套娃</div>
```

  -   类组件

```javascript
class Test2 extends React.Component {
    rnder() {
        return <div>Hello Class Component</div>
    }
}
```

### 有状态组件和无状态组件

 -   无状态组件  -->  函数组件

 -   有状态组件  -->  类组件

 -   状态 ( state )  数据   组件内部私有数据

 -   函数组件 只负责数据展示 (静态)   类组件 负责更新 UI (动态)


### 受控组件

 - React 将 state 与表单元素值 Value 绑定一起  由 state的值 控制表单元素

            值 受到 React 控制
        
 - 步骤: 

### 非受控组件
 
  - 类组件

## 事件绑定 

 -  React 事件绑定语法 与 DOM 事件语法相似

 -  on + 事件名称 = {事件处理程序}

 -  React 事件采用驼峰命名法

 -  函数组件事件绑定

```javascript
function App() {
    function handleClick() {
        console.log(111)
    }
    return <button onClick={handleClick}>点鸡</button>
}
```

 -  类组件事件绑定
```javascript
export default class Hello extends Component {
    render () {
        return (
            <button onClick={this.handleClick}>点鸡</button>
        )
    }
    handleClick() {
        console.log(111)
    }
}
```

 -   可以通过 事件处理程序的参数  获取事件对象  ( 合成事件 对象 )

 -   合成事件: 兼容所有浏览器


 -   关于事件绑定的 this 指向问题

      -   解构数据  const { count } = this.state 

      -   使用箭头函数    () => this.setState({count: this.state.count+2})

      -   使用 bind 改变 this指向 
                 - 形成了 原型对象上的方法进行拷贝 改掉this指向 拷贝成构造函数属性
                this.changeCount = this.changeCount.bind(this)

      -   直接事件绑定 箭头函数 <h2 onClick={this.changeCount.bind(this)}>{this.state.count}</h2>


## 组件通讯

 -    组件是封闭的   接收外部数据通过 props 实现

 -    props作用: 接受传递给组件的数据

 -    传递数据: 给组件标签添加属性

 -    接收数据: 函数组件通过 参数props 接收数据    类组件通过 this.props 接收数据


## 生命周期

- Initialization  初始化  装载 props & state ( constructor )
- Mounting   挂载期 
  1. componentWillMount ( DOM 节点准备要挂载 ) 只执行一次  
     - 16.4+ 替换为 UNSAFE_componentWillMount

```
     2.    render ( 准备渲染页面 ) 执行完   DOM redirec 内部实现

     3.    componentDidMount  ( DOM 渲染完成 )
```

- Updation (props states)   执行时机 1. setState 2. forceUpdate() 3. 接收新的 props
      

  ```
   -    props :
  
      1.  componentWillReceiveProps   (组件接受数据)
  
          React 16.4+ 替换为 UNSAFE_componentWillReceiveProps
          
          新增钩子 getDerivedStateFromProps()  用于替换 state 数据
  
      2.  ShouldComponentUpdate 
            
            ( 返回 true or false ) true 继续执行 false 终止执行
  
      3.  componentWillUpdate
  
            - 16.4+ 删除
  
            ( DOM 节点准备要挂载 )
  
      4.  render
  
            ( 准备渲染页面 ) 执行完   DOM redirec 内部实现
  ```

  ​            

  ```
          4.5 新增 getSnapshotBeforeUpdate
  
      5.  componentDidUpdate
  
            ( DOM 渲染完成 )
  
   -    props :
  
      1. ShouldComponentUpdate
  
            ( 返回 true or false ) true 继续执行 false 终止执行
      
      2. componentWillUpdate
  
            - 16.4+ 替换为 UNSAFE_componentWillUpdate
  
            ( DOM 节点准备要挂载 )
      
      3. render
  
            ( 准备渲染页面 ) 执行完   DOM redirec 内部实现
       
      4. componentDidUpdate
  
            ( DOM 渲染完成 )   进行 ajax 操作
  ```

- Unmounting  卸载        
  1. componentWillUnmount     

###### 在 componentWillUpdate  componentDidUpdate 进行 this.setState 等数据操作  容易形成死递归

###### componentWillUpdate 准备渲染页面钩子 和 新增 getDerivedStateFromProps 获取组件传递数据 钩子 互斥 尽量不同时使用

###### render 中 调用 this.setState 会形成递归更新


## 高阶组件
```javascript
// 创建高阶组件  本身是函数   一般以 with开头

// 返回一个组件 (只提供逻辑和数据)  该组件内部渲染 提供的半成品组件   

// 该组件提供复用的状态逻辑
const withMouse = WrappedCompoennt => class extends Component {


    // 鼠标状态
    state = {
        x: 0,
        y: 0
    }

    mouseMoveHandle({ clientX: x, clientY: y }) {
        this.setState({
            x,
            y
        })
    }

    componentDidMount() {
        window.addEventListener('mousemove', this.mouseMoveHandleBound = this.mouseMoveHandle.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.mouseMoveHandleBound)
    }

    render() {
        const { state, props } = this
        //  <WrappedCompoennt x={this.state.x} y={this.state.y} />
        return <WrappedCompoennt {...state} {...props} />
    }
}

// 测试高阶组件
const Position = ({ x, y, date, ...rest }) => <h1 {...rest}> 鼠标位置: X: {x},   Y: {y},  时间: {date}</h1>

const EnhancedPosition = withMouse(Position)

// 获取增强后的组件

export default class App extends Component {

    render() {

        return (
            <div>
                <h1>高阶组件</h1>
                <EnhancedPosition />
                <EnhancedPosition className="seco" data-id="sec" date={new Date().getTime()} />
            </div>
        )
    }
}
```

## setState


# React-Router

### 安装

  -  yarn add react-router-dom

### 编程式导航
```javascript
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
const Home = (props) => {
    console.log(props)
    return <h1>我是
   <button onClick={() => props.history.push('/login')}>首页</button>
    </h1>
}
const About = () => (
    <h1>我是关羽</h1>
)
export default class RouterInit extends Component {
    render() {
        return (
            <Router>
                <div>
                    <h1>Hello World</h1>
                    <Link to="/home">首页</Link>
                    <Link to="/about">关于</Link>
                    <br />
                    <Route path="/home" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path='/login' component={Login} />
                </div>
            </Router>
        )
    }
}
const Login = props => <div><h1>登录</h1><h1 onClick={()=>props.history.goBack()}>返回</h1></div>
```

### 匹配模式

 -   模糊匹配

     1.  匹配规则:  只要 pathname 以 path 开头 就会匹配成功
```javascript
<Link to="/home">首页</Link>
<Route path="/home" component={Home} />
```

 -   精确匹配
    
     1.  匹配规则: 只有 path 和 pathname 王秋杨匹配时才展示路由

     2.  添加 exact 属性

```javascript
<Link to="/home">首页</Link>
<Route path="/home" exact component={Home} />
```