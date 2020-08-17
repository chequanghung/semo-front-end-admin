<template>
  <div class="page-container">
    <page-title class="title-bar" title="👋 Chào mừng bạn đã trở lại!"></page-title>

    <!-- information -->
    <div class="home-content">
      <div class="tile is-ancestor">
        <div class="tile is-4 is-vertical is-parent">
          <div class="tile is-child box">
            <div class="columns">
              <div class="column">
                <p class="title">📦 Sản phẩm</p>
              </div>
              <div class="column is-narrow">
                <p class="title">21,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  components: {
    PageTitle: () => import("@/components/PageTitle"),
  },
  data() {
    return {
      dark: [],
    };
  },
  methods: {},
};
</script>

<style scoped>
.home-content {
  margin-top: 24px;
}

.title {
  font-family: "Roboto";
  color: #01d28e;
  font-weight: 700;
  font-size: 20px;
}
</style>