<template>
  <div class="dashboard-container">
    <!-- title -->
    <div class="columns title-bar">
      <div class="column">
        <p class="dashboard-title">{{title}}</p>
      </div>
      <div class="column is-narrow" v-if="checkedRows.length === 0">
        <b-button type="is-primary" @click="addRow">{{new_title}}</b-button>
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
        pagination-simple
        pagination-position="bottom"
        checkbox-position="right"
        checkable
        hoverable
      >
      </b-table>
    </div>
  </div>
</template>

<script>
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
  methods: {
    addRow() {
      this.$emit("add");
    },
    deleteRows() {
      this.$emit("delete", this.checkedRows);
      this.checkedRows = [];
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