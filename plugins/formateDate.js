import Vue from 'vue'

Vue.filter('getDate', function(strDatetime) {
  const arrDatetime = strDatetime.split(' ')
  const arrDate = arrDatetime[0].split('-')
  return arrDate[2] + '.' + arrDate[1] + '.' + arrDate[0]
})

Vue.filter('getTime', function(strDatetime) {
  const arrDatetime = strDatetime.split(' ')
  const arrTime = arrDatetime[1].split(':')
  return arrTime[0] + ':' + arrTime[1]
})

Vue.filter('getDateAndTime', function(strDatetime) {
  const arrDatetime = strDatetime.split(' ')
  const arrDate = arrDatetime[0].split('-')
  const arrTime = arrDatetime[1].split(':')
  const date = arrDate[2] + '.' + arrDate[1] + '.' + arrDate[0]
  const time = arrTime[0] + ':' + arrTime[1]
  return time + ' ' + date
})
