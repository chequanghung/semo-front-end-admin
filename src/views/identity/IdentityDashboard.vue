<template>
  <div class="page-container">
    <dashboard
      :is_view="true"
      title="🎫 Xác thực"
      :data="data"
      :columns="columns"
      :total="identities.length"
      @into="intoIdentity"
    ></dashboard>

    <!-- modal -->
    <b-modal :active.sync="isReviewModal" destroy-on-hide can-cancel style="width: auto">
      <IdentityModal
        class="casual-mordal"
        has-modal-card
        title="👀 Duyệt xác thực"
        :data="selected"
        @close="closeModal"
      ></IdentityModal>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";

export default {
  components: {
    Dashboard: () => import("../../components/Dashboard"),
    IdentityModal: () => import("@/components/Modal/IdentityModal"),
  },
  data() {
    return {
      columns: [
        {
          field: "name",
          label: "TÊN NGƯỜI DÙNG",
          searchable: true,
        },
        {
          field: "number",
          label: "SỐ CHỨNG MINH NHÂN DÂN",
          searchable: true,
        },
        {
          field: "date_created",
          label: "THỜI GIAN ĐĂNG",
          searchable: true,
        },
        {
          field: "identity_status",
          label: "TRẠNG THÁI",
          searchable: true,
          sortable: true,
        },
      ],
      data: [],
      selected: {},
      isReviewModal: false,
    };
  },
  async mounted() {
    this.getData();
  },
  computed: {
    ...mapState({
      identities: (state) => state.identity.identities,
    }),
  },
  methods: {
    ...mapActions("identity", ["populate"]),

    async getData() {
      this.populate().then(() => {
        this.data = this.identities.map((item) => {
          switch (item.identity_status) {
            case 0:
              return {
                ...item,
                date_created: moment(item.date_created).format(
                  "hh:mm DD/MM/YYYY"
                ),
                identity_status: "❌ KHÔNG HỢP LỆ",
              };

            case 1:
              return {
                ...item,
                date_created: moment(item.date_created).format(
                  "hh:mm DD/MM/YYYY"
                ),
                identity_status: "⏳ CHỜ XÁC THỰC",
              };

            case 2:
              return {
                ...item,
                date_created: moment(item.date_created).format(
                  "hh:mm DD/MM/YYYY"
                ),
                identity_status: "✔️ ĐÃ XÁC THỰC",
              };
          }
        });
      });
    },

    intoIdentity(row) {
      this.selected = row;
      this.isReviewModal = true;
    },

    closeModal() {
      this.isReviewModal = false;
      this.getData();
    },
  },
};
</script>

<style scoped>
</style>