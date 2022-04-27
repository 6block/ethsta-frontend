<template>
  <div class="px-2 lg:px-0">
    <Title :label="$t('hashratePercentChart.title')" />
    <div id="hashrate-percent-chart" class="hidden md:block h-128"></div>
    <div id="hashrate-percent-mobile-chart" class="md:hidden h-128"></div>
  </div>
</template>
<script>
export default {
  props: {
    dataSet: {
      type: Object,
      default: () => {
        return {}
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
    if (!this.dataSet.timelines) {
      return
    }

    const series = []
    const markLine = {
      symbol: 'none',
      silent: true,
      data: [
        { yAxis: '50' }
      ],
      lineStyle: {
        show: true,
        color: '#808C94',
        type: 'dashed'
      }
    }
    for (const i in this.dataSet) {
      if (i && (i !== 'timelines')) {
        series.push({
          name: i,
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          data: this.dataSet[i].map(item => item * 100),
          markLine
        })
      }
    }

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: params => {
          if (params instanceof Array) {
            let str = ''
            str += `${params[0].axisValue}<br/>`
            params.forEach(m => {
              str += `<span class="chart-tooltip-color" style="display: inline-block; margin-right: 10px; background-color: ${m.color}; width: 10px; height: 10px; border-radius:100%;"></span>`
              str += `${m.seriesName}：${m.data.toFixed(3)}%<br />`
            })
            return str
          }
        }
      },
      color: ['#D32F2F', '#04A8F4', '#CDDD39', '#607D8B'],
      markLine: {
        symbol: 'none',
        label: {
          position: 'end',
        },
        precision: 2,
        lineStyle: {
          type: 'solid',
          color: '#FF8400',
        },
        data: [{
          silent: false,
          lineStyle: {
            type: 'solid',
            color: '#FF8400',
          },
          label: {
            position: 'end',
            formatter: '50%'
          },
          yAxis: 50
        }
        ]
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: this.dataSet.timelines
        }
      ],
      yAxis: [
        {
          type: 'value',
          max: 100,
          min: 0,
          axisLabel: {
            formatter: '{value} %'
          }
        }
      ],
      series: series.reverse(),
    }
    this.chart = this.$echarts.init(document.getElementById('hashrate-percent-chart'))
    this.mobileChart = this.$echarts.init(document.getElementById('hashrate-percent-mobile-chart'))
    this.chart.setOption(option)
    this.mobileChart.setOption(option)
  }
}
</script>
