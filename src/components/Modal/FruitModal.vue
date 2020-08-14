<template>
  <div class="modal-container">
    <!-- title -->
    <p class="modal-title">{{title}}</p>
    <div class="modal-form">
      <!-- name input -->
      <b-field label="Tên loại quả">
        <b-input placeholder="Tên loại quả" :value="fruit_title"></b-input>
      </b-field>
      <b-field label="Ảnh loại quả">
        <!-- image -->
        <div class="columns is-vcentered is-centered">
          <div class="column is-narrow">
            <!-- current image -->
            <img class="image is-128x128" :src="fruit_icon_url" v-if="fruit_icon_url.length > 0" />
          </div>
          <!-- firebase image uploader -->
          <div class="column is-narrow">
            <b-upload v-model="file">
              <a class="button is-primary">
                <span>📱 Chọn ảnh và phim trong máy</span>
              </a>
            </b-upload>
          </div>
        </div>
      </b-field>
    </div>
    <div class="modal-submit">
      <div class="columns is-centered">
        <div class="column is-narrow">
          <b-button type="is-primary">💾 Lưu lại</b-button>
        </div>
        <div class="column is-narrow">
          <b-button type="is-danger">🗑️ Xóa bỏ</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "data"],
  data() {
    return {
      fruit_title: "",
      fruit_icon_url: "",
      file: {}
    };
  },
  created() {
    this.fruit_title = typeof this.data.title === 'undefined' ? "" : this.data.title;
    this.fruit_icon_url = typeof this.data.icon_url === 'undefined' ? "" : this.data.icon_url;
  },
  computed: {
    submit: () => {
      console.log(this.data)
      // create new fruit
      if (typeof this.data === "undefined") {
        if (this.fruit_title != "" && this.fruit_icon_url != "") {
          return 1;
        } else {
          return 0;
        }
      } else {
        if (
          this.fruit_title != this.data.title ||
          this.fruit_icon_url != this.data.icon_url
        ) {
          return 2;
        } else {
          return 3;
        }
      }
    },
  },
  methods: {},
};
</script>

<style scoped>
.modal-container {
  background-color: white;
  border-radius: 10px;
  padding: 40px;
}

.modal-title {
  font-size: 20px;
  font-family: "Roboto";
  font-weight: 900;
  color: #01d28e;
  padding-bottom: 10px;
}

.modal-form,
.modal-submit {
  margin-top: 20px;
}
</style>