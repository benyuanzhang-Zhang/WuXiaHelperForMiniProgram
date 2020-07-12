// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const MAX_LIMIT = 100
// 云函数入口函数
exports.main = async (event, context) => {
  // get collection count
  const total =  (await db.collection('travel_index').count()).total
  // computed need request times
  const batchTimes = Math.ceil(total / MAX_LIMIT)
  // initialization a array that promise request constant
  const tasks = []
  // request tasks
  for (let index = 0; index < batchTimes; index++) {
    const promise = db.collection('travel_index').skip(index * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  // wait all request complete
  return (await Promise.all(tasks)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }
  })
}