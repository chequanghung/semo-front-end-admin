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
          <ProductCard :product="affair.Product"></ProductCard>
          <br />
        </div>
      </div>
      <div class="column">
        <br />
        <br />
        <!-- status and contract -->
        <div class="columns is-mobile is-multiline" style="height: fit-content;">
          <!-- status -->
          <div class="column is-7">
            <Card title="⚠️ Lưu ý">
              <template v-slot:content>
                <br/>
                <div class="columns is-centered is-vcentered">
                  <p>Không có gì đáng chú ý.</p>
                </div>
              </template>
            </Card>
          </div>
          <!-- contract -->
          <div class="column is-5">
            <Card title="📋 Hợp đồng">
              <template v-slot:content>
                <AffairContractCard :contract="affair.AffairContract" @click="intoContract"></AffairContractCard>
              </template>
            </Card>
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
      this.$router.push({ name: 'ContractView', params: { id: this.contract.id } })
    }
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