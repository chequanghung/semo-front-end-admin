<template>
  <div class="page-container">
    <div class="columns">
      <div class="column is-5">
        <div class="column-section">
          <br />
          <br />
          <div>
            <b-button type="is-danger" outlined @click="back">👈 Quay lại</b-button>
          </div>
          <br />
          <div class="tile is-ancestor">
            <div class="tile is-vertical is-parent">
              <div class="tile is-child box" v-if="affair.buyer !== undefined">
                <p class="home-section-title">🛒 Người mua</p>
                <div class="columns is-mobile is-vcentered" style="margin-bottom: 8px;">
                  <div class="column is-narrow">
                    <div
                      :style="{backgroundImage: 'url(' + affair.buyer.img_url + ')'}"
                      style="border-radius: 50%; width: 36px; height: 36px; background-size: cover; background-position: center"
                    ></div>
                  </div>
                  <div class="column">
                    <p
                      class="home-section-title"
                      style="margin-bottom: 0; font-size: 20px;"
                    >{{ affair.buyer.name }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductCard :affair="affair" :product="product"></ProductCard>
          <br />
        </div>
      </div>
      <div class="column">
        <br />
        <br />
        <!-- status and contract -->
        <div style="height: fit-content;">
          <div class="tile is-ancestor">
            <div class="tile is-vertical is-parent">
              <!-- status -->
              <div class="tile is-child box">
                <div class="column">
                  <!-- status -->
                  <p class="home-section-title">🧾 Thông tin</p>
                  <!-- buyer deposit -->
                  <div class="columns is-mobile is-vcentered" v-if="product">
                    <div class="column">
                      <p class="sub-title">TIỀN CỌC NGƯỜI MUA</p>
                    </div>
                    <div class="column is-narrow">
                      <p class="title">{{ buyer_deposit }}</p>
                    </div>
                  </div>
                  <!-- transportation -->
                  <div class="columns is-mobile is-vcentered" v-if="product">
                    <div class="column">
                      <p class="sub-title">NGÀY VẬN CHUYỂN</p>
                    </div>
                    <div class="column is-narrow">
                      <p class="title">{{ date_shipment }}</p>
                    </div>
                  </div>
                  <!-- buyer transaction -->
                  <div class="columns is-mobile is-vcentered" v-if="product">
                    <div class="column">
                      <p class="sub-title">NGÀY THANH TOÁN</p>
                    </div>
                    <div class="column is-narrow">
                      <p class="title">{{ date_payment }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tile is-vertical is-parent">
              <!-- contract -->
              <div class="tile is-child box">
                <div class="column">
                  <p class="home-section-title">📋 Hợp đồng</p>
                  <div class="columns is-multiline">
                    <div class="column is-full">
                      <p class="sub-title">THAY ĐỔI LẦN CUỐI</p>
                      <p
                        class="title"
                        style="font-size: 20px; margin-top: 8px;"
                        v-if="contract !== undefined"
                      >{{ formatDate(contract.date_updated) }}</p>
                    </div>
                    <div class="column"></div>
                    <div class="column is-narrow">
                      <b-button type="is-green" @click="intoContract">👁️ Xem</b-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- chats -->
          <div class="tile is-ancestor">
            <div class="tile is-vertical is-parent">
              <div class="tile is-child box">
                <p class="home-section-title">💬 Trò chuyện</p>
                <!-- content -->
                <div class="chat-content" ref="chats">
                  <div
                    class="columns is-mobile"
                    style="height: fit-content"
                    v-for="(chat, i) in chats"
                    :key="i"
                  >
                    <div
                      class="column is-two-thirds"
                      v-if="chat.sender_user_id !== affair.buyer_user_id"
                    >
                      <div>
                        <div class="bubble" style="width: fit-content">
                          <p style="width: fit-content;">{{ chat.content }}</p>
                        </div>
                      </div>
                    </div>
                    <div class="column"></div>
                    <div
                      class="column is-two-thirds"
                      style="float: right;"
                      v-if="chat.sender_user_id === affair.buyer_user_id"
                    >
                      <div style="float: right;">
                        <div class="bubble you" style="width: fit-content">
                          <p
                            style="word-break: break-all; width: fit-content; text-align: right;"
                          >{{ chat.content }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-loading v-model="isLoading" is-full-page></b-loading>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";

export default {
  props: ["id"],
  components: {
    ProductCard: () => import("@/components/Card/ProductCard"),
  },
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    ...mapState({
      affair: (state) => state.affair.affair,
      chats: (state) => state.affair.chats,
      contract: (state) => state.affair.contract,
      product: (state) => state.affair.product,
    }),

    buyer_deposit: function () {
      if (this.deposit !== undefined && this.deposit !== null) {
        return this.deposit.user_status === 0
          ? "Chưa hoàn thành"
          : "Đã hoàn thành";
      } else {
        return "Chưa hoàn thành";
      }
    },

    date_shipment: function () {
      return this.contract.shipment_date !== null
        ? this.contract.contract_status === 2 ||
          (this.contract.contract_status === 4 &&
            this.contract.contract_status !== 9)
          ? "Hoàn thành"
          : moment(this.contract.shipment_date).format("DD-MM-YYYY")
        : "Chưa thỏa thuận";
    },

    date_payment: function () {
      return this.contract.payment_date !== null
        ? this.contract.contract_status === 3 ||
          (this.contract.contract_status === 4 &&
            this.contract.contract_status !== 9)
          ? "Hoàn thành"
          : moment(this.contract.payment_date).format("DD-MM-YYYY")
        : "Chưa thỏa thuận";
    },

    deposit: function () {
      return this.affair.Deposit;
    },
  },
  methods: {
    ...mapActions("affair", ["populatea", "getcs", "close"]),
    back() {
      this.close();
      this.$router.go(-1);
    },
    intoContract() {
      this.$router.push({
        name: "ContractView",
        params: { id: this.contract.id },
      });
    },
    formatDate(date) {
      return moment(date).format("HH:ss DD/MM/YYYY");
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  async mounted() {
    this.populatea(this.$route.params.id)
      .then(() => {
        this.isLoading = false;
        this.getcs();

        let vm = this;

        if (this.affair.affair_status === 1) {
          this.interval = setInterval(
            function () {
              vm.populatea(this.$route.params.id)
                .then(() => {
                  vm.getcs();

                  // scroll to bottom of the chat section
                  setTimeout(function () {
                    let chatWindow = vm.$refs.chats;
                    chatWindow.scrollTop = chatWindow.scrollHeight;
                  }, 500);
                })
                .catch((error) => {
                  console.info(error);

                  vm.$buefy.toast.open({
                    type: "is-danger",
                    message: "Oh no!",
                  });
                });
            }.bind(this),
            4000
          );
        }
      })
      .catch(() => {
        this.isLoading = false;
      });
  },
};
</script>

<style scoped>
.page-container {
  padding: 0px 60px;
  height: 100vh;
  overflow: hidden;
}

.columns {
  overflow: hidden;
  height: 100%;
}

.column {
  overflow-y: scroll;
  overflow-x: hidden;
}

::-webkit-scrollbar {
  display: none;
}

.sub-title {
  font-size: 14px;
}

.title {
  font-size: 16px;
  font-weight: 900;
  color: #01d28e;
}

.chat-content {
  height: 480px;
  overflow-y: scroll;
  padding: 0 12px;
  scroll-behavior: smooth;
}

.chat-content::-webkit-scrollbar {
  display: initial;
}

.bubble {
  color: #707070;
  background-color: #ececec;
  border-radius: 20px 20px 20px 20px;
  padding: 8px 16px;
}

.you {
  color: white;
  background-color: #01d28e;
}
</style>