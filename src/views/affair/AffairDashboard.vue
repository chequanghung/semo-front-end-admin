<template>
  <div class="page-container">
    <dashboard
      :is_view="true"
      :checkable="true"
      title="🤝 Giao kèo"
      del_title="🗑️ Hủy giao kèo"
      :data="affairs"
      :columns="columns"
      :total="affairs.length"
      @delete="deleteAffair"
      @into="intoAffair"
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
          field: "product",
          label: "TÊN SẢN PHẨM",
          searchable: true,
          sortable: true,
        },
        {
          field: "seller",
          label: "NGƯỜI BÁN",
          searchable: true,
        },
        {
          field: "buyer",
          label: "NGƯỜI MUA",
          searchable: true,
        },
        {
          field: "affair_status",
          label: "TRẠNG THÁI",
          searchable: true,
          sortable: true,
        },
        {
          field: "date_updated",
          label: "CẬP NHẬT CUỐI",
          searchable: true,
        },
      ],
      selected: [],
    };
  },
  async mounted() {
    this.populate();
  },
  computed: {
    ...mapState({
      affairs: (state) => state.affair.affairs,
    }),
  },
  methods: {
    ...mapActions("affair", ["populate", "deleteas"]),

    deleteAffair(rows) {
      this.deleteas(rows)
      .then(() => {
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'Đã xóa thành công các buổi đấu giá.'
        })
      })
      .catch(() => {
        this.$buefy.notification.open({
          type: 'is-danger',
          message: 'Đã có lỗi xảy ra.'
        })
      })
    },

    intoAffair(row) {
      this.$router.push({ name: 'AffairView', params: { id: row.id }})
    },
  },
};
</script>

<style scoped>
</style>