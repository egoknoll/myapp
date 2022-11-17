

setInterval(() => {
  document.querySelector('.header__current-time').innerHTML = getTime()
}, 1000)

function getTime () {
  const date = new Date()
  const realMonths = {
    0 :'Jan',
    1 :'Feb',
    2 :'Mar',
    3 :'Apr',
    4 :'May',
    5 :'June',
    6 :'July',
    7 :'Aug',
    8 :'Sep',
    9 :'Oct',
    10 :'Nov',
    11 :'Dec'
  }
  const realDate = () => (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate()
  const realHours = () => (date.getHours() < 10) ? `0${date.getHours()}` : date.getHours()
  const realMinutes = () => (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes()
  const realSeconds = () => (date.getSeconds() < 10) ? `0${date.getSeconds()}` : date.getSeconds()
  return `${realDate()}.${realMonths[date.getMonth()]}.${date.getFullYear()} ${realHours()}:${realMinutes()}:${realSeconds()}`
}
