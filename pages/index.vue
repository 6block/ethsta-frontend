<template>
  <div>
    <Header />
    <div class="lg:w-240 mx-auto">
      <Overview :overview="overview" />
      <!-- <TtdChart :data="ttdPredict" /> -->
      <EntityValidatorsChart :list="entityValidators" />
      <DepositValidatorChart :stake-validator="stakeValidator" />
      <ValidatorDistributionChart :list="validatorDistribution" />
      <HashratePercentChart :data-set="hashratePercent" />
      <Detail :list="detail" />
      <Footer />
    </div>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  async asyncData({ $axios, error }) {
    try {
      const overview = await $axios.$get('/overview')
      // const ttdPredict = await $axios.$get('/predict-eth2-hardfork')
      console.log(ttdPredict.predict_curves)
      const validatorDistribution = await $axios.$get('/validator-distribution')
      const entityValidators = await $axios.$get('/entity-stake-validator')
      let stakeValidator = await $axios.$get('/stake-validator')
      stakeValidator = {
        time: stakeValidator.map(item => moment(item.timestamp * 1000).format('YYYY-MM-DD')),
        stake: stakeValidator.map(item => item.staked_eth),
        validator: stakeValidator.map(item => item.validator_number),
      }
      const detail = await $axios.$get('/detail ')
      const hashratePercent = await $axios.$get('/attack-51-percent')
      return {
        overview,
        validatorDistribution,
        stakeValidator,
        detail,
        // ttdPredict,
        entityValidators,
        hashratePercent
      }
    } catch (err) {
      if (err?.response) {
        error({ code: err.response.status, message: err.response.statusText })
      } else {
        error({ code: 500, message: 'Server Error'() })
      }
    }
  }
}
</script>
