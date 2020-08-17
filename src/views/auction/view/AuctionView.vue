<template>
  <div class="page-container">
    <div class="columns">
      <div class="column is-5">
        <div class="column-section">
            <br/>
            <br/>
          <div>
            <b-button type="is-danger" outlined @click="back">👈 Quay lại</b-button>
          </div>
          <br />
          <product-card :product="product"></product-card>
        </div>
      </div>
      <div class="column">
            <br/>
            <br/>
        <div class="column-section">
          <dashboard
            :checkable="product.Auctions[0].auction_status === 1"
            title="⛏️ Lượt đấu giá"
            del_title="🗑️ Xóa lượt đấu giá"
            :data="bids"
            :columns="columns"
            :total="bids.length"
            @delete="deleteBid"
          ></dashboard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["id"],
  components: {
    Dashboard: () => import("@/components/Dashboard"),
    ProductCard: () => import("@/components/Card/ProductCard"),
  },
  data() {
    return {
      columns: [
        {
          field: "user_name",
          label: "TÊN NGƯỜI DÙNG",
          searchable: true,
          sortable: true,
        },
        {
          field: "amount",
          label: "TRẢ GIÁ",
          sortable: true,
        },
        {
          field: "date_created",
          label: "THỜI GIAN",
          searchable: true,
        },
      ],
      selected: [],
    };
  },
  created() {
    this.populatea(this.id);
  },
  computed: {
    ...mapState({
      product: (state) => state.auction.product,
      bids: (state) => state.auction.bids,
    }),
  },
  methods: {
    ...mapActions("auction", ["populatea", "deletebs", "populatea", "closea"]),

    deleteBid(rows) {
      this.deletebs(rows)
    },
    back() {
      this.closea();
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.page-container {
  padding: 0px 60px;
  height: 100vh;
  overflow: hidden;
}

.columns {
  overflow: hidden;
  height: 100%;
}

.column {
  overflow-y: scroll;
  overflow-x: hidden;
}

::-webkit-scrollbar {
  display: none;
}
</style>