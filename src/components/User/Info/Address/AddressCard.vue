<template>
  <div class="card-container">
    <div class="content" v-if="address !== undefined">
      <p class="card-content"><strong>{{ address.address }}</strong></p>
      <p class="card-content">{{ address.ward }}</p>
      <p class="card-content">{{ address.district }}</p>
      <p class="card-content">{{ address.province }}</p>
    </div>
    <div class="columns is-vcentered is-mobile" v-if="uneditable === undefined">
      <div class="column">
        <b-tag type="is-green" v-if="address.default_address === 1">Mặc định</b-tag>
      </div>
      <div class="column is-narrow">
        <div class="columns is-vcentered is-mobile is-variable is-2">
          <div class="column">
            <b-button type="is-green" @click="$emit('edit', address)">🖊️ Chỉnh sửa</b-button>
          </div>
          <div class="column" v-if="address.default_address !== 1">
            <b-button type="is-danger" @click="$emit('delete', address)">🗑️ Xóa</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["address", "uneditable"],
};
</script>

<style scoped>
.card-container {
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 8px #00000016;
  padding: 24px 24px;
}

.card-container:hover {
  box-shadow: 0 4px 16px #00000016;
}

.card-content {
    padding: 0 0 0 6px;
    margin-bottom: 2px !important;
}
</style>