<template>
  <div class="page-container">
    <page-title class="title-bar" title="👋 Chào mừng bạn đã trở lại!">
      <template v-slot:page-function>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <p class="title" style="margin-bottom: 0; margin-right: 16px;">{{ admin.name }}</p>
            <b-button type="is-danger is-light" @click="logout">🚪 Đăng xuất</b-button>
        </div>
      </template>
    </page-title>

    <!-- information -->
    <div class="home-content">
      <div class="tile is-ancestor">
        <!-- column 1 -->
        <div class="tile is-4 is-vertical is-parent">
          <!-- fruit -->
          <div class="tile is-child box">
            <div class="columns is-vcentered">
              <div class="column">
                <p class="title">🍑 Loại quả</p>
              </div>
              <div class="column is-narrow">
                <p class="title">{{ home.fAll }}</p>
              </div>
            </div>
          </div>
          <!-- product -->
          <div class="tile is-child box">
            <!-- products -->
            <div class="columns is-vcentered">
              <div class="column">
                <p class="title">📦 Sản phẩm</p>
              </div>
              <div class="column is-narrow">
                <p class="title">{{ home.pAll }}</p>
              </div>
            </div>
            <!-- need edit -->
            <div class="columns is-vcentered">
              <div class="column">
                <p class="subtitle">CẦN CHỈNH SỬA</p>
              </div>
              <div class="column is-narrow">
                <p class="title">{{ home.p0 }}</p>
              </div>
            </div>
            <!-- pending -->
            <div class="columns is-vcentered">
              <div class="column">
                <p class="subtitle">CHƯA KIỂM DUYỆT</p>
              </div>
              <div class="column is-narrow">
                <p class="title">{{ home.p1 }}</p>
              </div>
            </div>
            <!-- verified -->
            <div class="columns is-vcentered">
              <div class="column">
                <p class="subtitle">ĐÃ KIỂM DUYỆT</p>
              </div>
              <div class="column is-narrow">
                <p class="title">{{ home.p2 }}</p>
              </div>
            </div>
            <!-- in auction -->
            <div class="columns is-vcentered">
              <div class="column">
                <p class="subtitle">ĐANG ĐẤU GIÁ</p>
              </div>
              <div class="column is-narrow">
                <p class="title">{{ home.p3 }}</p>
              </div>
            </div>
            <!-- in affair -->
            <div class="columns is-vcentered">
              <div class="column">
                <p class="subtitle">ĐANG GIAO KÈO</p>
              </div>
              <div class="column is-narrow">
                <p class="title">{{ home.p4 }}</p>
              </div>
            </div>
            <!-- sold -->
            <div class="columns is-vcentered">
              <div class="column">
                <p class="subtitle">ĐANG GIAO KÈO</p>
              </div>
              <div class="column is-narrow">
                <p class="title">{{ home.p5 }}</p>
              </div>
            </div>
            <!-- deleted -->
            <div class="columns is-vcentered">
              <div class="column">
                <p class="subtitle">ĐÃ XÓA</p>
              </div>
              <div class="column is-narrow">
                <p class="title">{{ home.p9 }}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- column 2 -->
        <div class="tile is-4 is-vertical is-parent">
          <!-- auction -->
          <div class="tile is-child box">
            <div class="columns is-vcentered">
              <div class="column">
                <p class="title">⛏️ Đấu giá</p>
              </div>
              <div class="column is-narrow">
                <p class="title">{{ home.aAll }}</p>
              </div>
            </div>
            <!-- closed -->
            <div class="columns is-vcentered">
              <div class="column">
                <p class="subtitle">ĐÃ ĐÓNG PHIÊN</p>
              </div>
              <div class="column is-narrow">
                <p class="title">{{ home.a0 }}</p>
              </div>
            </div>
            <!-- opened -->
            <div class="columns is-vcentered">
              <div class="column">
                <p class="subtitle">ĐANG MỞ</p>
              </div>
              <div class="column is-narrow">
                <p class="title">{{ home.a1 }}</p>
              </div>
            </div>
            <!-- deleted -->
            <div class="columns is-vcentered">
              <div class="column">
                <p class="subtitle">ĐÃ XÓA</p>
              </div>
              <div class="column is-narrow">
                <p class="title">{{ home.a9 }}</p>
              </div>
            </div>
          </div>
          <!-- affair -->
          <div class="tile is-child box">
            <!-- all -->
            <div class="columns is-vcentered">
              <div class="column">
                <p class="title">🤝 Giao kèo</p>
              </div>
              <div class="column is-narrow">
                <p class="title">{{ home.afAll }}</p>
              </div>
            </div>
            <!-- need edit -->
            <div class="columns is-vcentered">
              <div class="column">
                <p class="subtitle">KHÓA</p>
              </div>
              <div class="column is-narrow">
                <p class="title">{{ home.af0 }}</p>
              </div>
            </div>
            <!-- pending -->
            <div class="columns is-vcentered">
              <div class="column">
                <p class="subtitle">ĐANG DIỄN RA</p>
              </div>
              <div class="column is-narrow">
                <p class="title">{{ home.af1 }}</p>
              </div>
            </div>
            <!-- verified -->
            <div class="columns is-vcentered">
              <div class="column">
                <p class="subtitle">HOÀN THÀNH</p>
              </div>
              <div class="column is-narrow">
                <p class="title">{{ home.af2 }}</p>
              </div>
            </div>
            <!-- in auction -->
            <div class="columns is-vcentered">
              <div class="column">
                <p class="subtitle">ĐÃ XÓA</p>
              </div>
              <div class="column is-narrow">
                <p class="title">{{ home.af9 }}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- column 3 -->
        <div class="tile is-4 is-vertical is-parent">
          <!-- deposits -->
          <div class="tile is-child box">
            <div class="columns is-vcentered">
              <div class="column">
                <p class="title">💵 Giao dịch</p>
              </div>
              <div class="column is-narrow">
                <p class="title">{{ (home.tAll + home.dAll) }}</p>
              </div>
            </div>
            <!-- transactions -->
            <div class="columns is-vcentered">
              <div class="column">
                <p class="subtitle">GIAO DỊCH</p>
              </div>
              <div class="column is-narrow">
                <p class="title">{{ home.tAll }}</p>
              </div>
            </div>
            <!-- deposits -->
            <div class="columns is-vcentered">
              <div class="column">
                <p class="subtitle">TIỀN CỌC</p>
              </div>
              <div class="column is-narrow">
                <p class="title">{{ home.dAll }}</p>
              </div>
            </div>
          </div>
          <!-- users -->
          <div class="tile is-child box">
            <div class="columns is-vcentered">
              <div class="column">
                <p class="title">🙋‍♀️ Người dùng</p>
              </div>
              <div class="column is-narrow">
                <p class="title">{{ (home.uAll + home.adAll) }}</p>
              </div>
            </div>
            <!-- user -->
            <div class="columns is-vcentered">
              <div class="column">
                <p class="subtitle">NGƯỜI DÙNG</p>
              </div>
              <div class="column is-narrow">
                <p class="title">{{ home.uAll }}</p>
              </div>
            </div>
            <!-- admin -->
            <div class="columns is-vcentered">
              <div class="column">
                <p class="subtitle">NHÂN VIÊN</p>
              </div>
              <div class="column is-narrow">
                <p class="title">{{ home.adAll }}</p>
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
import { mapState } from 'vuex'

export default {
  name: "Home",
  components: {
    PageTitle: () => import("@/components/PageTitle"),
  },
  computed: {
    ...mapState ({
      admin: state => state.admin,
    })
  },
  data() {
    return {
      home: {},
      // admin: {},
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.go();
    },
  },
  async mounted() {
    if (Object.keys(this.$store.state.admin).length === 0) {
      this.admin = this.$store.state.admin;
    }

    if (Object.keys(this.$store.state.home).length === 0) {
      this.$store.dispatch("geth").then(() => {
        this.home = this.$store.state.home;
      });
    } else {
      this.home = this.$store.state.home;
    }
  },
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

.subtitle {
  font-family: "Roboto";
  color: #707070;
  font-weight: 700;
  font-size: 18px;
}
</style>