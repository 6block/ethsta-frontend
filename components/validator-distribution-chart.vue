<template>
  <div class="px-2 lg:px-0">
    <Title :label="$t('validatorDistribution.title')" />
    <div id="validator-distribution-chart" class="hidden md:block h-128"></div>
    <div id="validator-distribution-mobile-chart" class="md:hidden h-128"></div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    }
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
    const mobileOption = {
      tooltip: {
        show: true,
        formatter: '{b} : {c} ({d}%)'
      },
      color: ['#D32F2F', '#F44336', '#FF9800', '#673AB7', '#9D27B0', '#E91E63', '#FF4081', '#4051B5', '#2196F3', '#04A8F4', '#00BBD4', '#029688', '#4CAF50', '#CDDD39', '#A7FB88', '#212121', '#455964', '#607D8B', '#D0D8DB'],
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: this.list.map(item => {
            return {
              value: item.validator_number,
              name: item.name.replace('-address', '').replace('-contract', '').replace('others', 'Others')
            }
          }).sort((a, b) => a.validator_number - b.validator_number),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }

    const option = {
      tooltip: {
        show: true,
        formatter: '{b} : {c} ({d}%)'
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: -55
      },
      color: ['#D32F2F', '#F44336', '#FF9800', '#673AB7', '#9D27B0', '#E91E63', '#FF4081', '#4051B5', '#2196F3', '#04A8F4', '#00BBD4', '#029688', '#4CAF50', '#CDDD39', '#A7FB88', '#212121', '#455964', '#607D8B', '#D0D8DB'],
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: this.list.map(item => {
            return {
              value: item.validator_number,
              name: item.name.replace('-address', '').replace('-contract', '').replace('others', 'Others')
            }
          }).sort((a, b) => a.validator_number - b.validator_number),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }

    this.chart = this.$echarts.init(document.getElementById('validator-distribution-chart'))
    this.mobileChart = this.$echarts.init(document.getElementById('validator-distribution-mobile-chart'))
    this.chart.setOption(option)
    this.mobileChart.setOption(mobileOption)
  }
}
</script>
