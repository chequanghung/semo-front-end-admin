<template>
  <div class="cell-container" :class="{'uneditable': uneditable, 'editing': editMode}">
    <div class="columns is-vcentered is-mobile">
      <div class="column" @click="edit">
        <p class="cell-content">{{ title }}</p>
      </div>
      <div class="column is-narrow" v-if="editMode === false" @click="edit">
        <!-- content -->
        <!-- money -->
        <p
          class="cell-content"
          v-if="money !== undefined"
        >{{ money !== null ? formatCurrency(money) : 'Chưa thỏa thuận' }}</p>
        <!-- percentage -->
        <p
          class="cell-content"
          v-if="percent !== undefined"
        >{{ percent !== null ? formatPercent(percent) : 'Chưa thỏa thuận' }}</p>
        <!-- date -->
        <p
          class="cell-content"
          v-if="date !== undefined"
        >{{ date !== null ? formatDate(date) : 'Chưa thỏa thuận' }}</p>
        <!-- user -->
        <p class="cell-content" v-if="user === null">Chưa thỏa thuận</p>
        <div
          class="columns is-vcentered is-mobile is-variable is-2"
          style="padding: 0;"
          v-if="user !== undefined"
        >
          <div class="column is-narrow">
            <div
              class="image is-24x24"
              style="border-radius: 50%; background-size: cover; background-position: center;"
              :style="{backgroundImage: `url(${user.img_url})`}"
              v-if="user"
            ></div>
          </div>
          <div class="column is-narrow">
            <p class="cell-content" v-if="user">{{ user.name }}</p>
          </div>
        </div>
      </div>
      <div class="column" v-if="editMode === true">
        <div class="columns">
          <div class="column">
            <b-field v-if="money !== undefined">
              <b-input v-model="moneyEdit" type="number" :min="min" :max="max" expanded></b-input>
            </b-field>
            <b-field v-if="percent !== undefined">
              <b-input v-model="percentEdit" type="number" :min="min" :max="max" expanded></b-input>
            </b-field>
            <b-field v-if="date !== undefined">
              <b-datepicker locale="en-GB" v-model="dateEdit" expanded></b-datepicker>
            </b-field>
            <b-field v-if="user !== undefined">
              <b-select v-model="userEdit" expanded>
                <option v-for="item in users" :key="item.id" :value="item">{{ item.name }}</option>
              </b-select>
            </b-field>
          </div>
          <div class="column is-narrow">
            <b-button @click="submit" :disabled="isDisabled" expanded>🖊️ Xong</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: [
    "title",
    "money",
    "percent",
    "min",
    "max",
    "users",
    "user",
    "date",
    "uneditable",
  ],
  computed: {
    isDisabled: function () {
      if (this.money !== undefined) {
        if (this.moneyEdit >= this.min && this.moneyEdit <= this.max) {
          return false;
        } else {
          return true;
        }
      } else if (this.date !== undefined) {
        if (this.dateEdit.getTime() > Date.now()) {
          return false;
        } else {
          return true;
        }
      } else if (this.percent !== undefined) {
        if (this.percentEdit >= this.min && this.percentEdit <= this.max) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
  },
  data() {
    return {
      editMode: false,
      moneyEdit: 0,
      percentEdit: 0,
      dateEdit: new Date(),
      userEdit: {},
    };
  },
  async created() {
    this.money !== undefined ? (this.moneyEdit = this.money) : "";
    this.percent !== undefined ? (this.percentEdit = this.percent) : "";
    this.date !== undefined
      ? this.date instanceof Date
        ? (this.dateEdit = this.date)
        : (this.dateEdit = new Date())
      : "";
    this.user !== undefined ? (this.userEdit = this.user) : "";
  },
  methods: {
    edit() {
      this.uneditable ? "" : (this.editMode = !this.editMode);
    },
    submit() {
      // check type
      if (this.date !== undefined) {
        this.submitDate();
      } else if (this.percent !== undefined) {
        this.submitPercent();
      } else if (this.money !== undefined) {
        this.submitMoney();
      } else if (this.user !== undefined) {
        this.submitUser();
      }
      // turn off edit mode
      this.editMode = false;
    },
    submitDate() {
      this.$emit("changeDate", this.dateEdit);
    },
    submitMoney() {
      this.$emit("changeMoney", this.moneyEdit);
    },
    submitUser() {
      this.$emit("changeUser", this.userEdit);
    },
    submitPercent() {
      this.$emit("changePercent", this.percentEdit);
    },
    formatCurrency: function (content) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(content);
    },
    formatPercent: function (content) {
      return `${content}%`;
    },
    formatDate: function (content) {
      return moment(content).format("DD/MM/YYYY");
    },
  },
};
</script>

<style scoped>
.cell-container {
  padding: 12px 8px;
  background-color: white;
  border: 1px solid #efefef;
  box-shadow: 0 2px 4px #00000016;
  border-radius: 10px;
  margin: 12px 0;
  cursor: pointer;
  transition: 0.25s;
}

.edited {
  background-color: #fff7cc;
  box-shadow: 0 2px 4px #fff7cc59;
}

.uneditable {
  background-color: #f2f2f2;
  cursor: default;
}

.editing {
  background-color: #f3f3f3;
  box-shadow: 0 2px 4px #00000016;
}

.cell-content {
  font-weight: 500;
  color: #707070;
}

#edit-btn {
  display: none;
}

.cell-container:hover {
  box-shadow: 0 4px 8px #00000019;
}
</style>