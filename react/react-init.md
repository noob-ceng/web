### react 与 vue

react 灵活性更大  社区更完善  facebook 深度使用
vue   灵活性更小  更好用 易入门  约束更多  



# react

react 组件 与 react 元素

 -  react组件   以大写字母开头

 -  react元素   以小写字母开头

 -  jsx

#### 组件

 -  容器组件  class 类组件

 -  UI 组件   函数组件

```javascript
return <div>hello world</div>
```

## react basic

### setState

 -   setState 为了性能 会在一段时间内执行一次

 -   setState 异步执行

 -   由 React 控制的事件处理过程 setState 异步更新 this.state！

### 父子组件传值

 -   父组件通过 自定义属性给子组件传值  子组件通过 props 进行接收父组件传递的数据

 -   子组件通过 调用父组件的方法  并把子组件的值以形参的方式进行传递

 -   父组件的 render 调用时  子组件的 render 方法同时被调用


 -   react 默认不对数据源做转换  (标签渲染 ==> 字符串)

### 值类型

 -  输入值类型

```javascript
Input.pPropTypes = {

    // 绑定值               
    onReceiveKeywords: PropTypes.oneOfType([

        // 规定为函数
        PropTypes.func,
        // 规定为字符串
        PropTypes.string

        // 规定为必填字段    若无此属性  不传值则默认为不需要值类型绑定
    ]).isRequired
}
```


### 虚拟 dom

 -   **传统做法 :**

1.  收集 data 数据

2.  定义 template (模板)

3.  data + template 生成 DOM

4.  render 渲染页面

`若有值发生变化`

5.  data + template 生成 新的 DOM

6.  render 用新生成的DOM替换原有的DOM 渲染页面

 -  问题: 

重复操作 DOM 性能太差

 -   **虚拟 DOM :**

1.  收集 state, props

2.  定义 jsx

3.  state + jsx 生成新的 虚拟DOM

4.  render 用生成的 虚拟DOM 转换为 真实的DOM 渲染页面

`若有值发生变化`

5.  收集 state, props

6.  定义 jsx

7.  state + jsx 生成新的 虚拟DOM

8.  用原来的 虚拟DOM  和 现在新的 虚拟DOM 做 diff (比较)

9.  render 将比较结果不同的节点 转换为 真实的DOM 渲染页面

 -  优点:

1.  性能大大提高

2.  虚拟DOM -> 真实DOM   虚拟DOM -> Native App Api (React Native)  虚拟DOM -> VR



### diff 算法

 -   diff 算法 https://www.jianshu.com/p/3ba0822018cf

 -   调和       将Virtual DOM树转换成actual DOM树的最少操作的过程 

 -   react diff 算法        diff算法是调和的具体实现。 

 -   diff算法的作用     计算出Virtual DOM中真正变化的部分，并只针对该部分进行原生DOM操作，而非重新渲染整个页面。

 -  传统diff算法       通过循环递归对节点进行依次对比，算法复杂度达到 O(n^3) ，n是树的节点数.

#### diff策略
 -   React用 三大策略 将O(n^3)复杂度 转化为 O(n)复杂度

 -   策略一（tree diff）： 
        
         -   Web UI中DOM节点跨层级的移动操作特别少，可以忽略不计。
    
                （1）React通过updateDepth对Virtual DOM树进行层级控制。
                （2）对树分层比较，两棵树 只对同一层次节点 进行比较。如果该节点不存在时，则该节点及 其子节点会被完全删除，不会再进一步比较。
                （3）只需遍历一次，就能完成整棵DOM树的比较。



 -   策略二（component diff）：

         -   拥有相同类的两个组件 生成相似的树形结构，
         -   拥有不同类的两个组件 生成不同的树形结构。
    
         （1）同一类型的两个组件，按原策略（层级比较）继续比较Virtual DOM树即可。

（2）同一类型的两个组件，组件A变化为组件B时，可能Virtual DOM没有任何变化，如果知道这点（变换的过程中，Virtual DOM没有改变），可节省大量计算时间，所以 用户 可以通过 shouldComponentUpdate() 来判断是否需要 判断计算。

（3）不同类型的组件，将一个（将被改变的）组件判断为dirty component（脏组件），从而替换 整个组件的所有节点。




 -   策略三（element diff）：
        
         -   对于同一层级的一组子节点，通过唯一id区分。


            插入：组件 C 不在集合（A,B）中，需要插入
    
            删除：（1）组件 D 在集合（A,B,D）中，但 D的节点已经更改，不能复用和更新，所以需要删除 旧的 D ，再创建新的。
    
            （2）组件 D 之前在 集合（A,B,D）中，但集合变成新的集合（A,B）了，D 就需要被删除。
    
            移动：组件D已经在集合（A,B,C,D）里了，且集合更新时，D没有发生更新，只是位置改变，如新集合（A,D,B,C），D在第二个，无须像传统diff，让旧集合的第二个B和新集合的第二个D 比较，并且删除第二个位置的B，再在第二个位置插入D，而是 （对同一层级的同组子节点） 添加唯一key进行区分，移动即可。



### 生命周期 钩子函数

 -    Initialization  初始化  装载 props & state ( constructor )

 -    Mounting   挂载期 
      
         1.    componentWillMount ( DOM 节点准备要挂载 ) 只执行一次  

                  - 16.4+ 替换为 UNSAFE_componentWillMount


         2.    render ( 准备渲染页面 ) 执行完   DOM redirec 内部实现
    
         3.    componentDidMount  ( DOM 渲染完成 )

 - Updation (props states)
       
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


   ​            
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


 -    Unmounting  卸载        

         1.  componentWillUnmount     
             

###### 在 componentWillUpdate  componentDidUpdate 进行 this.setState 等数据操作  容易形成死递归  
###### componentWillUpdate 准备渲染页面钩子 和 新增 getDerivedStateFromProps 获取组件传递数据 钩子 互斥 尽量不同时使用





## React-Router

```text
Link 标签 首字母大写
子路由  父级路由不定义 exact

```

 ###  路由定义

 ```javascript
 export default class Basic extends Component {
    render() {
        return (
            <Router>
                  <ul>
                    <li>
                        <Link to="/">首页</Link>
                    </li>
                    <li>
                        <Link to="/search">搜索</Link>
                    </li>
                </ul>
                <Route
                    path="/home"
                    exact
                    component={Home}
                />
                <Route
                    path="/search"
                    exact
                    component={Search}
                />
            </Router>
        )
    }
}

class Home extends Component {
    render() {
        return (
            <div>Home</div>
        )
    }
 }

const Sreach = () => {
    return (
        <h1>Home</h1>
    )
}  

 ```

       - exact  精准匹配路由

 ```javascript
 <Route
     // 可以枚举
     path={`${match.url}/:type(in_theaters|coming_soon)`}
     path={`${match.url}/:type`}
     component={ In_theaters }
 />
 ```

 ###  子路由

       -    子组件定义路由
```javascript

export default class Basic extends Component {
    render() {
        return (
            <Router>

                <ul>
                    <li>
                        <Link to="/home">首页</Link>
                    </li>
                </ul>
                {/* 包容性路由  排他性路由 */}
                <Route
                    path="/home"
                    component={Home}
                />
            </Router>
        )
    }
}

// UI 组件  只是需要从父组件里拿到 props  专注于页面渲染
const Home = ({ match }) => {
    console.log(match)
    return (
        <Fragment>
            <h1>Home</h1>
             <ul>
                <li>
                    <Link to={`${match.url}/in_theaters`}>正在热映</Link>
                </li>
                 <li>
                    <Link to={`${match.url}/coming_soon`}>即将上映</Link>
                </li> 
            </ul>
            <Route
                path={`${match.url}/in_theaters`}
                component={ List }
            />
            <Route
                path={`${match.url}/coming_soon`}
                component={ Coming_soon }
            />
        </Fragment>
    )
}
const In_theaters = () => {
    return (
        <h1> 正在热映</h1>
    )
}

const Coming_soon = () =>{
    return (
        <h1>即将上映</h1>
    )
}
```











 ###  动态路由

 ```javascript
 <Route
     // 可以枚举
     path={`${match.url}/:type(in_theaters|coming_soon)`}
     path={`${match.url}/:type`}
     component={ In_theaters }
 />

// 任意路由 显示 In_theaters 组件

// type 只是变量  接受任何字符串  可以更改

const In_theaters = ({match}) => {
    return (
        <h1> {match.url.type}</h1>
    )
}
 ```

 ###  路由参数

```javascript
<Route
     // : 传参
     path={`${match.url}/:type(in_theaters|coming_soon)`}
     path={`${match.url}/:type`}
     component={ In_theaters }
/>
```

 ###  排他性路由和包容性路由
```javascript
// Switch 包容性路由
<Switch>
    // exact 排他性路由
    <Redirect
        from='/'
        exact
        to="/home"
    />
    <Route
        path="/home"
        component={Home}
    />
</Switch>
```

 ###  路由重定向
```javascript
// Redirect 路由重定向
<Switch>
    <Redirect
        from='/'
        exact
        to="/home"
    />
    <Route
        path="/home"
        component={Home}
    />
</Switch>
```

 ###  404 PAGE

 ###  NavLink

 -   路由高亮

 ###  自定义链接样式

 -   对 NavLink 进行封装
```javascript
<li>
    {/* <NavLink activeStyle={styles.active} to="/home">首页</NavLink> */}
    <CustomLink to="/home" title="首页"></CustomLink>
</li>


const CustomLink = ({ to, title }) => (
    <Route
        path={to}
        // exact
        children={({ match }) => (
            <Fragment>
            {/**
            //          *  match : 地址栏里的 path 和 Route 里的path 比较
            //          */ }
                {
                    match ? '>' : ''
                }
                <NavLink to={to}>{title}</NavLink>
            </Fragment>
        )}
    />
)


 -   路由跳转  编程式导航
<button onClick={this.handleBtnClick.bind(this)}>跳转</button>

handleBtnClick = () => {
    // console.log(match)
    const { history } = this.props
    history.push('/user/a', {
        id: 2
    })
```

### 总结: 
 -   定义路由 (Router, Route, Link, NavLink) 组件 
        --> 定义子路由 (多个组件嵌套)  
        --> 路由默认是包容性  Switch 变为排他性路由 
        --> 动态路由传参 (/:id  ?id=1) 
            { 1. 定义路由 路径匹配直接添加  2. query传参 通过location} 
            编程式导航传参 (history.push('路径', {路由参数}))
        --> NavLink (activeClassName, activeStyle) 路由高亮



## React-Animation

 -   npm search  react-transition-group

 -   进入 CSSTransition

 -   className 以 fade- 开头

 -   Animate.css 动画库