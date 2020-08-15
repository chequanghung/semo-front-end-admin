<template>
  <div class="page-container">
    <dashboard
      title="⛏️ Đấu giá"
      del_title="🔒 Đóng phiên"
      :data="auctions"
      :columns="columns"
      :total="auctions.length"
      @delete="lockAuction"
      @into="intoAuction"
    ></dashboard>
  </div>
</template>

<script>
export default {
  components: {
    Dashboard: () => import("../../components/Dashboard"),
  },
  data() {
    return {
      columns: [
        {
          field: "product_title",
          label: "SẢN PHẨM",
          searchable: true,
        },
        {
          field: "price_cur",
          label: "GIÁ HIỆN TẠI",
        },
        {
          field: "date_closure",
          label: "THỜI GIAN ĐÓNG",
        },
        {
          field: "auction_status",
          label: "TRẠNG THÁI",
          searchable: true,
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>