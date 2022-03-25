<template>
  <h1 class="text-lg lg:text-2xl md:border-l-4 border-primary-400 md:pl-6 font-bold my-8">
    {{ label }}
    <div class="md:hidden w-24 h-1 mt-2 bg-primary-400"></div>
  </h1>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>
