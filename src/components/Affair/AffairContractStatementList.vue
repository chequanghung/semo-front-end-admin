<template>
  <div class="page-container">
    <b-notification type="is-warning" v-if="updateMode === 'PENDING'">
      <strong>⌛ Bạn mới chỉnh sửa hợp đồng rồi. Hãy chờ đối tác chấp thuận những thay đổi dưới đây của bạn. Sẽ không lâu đâu!</strong>
    </b-notification>
    <!-- transportation -->
    <p class="section-title">VẬN CHUYỂN</p>
    <!-- transportation responsibilities -->
    <ContractStatement
      title="Bên vận chuyển"
      :user="shipment_user"
      :users="[affair.buyer, affair.seller]"
      :class="{'edited' : shipment_user !== contract.shipment_user && shipment_user}"
      :uneditable="updateMode !== 'CREATE'"
      @changeUser="changeShipmentUser"
    ></ContractStatement>
    <!-- update request of transportation responsibilities | done -->
    <div class="change" v-if="updateMode === 'MERGE' && ((shipment_user === null && update.shipment_user !== null) || shipment_user.id !== update.shipment_user_id)">
      <div
        class="tile notification is-warning is-light"
        style="display: flex; justify-content: center; flex-flow: column;"
      >
        <p class="change-notice-title">Có thay đối từ đối tác của bạn</p>
        <ContractStatement
          title="Bên vận chuyển"
          :user="update.shipment_user"
          :uneditable="true"
          class="edited"
        ></ContractStatement>
        <div class="columns is-mobile is-vcentered is-centered">
          <div class="column is-narrow">
            <b-button type="is-green" @click="changeShipmentUser(update.shipment_user)">✅ Chấp thuận</b-button>
          </div>
          <div class="column is-narrow">
            <b-button type="is-danger" @click="refuseShipmentUser">⛔ Từ chối</b-button>
          </div>
        </div>
      </div>
      <hr />
    </div>
    <!-- transportation deadline -->
    <ContractStatement
      title="Ngày bắt đầu vận chuyển"
      :date="shipment_date"
      :class="{'edited' : shipment_date !== contract.shipment_date && shipment_date}"
      :uneditable="updateMode !== 'CREATE'"
      @changeDate="changeShipDate"
    ></ContractStatement>
    <!-- update request of transportation deadline | done -->
    <div
      class="change"
      v-if="updateMode === 'MERGE' && update.shipment_date !== shipment_date"
    >
      <div
        class="tile notification is-warning is-light"
        style="display: flex; justify-content: center; flex-flow: column;"
      >
        <p class="change-notice-title">Có thay đối từ đối tác của bạn</p>
        {{shipment_date}} | 
        {{update.shipment_date}}
        <ContractStatement
          title="Ngày bắt đầu vận chuyển"
          :date="update.shipment_date"
          :uneditable="true"
          class="edited"
        ></ContractStatement>
        <div class="columns is-mobile is-vcentered is-centered">
          <div class="column is-narrow">
            <b-button type="is-green" @click="changeShipDate(update.shipment_date)">✅ Chấp thuận</b-button>
          </div>
          <div class="column is-narrow">
            <b-button type="is-danger" @click="update.shipment_date = shipment_date">⛔ Từ chối</b-button>
          </div>
        </div>
      </div>
      <hr />
    </div>
    <!-- transportation fee -->
    <ContractStatement
      title="Phí vận chuyển"
      :money="shipment_late_fee"
      :min="0"
      :max="product.price_cur"
      :class="{'edited' : shipment_late_fee !== contract.shipment_late_fee && shipment_late_fee}"
      :uneditable="updateMode !== 'CREATE'"
      @changeMoney="changeShipmentLateFee"
    ></ContractStatement>
    <!-- update request of transportation fee | done -->
    <div
      class="change"
      v-if="updateMode === 'MERGE' && update.shipment_late_fee !== shipment_late_fee"
    >
      <div
        class="tile notification is-warning is-light"
        style="display: flex; justify-content: center; flex-flow: column;"
      >
        <p class="change-notice-title">Có thay đối từ đối tác của bạn</p>
        <ContractStatement
          title="Phí vận chuyển"
          :money="update.shipment_late_fee"
          :uneditable="true"
          class="edited"
        ></ContractStatement>
        <div class="columns is-mobile is-vcentered is-centered">
          <div class="column is-narrow">
            <b-button
              type="is-green"
              @click="changeShipmentLateFee(update.shipment_late_fee)"
            >✅ Chấp thuận</b-button>
          </div>
          <div class="column is-narrow">
            <b-button
              type="is-danger"
              @click="update.shipment_late_fee = shipment_late_fee"
            >⛔ Từ chối</b-button>
          </div>
        </div>
      </div>
      <hr />
    </div>
    <!-- transaction -->
    <p class="section-title">THANH TOÁN</p>
    <!-- payment date -->
    <ContractStatement
      title="Ngày thanh toán"
      :date="payment_date"
      :class="{'edited' : payment_date !== contract.payment_date && payment_date}"
      :uneditable="updateMode !== 'CREATE'"
      @changeDate="changePaymentDate"
    ></ContractStatement>
    <!-- update request of payment date | done -->
    <div
      class="change"
      v-if="updateMode === 'MERGE' && update.payment_date !== payment_date"
    >
      <div
        class="tile notification is-warning is-light"
        style="display: flex; justify-content: center; flex-flow: column;"
      >
        <p class="change-notice-title">Có thay đối từ đối tác của bạn</p>
        <ContractStatement
          title="Ngày thanh toán"
          :date="update.payment_date"
          :uneditable="true"
          class="edited"
        ></ContractStatement>
        <div class="columns is-mobile is-vcentered is-centered">
          <div class="column is-narrow">
            <b-button type="is-green" @click="changePaymentDate(update.payment_date)">✅ Chấp thuận</b-button>
          </div>
          <div class="column is-narrow">
            <b-button type="is-danger" @click="update.payment_date = payment_date">⛔ Từ chối</b-button>
          </div>
        </div>
      </div>
      <hr />
    </div>
    <!-- payment amount -->
    <ContractStatement title="Số tiền thanh toán" :money="price_cur" :uneditable="true"></ContractStatement>
    <!-- payment late fee -->
    <ContractStatement
      title="Phí thanh toán muộn"
      :money="payment_late_fee"
      :min="0"
      :max="product.price_cur"
      :class="{'edited' : payment_late_fee !== contract.payment_late_fee && payment_late_fee}"
      :uneditable="updateMode !== 'CREATE'"
      @changeMoney="changePaymentLateFee"
    ></ContractStatement>
    <!-- update request of late fee | done -->
    <div
      class="change"
      v-if="updateMode === 'MERGE' && update.payment_late_fee !== payment_late_fee"
    >
      <div
        class="tile notification is-warning is-light"
        style="display: flex; justify-content: center; flex-flow: column;"
      >
        <p class="change-notice-title">Có thay đối từ đối tác của bạn</p>
        <ContractStatement
          title="Phí thanh toán muộn"
          :money="update.payment_late_fee"
          :uneditable="true"
          class="edited"
        ></ContractStatement>
        <div class="columns is-mobile is-vcentered is-centered">
          <div class="column is-narrow">
            <b-button
              type="is-green"
              @click="changePaymentLateFee(update.payment_late_fee)"
            >✅ Chấp thuận</b-button>
          </div>
          <div class="column is-narrow">
            <b-button type="is-danger" @click="update.payment_late_fee = payment_late_fee">⛔ Từ chối</b-button>
          </div>
        </div>
      </div>
      <hr />
    </div>
    <!-- extra -->
    <p class="section-title">CHẤT LƯỢNG</p>
    <!-- preservation amount -->
    <ContractStatement
      title="Nồng đồ chất bảo quản thực vật"
      :percent="preservative_amount"
      :min="0"
      :max="100"
      :class="{'edited' : preservative_amount !== contract.preservative_amount && preservative_amount}"
      :uneditable="updateMode !== 'CREATE'"
      @changePercent="changePreservativeAmount"
    ></ContractStatement>
    <!-- update request of preservation amount -->
    <div
      class="change"
      v-if="updateMode === 'MERGE' && update.preservative_amount !== preservative_amount"
    >
      <div
        class="tile notification is-warning is-light"
        style="display: flex; justify-content: center; flex-flow: column;"
      >
        <p class="change-notice-title">Có thay đối từ đối tác của bạn</p>
        <ContractStatement
          title="Nồng đồ chất bảo quản thực vật"
          :percent="update.preservative_amount"
          :uneditable="true"
          class="edited"
        ></ContractStatement>
        <div class="columns is-mobile is-vcentered is-centered">
          <div class="column is-narrow">
            <b-button
              type="is-green"
              @click="changePreservativeAmount(update.preservative_amount)"
            >✅ Chấp thuận</b-button>
          </div>
          <div class="column is-narrow">
            <b-button
              type="is-danger"
              @click="update.preservative_amount = preservative_amount"
            >⛔ Từ chối</b-button>
          </div>
        </div>
      </div>
      <hr />
    </div>
    <br />

    <div class="columns is-mobile is-centered">
      <div class="column is-narrow">
        <!-- :disabled="updateMode"  -->
        <b-button
          :disabled="!compare(update)"
          type="is-green"
          @click="submitUpdateReview"
          v-if="updateMode === 'MERGE'"
        >✅ Thay đổi trạng thái</b-button>
      </div>
    </div>
    <b-loading is-full-page v-model="isLoading" :can-cancel="false"></b-loading>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";

export default {
  components: {
    ContractStatement: () => import("./AffairContractStatement"),
  },
  props: ["updateMode"],
  computed: {
    ...mapState({
      contract: (state) => state.affair.contract,
      product: (state) => state.affair.product,
      affair: (state) => state.affair.affair,
      update: (state) => state.affair.update,
      user: (state) => state.user.user,
    }),
  },
  data() {
    return {
      shipment_user: null,
      shipment_date: null,
      shipment_late_fee: null,
      payment_date: null,
      payment_late_fee: null,
      preservative_amount: null,
      price_cur: null,
      // updated: false,
      isLoading: false,
      pendingUpdate: false,
    };
  },
  methods: {
    ...mapActions("affair", ["mergec"]),
    submitUpdateReview() {
      this.isLoading = true;

      this.mergec({
        id: this.contract.id,
        shipment_user_id:
          this.shipment_user !== null ? this.shipment_user.id : null,
        shipment_date:
          this.shipment_date !== null
            ? moment(this.shipment_date).format("YYYY-MM-DD")
            : null,
        shipment_late_fee: this.shipment_late_fee,
        payment_date:
          this.shipment_date !== null
            ? moment(this.payment_date).format("YYYY-MM-DD")
            : null,
        payment_late_fee: this.payment_late_fee,
        preservative_amount: this.preservative_amount,
        change_user_id: this.user.id,
      })
        .then(() => {
          this.isLoading = false;
          this.$emit("update");

          this.$buefy.toast.open({
            type: "is-success",
            message: "Tuyệt, bây giờ bạn có thể tiếp tục sửa hợp đồng rồi! 🤗",
          });
        })
        .catch(() => {
          this.isLoading = false;

          this.$buefy.toast.open({
            type: "is-danger",
            message:
              "Ầu, có chút lỗi rồi, bạn chờ một chút rồi thử lại nhé. 😥",
          });
        });
    },
    changeShipDate(date) {
      this.shipment_date = moment(date).format("YYYY-MM-DD");
      this.bindChange();
    },
    changeShipmentLateFee(content) {
      this.shipment_late_fee = content;
      this.bindChange();
    },
    changePaymentLateFee(content) {
      this.payment_late_fee = content;
      this.bindChange();
    },
    changePaymentDate(date) {
      this.payment_date = moment(date).format("YYYY-MM-DD");
      this.bindChange();
    },
    changePreservativeAmount(percent) {
      this.preservative_amount = percent;
      this.bindChange();
    },
    changeShipmentUser(user) {
      this.shipment_user = user;
      this.bindChange();
    },
    refuseShipmentUser() {
      this.update.shipment_user = this.shipment_user;
      this.update.shipment_user_id =
        this.shipment_user !== null ? this.shipment_user.id : null;
    },
    async setAtr() {
      // price of the contract
      this.price_cur = this.product.price_cur;

      // if (there are no updates) or (the contract is more recent than the latest update and this is your update) or ()
      if (this.updateMode !== "PENDING") {
        this.shipment_user = this.contract.shipment_user;
        this.shipment_date = this.contract.shipment_date;
        this.shipment_late_fee = this.contract.shipment_late_fee;
        this.payment_date = this.contract.payment_date;
        this.payment_late_fee = this.contract.payment_late_fee;
        this.preservative_amount = this.contract.preservative_amount;
      }
      // if your
      else {
        this.shipment_user = this.update.shipment_user;
        this.shipment_date = this.update.shipment_date;
        this.shipment_late_fee = this.update.shipment_late_fee;
        this.payment_date = this.update.payment_date;
        this.payment_late_fee = this.update.payment_late_fee;
        this.preservative_amount = this.update.preservative_amount;
      }
    },
    bindChange() {
      let contract_edit = {
        shipment_user_id: this.shipment_user ? this.shipment_user.id : null,
        shipment_date: this.shipment_date,
        shipment_late_fee: this.shipment_late_fee,
        payment_date: this.payment_date,
        payment_late_fee: this.payment_late_fee,
        preservative_amount: this.preservative_amount,
      };

      this.$emit("change", contract_edit);
    },
    // compare cont with contract in the db
    compare(object) {
      if (
        ((this.shipment_user !== null &&
          this.shipment_user.id === object.shipment_user_id) ||
          this.shipment_user === object.shipment_user) &&
        ((this.shipment_date !== null &&
          this.shipment_date ===
            moment(object.shipment_date).format("YYYY-MM-DD")) ||
          this.shipment_date === object.shipment_date) &&
        this.shipment_late_fee === object.shipment_late_fee &&
        ((this.payment_date !== null &&
          this.payment_date ===
            moment(object.payment_date).format("YYYY-MM-DD")) ||
          this.payment_date === object.shipment_date) &&
        this.payment_late_fee === object.payment_late_fee &&
        this.preservative_amount === object.preservative_amount
      ) {
        return true;
      } else {
        return false;
      }
    },
    formatDate(date) {
      return date !== null ? moment(date).format("YYYY-MM-DD") : null
    },
  },
  // async mounted() {},
  watch: {
    contract: function () {
      if (this.contract !== undefined) {
        this.setAtr();
      }
    },
  },
};
</script>

<style scoped>
.page-container {
  padding: 0;
}

.section-title {
  text-transform: uppercase;
  color: #707070;
  font-size: 17px;
  margin: 16px 0;
  font-weight: 700;
}

.change-notice-title {
  text-align: center;
}

.edited {
  background-color: #fff7cc;
  box-shadow: 0 2px 4px #fff7cc59;
}
</style>