<template>
  <div class="columns is-multiline">
    <div class="column is-full">
      <br />
      <p class="section-title">THAY ĐỔI LẦN CUỐI</p>
      <p class="section-content" v-if="contract !== undefined">{{ formatDate(contract.date_updated) }}</p>
    </div>
    <div class="column"></div>
    <div class="column is-narrow">
      <b-button type="is-green" @click="intoContract">👁️ Xem</b-button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: ["contract"],
  methods: {
    intoContract() {
      this.$emit('click')
    },

    formatDate(date) {
      return moment(date).format('HH:ss DD/MM/YYYY')
    }
  },
};
</script>

<style scoped>
.section-title {
  font-family: Roboto;
  font-size: 13px;
}

.section-content {
  font-family: Roboto;
  font-size: 20px;
  font-weight: 700;
  color: #b88cd8;
}
</style>