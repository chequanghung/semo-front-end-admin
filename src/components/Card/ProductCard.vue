
<template>
  <div class="card-container" v-if="product !== undefined">
    <!-- fruit -->
    <div class="cursor columns is-vcentered" v-if="product.Fruit !== undefined">
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
      class="cursor columns is-vcentered"
      @click="$router.push({ name: 'UserView', params: { id: product.User.id }})"
      v-if="product.User !== undefined"
    >
      <div class="column is-narrow" style="margin: 0">
        <div
          class="image-icon"
          :style="{backgroundImage: 'url(' + product.User.img_url + ')'}"
        ></div>
      </div>
      <div class="column is-narrow">
        <p class="sub-title">{{ product.User.name }}</p>
      </div>
      <div class="column is-narrow">
        <p class="sub-title">★ {{ product.User.rate }}</p>
      </div>
    </div>

    <!-- time -->
    <div class="columns">
      <div class="column"></div>
      <div class="column is-narrow">
        <p class="sub-title">Giao kèo từ: {{ date }}</p>
      </div>
    </div>

    <br />

    <!-- image -->
    <div class="images">
      <div class="columns">
        <div class="column is-narrow" v-for="(medium, index) in product.ProductMedia" :key="index">
          <figure class="image is-128x128">
            <img :src="medium.media_url" :alt="index" style="border-radius: 10px" />
          </figure>
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
      <!-- current price -->
      <div class="columns" v-if="product !== undefined">
        <div class="column">
          <p class="sub-title">GIÁ HIỆN TẠI</p>
        </div>
        <div class="column is-narrow">
          <p
            class="title"
          >{{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price_cur) }}</p>
        </div>
      </div>
      <!-- weight -->
      <div class="columns" v-if="product !== undefined">
        <div class="column">
          <p class="sub-title">SẢN LƯỢNG</p>
        </div>
        <div class="column is-narrow">
          <p class="title">{{ product.weight }} tạ</p>
        </div>
      </div>
      <!-- location -->
      <div class="columns" v-if="product.Address !== undefined">
        <div class="column">
          <p class="sub-title">VỊ TRÍ</p>
        </div>
        <div class="column is-narrow">
          <p class="title">{{ product.Address.province }}</p>
        </div>
      </div>
      <!-- weight avg -->
      <div class="columns" v-if="product !== undefined">
        <div class="column">
          <p class="sub-title">CÂN NẶNG QUẢ</p>
        </div>
        <div class="column is-narrow">
          <p class="title">{{ product.weight_avg }}g</p>
        </div>
      </div>
      <!-- diameter avg -->
      <div class="columns" v-if="product !== undefined">
        <div class="column">
          <p class="sub-title">ĐƯỜNG KÍNH QUẢ</p>
        </div>
        <div class="column is-narrow">
          <p class="title">{{ product.diameter_avg }}cm</p>
        </div>
      </div>
      <!-- sugar -->
      <div class="columns" v-if="product !== undefined">
        <div class="column">
          <p class="sub-title">NỒNG ĐỘ ĐƯỜNG</p>
        </div>
        <div class="column is-narrow">
          <p class="title">{{ product.sugar_pct }}cm</p>
        </div>
      </div>
      <!-- fruit percentages -->
      <div class="columns" v-if="product !== undefined">
        <div class="column">
          <p class="sub-title">PHẦN TRĂM QUẢ</p>
        </div>
        <div class="column is-narrow">
          <p class="title">{{ product.sugar_pct }}cm</p>
        </div>
      </div>
      <!-- initial price -->
      <div class="columns" v-if="product !== undefined">
        <div class="column">
          <p class="sub-title">GIÁ KHỞI ĐIỂM</p>
        </div>
        <div class="column is-narrow">
          <p
            class="title"
          >{{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price_init) }}</p>
        </div>
      </div>
      <!-- step price -->
      <div class="columns" v-if="product !== undefined">
        <div class="column">
          <p class="sub-title">BƯỚC GIÁ</p>
        </div>
        <div class="column is-narrow">
          <p
            class="title"
          >{{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price_step) }}</p>
        </div>
      </div>
      <!-- info -->
      <div class="columns is-multiline" v-if="product !== undefined">
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
  props: ["product"],
  data() {
    return {
      date: "",
    };
  },
  watch: {
    product: function () {
      if (this.product.Auctions !== undefined)
        this.date = moment(this.product.Auctions[0].date_created).format(
          "hh:mm DD/MM/YYYY"
        );
    },
  },
};
</script>

<style scoped>
.card-container {
  padding: 24px;
  background-color: white;
  box-shadow: 0 2px 8px #00000016;
  border-radius: 10px;
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