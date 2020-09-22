const data = [
    { id: 1, name: 'A城', parent: 3 },
    { id: 2, name: 'C区', parent: 4 },
    { id: 3, name: 'B省', parent: null },
    { id: 4, name: 'B城', parent: 3 },
    { id: 5, name: 'C城', parent: 3 },
    { id: 6, name: 'X区', parent: 4 },
    { id: 7, name: 'A省', parent: null },
]

const tree = [];

data.forEach(i => i.parent ? data.some(j => j.id === i.parent && (j.children = [...j.children || [], i])) : tree.push(i))

console.log(tree);