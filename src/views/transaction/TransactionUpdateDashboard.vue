<template>
  <div class="page-container">
    <PageTitle title="💵 Nạp tiền"></PageTitle>
    <br />
    <b-table
      :data="requests"
      paginated
      pagination-simple
      :per-page="20"
      :row-class="(row, index) => row.accepted === 0 && 'is-primary'"
    >
      <template slot-scope="props">
        <b-table-column label="MÃ" width="120">{{ props.row.id }}</b-table-column>
        <b-table-column label="NGƯỜI DÙNG">
          <div class="cursor columns is-vcentered is-mobile">
            <div class="column is-narrow" style="margin: 0">
              <div
                style="background-size: cover; background-position: center; width: 32px; height: 32px; border-radius: 50%;"
                :style="{backgroundImage: `url(${props.row.user_img})`}"
              ></div>
            </div>
            <div class="column is-narrow">
              <p class="sub-title">{{ props.row.user_name }}</p>
            </div>
          </div>
        </b-table-column>
        <b-table-column label="SỐ TIỀN">{{ formatCurrency(props.row.amount) }}</b-table-column>
        <b-table-column label="NGÀY TẠO">{{ formatDate(props.row.date_created) }}</b-table-column>
        <b-table-column>
          <div v-if="props.row.accepted === 0">
            <b-button type="is-primary" style="margin-right: 8px;" @click="approve(props.row)">➕ Nạp tiền</b-button>
            <b-button type="is-danger" @click="deny(props.row)">🗑️ Hủy</b-button>
          </div>
          <div v-if="props.row.accepted === 1">
              <p class="success">Đã nạp tiền</p>
          </div>
        </b-table-column>
      </template>
    </b-table>

    <!-- modals -->
    <!-- <b-modal :active.sync="isModal" trap-focus destroy-on-hide can-cancel style="width: auto">
      <fruit-modal
        class="casual-mordal"
        has-modal-card
        title="🖊️ Chỉnh sửa loại quả"
        :data="selected"
      ></fruit-modal>
    </b-modal>-->

    <b-loading is-full-page v-model="isLoading"></b-loading>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from 'moment'

export default {
  components: {
    PageTitle: () => import("@/components/PageTitle"),
  },
  computed: {
    ...mapState({
      requests: (state) => state.transaction.requests,
    }),
  },
  data() {
    return {
      //   requests: [],
      isLoading: false,
      request: {},
      interval: {},
    };
  },
  methods: {
    ...mapActions("transaction", ["populaters", "changer"]),

    formatCurrency(currency) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(currency);
    },

    formatDate(date){
        return moment(date).format('HH:mm DD-MM-YYYY')
    },

    approve(row) {
        this.changer({
            id: row.id,
            accepted: 1
        })
        .then(() => {
            this.$buefy.notification.open({
                type: 'is-success',
                message: 'Đã nạp tiền thành công.'
            })
        })
        .catch(() => {
            this.$buefy.notification.open({
                type: 'is-danger',
                message: 'Đã xảy ra lỗi.'
            })
        })
    },

    deny(row){
        this.changer({
            id: row.id,
            accepted: -1
        })
        .then(() => {
            this.$buefy.notification.open({
                type: 'is-danger',
                message: 'Đã từ chối nạp tiền.'
            })
        })
        .catch(() => {
            this.$buefy.notification.open({
                type: 'is-danger',
                message: 'Đã xảy ra lỗi.'
            })
        })
    }
  },
  async mounted() {
    this.populaters();

    this.interval = setInterval
  },
};
</script>

<style scoped>
.image-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
}

.sub-title {
  font-family: "Roboto";
  color: #707070;
  font-weight: 500;
}
</style>