<template>
  <div class="card-container">
      <p class="card-title">{{ title }}</p>
      <!-- content -->
      <slot name='content'></slot>
  </div>
</template>

<script>
export default {
    props: ['title']
}
</script>

<style scoped>
.card-container {
  padding: 24px;
  background-color: white;
  box-shadow: 0 2px 8px #00000016;
  border-radius: 10px;
  overflow: hidden;
}

.card-title {
  font-size: 18px;
  font-family: "Roboto";
  font-weight: 900;
  color: #01d28e;
}
</style>