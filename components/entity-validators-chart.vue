<template>
  <div class="px-2 lg:px-0">
    <Title :label="$t('entityValidatorsChart.title')" />
    <div id="entity-validators-chart" class="hidden md:block h-128"></div>
    <div id="entity-validators-mobile-chart" class="md:hidden h-128"></div>
  </div>
</template>
<script>import moment from 'moment'

export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      chart: null,
      mobileChart: null
    }
  },
  mounted() {
    window.onresize = () => {
      if (this.chart) {
        this.chart.resize()
        this.mobileChart.resize()
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
      color: ['#E11818', '#A7FB88', '#6EE076', '#1B17E0', '#AC0DF7', '#E35695', '#F9D153', '#F0944F', '#08C6F8', '#FF6B7A'],
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
    this.chart = this.$echarts.init(document.getElementById('entity-validators-chart'))
    this.mobileChart = this.$echarts.init(document.getElementById('entity-validators-mobile-chart'))
    this.chart.setOption(option)
    option.grid.top = 160
    this.mobileChart.setOption(option)
  }
}
</script>
