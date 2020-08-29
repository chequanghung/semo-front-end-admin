<template>
  <div class="modal-container">
    <!-- title -->
    <p class="modal-title">{{title}}</p>
    <div class="modal-form">
      <div class="columns is-vcentered">
        <div class="column is-narrow">
          <div
            class="img"
            style="width: 32px; height: 32px; border-radius: 50%; background-size: cover; background-position: center;"
            :style="{backgroundImage: 'url(' + identity.User.img_url + ')'}"
            v-if="identity.User !== undefined"
          ></div>
        </div>
        <div class="column" v-if="identity.User !== undefined">
          <p>{{ identity.User.name }}</p>
        </div>
      </div>
      <div class="columns is-vcentered">
        <div class="column">
          <b-field label="Mặt trước">
            <img :src="identity.front_img_url" />
          </b-field>
        </div>
        <div class="column">
          <b-field label="Mặt sau">
            <img :src="identity.back_img_url" />
          </b-field>
        </div>
      </div>
      <br />
      <!-- name input -->
      <b-field label="Họ và tên trên thẻ" label-position="on-border">
        <b-input disabled :value="identity.name"></b-input>
      </b-field>
      <!-- name input -->
      <b-field label="Số chứng minh nhân dân" label-position="on-border">
        <b-input disabled :value="identity.number"></b-input>
      </b-field>
      <!-- name input -->
      <b-field label="Ngày cấp" label-position="on-border">
        <b-input disabled :value="identity.date_dist"></b-input>
      </b-field>
      <!-- name input -->
      <b-field label="Nơi cấp" label-position="on-border">
        <b-input disabled :value="identity.province_dist"></b-input>
      </b-field>
    </div>
    <div class="modal-submit">
      <div class="columns is-centered">
        <div class="column is-narrow">
          <b-button type="is-green" @click="approve">✔️ Xác thực</b-button>
        </div>
        <div class="column is-narrow">
          <b-button type="is-danger" @click="deny">❌ Từ chối</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
// vuex
import { mapActions } from "vuex";

export default {
  props: ["title", "data"],
  data() {
    return {
      identity: {},
    };
  },
  mounted() {
    this.identity = this.data;
  },
  methods: {
    // access vuex functions
    ...mapActions("identity", ["edit"]),
    // approve
    approve() {
      this.identity.identity_status = 2;

      this.edit({
        id: this.data.id,
        identity_status: 2,
      })
        .then(() => {
          this.$emit("close");
          this.$buefy.notification.open({
            message: `Đã xác thực.`,
            type: "is-success",
          });
        })
        .catch((error) => {
          console.info(error.data);
          this.$buefy.notification.open({
            message: `Đã xảy ra lỗi.`,
            type: "is-danger",
          });
        });
    },
    // deny
    deny() {
      this.identity.identity_status = 0;

      this.edit({
        id: this.data.id,
        identity_status: 0,
      })
        .then(() => {
          this.$emit("close");
          this.$buefy.notification.open({
            message: `Đã từ chối.`,
            type: "is-warning",
          });
        })
        .catch((error) => {
          this.$buefy.notification.open({
            message: `Đã xảy ra lỗi.`,
            type: "is-danger",
          });
        });
    },
  },
};
</script>

<style scoped>
.modal-container {
  background-color: white;
  border-radius: 10px;
  padding: 40px;
}

.modal-title {
  font-size: 20px;
  font-family: "Roboto";
  font-weight: 900;
  color: #01d28e;
  padding-bottom: 10px;
}

.modal-form,
.modal-submit {
  margin-top: 20px;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
</style>