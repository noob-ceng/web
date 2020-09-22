class A {
    // 实例属性。
    text = '我是文本'

    // 静态属性。
    static info = '消息'

    static set Info(value) {
        A.info = value.trim();
    }

    static get Info() {
        return '我的消息是：' + A.info
    }

    b = 10

    set B(value) {
        if (typeof value === 'number' && value >= 0) {
            this.b = value;
        } else throw new Error('值错误：请使用 Number 类型的数据且大于等于 0！')
    }

    get B() {
        return '￥' + this.b.toFixed(2);
    }

    // 静态方法。
    static func() {
        console.log('我是静态方法');
    }

    constructor(text) {
        this.text = text;
    }

    // 实例方法。
    fn() {
        console.log('我是方法');
    }
}

A.Info = '       哈哈哈哈       '

console.log(A.Info);

const obj = {
    a: 1, 
    b: 2,
    c: 'abc',
    arr: [1,2,3]
}

obj.arr[1] = 6; // 针对 arr 是“读”操作，因为等号左边不是 arr，没有修改 arr 本身的地址。

// getter 与 setter 的作用是“控制访问”，称为“访问器”。
// getter 或 setter 是可以单独存在的。

// 我改的是数据，我跑的是逻辑。（利用 JS 对象的一种特殊方法：getter / setter）
// 第一个参数：obj 要修改的对象；
// 第二个参数：'B' 要定义的属性名；
// 第三个参数：是个对象，包含 setter / getter。
Object.defineProperty(obj, 'B', {
    set(value) {
        console.log('我走的 setter');
        if (typeof value === 'number' && value >= 0) {
            this.b = value;
        } else throw new Error('值错误：请使用 Number 类型的数据且大于等于 0！')
    },
    get() { return '￥' + this.b.toFixed(2) }
});

obj.B = 500;
console.log(obj.B);

const a = new A('AAAA');

console.log(a);

a.B = 9000

console.log(a.B);