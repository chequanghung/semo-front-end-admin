<template>
  <div class="page-container">
    <dashboard
      :is_view="true"
      :checkable="true"
      title="🍑 Loại quả"
      del_title="🗑️ Xóa bản ghi"
      new_title="➕ Thêm quả mới"
      :data="fruits"
      :columns="columns"
      :total="fruits.length"
      @add="addFruit"
      @delete="deleteFruit"
      @into="intoFruit"
    ></dashboard>

    <b-loading is-full-page v-model="isLoading"></b-loading>

    <!-- modals -->
    <!-- new modal -->
    <b-modal :active.sync="isNewModal" trap-focus destroy-on-hide can-cancel style="width: auto">
      <fruit-modal
        class="casual-mordal"
        has-modal-card
        title="➕ Thêm quả mới"
        @close="isNewModal = false"
      ></fruit-modal>
    </b-modal>
    <!-- edit modal -->
    <b-modal :active.sync="isEditModal" trap-focus destroy-on-hide can-cancel style="width: auto">
      <fruit-modal
        class="casual-mordal"
        has-modal-card
        title="🖊️ Chỉnh sửa loại quả"
        :data="selected"
        @close="isEditModal = false"
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
          label: "MÃ",
          width: "60",
          searchable: true,
          sortable: true,
        },
        {
          field: "title",
          label: "TÊN LOẠI QUẢ",
          searchable: true,
          sortable: true,
        },
        {
          field: "product_count",
          label: "SỐ SẢN PHẨM",
          sortable: true,
        },
        {
          field: "date_created",
          label: "THỜI GIAN TẠO",
        },
      ],
      selected: {},
      isEditModal: false,
      isNewModal: false,
      isLoading: false
    };
  },
  created() {
    this.isLoading = true

    this.populate()
    .then(() => {
      this.isLoading = false
    });
  },
  computed: {
    ...mapState({
      fruits: (state) => state.fruit.fruits,
    }),
  },
  methods: {
    ...mapActions("fruit", ["populate", "add", "delete"]),
    // fetch data
    addFruit() {
      this.isNewModal = true;
    },
    deleteFruit(rows) {
      // get empty fruits to delete
      // delete
      this.delete(rows); // delete fruits
    },
    intoFruit(row) {
      this.isEditModal = true;
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