<template>
  <div class="page-container">
    <dashboard
      :is_view="true"
      :checkable="true"
      title="🤝 Giao kèo"
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
          field: "id",
          label: "TÊN SẢN PHẨM",
          searchable: true,
          sortable: true,
        },
        {
          field: "price_cur",
          label: "NGƯỜI BÁN",
          searchable: true,
          sortable: true,
        },
        {
          field: "date_closure",
          label: "NGƯỜI MUA",
          searchable: true,
        },
        {
          field: "auction_status",
          label: "TRẠNG THÁI",
          searchable: true,
          sortable: true,
        },
        {
          field: "auction_status",
          label: "CẬP NHẬT CUỐI",
          searchable: true,
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