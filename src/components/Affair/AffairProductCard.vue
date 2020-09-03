
<template>
  <div class="card-container tile is-child box">
    <!-- fruit -->
    <div
      class="cursor columns is-vcentered"
      v-if="product.Fruit !== undefined"
      @click="$router.push({ name: 'FruitView', params: { id: product.Fruit.id } })"
    >
      <div class="column is-narrow" style="margin: 0">
        <div
          class="image-icon is-32x32 is-rounded"
          :style="{backgroundImage: 'url(' + product.Fruit.icon_url + ')'}"
        ></div>
      </div>
      <div class="column">
        <p class="sub-title" style="text-transform: uppercase;">{{ product.Fruit.title }}</p>
      </div>
    </div>

    <!-- title -->
    <p class="product-title">{{ product.title }}</p>

    <br />

    <!-- user -->
    <div
      class="cursor columns is-vcentered is-mobile"
      @click="$router.push({ name: 'UserView', params: { id: product.User.id }})"
      v-if="product"
    >
      <div class="column is-narrow" style="margin: 0">
        <div
          class="image-icon"
          :style="{backgroundImage: 'url(' + product.User.img_url + ')'}"
          v-if="product && product.User !== undefined"
        ></div>
      </div>
      <div class="column is-narrow">
        <p class="sub-title" v-if="product && product.User !== undefined">{{ product.User.name }}</p>
      </div>
      <div class="column is-narrow">
        <p class="sub-title" v-if="product && product.User !== undefined">★ {{ product.User.rate }}</p>
      </div>
    </div>

    <!-- time -->
    <div class="columns is-mobile">
      <div class="column"></div>
      <div class="column is-narrow">
        <p class="sub-title">Giao kèo từ: {{ date }}</p>
      </div>
    </div>

    <!-- image -->
    <div class="images">
      <div class="columns is-variable is-2 is-mobile">
        <div class="column is-narrow" v-for="(medium, index) in product.ProductMedia" :key="index">
          <img :src="medium.media_url" :alt="index" style="border-radius: 10px; height: 128px;" />
        </div>
      </div>
    </div>

    <br />
    <br />

    <!-- info -->
    <div class="info">
      <!-- title -->
      <p class="title">📦 Thông tin sản phẩm</p>
      <!-- info -->
      <!-- address -->
      <div class="columns is-multiline is-mobile">
        <div class="column is-full">
          <p class="sub-title">ĐỊA CHỈ GIAO HÀNG</p>
        </div>
        <div class="column is-full">
          <AddressCard :address="product.Address" :uneditable="true"></AddressCard>
        </div>
      </div>
      <!-- warning -->
      <div class="notification is-light is-warning">
        <div class="columns is-mobile">
          <div class="column is-narrow">
            <p>⚠️</p>
          </div>
          <div class="column">
            <p>Giá tiền chưa bao gồm phí vận chuyển.</p>
          </div>
        </div>
      </div>
      <!-- current price -->
      <div class="columns is-mobile" v-if="product !== undefined">
        <div class="column">
          <p class="sub-title">GIÁ BẠN ĐÃ TRẢ</p>
        </div>
        <div class="column is-narrow">
          <p
            class="title"
          >{{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price_cur) }}</p>
        </div>
      </div>
      <!-- weight -->
      <div class="columns is-mobile" v-if="product">
        <div class="column">
          <p class="sub-title">SẢN LƯỢNG</p>
        </div>
        <div class="column is-narrow">
          <p class="title">{{ product.weight }} tạ</p>
        </div>
      </div>
      <!-- location -->
      <div class="columns is-mobile" v-if="product.Address">
        <div class="column">
          <p class="sub-title">VỊ TRÍ</p>
        </div>
        <div class="column is-narrow">
          <p class="title">{{ product.Address.province }}</p>
        </div>
      </div>
      <!-- weight avg -->
      <div class="columns is-mobile" v-if="product !== undefined">
        <div class="column">
          <p class="sub-title">CÂN NẶNG QUẢ</p>
        </div>
        <div class="column is-narrow">
          <p class="title">{{ product.weight_avg }}g</p>
        </div>
      </div>
      <!-- diameter avg -->
      <div class="columns is-mobile" v-if="product !== undefined">
        <div class="column">
          <p class="sub-title">ĐƯỜNG KÍNH QUẢ</p>
        </div>
        <div class="column is-narrow">
          <p class="title">{{ product.diameter_avg }}cm</p>
        </div>
      </div>
      <!-- sugar -->
      <div class="columns is-mobile" v-if="product !== undefined">
        <div class="column">
          <p class="sub-title">NỒNG ĐỘ ĐƯỜNG</p>
        </div>
        <div class="column is-narrow">
          <p class="title">{{ product.sugar_pct }}%</p>
        </div>
      </div>
      <!-- fruit percentages -->
      <div class="columns is-mobile" v-if="product !== undefined">
        <div class="column">
          <p class="sub-title">PHẦN TRĂM QUẢ</p>
        </div>
        <div class="column is-narrow">
          <p class="title">{{ product.sugar_pct }}%</p>
        </div>
      </div>
      <!-- info -->
      <div class="columns is-mobile is-multiline" v-if="product !== undefined">
        <div class="column is-full">
          <p class="sub-title">THÔNG TIN CHI TIẾT</p>
        </div>
        <div class="column is-full">
          <p class="sub-title">{{ product.notes }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import moment from "moment";

export default {
  props: ["affair", "product"],
  components: {
    AddressCard: () => import("@/components/User/Info/Address/AddressCard"),
  },
  data() {
    return {};
  },
  computed: {
    date: function () {
      return moment(this.affair.date_created).format("hh:mm DD/MM/YYYY");
    },
  },
};
</script>

<style scoped>
.card-container {
  /* padding: 24px; */
  overflow: hidden;
}

.product-title {
  font-family: "Merriweather";
  color: #01d28e;
  font-size: 24px;
  font-weight: 900;
}

.image-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
}

.title {
  font-family: "Roboto";
  color: #01d28e;
  font-weight: 700;
  font-size: 18px;
}

.sub-title {
  font-family: "Roboto";
  color: #707070;
  font-weight: 500;
}

.images {
  overflow-x: scroll;
  overflow-y: hidden;
  width: auto;
  padding-bottom: 20px;
  height: 148px;
}

.edited {
  background-color: #fff7cc;
  box-shadow: 0 2px 4px #fff7cc59;
}

.cursor,
.cursor p {
  cursor: pointer;
  transition: 0.25s;
}

.cursor:hover p {
  color: #01d28e;
  text-decoration: underline;
  transition: 0.25s;
}
</style>