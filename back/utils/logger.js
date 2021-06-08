const info = (...params)=>{
    console.log(...params)
}

const err = (...params)=>{
    console.error(...params)
}

module.exports = {
    info,
    err
}