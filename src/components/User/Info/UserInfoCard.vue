<template>
  <div>
    <div class="card-container">
      <div class="columns">
        <div class="column is-two-thirds">
          <p class="home-section-title">👦 Thông tin lý lịch</p>
          <br />

          <b-field label="Số điện thoại" label-position="on-border">
            <b-input :value="phone" disabled></b-input>
          </b-field>
          <br />
          <b-field :type="error ? 'is-danger' : ''" :message="error_msg" label="Tên đầy đủ" label-position="on-border">
            <b-input :value="name" v-model="name"></b-input>
          </b-field>
          <br />
          <b-field label="Ngày sinh" label-position="on-border">
            <b-datepicker v-model="dob" locale="en-GB" placeholder="Ngày sinh" trap-focus></b-datepicker>
          </b-field>
          <br />
          <b-field label="Giới tính" label-position="on-border">
            <b-select v-model="gender" expanded>
              <option value="0">Nữ</option>
              <option value="1">Nam</option>
            </b-select>
          </b-field>
        </div>
        <div class="column">
          <p class="home-section-title">🖼️ Ảnh đại diện</p>

          <!-- image -->
          <br />
          <ImageUploader
            :img_url="user.img_url"
            :directory="`/user/${user.img_dir}/avatar`"
            @set="updateAvatar"
          ></ImageUploader>
        </div>
      </div>
      <br />
      <div style="display: flex; justify-content: center;">
        <b-button
          type="is-green"
          @click="updateInfo"
          :disabled="isDisabled"
          :loading="isLoading"
        >💾 Lưu thay đổi</b-button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from "vuex";

export default {
  components: {
    ImageUploader: () => import("@/components/ImageUploader"),
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),

    isDisabled: function () {
      let cur_date = new Date();
      return this.name === "" || cur_date.getYear() - this.dob.getYear() < 15 || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]+/.test(this.name)
        ? true
        : false;
    },
  },
  async mounted() {
    this.dob = new Date(this.user.dob);
    this.gender = this.user.gender;
    this.name = this.user.name;
    this.phone = this.user.phone;
  },
  data() {
    return {
      phone: String,
      dob: new Date(),
      gender: Number,
      name: String,
      // isDisabled: false,
      isLoading: false,
      error: false,
      error_msg: '',
    };
  },
  watch: {
    name: function () {
      if (this.name === "") {
        this.error = true;
        this.error_msg = "Hãy điền tên đầy đủ của bạn nhé.";
      } else if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]+/.test(this.name)) {
        this.error = true;
        this.error_msg = "Tên của bạn không thể có ký tự đặc biệt hoặc chữ số.";
      } else {
        this.error = false;
        this.error_msg = "";
      }
    },
  },
  methods: {
    ...mapActions("user", ["editua", "editui"]),

    updateAvatar(url) {
      this.editua(url).catch(() => {
        this.$buefy.toast.open({
          type: "is-error",
          message: "Úi, hãy thử lại sau nhé. 😪",
        });
      });
    },

    updateInfo() {
      this.isDisabled = true;
      this.isLoading = true;

      this.editui({
        name: this.name,
        gender: this.gender,
        dob: this.dob,
      })
        .then(() => {
          this.$buefy.toast.open({
            type: "is-success",
            message: "Yê, thông tin đã được lưu lại! 😎",
          });

          this.isDisabled = false;
          this.isLoading = false;
        })
        .catch(() => {
          this.$buefy.toast.open({
            type: "is-error",
            message: "Úi, hãy thử lại sau nhé. 😪",
          });

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

.card-title {
  font-weight: 700;
}
</style>