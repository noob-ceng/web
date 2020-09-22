Storage.prototype.$set = function(key, value) {
    this.setItem(key, JSON.stringify(value))
}

Storage.prototype.$get = function(key, defaultValue = '') {
    const data = this.getItem(key)
    // this.setItem(key, JSON.stringify(value))
    return data ? JSON.parse(data)
}