<template>
  <div class="modal-container">
    <!-- title -->
    <p class="modal-title">{{title}}</p>
    <div class="modal-form">
      <!-- product -->
      <div class="columns is-vcentered is-mobile">
        <div class="column is-narrow">
          <div
            class="product-thumbnail image is-96x96"
            style="background-size: cover; background-position: center; border-radius: 10px;"
            :style="{backgroundImage: 'url(' + deposit.ProductMedia[0].media_url + ')'}"
          ></div>
        </div>
        <div class="column">
          <p class="card-title">{{ deposit.title }}</p>
          <div class="columns is-mobile">
            <!-- price -->
            <div class="column">
              <div class="card-info">
                <p class="card-info-title">Giá hiện tại</p>
                <p class="card-info-content major">{{ formatCurrency(deposit.price_cur) }}</p>
              </div>
            </div>
          </div>
          <!-- brief info -->
          <p class="card-info-title">{{ deposit.weight }} tạ | {{ deposit.Address.province }}</p>
        </div>
      </div>

      <br />

      <div class="columns">
        <!-- seller -->
        <div class="column">
          <p class="card-title">TIỀN CỌC NGƯỜI BÁN</p>
          <br />
          <DepositBlock
            v-for="deposit in sellerDeps"
            :key="deposit.id"
            :deposit="deposit"
            @shift="shiftDepSell"
          ></DepositBlock>
        </div>

        <!-- buyer -->
        <div class="column">
          <p class="card-title">TIỀN CỌC NGƯỜI MUA</p>
          <br />
          <DepositBlock
            v-for="deposit in buyerDeps"
            :key="deposit.id"
            :deposit="deposit"
            @shift="shiftDepBuy"
          ></DepositBlock>
        </div>
      </div>

      <!-- <div class="modal-submit">
        <div class="columns is-centered">
          <div class="column is-narrow" v-if="data === undefined">
            <b-button
              type="is-green"
              :disabled="this.fruit_title === '' && this.fruit_icon_url === ''"
              @click="addFruit"
            >💾 Lưu mới</b-button>
          </div>
          <div class="column is-narrow" v-if="data !== undefined">
            <b-button
              type="is-green"
              :disabled="this.data.title === this.fruit_title && this.data.icon_url === this.fruit_icon_url || this.fruit_title === ''"
              @click="editFruit"
            >💾 Lưu lại</b-button>
          </div>
          <div class="column is-narrow" v-if="data !== undefined && data.product_count == 0">
            <b-button type="is-danger" @click="deleteFruit">🗑️ Xóa bỏ</b-button>
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";

export default {
  props: ["item", "title"],
  components: {
    DepositBlock: () => import("./DepositBlock"),
  },
  computed: {
    ...mapState({
      deposit: (state) => state.deposit.deposit,
    }),

    sellerDeps: function () {
      return this.item.Deposits.filter(
        (item) => item.notes === "Tien coc cho dau gia"
      );
    },
    buyerDeps: function () {
      return this.item.Deposits.filter(
        (item) => item.notes === "Tien coc cho giao keo"
      );
    },
  },
  methods: {
    ...mapActions("deposit", ["populated", "clear"]),

    formatCurrency(currency) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(currency);
    },

    async shiftDep(item) {
      axios.put(`/admin/deposit/changeStatus`, {
        id: item.id,
        admin_status: -1,
      });
    },

    async approveDep(item) {
      axios.put(`/admin/deposit/changeStatus`, {
        id: item.id,
        admin_status: 1,
      });
    },

    async shiftDepSell(item) {
      let vm = this;

      axios
        .put(`/admin/deposit/changeStatus`, {
          id: item.id,
          admin_status: -1,
        })
        .then(() => {
          axios
            .post(`/admin/transaction`, {
              src_wallet_id: 54,
              rcv_wallet_id: vm.buyerDeps[0].src_wallet_id,
              amount: item.amount,
              notes: "Boi thuong tien coc",
            })
            .then(async () => {
              if (vm.buyerDeps[0].admin_status !== 1) {
                vm.approveDep(vm.buyerDeps[0]);
              }

              vm.$buefy.toast.open({
                type: "is-success",
                message: "Đã thu hồi cọc thành công.",
              });
            })
            .catch(() => {
              this.$buefy.notification.open({
                type: "is-warning",
                message: "Đã xảy ra lỗi.",
              });
            });
        })
        .catch(() => {
          this.$buefy.notification.open({
            type: "is-danger",
            message: "Đã xảy ra lỗi.",
          });
        })
        .finally(() => {
          this.populated(this.item.id);
        });
    },

    async shiftDepBuy(item) {
      let vm = this;

      axios
        .put(`/admin/deposit/changeStatus`, {
          id: item.id,
          admin_status: -1,
        })
        .then(() => {
          axios
            .post(`/admin/transaction`, {
              src_wallet_id: 54,
              rcv_wallet_id: vm.sellerDeps[0].src_wallet_id,
              amount: item.amount,
              notes: "Boi thuong tien coc",
            })
            .then(async () => {
              if (vm.sellerDeps[0].admin_status !== 1) {
                vm.approveDep(vm.sellerDeps[0]);
              }

              vm.$buefy.toast.open({
                type: "is-success",
                message: "Đã thu hồi cọc thành công.",
              });
            })
            .catch(() => {
              this.$buefy.notification.open({
                type: "is-warning",
                message: "Đã xảy ra lỗi.",
              });
            });
        })
        .catch(() => {
          this.$buefy.notification.open({
            type: "is-danger",
            message: "Đã xảy ra lỗi.",
          });
        })
        .finally(() => {
          this.populated(this.item.id);
        });
    },
  },
  async mounted() {
    this.populated(this.item.id);
  },
};
</script>

<style scoped>
.modal-container {
  background-color: white;
  border-radius: 10px;
  padding: 40px;
}

.modal-title {
  font-size: 20px;
  font-family: "Roboto";
  font-weight: 900;
  color: #01d28e;
  padding-bottom: 10px;
}

.card-title {
  font-size: 18px;
  font-family: "Roboto";
  font-weight: 900;
  color: #01d28e;
}

.card-info {
  padding: 8px 0;
}

.card-info-title {
  color: #707070;
  font-size: 15px;
}

.card-info-content {
  font-size: 17px;
  font-weight: 900;
  color: #707070;
}

.card-info-subtle {
  font-size: 12px;
}
</style>