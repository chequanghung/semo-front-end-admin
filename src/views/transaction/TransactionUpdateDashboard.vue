<template>
  <div class="page-container">
    <dashboard
      :is_view="true"
      :checkable="true"
      title="📦 Sản phẩm"
      del_title="🗑️ Xóa bản ghi"
      :data="products"
      :columns="columns"
      :total="products.length"
      @delete="deleteProduct"
      @into="intoProduct"
    ></dashboard>

    <!-- modals -->
    <b-modal :active.sync="isModal" trap-focus destroy-on-hide can-cancel style="width: auto">
      <fruit-modal
        class="casual-mordal"
        has-modal-card
        title="🖊️ Chỉnh sửa loại quả"
        :data="selected"
      ></fruit-modal>
    </b-modal>

    <b-loading is-full-page v-model="isLoading"></b-loading>
  </div>
</template>

<script>
export default {
  components: {
    Dashboard: () => import("../../components/Dashboard"),
  },
};
</script>

<style scoped>
</style>