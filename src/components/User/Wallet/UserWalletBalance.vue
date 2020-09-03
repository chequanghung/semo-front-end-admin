<template>
  <div class="card-container">
    <!-- prompt -->
    <div class="tile notification is-warning" v-if="wallet.wallet_status === 0">
      <div class="columns is-mobile is-vcentered">
        <div class="column is-narrow">
          <p style="font-size: 18px;">🧐</p>
        </div>
        <div class="column">
          <p>Chúng tôi đang xem xét giấy tờ xác thực của bạn. Nếu được xác nhận, chiếc ví này sẽ toàn quyền là của bạn.</p>
      </div>
      </div>
    </div>
    <!-- balance -->
    <div class="balance">
      <p class="home-section-subtitle">SỐ DƯ HIỆN TẠI</p>
      <p class="home-section-title" style="text-align: center;">{{ formatCurrency(wallet.amount) }}</p>
    </div>
    <!-- button -->
    <div class="columns is-centered is-mobile">
      <div class="column is-narrow">
        <b-button type="is-green" @click="topUp" :disabled='wallet.wallet_status === 0'>➕ Nạp tiền vào ví</b-button>
      </div>
    </div>
    <br/>
    <!-- deposits and stats -->
    <div class="columns">
      <div class="column">
        <!-- deposit -->
          <div class="tile box">
              <p class="home-section-title">🧾 Cần thanh toán</p>
          </div>
      </div>
      <div class="column">
        <!-- stats -->
        <div class="tile box">
              <p class="home-section-title">📈 Thống kê</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      user: (state) => state.user.user,
      wallet: (state) => state.wallet.wallet,
      deposit: (state) => state.wallet.deposit,
    }),
  },
  async mounted() {
    this.getw(this.user.id).then(() => {
      this.getd();
    });
  },
  methods: {
    ...mapActions("wallet", ["getw", "getd"]),
    // format currency
    formatCurrency(amount) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount);
    },
    topUp() {
        this.$emit('topup')
    }
  },
};
</script>

<style scoped>
.balance {
    width: 100%;
    text-align: center !important;
}
</style>