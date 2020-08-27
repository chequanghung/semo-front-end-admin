<template>
  <div class="page-container">
    <div class="columns is-multiline">
      <div class="column">
        <div>
          <b-button type="is-danger" outlined @click="back">👈 Quay lại</b-button>
        </div>
          <br />
        <Card title="📋 Hợp đồng"></Card>
      </div>

      <div class="column">
        <Card title="🗃️ Điều khoản">
          <template v-slot:content>
            <ContractStatementsList></ContractStatementsList>
          </template>
        </Card>
      </div>

      <div class="column is-full">
        <Card title>pl</Card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["contract"],
  components: {
    Card: () => import("@/components/Card/Card"),
    ContractStatementsList: () =>
      import("@/components/Card/ContractStatementsList"),
  },
};
</script>

<style scoped>
</style>