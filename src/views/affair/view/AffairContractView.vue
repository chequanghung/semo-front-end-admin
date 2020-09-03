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
          <p style="text-align: center;">Nhấp vào điều khoản để chỉnh sửa</p>
          <br />
          <b-notification type="is-warning" v-if="updateMode === 'MERGE'">
            <strong>💡 Đối tác của bạn vừa yêu cầu cập nhật hợp đồng. Cùng nhau trao đổi và chỉnh sửa hợp đồng nhé!</strong>
          </b-notification>
          <AffairContractStatementList
            :updateMode="updateMode"
            @change="changeContractAttr"
            @update="changeUpdateMode"
          ></AffairContractStatementList>
          <!-- submit -->
          <br />
          <div class="columns is-centered is-mobile">
            <div class="column is-narrow">
              <b-button
                type="is-green"
                @click="editContract"
                :disabled="isDisabled"
                :loading="isLoading"
                v-if="updateMode === 'CREATE'"
              >✈️ Yêu cầu sửa hợp đồng</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tile is-child box is-narrow">
      <div class="columns is-mobile is-vcentered">
        <div class="column">
          <p style="font-size: 18px; font-weight: 900; color: #b88cd8">⚙️ Chức năng</p>
        </div>
        <div class="column is-narrow">
          <b-button type="is-danger" @click="cancel">❌ Hủy hợp đồng</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
// import AffairContractStatementList from "@/components/Affair/AffairContractStatementList";

export default {
  components: {
    AffairContractStatementList: () =>
      import("@/components/Affair/AffairContractStatementList"),
  },
  computed: {
    ...mapState({
      contract: (state) => state.affair.contract,
      update: (state) => state.affair.update,
      user: (state) => state.user.user,
    }),
    isDisabled: function () {
      if (this.compare(this.contract) === true || this.isLoading === true) {
        return true;
      } else {
        return false;
      }
    },
    updateMode: function () {
      // console.log(Object.keys(this.update).length === 0)
      // if there is no update for this contract yet
      if (Object.keys(this.update).length === 0) {
        // create mode
        return "CREATE";
      }
      // if there is update
      else {
        // if there is a later update
        if (this.contract.date_updated < this.update.date_updated) {
          // if the update is yours
          if (this.update.change_user_id === this.user.id) {
            return "PENDING";
          }
          // if it is not yours
          else {
            return "MERGE";
          }
        }
        // if the contract is ahead of the update
        else {
          return "CREATE";
        }
      }
    },
  },
  data() {
    return {
      cont: {},
      isLoading: false,
    };
  },
  methods: {
    ...mapActions("affair", ["getc", "editc", "clear", "close", "deletea"]),

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
    // submit change on contract object
    changeContractAttr(contract_edit) {
      this.cont.shipment_user_id = contract_edit.shipment_user_id;
      this.cont.shipment_date = contract_edit.shipment_date;
      this.cont.shipment_late_fee = contract_edit.shipment_late_fee;
      this.cont.payment_date = contract_edit.payment_date;
      this.cont.payment_late_fee = contract_edit.payment_late_fee;
      this.cont.preservative_amount = contract_edit.preservative_amount;
    },
    // compare cont with contract in the db
    compare(object) {
      if (
        this.cont.shipment_user_id === object.shipment_user_id &&
        this.cont.shipment_date === object.shipment_date &&
        this.cont.shipment_late_fee === object.shipment_late_fee &&
        this.cont.payment_date === object.payment_date &&
        this.cont.payment_late_fee === object.payment_late_fee &&
        this.cont.preservative_amount === object.preservative_amount
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  async mounted() {
    this.getc(this.$route.params.id).then(() => {
      // bind data from contractinto cont
      this.cont = {
        affair_contract_id: this.contract.id,
        shipment_user_id: this.contract.shipment_user_id,
        shipment_date: this.contract.shipment_date,
        shipment_late_fee: this.contract.shipment_late_fee,
        payment_date: this.contract.payment_date,
        payment_late_fee: this.contract.payment_late_fee,
        preservative_amount: this.contract.preservative_amount,
        change_user_id: this.user.id,
      };
    });
  },
};
</script>

<style scoped>
</style>