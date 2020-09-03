<template>
  <div class="splash-container">
    <br />
    <br />
    <!-- success msg -->
    <div class="center">
      <img src="@/assets/Illustration.png" />
      <br />
      <p class="home-section-title" style="text-align: center">
        Sản phẩm của bạn đã được tạo thành công!
        <br />Hãy đưa sản phẩm mẫu đến viện kiểm định gần bạn nhất.
      </p>
    </div>

    <br />
    <hr />
    <br />

    <!-- institutions and product info -->
    <div class="columns">
      <div class="column">
        <p class="home-section-title" style="color: #01d28e">Chọn viện kiểm định gần bạn nhất</p>
        <!-- province -->
        <b-field label="Bạn đang ở đâu?" label-position="on-border">
          <b-select v-model="selected">
            <option v-for="(province, i) in provinces" :key="i" :value="province">{{ province }}</option>
          </b-select>
        </b-field>
        <!-- locations -->
        <div>
          <div class="columns" v-for="(location, i) in locations" :key="i">
            <div class="column is-narrow">
              <div
                style="width: 24px; height: 24px; background-color: #01d28e; display: flex; align-items: center; justify-content: center; border-radius: 50%;"
              >
                <p style="color: white;">{{ i + 1 }}</p>
              </div>
            </div>
            <div class="column">
              <strong>{{ location.name }}</strong>
              <p>{{ location.address }}</p>
              <p>{{ location.phone_num }}</p>
            </div>
          </div>
        </div>
        <div class="institutions"></div>
      </div>
      <div class="column">
        <p class="home-section-title" style="color: #01d28e">Gửi mẫu hàng của bạn kèm thông tin này</p>
        <div class="tile box">
          <div style="width: 100%;">
            <p class="home-section-title">📦 Mã sản phẩm</p>
            <p class="product-card-content">{{ product_id }}</p>
            <br />
            <p class="home-section-title">👦 Người dùng</p>
            <p class="product-card-content">{{ user.phone }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-mobile is-centered">
      <div class="column is-narrow">
        <b-button type="is-green" tag="router-link" to="/user/product">✔️ Hoàn tất</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["product_id"],
  computed: {
    ...mapState({
      user: (state) => state.user.user,
      institutions: (state) => state.product.institutions,
    }),
  },
  data() {
    return {
      provinces: [],
      selected: "",
      locations: [],
    };
  },
  methods: {
    ...mapActions("product", ["geti"]),
  },
  async mounted() {
    this.geti().then(() => {
      this.provinces = [
        ...new Set(this.institutions.map((item) => item.province)),
      ];
      this.selected = this.provinces[0];
      this.locations = this.institutions;
    });
  },
  watch: {
    selected: function () {
      this.locations = this.institutions.filter(
        (item) => item.province === this.selected
      );
    },
  },
};
</script>

<style scoped>
.center {
  display: flex;
  align-items: center;
  flex-flow: column;
}

.product-card-content {
  font-size: 24px;
  font-weight: 800;
  color: #707070;
}
</style>