<template>
  <div class="page-container">
    <!-- transportation -->
    <p class="section-title">VẬN CHUYỂN</p>
    <!-- transportation responsibilities -->
    <ContractStatement
      title="Bên vận chuyển"
      :user="shipment_user"
      :users="[affair.buyer, affair.seller]"
      :class="{'edited' : shipment_user !== contract.shipment_user && shipment_user}"
      :uneditable="updateMode !== 'CREATE'"
    ></ContractStatement>
    <!-- transportation deadline -->
    <ContractStatement
      title="Ngày bắt đầu vận chuyển"
      :date="shipment_date"
      :class="{'edited' : shipment_date !== contract.shipment_date && shipment_date}"
      :uneditable="updateMode !== 'CREATE'"
    ></ContractStatement>
    <!-- transportation fee -->
    <ContractStatement
      title="Phí vận chuyển"
      :money="shipment_late_fee"
      :min="0"
      :max="product.price_cur"
      :class="{'edited' : shipment_late_fee !== contract.shipment_late_fee && shipment_late_fee}"
      :uneditable="updateMode !== 'CREATE'"
    ></ContractStatement>
    <!-- transaction -->
    <p class="section-title">THANH TOÁN</p>
    <!-- payment date -->
    <ContractStatement
      title="Ngày thanh toán"
      :date="payment_date"
      :class="{'edited' : payment_date !== contract.payment_date && payment_date}"
      :uneditable="updateMode !== 'CREATE'"
    ></ContractStatement>
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
    ></ContractStatement>
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
    ></ContractStatement>
    <br />

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
    async setAtr() {
      // price of the contract
      this.price_cur = this.product.price_cur;

      // if (there are no updates) or (the contract is more recent than the latest update and this is your update) or ()
        this.shipment_user = this.contract.shipment_user;
        this.shipment_date = this.contract.shipment_date;
        this.shipment_late_fee = this.contract.shipment_late_fee;
        this.payment_date = this.contract.payment_date;
        this.payment_late_fee = this.contract.payment_late_fee;
        this.preservative_amount = this.contract.preservative_amount;
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