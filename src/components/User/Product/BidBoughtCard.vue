<template>
  <div class="card-container">
    <div class="columns is-vcentered is-mobile">
      <div class="column is-narrow">
        <div
          class="product-thumbnail image is-96x96"
          :style="{backgroundImage: 'url(' + item.Product.ProductMedia[0].media_url + ')'}"
        ></div>
      </div>
      <div class="column">
        <p class="card-title">{{ item.Product.title }}</p>
        <div class="columns is-mobile">
          <!-- price -->
          <div class="column">
            <div class="card-info">
              <p class="card-info-title">Giá hiện tại</p>
              <p class="card-info-content major">{{ format_currency(item.Product.price_cur) }}</p>
            </div>
          </div>
          <div class="column" v-if="item.Product.product_status === 3">
            <div class="card-info">
              <p class="card-info-title">Thời gian còn lại</p>
              <p
                class="card-info-content major"
                :class="{'red': item.remain_time.split(':')[0] <= 23}"
              >{{ remain }}</p>
            </div>
          </div>
        </div>
        <!-- brief info -->
        <p class="card-info-title">{{ item.Product.weight }} tạ | {{ item.Product.Address.province }}</p>
      </div>
    </div>

    <div class="columns is-vcentered is-mobile">
      <div class="column">
        <p class="card-info-subtle">{{ format_date(item.Product.date_created) }}</p>
      </div>
      <div class="column is-narrow">
        <div class="columns is-variable is-1 is-mobile">
          <!-- view auction for status 3 -->
          <div class="column is-narrow" v-if="item.Product.product_status === 3">
            <b-button type="is-green" @click="intoAuction">📑 Xem đấu giá</b-button>
          </div>
          <!-- view affair for status 4, 5 -->
          <div class="column is-narrow" v-if="item.Product.product_status <= 5 && item.Product.product_status >= 4">
            <b-button type="is-green" @click="intoAffair">📑 Xem giao kèo</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["item"],
  components: {},
  data() {
    return {
    };
  },
  computed: {
    remain: function () {
      let times = this.item.remain_time.split(":");
      if (times[0] >= 24) {
        return `${this.item.remain_days} ngày`;
      } else {
        return `${times[0]} giờ ${times[1]} phút`;
      }
    },
  },
  methods: {
    intoAuction() {
      this.$emit("auction", this.item);
    },
    intoAffair() {
      this.$emit("affair", this.item);
    },
    format_currency(price_cur) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price_cur);
    },
    format_date(date) {
      return moment(date).format('HH:mm DD/MM/YYYY')
    }
  },
};
</script>

<style scoped>
.card-container {
  background-color: white;
  box-shadow: 0 2px 8px #00000016;
  padding: 16px;
  border-radius: 10px;
  transition: 0.25s;
}

.card-container:hover {
  box-shadow: 0 4px 16px #00000016;
}

.card-title {
  font-weight: 800;
  font-size: 18px;
  height: 60px;
  overflow: hidden;
}

.product-thumbnail {
  border-radius: 10px;
  background-size: cover;
  background-position: center;
}

.card-info {
  padding: 8px 0;
}

.card-info-title {
  color: #707070;
  font-size: 15px;
}

.card-info-content {
  font-size: 17px;
  font-weight: 900;
  color: #707070;
}

.card-info-subtle {
  font-size: 12px;
}

.red {
  color: #fd5e53;
}
</style>