// 把一个任意嵌套的对象转换为一个不含嵌套的对象，并把嵌套属性用'.'连接起来，
// 结果类似于 VS Code 的配置文件 settings.json 的内容。

function flatten(object) {
    const container = {};

    const enter = (object, prevName) => {
        for (const key in object) {
            const item = object[key];
            const currentName = prevName + ' ' + key;

            if (item instanceof Array || item instanceof RegExp || item === null || typeof item !== 'object') {
                container[currentName.trim().replace(/\s/g, '.')] = item;
            } else {
                enter(item, currentName);
            }
        }
    }

    enter(object, '');
    return container;
}

// 例如
console.log(flatten({
    a: 123,
    b: [4, 5, 6],
    c: {
        d: {
            e: /abc/i
        },
        f: {
            g: null,
            h: undefined
        }
    }
}))