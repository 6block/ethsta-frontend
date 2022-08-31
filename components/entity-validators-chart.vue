<template>
  <div class="px-2 lg:px-0">
    <Title :label="$t('entityValidatorsChart.title')" />
    <div id="entity-validators-chart" class="hidden md:block h-128"></div>
    <div id="entity-validators-mobile-chart" class="md:hidden h-128"></div>
  </div>
</template>
<script>
import moment from 'moment'
let chart = null
let mobileChart = null

export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  mounted() {
    window.onresize = () => {
      if (chart) {
        chart.resize()
        mobileChart.resize()
      }
    }
    let timestamp = new Set()
    this.list.forEach(item => {
      item.deposit_status_list.forEach(validator => timestamp.add(validator.timestamp))
    })
    timestamp = Array.from(timestamp)
    timestamp = timestamp.sort((a, b) => {
      return a - b
    })
    const lengendData = []
    const series = []

    this.list.forEach(item => {
      lengendData.push(item.name)
      const seriesDataList = []
      timestamp.forEach(time => {
        const validator = item.deposit_status_list.find(val => val.timestamp === time)
        seriesDataList.push(validator?.validator_number || 0)
      })
      series.push({
        name: item.name,
        type: 'line',
        symbol: 'none',
        data: seriesDataList,
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
      })
    })

    const option = {
      legend: {
        data: lengendData
      },
      color: ['#D32F2F', '#F44336', '#FF9800', '#673AB7', '#9D27B0', '#E91E63', '#FF4081', '#4051B5', '#2196F3', '#04A8F4', '#00BBD4', '#029688', '#4CAF50', '#CDDD39', '#A7FB88', '#212121', '#455964', '#607D8B', '#D0D8DB'],
      grid: {
        left: 60,
        right: 0,
        top: 80,
        bottom: 25
      },
      tooltip: {
        trigger: 'axis',
        bottom: 0,
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        },
        confine: true,
        formatter: params => {
          if (params instanceof Array) {
            let str = ''
            str += `${params[0].axisValue}<br/>`
            params.forEach((m, index) => {
              str += `<span class="chart-tooltip-color" style="display: inline-block; margin-right: 5px; background-color: ${m.color}; width: 10px; height: 10px; border-radius:100%; margin-left: 10px"></span>`
              str += `${m.seriesName}：${m.data}`
              str += `${index % 3 === 0 ? '<br/>' : ''}`
            })
            return str
          }
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: timestamp.map(item => moment(item * 1000).format('YYYY-MM-DD'))
      },
      yAxis: [
        { type: 'value', show: true, alignTicks: true },
      ],
      series: series.reverse()
    }
    chart = this.$echarts.init(document.getElementById('entity-validators-chart'))
    mobileChart = this.$echarts.init(document.getElementById('entity-validators-mobile-chart'))
    chart.setOption(option)
    option.grid.top = 160
    mobileChart.setOption(option)
  }
}
</script>
