class Father {
    name = 'ldh'
    
    sing() {
        console.log('我会常娥');
    }
}


class Son extends Father {
    age = 16

    constructor(name, age) {
        super()
        this.name = name;
        this.age = age
    }

    sing() {
        console.log('调用super的方法前');
        super.sing();
        console.log('调用super的方法后');
    }
}



const Father = function(age) {
    this.name = '123'
    this.age = age
}

Father.prototype.sing = function() {
    console.log('唱'+this.name);
}

Father.prototype.dance = function() {
    console.log('跳');
}

Father.prototype.rap = function() {
    console.log('RAP');
}

Father.prototype.ball = function() {
    console.log('打篮球');
}

const f = new Father(27);

// f.sing();

const Son = function(name, age) {
    Father.call(this, age);
    this.name = name;
}

Son.prototype = new Father();
Son.prototype.constructor = Son;

Son.prototype.send = function() {
    console.log('发律师函');
}

const s = new Son('Cat', 5)

const copyS = new s.constructor('XM', 123)

console.log(s);