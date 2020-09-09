<template>
  <div class="container">
    <br />
    <div class="columns">
      <div class="column">
        <b-button type="is-danger" outlined @click="back">👈 Quay lại</b-button>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-vertical is-parent">
        <div class="tile is-child box">
          <p class="home-section-title">🗃️ Điều khoản</p>
          <!-- statements -->
          <br />
          <AffairContractStatementList :updateMode="updateMode" :columns="columns"></AffairContractStatementList>
        </div>
      </div>
    </div>

    <hr />

    <p class="home-section-title">⏫ Cập nhật gửi đi</p>
    <b-table :data="records" :columns="columns"></b-table>

    <hr />

    <b-loading v-model="isLoading" is-full-page></b-loading>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";
// import AffairContractStatementList from "@/components/Affair/AffairContractStatementList";

export default {
  components: {
    AffairContractStatementList: () =>
      import("@/components/Affair/AffairContractStatementList"),
  },
  computed: {
    ...mapState({
      contract: (state) => state.affair.contract,
      updates: (state) => state.affair.updates,
    }),
    isDisabled: function () {
      if (this.compare(this.contract) === true || this.isLoading === true) {
        return true;
      } else {
        return false;
      }
    },
  },
  data() {
    return {
      cont: {},
      isLoading: false,
      updateMode: "PENDING",
      columns: [
        {
          field: "shipment_user",
          label: "NGƯỜI VẬN CHUYỂN",
        },
        {
          field: "shipment_date",
          label: "NGÀY VẬN CHUYỂN",
        },
        {
          field: "shipment_late_fee",
          label: "PHÍ VẬN CHUYỂN",
        },
        {
          field: "payment_date",
          label: "NGÀY THANH TOÁN",
        },
        {
          field: "payment_late_fee",
          label: "PHÍ THANH TOÁN CHẬM",
        },
        {
          field: "preservative_amount",
          label: "NỒNG ĐỘ BẢO QUẢN (%)",
        },
        {
          field: "change_user",
          label: "NGƯỜI THAY ĐỔI",
        },
        {
          field: "date_updated",
        },
      ],
      records: [],
    };
  },
  methods: {
    ...mapActions("affair", [
      "getc",
      "editc",
      "clear",
      "close",
      "deletea",
      "getus",
    ]),

    back() {
      this.clear();
      this.$router.go(-1);
    },
    cancel() {
      let vm = this;
      let cont = this.contract;

      this.$buefy.dialog.confirm({
        type: "is-danger",
        message: `Giao kèo này bị hủy và bạn sẽ không lấy lại được tiền cọc. Bạn chắc chắn chứ? 😨`,
        onConfirm: () => {
          vm.isLoading = true;

          vm.deletea(cont)
            .then(() => {
              vm.isLoading = false;

              vm.$buefy.toast.open({
                type: "is-success",
                message: "Bạn đã rời khỏi giao kèo. 👋",
              });

              vm.$router.push({ path: "/user/product" });
            })
            .catch((error) => {
              vm.isLoading = false;

              vm.$buefy.toast.open({
                type: "is-danger",
                message: `Lỗi rồi, bạn thử lại sau nhé. 😓 ${error.response.data.message}`,
              });
            });
        },
      });

      this.clear();
      this.close();
    },
    changeUpdateMode() {
      this.updateMode = "CREATE";
    },
    editContract() {
      // submit to server
      this.isLoading = true;

      this.editc(this.cont)
        .then(() => {
          this.$buefy.toast.open({
            type: "is-success",
            message: "Xong rồi! Hãy chờ đối tác của bạn chấp thuận nhé. 😋",
          });

          this.$router.go(-1);
        })
        .catch(() => {
          this.isLoading = false;
          this.$buefy.toast.open({
            type: "is-danger",
            message: "Lỗi rồi! Bạn thử lại sau nhé. 😥",
          });
        });
    },
  },
  async mounted() {
    this.isLoading = true;

    this.getc(this.$route.params.id).then(() => {
      this.getus(this.$route.params.id)
        .then(() => {
          this.records = this.updates.map((item) => {
            return {
              ...item,
              shipment_late_fee: new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(item.shipment_late_fee),
              payment_late_fee: new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(item.payment_late_fee),
              date_updated: moment(item.date_updated).format(
                "HH:mm DD-MM-YYYY"
              ),
            };
          });
          this.isLoading = false;
        })
      // bind data from contractinto cont
      this.cont = {
        affair_contract_id: this.contract.id,
        shipment_user_id: this.contract.shipment_user_id,
        shipment_date: this.contract.shipment_date,
        shipment_late_fee: this.contract.shipment_late_fee,
        payment_date: this.contract.payment_date,
        payment_late_fee: this.contract.payment_late_fee,
        preservative_amount: this.contract.preservative_amount,
      };
    });
  },
};
</script>

<style scoped>
</style>