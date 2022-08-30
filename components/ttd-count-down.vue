<template>
  <no-ssr>
    <flip-countdown :deadline="endTimeShow" countdown-size="25px" label-size="12px" />
  </no-ssr>
</template>
<script>
import FlipCountdown from 'vue2-flip-countdown'
import moment from 'moment'
export default {
  components: { FlipCountdown },
  props: {
    endTime: {
      type: String,
      default: '0'
    }
  },
  computed: {
    endTimeShow() {
      return moment(this.endTime * 1000).format('YYYY-MM-DD HH:mm:ss')
    }
  },
}
</script>
<style>
@media screen and (min-width: 768px) {
  .flip-clock {
    margin: 0 !important;
  }
}
</style>
