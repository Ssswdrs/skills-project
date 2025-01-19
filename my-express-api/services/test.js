import db from '../db.js'

const test = (data='') => {
    return {text:'hello 4eve', dataReceive: data}
}

const test2 = (data) => {
    return {text:'hello 4eve', dataReceive: data.data}
}

const test3 = (data) => {
    return {text:'hello 4eve', dataReceive: data}
}

const test4 = async () => {
    const data = await db.query('SELECT * FROM users ')
    return data
}

export default {test,test2,test3,test4}