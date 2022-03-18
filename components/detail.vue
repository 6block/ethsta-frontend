<template>
  <div class="pb-6">
    <div class="px-2">
      <Title :label="$t('detail.title')" />
    </div>
    <div class="w-full overflow-x-auto">
      <table class="w-full" style="table-layout:fixed">
        <thead class="border-b border-gray-300">
          <tr>
            <td class="text-center font-bold w-8">
              {{ $t('detail.number') }}
            </td>
            <td class="text-center font-bold w-32">
              {{ $t('detail.name') }}
            </td>
            <td class="text-center font-bold w-24">
              {{ $t('detail.share') }}
            </td>
            <td class="text-center font-bold w-28">
              {{ $t('detail.totalDeposit') }}
            </td>
            <td class="text-center font-bold w-28">
              {{ $t('detail.deposit7d') }}
            </td>
            <td class="text-center font-bold w-28">
              {{ $t('detail.totalValidators') }}
            </td>
            <td class="text-center font-bold w-28">
              {{ $t('detail.validators7d') }}
            </td>
            <td class="text-center font-bold w-32">
              {{ $t('detail.eth1AddrNum') }}
            </td>
            <td class="text-center font-bold w-32">
              {{ $t('detail.eth2AddrNum') }}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in [1,2,3,4,5]" :key="index" class="hover:bg-gray-200 border-b border-gray-200">
            <td class="text-center w-8">
              1
            </td>
            <td class="text-center w-32">
              2
            </td>
            <td class="text-center w-24 flex items-center justify-center">
              <el-popover
                placement="right"
                width="200"
                trigger="hover"
                content="Validator Percentage"
              >
                <img slot="reference" src="@/assets/img/share/info.png" class="w-5 h-5 cursor-pointer my-2 mr-2">
              </el-popover>
              21321312
            </td>
            <td class="text-center w-28">
              1
            </td>
            <td class="text-center w-28">
              1
            </td>
            <td class="text-center w-28">
              1
            </td>
            <td class="text-center w-28">
              1
            </td>
            <td class="text-center w-32">
              1
            </td>
            <td class="text-center w-32">
              1
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
