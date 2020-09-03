<template>
  <div class="card-container">
    <!-- title -->
    <div class="columns is-mobile">
      <div class="column">
        <p class="home-section-title">🏡 Địa chỉ</p>
      </div>
      <div class="column is-narrow">
        <b-button type="is-green" @click="isCreateModal = true">➕ Thêm địa chỉ mới</b-button>
      </div>
    </div>

    <!-- list -->
    <div class="columns is-multiline">
      <div
        class="column is-full-mobile is-full-tablet is-half-desktop is-half-widescreen is-one-third-fullhd"
        v-for="(address, i) in addresses"
        :key="i"
      >
        <AddressCard :address="address" @edit="openEdit" @delete="deleteAddress"></AddressCard>
      </div>
    </div>

    <!-- modal -->
    <!-- create -->
    <b-modal
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
    </b-modal>

    <!-- edit -->
    <b-modal
      v-model="isEditModal"
      trap-focus
      destroy-on-hide
      aria-role="dialog"
      aria-modal
      style="width: auto;"
    >
      <AddressModal
        style="margin: 0 auto;"
        title="🖊️ Chỉnh sửa địa chỉ"
        btn_title="💾 Lưu thay đổi"
        :addressInfo="addressInfo"
        @submit="editAddress"
        @deleteFromCard="deleteAddress"
      ></AddressModal>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  components: {
    AddressCard: () => import("@/components/User/Info/Address/AddressCard"),
    AddressModal: () => import("@/components/User/Info/Address/AddressModal"),
  },
  computed: {
    ...mapState({
      addresses: (state) => state.user.address,
    }),
  },
  data() {
    return {
      isCreateModal: false,
      isEditModal: false,
      title: String,
      addressInfo: Object,
    };
  },
  async mounted() {
    this.geta();
  },
  methods: {
    ...mapActions("user", ["geta", "adda", "editad", "deletea"]),

    addAddress(address) {
      this.adda(address)
        .then(() => {
          this.$buefy.toast.open({
            type: "is-success",
            position: "is-top",
            message: "Yê, bạn đã tạo thành công. 🎉",
          });

          this.isCreateModal = false;
        })
        .catch(() => {
          this.$buefy.toast.open({
            type: "is-danger",
            position: "is-top",
            message: "Úi, hãy thử lại sau nhé. 😪",
          });
        });
    },

    openEdit(address) {
      this.addressInfo = address;
      this.isEditModal = true;
    },

    editAddress(address) {
      this.editad(address)
        .then(() => {
          this.$buefy.toast.open({
            type: "is-success",
            position: "is-top",
            message: "Địa chỉ đã được sửa. 👍",
          });
          this.isEditModal = false;
        })
        .catch(() => {
          this.$buefy.toast.open({
            type: "is-danger",
            position: "is-top",
            message: "Úi, hãy thử lại sau nhé. 😪",
          });
        });
    },

    deleteAddress(address) {
      let vm = this;

      this.$buefy.dialog.confirm({
        message: "Bạn chắc chắn muốn xóa địa chỉ này chứ? 😧",
        onConfirm: function () {
          vm.deletea(address);
        },
        cancelText: "Không, tôi đổi ý rồi.",
        type: "is-danger",
        confirmText: "🗑️ Xóa",
      });

      if (this.isEditModal === true) {
        this.isEditModal = false;
      }
    },
  },
};
</script>

<style scoped>
</style>