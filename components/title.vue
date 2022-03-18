<template>
  <h1 class="text-xl lg:text-2xl md:border-l-4 border-primary-900 md:pl-6 font-bold my-8">
    {{ label }}
    <div class="md:hidden w-24 h-1 mt-2 bg-primary-900"></div>
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
