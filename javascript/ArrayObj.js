const people = [
    { name: 'Alice', age: 25, city: 'Chengdu' },
    { name: 'Bob', age: 20, city: 'Beijing' },
    { name: 'Carl', age: 36, city: 'Shanghai' },
    { name: 'David', age: 35, city: 'Chengdu' },
    { name: 'Eve', age: 32, city: 'Shanghai' },
    { name: 'Alice', age: 46, city: 'Chengdu' },
    { name: 'Bob', age: 73, city: 'Beijing' },
    { name: 'Carl', age: 36, city: 'Shanghai' },
    { name: 'David', age: 65, city: 'Chengdu' },
    { name: 'Eve', age: 32, city: 'Shanghai' },
    { name: 'Alice', age: 25, city: 'Chengdu' },
    { name: 'Bob', age: 20, city: 'Beijing' },
    { name: 'Carl', age: 36, city: 'Shanghai' },
    { name: 'David', age: 82, city: 'Chengdu' },
    { name: 'Eve', age: 32, city: 'Shanghai' },
    { name: 'Alice', age: 25, city: 'Chengdu' },
    { name: 'Bob', age: 20, city: 'Beijing' },
    { name: 'Carl', age: 34, city: 'Shanghai' },
    { name: 'David', age: 35, city: 'Chengdu' },
    { name: 'Eve', age: 32, city: 'Shanghai' },
];

// 需求  计算各城市平均年龄

function fn(arr) {
    var obj = {}
    arr.some(item => {
        var count = 0

        if (obj[item.city]) {

            count++
            obj[item.city] = (obj[item.city] * count + item.age) / (count + 1)

        } else {
            obj[item.city] = item.age
        }

    })

    return obj

}