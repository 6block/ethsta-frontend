<template>
  <div class="pb-6">
    <div class="px-2">
      <Title :label="$t('detail.title')" />
    </div>
    <div class="w-full overflow-x-auto">
      <table class="w-full" style="table-layout:fixed">
        <thead class="border-b border-gray-300">
          <tr>
            <td class="text-center font-bold w-8 text-sm">
              {{ $t('detail.number') }}
            </td>
            <td class="text-center font-bold w-48 text-sm">
              {{ $t('detail.name') }}
            </td>
            <td class="text-center font-bold w-24 text-sm">
              {{ $t('detail.share') }}
            </td>
            <td class="text-center font-bold w-24 text-sm">
              {{ $t('detail.totalDeposit') }}
            </td>
            <td class="text-center font-bold w-20 text-sm">
              {{ $t('detail.deposit7d') }}
            </td>
            <td class="text-center font-bold w-20 text-sm">
              {{ $t('detail.totalValidators') }}
            </td>
            <td class="text-center font-bold w-28 text-sm">
              {{ $t('detail.validators7d') }}
            </td>
            <td class="text-center font-bold w-32 text-sm">
              {{ $t('detail.eth1AddrNum') }}
            </td>
            <td class="text-center font-bold w-32 text-sm">
              {{ $t('detail.eth2AddrNum') }}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index" class="hover:bg-gray-200 border-b border-gray-200">
            <td class="text-center w-8 text-xs">
              {{ index + 1 }}
            </td>
            <td class="text-center w-32 text-xs">
              {{ item.name }}
            </td>
            <td class="text-center w-24 flex items-center justify-start text-xs">
              <el-popover
                placement="right"
                width="200"
                trigger="hover"
                content="Validator Percentage"
              >
                <img slot="reference" src="@/assets/img/share/info.png" class="w-5 h-5 cursor-pointer my-2 mr-2">
              </el-popover>
              {{ item.share }}
            </td>
            <td class="text-center w-28 text-xs">
              {{ item.total_deposit }}
            </td>
            <td class="text-center w-28 text-xs">
              {{ item.deposit_7d }}
            </td>
            <td class="text-center w-28 text-xs">
              {{ item.total_validators }}
            </td>
            <td class="text-center w-28 text-xs">
              {{ item.validators_7d }}
            </td>
            <td class="text-center w-32 text-xs underline font-bold text-primary-400 cursor-pointer">
              <span @click="download(item)">{{ item.eth1_addr_number }}</span>
            </td>
            <td class="text-center w-32 text-xs underline font-bold text-primary-400 cursor-pointer">
              <span @click="download(item)">{{ item.eth2_addr_number }}</span>
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
    download(item) {
      console.log(item)
    }
  }
}
</script>
