<template>
  <div
    class="notification"
    :class="{'is-info': deposit.user_status === 1 && deposit.admin_status === 0,'is-success': deposit.user_status === 1 && deposit.admin_status === 1, 'is-danger': deposit.admin_status === -1 || (Date.parse(deposit.date_created) + 1000 * 60 * 60 * 48 - Date.now() < 0 && deposit.user_status === 0)}"
  >
    <div class="columns is-vcentered">
      <div class="column is-narrow">
        <div
          style="background-size: cover; background-position: center; width: 36px; height: 36px; border-radius: 50%;"
          :style="{backgroundImage: `url(${deposit.Wallet.User.img_url})`}"
        ></div>
      </div>
      <div class="column">
        <p>{{deposit.Wallet.User.name}}</p>
      </div>
    </div>

    <div class="columns is-vcentered">
      <div class="column">
        <p>SỐ TIỀN</p>
        <p>{{formatCurrency(deposit.amount)}}</p>
      </div>
      <div class="column">
        <p>NGÀY CHUYỂN CỌC</p>
        <p>{{deadline}}</p>
      </div>
    </div>

    <div class="notification is-light">
    <p>{{status}}</p>
    </div>

    <div class="columns is-centered" v-if="deposit.user_status === 1 && deposit.admin_status === 0">
      <div class="column is-narrow">
        <b-button type="is-primary" @click="returnDeposit">↩️ HOÀN TRẢ CỌC</b-button>
      </div>
      <div class="column is-narrow">
        <b-button type="is-danger" @click="shiftDeposit">👎 THU HỒI CỌC</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";

export default {
  props: ["deposit"],
  computed: {
    deadline: function () {
      return moment(
        Date.parse(this.deposit.date_created) + 1000 * 60 * 60 * 48
      ).format("DD-MM-YYYY");
    },
    status: function () {
      if (this.deposit.user_status === 0) {
        if (Date.parse(this.deposit.date_created) + 1000 * 60 * 60 * 48 - Date.now() < 0) {
          return "⚠️ MUỘN CHUYỂN CỌC";
        } else {
          return "⏲ ĐANG CHỜ CỌC";
        }
      } else if (this.deposit.admin_status === 0) {
        return "✔️ ĐÃ CHUYỂN CỌC";
      } else if (this.deposit.admin_status === 1) {
        return "↩️ ĐÃ TRẢ LẠI CỌC";
      } else {
        return "👎 BỊ THU HỒI CỌC";
      }
    },
  },
  methods: {
    formatCurrency(currency) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(currency);
    },

    returnDeposit() {
      axios
        .put(`/admin/deposit/changeStatus`, {
          id: this.deposit.id,
          admin_status: 1,
        })
        .then(() => {
          this.deposit.admin_status = 1;

          this.$buefy.toast.open({
            type: "is-success",
            message: "Đã trả lại tiền cọc thành công.",
          });
        })
        .catch(() => {
          this.$buefy.toast.open({
            type: "is-danger",
            message: "Đã có lỗi xảy ra.",
          });
        });
    },

    shiftDeposit() {
      this.deposit.admin_status = -1
      this.$emit("shift", this.deposit);
    },
  },
};
</script>

<style>
</style>