<template>
  <div class="dashboard-container">
    <!-- title -->
    <div class="columns title-bar">
      <div class="column is-narrow">
        <b-button @click="showMenu">📂</b-button>
      </div>
      <div class="column">
        <p class="dashboard-title">{{title}}</p>
      </div>
      <div class="column is-narrow" v-if="checkedRows.length === 0">
        <b-button type="is-primary" v-if="new_title !== undefined" @click="addRow">{{new_title}}</b-button>
      </div>
      <div class="column is-narrow" v-if="checkedRows.length > 0">
        <div class="columns is-mobile is-vcentered is-variable is-1">
          <div class="column is-narrow">
            <p>
              Đã chọn
              <strong>{{ checkedRows.length }}</strong> bản ghi
            </p>
          </div>
          <div class="column">
            <b-button type="is-danger" @click="deleteRows">🗑️ Xóa bản ghi</b-button>
          </div>
          <div class="column">
            <b-button type="is-light" @click="checkedRows = []">❌ Bỏ chọn</b-button>
          </div>
        </div>
      </div>
    </div>
    <!-- table -->
    <div class="dashboard-table">
      <b-table
        :data="data"
        :columns="columns"
        :checked-rows.sync="checkedRows"
        :selected.sync="selected"
        paginated
        :per-page="20"
        :current-page.sync="current"
        searchable
        pagination-simple
        pagination-position="bottom"
        checkbox-position="right"
        checkable
        hoverable
        :focusable="false"
      ></b-table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: ["title", "new_title", "data", "columns", "total"],
  data() {
    return {
      checkedRows: [],
      selected: {},
      current: 1,
    };
  },
  watch: {
    selected: function () {
      this.$emit("into", this.selected);
    },
    current: function () {
      this.$emit("page", this.current);
      this.checkedRows = [];
    },
  },
  computed: {
    ...mapState({
      menu: (state) => state.ui.menu,
    }),
  },
  methods: {
    ...mapActions("ui", ["open_menu", "close_menu"]),
    addRow() {
      this.$emit("add");
    },
    deleteRows() {
      this.$emit("delete", this.checkedRows);
      this.checkedRows = [];
    },
    showMenu() {
      this.open_menu();
    },
  },
};
</script>

<style scoped>
.dashboard-title {
  font-size: 25px;
  font-family: "Roboto";
  font-weight: 900;
  color: #01d28e;
  padding-bottom: 10px;
}

.title-bar {
  position: sticky;
  top: 0px;
  z-index: 1;
  background-color: #ffffff;
  transition: 0.12s;
}
</style>