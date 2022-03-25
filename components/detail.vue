<template>
  <div class="pb-6">
    <div class="px-2">
      <Title :label="$t('detail.title')" />
    </div>
    <div class="w-full overflow-x-auto">
      <table class="w-full" style="table-layout:fixed">
        <thead class="border-b border-gray-300">
          <tr>
            <td class="text-center font-bold w-4 text-xs">
              {{ $t('detail.number') }}
            </td>
            <td class="text-center font-bold w-48 text-xs">
              {{ $t('detail.name') }}
            </td>
            <td class="text-center font-bold w-20 text-xs">
              <div class="flex items-center justify-center">
                {{ $t('detail.share') }}
                <el-popover
                  placement="bottom"
                  width="200"
                  trigger="hover"
                  content="Validator Percentage"
                  class="ml-2"
                >
                  <img slot="reference" src="@/assets/img/share/info.png" class="w-4 h-4 cursor-pointer my-2 mr-2">
                </el-popover>
              </div>
            </td>
            <td class="text-center font-bold w-32 text-xs">
              {{ $t('detail.totalDeposit') }} (ETH)
            </td>
            <td class="text-center font-bold w-36 text-xs">
              {{ $t('detail.deposit7d') }} (ETH)
            </td>
            <td class="text-center font-bold w-32 text-xs">
              {{ $t('detail.totalValidators') }}
            </td>
            <td class="text-center font-bold w-28 text-xs">
              {{ $t('detail.validators7d') }}
            </td>
            <td class="text-center font-bold w-20 text-xs">
              {{ $t('detail.eth1AddrNum') }}
            </td>
            <td class="text-center font-bold w-20 text-xs">
              {{ $t('detail.eth2AddrNum') }}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index" class="hover:bg-gray-200 border-b border-gray-200">
            <td class="text-center text-xs py-2">
              {{ index + 1 }}
            </td>
            <td class="text-center text-xs">
              {{ item.name }}
            </td>
            <td class="text-left text-xs pl-2">
              {{ (item.share * 100).toFixed(3) }}%
            </td>
            <td class="text-center text-xs">
              {{ item.total_deposit | locale }}
            </td>
            <td class="text-center text-xs">
              {{ item.deposit_7d | flag }}{{ item.deposit_7d | locale }}
            </td>
            <td class="text-center text-xs">
              {{ item.total_validators | locale }}
            </td>
            <td class="text-center text-xs">
              {{ item.validators_7d | flag }}{{ item.validators_7d | locale }}
            </td>
            <td class="text-center text-xs underline font-bold text-primary-400 cursor-pointer hover:opacity-75">
              <span @click="download(item, 1)">{{ item.eth1_addr_number | locale }}</span>
            </td>
            <td class="text-center text-xs underline font-bold text-primary-400 cursor-pointer hover:opacity-75">
              <span @click="download(item, 2)">{{ item.eth2_addr_number | locale }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    download(item, number) {
      window.location.href = `https://ethsta.com/data/address-download/${item.name}_eth${number}.0.csv`
    }
  }
}
</script>
