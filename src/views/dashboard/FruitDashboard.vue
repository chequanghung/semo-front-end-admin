<template>
  <div class="page-container">
    <dashboard
      title="🍑 Loại quả"
      new_title="➕ Thêm quả mới"
      :data="fruits"
      :columns="columns"
      :total="fruits.length"
      searchable
      @add="addFruit"
      @delete="deleteFruit"
      @into="intoFruit"
    ></dashboard>

    <!-- modals -->
    <b-modal :active.sync="isModal" trap-focus destroy-on-hide can-cancel>
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
      // data: fruits,
      columns: [
        {
          field: "id",
          label: "Mã",
        },
        {
          field: "title",
          label: "TÊN LOẠI QUẢ",
        },
        {
          field: "product_count",
          label: "SỐ SẢN PHẨM",
        },
        {
          field: "date_created",
          label: "THỜI GIAN TẠO",
        },
      ],
      total: 0,
      selected: {},
      isModal: false,
    };
  },
  created() {
    this.populate();
  },
  computed: {
    ...mapState({
      fruits: (state) => state.fruit.fruits,
    }),
  },
  methods: {
    ...mapActions("fruit", ["populate", "add", "edit", "delete"]),
    // fetch data
    addFruit() {
      alert("add");
    },
    deleteFruit(rows) {
      this.delete(rows);
    },
    intoFruit(row) {
      this.isModal = true;
      this.selected = row;
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