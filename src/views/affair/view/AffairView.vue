<template>
  <div class="page-container">
    <div class="columns">
      <div class="column is-4">
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
                <div class="columns is-mobile is-vcentered">
                  <div class="column is-narrow">
                    <div
                      :style="{backgroundImage: 'url(' + affair.buyer.img_url + ')'}"
                      style="border-radius: 50%; width: 48px; height: 48px; background-size: cover; background-position: center"
                    ></div>
                  </div>
                  <div class="column">
                    <p class="home-section-title" style="margin-bottom: 0">{{ affair.buyer.name }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductCard :affair="affair" :product="affair.Product"></ProductCard>
          <br />
        </div>
      </div>
      <div class="column">
        <br />
        <br />
        <!-- status and contract -->
        <div class="columns is-mobile is-multiline" style="height: fit-content;">
          <div class="tile is-ancestor">
            <div class="tile is-vertical is-parent">
              <!-- status -->
              <div class="tile is-child box">
                <div class="column is-7">
                  <p class="home-section-title">⚠️ Lưu ý</p>
                </div>
              </div>
            </div>
            <!-- contract -->
            <div class="column is-5">
              <Card title="📋 Hợp đồng">
                <template v-slot:content>
                  <AffairContractCard :contract="affair.AffairContract" @click="intoContract"></AffairContractCard>
                </template>
              </Card>
            </div>
          </div>
          <!-- chats -->
          <div class="column is-full">
            <Card title="💬 Trò chuyện"></Card>
          </div>
          <!-- functions -->
          <div class="column">
            <Card title>
              <template v-slot:content>
                <div class="columns">
                  <div class="column"></div>
                  <div class="column is-narrow">
                    <b-button type="is-danger">🗑️ Xóa giao kèo</b-button>
                  </div>
                </div>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["id"],
  components: {
    ProductCard: () => import("@/components/Card/ProductCard"),
    Card: () => import("@/components/Card/Card"),
    AffairContractCard: () => import("@/components/Card/AffairContractCard"),
  },
  computed: {
    ...mapState({
      affair: (state) => state.affair.affair,
      chats: (state) => state.affair.chats,
      contract: (state) => state.affair.contract,
    }),
  },
  methods: {
    ...mapActions("affair", ["populatea"]),
    back() {
      this.$router.go(-1);
    },
    intoContract() {
      this.$router.push({
        name: "ContractView",
        params: { id: this.contract.id },
      });
    },
  },
  async mounted() {
    this.populatea(this.id);
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
</style>