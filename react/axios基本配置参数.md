# axios 基本配置参数
axios.create({
      baseURL: 'http://localhost:8080', // 请求的域名  基本地址
      timeout: 1000, // 请求超时时长 (ms)
      url: '/data.json', // 请求路径
      method: 'get, post, put, patch, delete', // 请求方法
      headers: {
        token: ''
      }, // 请求头  携带参数
      params: {}, // 会将请求参数 拼接在 url
      data: {} // 会将请求参数 放在 请求体里
    })


axios 配置方式 :
1.  axios 全局配置
      axios.defaults.基本参数
      axios.defaults.timeout = 1000
      axios.defaults.baseURL = 'http://localhost:8080'
 
2.  axios 实例配置
      let instance = axios.create(配置参数) // 若无配置参数  使用全局参数
      instance.defaults.timeout = 3000  // 修改配置参数
 
3.  axios 请求配置
      let instance = axios.create(配置参数)
      instance.get('/data.json, {
          timeout: 5000
      })


配置参数 优先级 :  低  全局配置 -->  实例配置  --> 请求配置    高