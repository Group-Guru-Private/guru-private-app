// const today = new Date().toISOString().split('T')[0]
// console.log(today)
// console.log(today === '2021-01-26')
// console.log('2020-01-06' === '2020-01-06')

const today = new Date()  //2021-01-27T07:45:30.865Z
console.log(today)
//2021-01-28T07:47:31.483Z
console.log(today.toISOString().split('T')[0])