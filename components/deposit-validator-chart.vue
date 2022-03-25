<template>
  <div class="px-2 lg:px-0">
    <Title :label="$t('depositValidatorChart.title')" />
    <div id="deposit-validator-chart" class="h-128"></div>
  </div>
</template>
<script>
export default {
  props: {
    stakeValidator: {
      type: Object,
      default: () => {
        return {
          time: [],
          stake: [],
          validator: []
        }
      },
    },
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    window.onresize = () => {
      if (this.chart) {
        this.chart.resize()
      }
    }
    const option = {
      legend: {
        data: [
          this.$t('depositValidatorChart.depositBalance'),
          this.$t('depositValidatorChart.validators')
        ]
      },
      grid: {
        left: 80,
        right: 60,
        top: 100
      },
      tooltip: {
        trigger: 'axis',
        position: pt => {
          return [pt[0], '10%']
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.stakeValidator.time
      },
      yAxis: [
        { type: 'value', show: true, name: 'ETH', alignTicks: true },
        { type: 'value', show: true, name: 'Validators', alignTicks: true }
      ],
      series: [
        {
          name: this.$t('depositValidatorChart.depositBalance'),
          yAxisIndex: 0,
          type: 'line',
          symbol: 'none',
          itemStyle: {
            color: 'rgb(255, 70, 131)'
          },
          data: this.stakeValidator.stake
        },
        {
          name: this.$t('depositValidatorChart.validators'),
          yAxisIndex: 1,
          type: 'line',
          symbol: 'none',
          itemStyle: {
            color: 'rgb(126, 65, 205)'
          },
          data: this.stakeValidator.validator
        }
      ]
    }
    this.chart = this.$echarts.init(document.getElementById('deposit-validator-chart'))
    this.chart.setOption(option)
  }
}
</script>
