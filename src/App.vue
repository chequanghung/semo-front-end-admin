/* eslint-disable */

<template>
  <div id="app">
    <div class="sidebar-page">
      <section class="sidebar-layout">
        <b-sidebar
          position="fixed"
          mobile="reduce"
          fullheight
          type="is-green"
          overlay
          can-cancel
          :open.sync="openMenu"
          @on-cancel="openMenu = false"
          style="width: fit-content !important;"
        >
          <div class="p-1">
            <div class="block" style="padding: 24px;">
              <img alt="SEMO" src="./assets/logo.png" />
            </div>
            <div class="block">
              <b-menu-list>
                <b-menu-item
                  :active="this.$route.fullPath === '/'"
                  tag="router-link"
                  to="/"
                  label="🏡 Trang chủ"
                ></b-menu-item>
              </b-menu-list>
              <b-menu-list label="SẢN PHẨM">
                <b-menu-item
                  :active="this.$route.fullPath === '/fruit'"
                  tag="router-link"
                  to="/fruit"
                  label="🍑 Loại quả"
                ></b-menu-item>
                <b-menu-item
                  :active="this.$route.fullPath === '/product'"
                  tag="router-link"
                  to="/product"
                  label="📦 Sản phẩm"
                ></b-menu-item>
                <b-menu-item
                  :active="this.$route.fullPath === '/auction'"
                  tag="router-link"
                  to="/auction"
                  label="⛏️ Đấu giá"
                ></b-menu-item>
              </b-menu-list>
              <b-menu-list label="KINH DOANH">
                <b-menu-item
                  :active="this.$route.fullPath === '/affair'"
                  tag="router-link"
                  to="/affair"
                  label="🤝 Giao kèo"
                ></b-menu-item>
                <b-menu-item
                  :active="this.$route.fullPath === '/deposit'"
                  tag="router-link"
                  to="/deposit"
                  label="💵 Giao dịch"
                ></b-menu-item>
              </b-menu-list>
              <b-menu-list label="NGƯỜI DÙNG">
                <b-menu-item
                  :active="this.$route.fullPath === '/user'"
                  tag="router-link"
                  to="/user"
                  label="🙋‍♀️ Người dùng"
                ></b-menu-item>
                <b-menu-item
                  :active="this.$route.fullPath === '/identity'"
                  tag="router-link"
                  to="/identity"
                  label="🎫 Xác thực"
                ></b-menu-item>
              </b-menu-list>
              <b-menu-list label="NỘI BỘ">
                <b-menu-item
                  :active="this.$route.fullPath === '/admin'"
                  tag="router-link"
                  to="/admin"
                  label="💁‍♂️ Quản trị viên"
                ></b-menu-item>
              </b-menu-list>
              <b-menu-list label="BẠN">
                <b-menu-item
                  :active="this.$route.fullPath === '/you'"
                  tag="router-link"
                  to="/you"
                  label="😊 Tài khoản của bạn"
                ></b-menu-item>
              </b-menu-list>
            </div>
          </div>
        </b-sidebar>
        <div class="view">
          <transition name="router-view-transition">
            <router-view :key="$route.fullPath" />
          </transition>
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
import { mapState, mapActions } from "vuex";

export default {
  name: "App",
  watch: {
    $route(to, from) {
      this.openMenu ? (this.openMenu = false) : "";
    },
    openMenu: function () {
      this.openMenu ? this.open_menu() : this.close_menu();
    },
    menu: function () {
      this.menu ? this.open_menu() : this.close_menu();
      this.openMenu = this.menu;
    },
  },
  async mounted() {
    this.openMenu = this.menu;

    this.getUserByToken()
  },
  data() {
    return {
      openMenu: false,
      index: Number,
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
  computed: {
    ...mapState({
      menu: (state) => state.ui.menu,
    }),
  },
  methods: {
    ...mapActions("ui", ["open_menu", "close_menu"]),

    getUserByToken() {
      if (localStorage.getItem('admin_token') !== null) {
        this.$store.dispatch('geta')
        .catch(error => {
          this.$buefy.toast.open({
            type: 'is-danger',
            message: `${error.response.data.message}`
          })
        })
      }
    },
  },
};
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";
@import url("https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&family=Roboto:wght@400;500;700;900&display=swap");

#app {
  font-family: "Roboto";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}

#nav {
  font-family: "Roboto";
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.home-section-title {
  font-weight: 900;
  font-size: 24px;
  color: #b88cd8;
  text-align: left;
  margin-bottom: 16px;
  font-family: "Roboto";
}

.page-container {
  padding: 40px;
}

.p-1 img {
  width: 180px;
}

.b-sidebar .sidebar-content {
  width: fit-content !important;
}

.view {
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  background-color: #fcfcfc;
}

.menu-label {
  padding-left: 10px;
}
//
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
// sidebar theme
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

.tab-content {
  padding: 0 !important;
}

// animation for views
.router-view-transition-enter-active {
  animation: fadeIn 0.25s ease-in;
}

@keyframes fadeIn {
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.router-view-transition-leave-active {
  animation: fadeOut 0.125s ease-in;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

// scrollbar
/* width */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #70707024;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #01d28e;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #01d28e;
}

$primary: #01d28e;
$primary-invert: findColorInvert($primary);
$primary-purple: #b88cd8;
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);
$menu-item-active-background-color: #01d28e;

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  "green": (
    $primary,
    $white,
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
