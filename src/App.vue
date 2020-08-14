<template>
  <div id="app">
    <div class="sidebar-page">
      <section class="sidebar-layout">
        <b-sidebar
          position="fixed"
          mobile="reduce"
          expand-on-hover
          :reduce="true"
          type="is-light"
          open
          can-cancel
          fullheight
        >
          <div class="p-1">
            <div class="block">
              <img alt="SEMO" src="./assets/logo.png" />
            </div>
            <b-menu class="is-custom-mobile">
              <b-menu-list>
                <b-menu-item :active.sync="isHome" icon="home" label="Trang chủ"></b-menu-item>
              </b-menu-list>
              <b-menu-list label="SẢN PHẨM">
                <b-menu-item :active.sync="isFruit" icon="food-apple" label="Loại quả"></b-menu-item>
                <b-menu-item :active.sync="isProduct" icon="package-variant" label="Sản phẩm"></b-menu-item>
                <b-menu-item :active.sync="isAuction" icon="gavel" label="Đấu giá"></b-menu-item>
              </b-menu-list>
              <b-menu-list label="GIAO DỊCH">
                <b-menu-item :active.sync="isAffair" icon="handshake" label="Giao kèo"></b-menu-item>
                <b-menu-item :active.sync="isTransaction" icon="cash" label="Giao dịch"></b-menu-item>
              </b-menu-list>
              <b-menu-list label="NGƯỜI DÙNG">
                <b-menu-item :active.sync="isUser" icon="account" label="Người dùng"></b-menu-item>
                <b-menu-item :active.sync="isIdentity" icon="card-account-details" label="Xác thực"></b-menu-item>
              </b-menu-list>
              <b-menu-list label="NỘI BỘ">
                <b-menu-item :active.sync="isAdmin" icon="account" label="Quản trị viên"></b-menu-item>
              </b-menu-list>
              <b-menu-list label="BẠN">
                <b-menu-item :active.sync="isProfile" icon="face-profile" label="Tài khoản của bạn"></b-menu-item>
              </b-menu-list>
            </b-menu>
          </div>
        </b-sidebar>
        <div class="view" style="margin-left: 70px;">
          <router-view :key="$route.fullPath" />
        </div>
      </section>
    </div>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>-->
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "App",
  watch: {
    $route(to, from) {
      this.path = this.$router.currentRoute.path;
    },
    isHome: function () {
      if (this.isHome) {
        this.$router.push({ path: "/" });
        this.isFruit = this.isProduct = this.isAuction = this.isAffair = this.isTransaction = this.isUser = this.isIdentity = this.isAdmin = this.isUser = false;
      }
    },
    isFruit: function () {
      if (this.isFruit) {
        this.$router.push({ path: "/fruit" });
        this.isHome = this.isProduct = this.isAuction = this.isAffair = this.isTransaction = this.isUser = this.isIdentity = this.isAdmin = this.isUser = false;
      }
    },
    isProduct: function () {
      if (this.isProduct) {
        this.$router.push({ path: "/product" });
        this.isHome = this.isFruit = this.isAuction = this.isAffair = this.isTransaction = this.isUser = this.isIdentity = this.isAdmin = this.isUser = false;
      }
    },
    isAuction: function () {
      if (this.isAuction) {
        this.$router.push({ path: "/auction" });
        this.isHome = this.isFruit = this.isProduct = this.isAffair = this.isTransaction = this.isUser = this.isIdentity = this.isAdmin = this.isUser = false;
      }
    },
    isAffair: function () {
      if (this.isAffair) {
        this.$router.push({ path: "/affair" });
      }
    },
    isTransaction: function () {
      if (this.isTransaction) {
        this.$router.push({ path: "/transaction" });
      }
    },
    isUser: function () {
      if (this.isUser) {
        this.$router.push({ path: "/user" });
      }
    },
    isIdentity: function () {
      if (this.isIdentity) {
        this.$router.push({ path: "/identity" });
      }
    },
    isAdmin: function () {
      if (this.isAdmin) {
        this.$router.push({ path: "/admin" });
      }
    },
    isProfile: function () {
      if (this.isProfile) {
        this.$router.push({ path: "/profile" });
      }
    },
  },
  created() {
  },
  data() {
    return {
      path: this.$router.currentRoute.path,
      isHome: false,
      isFruit: false,
      isProduct: false,
      isAuction: false,
      isAffair: false,
      isTransaction: false,
      isUser: false,
      isIdentity: false,
      isAdmin: false,
      isProfile: false,
    };
  },
};
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";
@import url("https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&family=Roboto:wght@400;500;700;900&display=swap");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.page-container {
  padding: 40px;
}

.p-1 {
  padding: 1em;
}

.view {
  width: calc(100% - 70px);
}

.sidebar-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  // min-height: 100vh;
  .sidebar-layout {
    display: flex;
    flex-direction: row;
    min-height: 100%;
    // min-height: 100vh;
  }
}
@media screen and (max-width: 1023px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini-mobile {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1024px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}

$primary: #01d28e;
$primary-invert: findColorInvert($primary);
$primary-purple: #b88cd8;
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  "green": (
    $primary,
    $primary-purple,
  ),
  "white": (
    $white,
    $black,
  ),
  "black": (
    $black,
    $white,
  ),
  "light": (
    $light,
    $light-invert,
  ),
  "dark": (
    $dark,
    $dark-invert,
  ),
  "primary": (
    $primary,
    $primary-invert,
  ),
  "info": (
    $info,
    $info-invert,
  ),
  "success": (
    $success,
    $success-invert,
  ),
  "warning": (
    $warning,
    $warning-invert,
  ),
  "danger": (
    $danger,
    $danger-invert,
  ),
  "twitter": (
    $twitter,
    $twitter-invert,
  ),
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
// @import "~buefy/src/scss/buefy";
</style>
