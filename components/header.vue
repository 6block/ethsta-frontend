<template>
  <div class="lg:w-240 mx-auto">
    <div class="flex justify-between items-center h-16 px-2 lg:px-0">
      <Logo class="flex items-end" />
      <a alt="ethsta.com github" href="https://github.com/Zachary-Lingle" target="_blank">
        <img src="@/assets/img/share/github.png" class="w-6 h-6 cursor-pointer hover:opacity-75">
      </a>
    </div>
    <div class="text-center py-1 bg-primary-400 text-white font-bold cursor-pointer text-sm lg:text-base">
      {{ $t("keywords") }}
    </div>
  </div>
</template>
<script>
export default {}
</script>
