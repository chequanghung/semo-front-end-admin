<template>
  <div class="button-template" @click="$emit('select', type.value)">
      <p class="button-icon">{{ type.icon }}</p>
      <br/>
      <p class="button-title">{{ type.title }}</p>
      <p class="button-description">{{ type.description }}</p>
  </div>
</template>

<script>
export default {
    props: ['type']
}
</script>

<style>
.selected p {
    color: white;
}

.button-template {
    display: flex;
    flex-flow: column;
    justify-content: center;
    background-color: #00000000;
}

.button-icon {
    font-size: 60px;
}

.button-title {
    font-family: Roboto;
    font-weight: 700;
    font-size: 18px;
    color: #07D390;
}

.button-description {
    font-size: 15px;
    color: #707070;
    word-wrap: break-word;
}
</style>