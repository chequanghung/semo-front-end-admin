<template>
  <div class="page-container">
    <!-- transportation -->
    <p class="section-title">VẬN CHUYỂN</p>
    <!-- transportation responsibilities -->
    <ContractStatement title="Bên vận chuyển" content="contract.shipment_user_id"></ContractStatement>
    <!-- transportation deadline -->
    <ContractStatement title="Ngày bắt đầu vận chuyển" content="contract.shipment_user_id"></ContractStatement>
    <!-- transportation fee -->
    <ContractStatement title="Phí vận chuyển muộn" content="contract.shipment_user_id"></ContractStatement>
    <!-- transaction -->
    <p class="section-title">THANH TOÁN</p>
    <!-- payment date -->
    <ContractStatement title="Ngày thanh toán" content="contract.shipment_user_id"></ContractStatement>
    <!-- payment amount -->
    <ContractStatement title="Số tiền thanh toán" content="contract.shipment_user_id"></ContractStatement>
    <!-- payment late fee -->
    <ContractStatement title="Phí thanh toán muộn" content="contract.shipment_user_id"></ContractStatement>
    <!-- extra -->
    <p class="section-title">CHẤT LƯỢNG</p>
    <!-- preservation amount -->
    <ContractStatement title="Nồng đồ chất bảo quản thực vật" content="contract.shipment_user_id"></ContractStatement>
  </div>
</template>

<script>
export default {
    props: ['id'],
    components: {
        ContractStatement: () => import('./ContractStatement'),
    }
};
</script>

<style scoped>
.page-container {
  padding: 0;
}

.section-title {
  text-transform: uppercase;
  color: #707070;
  font-size: 17px;
  margin: 16px 0;
  font-weight: 700;
}
</style>