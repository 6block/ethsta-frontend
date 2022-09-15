<template>
  <div>
    <Title :label="$t('ttd.title')" />
    <no-ssr>
      <div class="md:flex items-center justify-center">
        <span class="md:-mt-4 mb-4 md:mb-0 md:mr-4 block text-center md:text-left font-bold">
          {{ $t('ttd.sevenDayCountDown') }}
          <span class="text-primary-400 font-bold">
            {{ formatTime(predictCurveSevenDay) }}
          </span>
          {{ $t('ttd.remain') }}
          &nbsp;&nbsp;
        </span>
        <TtdCountDown
          :end-time="predictCurveSevenDay"
        />
      </div>
    </no-ssr>
    <no-ssr>
      <div class="md:flex items-center mt-4 justify-center">
        <span class="md:-mt-4 mb-4 md:mb-0 md:mr-4 block text-center md:text-left font-bold">
          {{ $t('ttd.fourteenDayCountDown') }}
          <span class="text-primary-400 font-bold">
            {{ formatTime(predictCurveFourteenDay) }}
          </span>
          {{ $t('ttd.remain') }}
        </span>
        <TtdCountDown
          :end-time="predictCurveFourteenDay"
        />
      </div>
    </no-ssr>
    <no-ssr>
      <div class="md:flex items-center mt-4 justify-center">
        <span class="md:-mt-4 mb-4 md:mb-0 md:mr-4 block text-center md:text-left font-bold">
          {{ $t('ttd.tweentyEightDayCountDown') }}
          <span class="text-primary-400 font-bold">
            {{ formatTime(predictCurveTweentyEightDay) }}
          </span>
          {{ $t('ttd.remain') }}
        </span>
        <TtdCountDown
          :end-time="predictCurveTweentyEightDay"
        />
      </div>
    </no-ssr>
    <h1 class="text-center font-bold mt-12">
      TTD Curve Predict
    </h1>
    <div id="ttd-chart" class="h-128 mt-8"></div>
    <h1 class="text-center font-bold mt-12">
      HashRate Chart
    </h1>
    <div id="hashrate-chart" class="h-128 mt-8"></div>
  </div>
</template>
<script>
import moment from 'moment'
import BigNumber from 'bignumber.js'
const BN = BigNumber.clone()
let ttdChart = null
let hashrateChart = null
export default {
  computed: {
    predictCurveSevenDay() {
      if (this.data.predict_curves[1]) {
        return this.data.predict_curves[1].root[0]
      } else {
        return 0
      }
    },
    predictCurveFourteenDay() {
      if (this.data.predict_curves[2]) {
        return this.data.predict_curves[2].root[0]
      } else {
        return 0
      }
    },
    predictCurveTweentyEightDay() {
      if (this.data.predict_curves[3]) {
        return this.data.predict_curves[3].root[0]
      } else {
        return 0
      }
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          origin_curve: [],
          predict_curves: [],
        }
      }
    },
  },
  mounted() {
    window.onresize = () => {
      if (ttdChart) {
        ttdChart.resize()
      }
      if (hashrateChart) {
        hashrateChart.resize()
      }
    }
    this.initTtdChart()
    this.initHashRateChart()
  },
  data() {
    return {
      ttdChart: null,
      hashRateChart: null,
    }
  },
  methods: {
    formatTime(time) {
      return moment(new Date(time * 1000)).format('YYYY-MM-DD HH:mm')
    },
    initTtdChart() {
      const option = {
        tooltip: {
          trigger: 'axis',
          formatter: params => {
            if (params instanceof Array) {
              let str = ''
              str += `${params[0].axisValue}<br/>`
              params.forEach(m => {
                str += `<span class="chart-tooltip-color" style="display: inline-block; margin-right: 10px; background-color: ${m.color}; width: 10px; height: 10px; border-radius:100%;"></span>`
                str += `${m.seriesName}：${m.data ? m.data.toFixed(3) + ' * 1e22' : '-'}<br />`
              })
              return str
            }
          }
        },
        legend: {
          data: ['Origin Curve', 'Predict Curve 7d', 'Predict Curve 14d', 'Predict Curve 28d']
        },
        grid: {
          left: 80,
          right: 70,
          top: 50
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.data.predict_curves[0]?.data.map(item => moment(item * 1000).format('YYYY-MM-DD HH:MM')) || []
        },
        yAxis: {
          name: '1e22',
          type: 'value',
          min: 5,
          max: 6.4
        },
        series: [
          {
            name: 'Predict Curve 28d',
            type: 'line',
            smooth: true,
            symbolSize: 0,
            z: 1,
            data: this.data.predict_curves[3]?.data.map(item => BN(item).div(1e22).toNumber()) || []
          },
          {
            name: 'Predict Curve 14d',
            type: 'line',
            smooth: true,
            symbolSize: 0,
            z: 2,
            data: this.data.predict_curves[2]?.data.map(item => BN(item).div(1e22).toNumber()) || []
          },
          {
            name: 'Predict Curve 7d',
            type: 'line',
            smooth: true,
            symbolSize: 0,
            z: 3,
            data: this.data.predict_curves[1]?.data.map(item => BN(item).div(1e22).toNumber()) || []
          },
          {
            name: 'Origin Curve',
            type: 'line',
            smooth: true,
            symbolSize: 0,
            z: 4,
            data: this.data.origin_curve[1]?.map(item => BN(item).div(1e22).toNumber()) || [],
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 2,
                  type: 'dotted'
                }
              }
            },
            markLine: {
              silent: true,
              lineStyle: {
                normal: {
                  color: '#778899'
                }
              },
              data: [{
                yAxis: 5.875
              }],
              label: {
                normal: {
                  formatter: 'TTD(5.875)'
                }
              },
            },
          },
        ]
      }
      ttdChart = this.$echarts.init(document.getElementById('ttd-chart'))
      ttdChart.setOption(option)
    },
    initHashRateChart() {
      const option = {
        tooltip: {
          trigger: 'axis',
          formatter: params => {
            let str = ''
            str += `${params[0].axisValue}<br/>`
            str += `<span class="chart-tooltip-color" style="display: inline-block; margin-right: 10px; background-color: ${params[0].color}; width: 10px; height: 10px; border-radius:100%;"></span>`
            str += `${params[0].seriesName}：${params[0].data ? params[0].data.toFixed(3) + ' TH/s' : '-'}<br />`
            return str
          }
        },
        legend: {
          data: ['HashRate']
        },
        grid: {
          left: 80,
          right: 60,
          top: 50
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.data.hashrate_curve[0]?.map(item => moment(item * 1000).format('YYYY-MM-DD HH:MM')) || []
        },
        yAxis: {
          name: 'TH/s',
          type: 'value'
        },
        series: [
          {
            name: 'HashRate',
            type: 'line',
            smooth: true,
            symbolSize: 0,
            data: this.data.hashrate_curve[1]?.map(item => BN(item).div(1e12).toNumber()) || []
          },
        ]
      }
      hashrateChart = this.$echarts.init(document.getElementById('hashrate-chart'))
      hashrateChart.setOption(option)
    }
  }
}
</script>
