<template>
  <div>
    <div class="card-container">
      <div class="columns is-vcentered">
        <div class="column is-two-thirds">
          <p class="home-section-title">🔑 Mật khẩu</p>
          <b-field label="Mật khẩu hiện tại" label-position="on-border">
            <b-input type="password" v-model="password" password-reveal maxlength="25"></b-input>
          </b-field>
          <b-field label="Mật khẩu mới" label-position="on-border">
            <b-input type="password" v-model="new_password" password-reveal maxlength="25"></b-input>
          </b-field>
          <b-field label="Nhập lại mật khẩu mới" label-position="on-border">
            <b-input type="password" v-model="new_password_conf" password-reveal maxlength="25"></b-input>
          </b-field>
        </div>
        <div class="column">
          <div class="tile is-ancestor notification is-light is-vertical">
            <p class="section-title">Điều kiện đặt mật khẩu</p>
            <br />
            <div class="requirement" style="display: flex; align-items: center;">
              <p v-if="isLong === false">❌</p>
              <p v-else>✔️</p>
              <p
                :class="{'failed': isLong === false, 'success': isLong === true}"
                style="margin-left: 12px;"
              >Dài 8 đến 25 ký tự.</p>
            </div>
            <div class="requirement" style="display: flex; align-items: center;">
              <p v-if="isChar === false">❌</p>
              <p v-else>✔️</p>
              <p
                :class="{'failed': isChar === false, 'success': isChar === true}"
                style="margin-left: 12px;"
              >Bao gồm chữ in thường, chữ in hoa và chữ số.</p>
            </div>
            <div class="requirement" style="display: flex; align-items: center;">
              <p v-if="isSimilar === false">❌</p>
              <p v-else>✔️</p>
              <p
                :class="{'failed': isSimilar === false, 'success': isSimilar === true}"
                style="margin-left: 12px;"
              >Khác mật khẩu cũ và nhập lại mật khẩu giống với mật khẩu mới.</p>
            </div>
          </div>
        </div>
        <!-- submit -->
      </div>
      <br />
      <div style="display: flex; justify-content: center;">
        <b-button
          type="is-green"
          @click="updatePassword"
          :disabled="isDisabled"
          :loading="isLoading"
        >💾 Lưu thay đổi</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      password: "",
      new_password: "",
      new_password_conf: "",
      isLong: false,
      isChar: false,
      isSimilar: false,
      isDisabled: true,
      isLoading: false,
    };
  },
  watch: {
    password: function () {
      this.new_password.length >= 8 && this.new_password.length <= 25
        ? (this.isLong = true)
        : (this.isLong = false);
      this.new_password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/g)
        ? (this.isChar = true)
        : (this.isChar = false);
      this.new_password === this.new_password_conf &&
      this.new_password !== this.password && this.password.length > 0 && this.isChar === true
        ? (this.isSimilar = true)
        : (this.isSimilar = false);
      this.isLong === true && this.isChar === true && this.isSimilar === true
        ? (this.isDisabled = false)
        : (this.isDisabled = true);
    },
    new_password: function () {
      this.new_password.length >= 8 && this.new_password.length <= 25
        ? (this.isLong = true)
        : (this.isLong = false);
      this.new_password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/g)
        ? (this.isChar = true)
        : (this.isChar = false);
      this.new_password === this.new_password_conf &&
      this.new_password !== this.password && this.password.length > 0 && this.isChar === true
        ? (this.isSimilar = true)
        : (this.isSimilar = false);
      this.isLong === true && this.isChar === true && this.isSimilar === true
        ? (this.isDisabled = false)
        : (this.isDisabled = true);
    },
    new_password_conf: function () {
      this.new_password.length >= 8 && this.new_password.length <= 25
        ? (this.isLong = true)
        : (this.isLong = false);
      this.new_password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/g)
        ? (this.isChar = true)
        : (this.isChar = false);
      this.new_password === this.new_password_conf &&
      this.new_password !== this.password && this.password.length > 0 && this.isChar === true
        ? (this.isSimilar = true)
        : (this.isSimilar = false);
      this.isLong === true && this.isChar === true && this.isSimilar === true
        ? (this.isDisabled = false)
        : (this.isDisabled = true);
    },
  },
  methods: {
    ...mapActions("user", ["updatepwd"]),

    updatePassword() {
      this.isDisabled = true;
      this.isLoading = true;

      this.updatepwd({
        password: this.password,
        new_password: this.new_password,
      })
        .then(() => {
          this.$buefy.toast.open({
            type: "is-success",
            message: "Cập nhật mật khẩu thành công. 🎉",
            position: "is-top",
          });
        })
        .catch(() => {
          this.$buefy.toast.open({
            type: "is-danger",
            position: "is-top",
            message: "Úi, hãy kiểm tra lại mật khẩu của bạn. 😪",
          });
        })
        .finally(() => {
          this.isDisabled = false;
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>
.card-container {
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 8px #00000016;
  padding: 24px 24px;
}

.section-title {
  color: #b88cd8;
  font-size: 20px;
  font-weight: 700;
}

.card-title {
  font-weight: 700;
}

.requirement {
  padding: 2px 0;
}

.failed {
  color: #fd5e53;
}

.success {
  color: #01d28e;
}
</style>