import moment from 'moment'
import Vue from 'vue'

function toLocaleString(n) {
  return n.toLocaleString('en') || n.toString()
}

function addAmountDelimiters(string) {
  return string.replace(
    /^(-?)(\d{1,3})((\d{3})*)(\.\d+|)$/g,
    (_, sign, before, middle, __, after) => sign + before + middle.replace(/(\d{3})/g, ',$1') + after
  )
}

function flag(num) {
  return num > 0 ? '+' : num < 0 ? '-' : ''
}

export function localeAmount(value) {
  if (typeof value === 'number') {
    return toLocaleString(value)
  } else {
    return addAmountDelimiters(value)
  }
}

Vue.filter('flag', flag)

Vue.filter('locale', localeAmount)

Vue.filter('percentage', (x, decimals = 2) => `${(x * 100).toFixed(decimals)}%`)

Vue.filter('coin', (value, decimals, precision = null) => {
  if (precision == null) {
    const s = value.toString().padStart(decimals + 1, '0')
    return addAmountDelimiters(`${s.slice(0, -decimals)}.${s.slice(-decimals)}`.replace(/\.?0*$/g, ''))
  } else {
    return addAmountDelimiters((value / 10 ** decimals).toFixed(precision))
  }
})

Vue.filter('eth', (value, precision = null) => {
  if (value == null) {
    return 'N/A'
  }
  value = toLocaleString(typeof value === 'string' ? Number(value) : value).replace(/,/g, '')
  if (value === '0') {
    return '0 ETH'
  } else {
    return `${Vue.filter('coin')(value, 18, precision)} ETH`
  }
})

Vue.filter('timestamp', (time, type = 'datetime') => {
  if (time == null) {
    return '-'
  } else {
    return moment(time * 1000).format({
      datetime: 'YYYY-MM-DD HH:mm:ss',
      date: 'YYYY-MM-DD',
      time: 'HH:mm:ss'
    }[type])
  }
})

Vue.filter('size_metric', (number, precision = null) => {
  const metrics = 'kMGTPEZY'
  let metricIndex = -1
  number = Number(number)
  let flag = false
  if (number < 0) {
    number = -number
    flag = true
  }
  while (number >= 10 ** 2) {
    ++metricIndex
    number /= 10 ** 2
  }
  if (precision == null) {
    return flag ? `-${number} ${metricIndex < 0 ? '' : `${metrics[metricIndex]}`}H/s` : `${number} ${metricIndex < 0 ? '' : `${metrics[metricIndex]}`}H/s`
  } else {
    return flag ? `-${number.toFixed(precision)} ${metricIndex < 0 ? '' : `${metrics[metricIndex]}`}H/s` : `${number.toFixed(precision)} ${metricIndex < 0 ? '' : `${metrics[metricIndex]}`}H/s`
  }
})
