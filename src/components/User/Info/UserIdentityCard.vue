// PENDING
<template>
  <div class="card-container">
    <!-- title -->
    <div class="columns is-mobile">
      <div class="column">
        <p class="home-section-title">🎫 Xác thực</p>
      </div>
    </div>

    <!-- list -->
    <div class="columns is-multiline">
      <div
        class="column is-full-mobile is-full-tablet is-half-desktop is-half-widescreen is-half-fullhd"
      >
        <IdentityCard v-if="identity !== null" :identity="identity"></IdentityCard>
      </div>
    </div>

    <!-- modal -->
    <!-- create -->
    <!-- <b-modal
      v-model="isCreateModal"
      trap-focus
      destroy-on-hide
      aria-role="dialog"
      aria-modal
      style="width: auto;"
    >
      <AddressModal
        style="margin: 0 auto;"
        title="➕ Thêm địa chỉ mới"
        btn_title="💾 Lưu địa chỉ mới"
        @submit="addAddress"
      ></AddressModal>
    </b-modal> -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "UserIdentityCard",
  components: {
    IdentityCard: () => import("@/components/User/Info/Identity/IdentityCard"),
  },
  computed: {
      ...mapState({
          identity: state => state.user.identity
      })
  },
  async mounted() {
      this.geti()
  },
  data() {
    return {
      isCreateModal: false,
    };
  },
  methods: {
      ...mapActions ('user', ['geti'])
  }
};
</script>

<style scoped>
</style>