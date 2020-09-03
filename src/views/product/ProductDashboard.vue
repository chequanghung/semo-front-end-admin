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
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Fruit",
  components: {
    Dashboard: () => import("../../components/Dashboard"),
    FruitModal: () => import("../../components/Modal/FruitModal"),
  },
  data() {
    return {
      columns: [
        {
          field: "title",
          label: "TÊN SẢN PHẨM",
          searchable: true,
          sortable: true,
          width: '600',
        },
        {
          field: "fruit_title",
          label: "TÊN LOẠI QUẢ",
          searchable: true,
          sortable: true,
        },
        {
          field: "user_name",
          label: "TÊN NGƯỜI DÙNG",
          searchable: true,
        },
        {
          field: "date_created",
          label: "THỜI GIAN ĐĂNG",
        },
        {
          field: "product_status",
          label: "TRẠNG THÁI",
          searchable: true,
          sortable: true,
        },
      ],
      total: 0,
      selected: {},
      isModal: false,
    };
  },
  mounted() {
    // setInterval(() => {
    this.populates();
    // }, 15000)
  },
  computed: {
    ...mapState({
      products: (state) => state.product.products,
    }),
  },
  methods: {
    ...mapActions("product", ["populates", "review", "delete"]),
    // fetch data
    deleteProduct(rows) {
      this.delete(rows);
    },
    intoProduct(row) {
      if (row.product_status === '⚠️ CẦN CHỈNH SỬA' || row.product_status === '⏲️ CHỜ KIỂM DUYỆT' || row.product_status === '✅ ĐÃ KIỂM DUYỆT')
      this.$router.push({ name: "ProductReview", params: { id: row.id } });
    },
  },
};
</script>

<style scoped>
.casual-mordal {
  width: 560px;
  margin: 0 auto;
}
</style>