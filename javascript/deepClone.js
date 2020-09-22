const deepClone = function(obj) {
    // 准备一个空的待接收拷贝数据的对象或者数组的字面量（全新的地址：核心代码）。
    const result = obj instanceof Array ? [] : {};

    // 开始拷贝（填充对象或数组）。
    for (const key in obj) {
        // 拿到单项,放入空结果。
        const item = obj[key];
        // 赋值的时候判断是否是简单数据类型，如果是简单就直接赋值，如果是复杂就再进入拷贝一次。
        result[key] = item !== null && typeof item === 'object' ? deepClone(item) : item;
    }

    // 返回已填充好的结果。
    return result;
};

const a = { a: 1, b: { c: 4, d: [2, 3, 4, 5, { x: 7 }] }, e: [{ y: 666 }] };

const b = deepClone(a);

b.a = 100;

b.b.c = 7777;

console.log(b);
console.log(a);
