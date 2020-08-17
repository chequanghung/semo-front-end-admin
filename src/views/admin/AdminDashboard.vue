<template>
  <div class="page-container">
    <dashboard
      :is_view="true"
      :checkable="true"
      title="⛏️ Đấu giá"
      del_title="🗑️ Xóa bản ghi"
      :data="auctions"
      :columns="columns"
      :total="auctions.length"
      @delete="deleteAuction"
      @into="intoAuction"
    ></dashboard>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

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
          sortable: true,
        },
        {
          field: "date_closure",
          label: "THỜI GIAN ĐÓNG",
        },
        {
          field: "auction_status",
          label: "TRẠNG THÁI",
          searchable: true,
          sortable: true,
        },
      ],
      selected: [],
    };
  },
  created() {
    this.populate();
  },
  computed: {
    ...mapState({
      auctions: (state) => state.auction.auctions,
    }),
  },
  methods: {
    ...mapActions("auction", ["populate", "deletea", "populatea"]),

    deleteAuction(rows) {
      this.deletea(rows);
    },

    intoAuction(row) {
      this.populatea(row);
    },
  },
};
</script>

<style scoped>
</style>