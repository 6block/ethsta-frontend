<template>
  <div class="pb-6 px-2 lg:px-0">
    <Title :label="$t('overview.title')" />
    <div class="hidden md:flex justify-between items-center">
      <div class="flex-1 mr-8 shadow-container px-2 py-6 rounded-md flex items-center justify-between">
        <img src="@/assets/img/home/deposit.png" class="w-12">
        <div class="flex-1 pb-1 ml-1">
          <h1 class="text-gray-500 text-sm">
            {{ $t("overview.totalDeposit") }}
          </h1>
          <p class="text-primary-400 font-bold pt-1 text-sm">
            {{ overview.total_deposit | locale }} ETH
          </p>
        </div>
      </div>
      <div class="flex-1 mr-8 shadow-container px-2 py-6 rounded-md flex items-center justify-between">
        <img src="@/assets/img/home/deposit7d.png" class="w-12">
        <div class="flex-1 pb-1 ml-1">
          <h1 class="text-gray-500 text-sm">
            {{ $t("overview.sevenDayDeposit") }}
          </h1>
          <p class="text-primary-400 font-bold pt-1 text-sm">
            {{ overview.deposit_7d | locale }} ETH
          </p>
        </div>
      </div>
      <div class="flex-1 mr-8 shadow-container px-2 py-6 rounded-md flex items-center justify-between">
        <img src="@/assets/img/home/validator.png" class="w-10">
        <div class="flex-1 pb-1 ml-1">
          <h1 class="text-gray-500 text-sm">
            {{ $t("overview.totalValidators") }}
          </h1>
          <p class="text-primary-400 font-bold pt-1 text-sm">
            {{ overview.total_validators | locale }}
          </p>
        </div>
      </div>
      <div class="flex-1 shadow-container px-2 py-6 rounded-md flex items-center justify-between">
        <img src="@/assets/img/home/validator7d.png" class="w-12">
        <div class="flex-1 pb-1 ml-1">
          <h1 class="text-gray-500 text-sm">
            {{ $t("overview.sevenDayValidators") }}
          </h1>
          <p class="text-primary-400 font-bold pt-1 text-sm">
            {{ overview.validators_7d | locale }}
          </p>
        </div>
      </div>
    </div>
    <div class="md:hidden">
      <div class="flex items-center justify-between">
        <div class="flex-1 mr-5 shadow-container px-2 py-4 rounded-md flex items-center">
          <img src="@/assets/img/home/deposit.png" class="w-12">
          <div class="flex-1 pb-1 ml-1">
            <h1 class="text-gray-500 text-sm">
              {{ $t("overview.totalDeposit") }}
            </h1>
            <p class="text-primary-400 font-bold pt-1 text-sm">
              {{ overview.total_deposit | eth(4) }}
            </p>
          </div>
        </div>
        <div class="flex-1 shadow-container px-2 py-4 rounded-md flex items-center">
          <img src="@/assets/img/home/deposit7d.png" class="w-12">
          <div class="flex-1 pb-1 ml-1">
            <h1 class="text-gray-500 text-sm">
              {{ $t("overview.sevenDayDeposit") }}
            </h1>
            <p class="text-primary-400 font-bold pt-1 text-sm">
              {{ overview.deposit_7d | eth(4) }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between mt-5">
        <div class="flex-1 mr-5 shadow-container px-2 py-4 rounded-md flex items-center">
          <img src="@/assets/img/home/validator.png" class="w-12">
          <div class="flex-1 pb-1 ml-1">
            <h1 class="text-gray-500 text-sm">
              {{ $t("overview.totalValidators") }}
            </h1>
            <p class="text-primary-400 font-bold pt-1 text-sm">
              {{ overview.total_validators | locale }}
            </p>
          </div>
        </div>
        <div class="flex-1 shadow-container px-2 py-4 rounded-md flex items-center">
          <img src="@/assets/img/home/validator7d.png" class="w-12">
          <div class="flex-1 pb-1 ml-1">
            <h1 class="text-gray-500 text-sm">
              {{ $t("overview.sevenDayValidators") }}
            </h1>
            <p class="text-primary-400 font-bold pt-1 text-sm">
              {{ overview.validators_7d | locale }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    overview: {
      type: Object,
      default: () => {
        return {
          total_deposit: 0,
          deposit_7d: 0,
          total_validators: 0,
          validators_7d: 0
        }
      },
    }
  },
}
</script>
