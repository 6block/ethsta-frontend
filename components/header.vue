<template>
  <div class="lg:w-240 mx-auto">
    <div class="flex justify-between items-center h-16 px-2 lg:px-0">
      <Logo class="flex items-end" />
      <img src="@/assets/img/share/github.png" class="w-6 h-6 cursor-pointer hover:opacity-75">
    </div>
    <div class="text-center py-1 bg-primary-900 text-white font-bold cursor-pointer text-sm lg:text-base">
      {{ $t("keywords") }}
    </div>
  </div>
</template>
<script>
export default {

}
</script>
