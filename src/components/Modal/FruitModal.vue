<template>
  <div class="modal-container">
    <!-- title -->
    <p class="modal-title">{{title}}</p>
    <div class="modal-form">
      <!-- name input -->
      <b-field label="Tên loại quả">
        <b-input placeholder="Tên loại quả" v-model="fruit_title" required></b-input>
      </b-field>
      <b-field label="Ảnh loại quả">
        <!-- image -->
        <div class="columns is-vcentered is-centered">
          <div class="column is-narrow" v-if="fruit_icon_url.length > 0">
            <!-- current image -->
            <figure class="image is-128x128">
              <img class="image is-128x128 is-rounded" :src="fruit_icon_url" />
            </figure>
          </div>
          <!-- firebase image uploader -->
          <div class="column is-narrow">
            <b-upload
              type="is-green"
              drag-drop
              :disabled="isDisabled"
              v-model="file"
              accept="image/*"
              @input="upload"
            >
              <a class="button is-green">
                <span>📱 Chọn ảnh và phim trong máy</span>
              </a>
            </b-upload>
            <transition name="slide-fade">
              <p v-if="isDisabled" style="text-align: center;">Đang tải lên ...</p>
            </transition>
          </div>
        </div>
      </b-field>
    </div>
    <div class="modal-submit">
      <div class="columns is-centered">
        <div class="column is-narrow" v-if="data === undefined">
          <b-button
            type="is-green"
            :disabled="this.fruit_title === '' && this.fruit_icon_url === ''"
            @click="addFruit"
          >💾 Lưu mới</b-button>
        </div>
        <div class="column is-narrow" v-if="data !== undefined">
          <b-button
            type="is-green"
            :disabled="this.data.title === this.fruit_title && this.data.icon_url === this.fruit_icon_url || this.fruit_title === ''"
            @click="editFruit"
          >💾 Lưu lại</b-button>
        </div>
        <div class="column is-narrow" v-if="data !== undefined && data.product_count == 0">
          <b-button type="is-danger" @click="deleteFruit">🗑️ Xóa bỏ</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
// vuex
import { mapState, mapActions } from "vuex";
// firebase
import { fb } from "../../firebase";
// uniqid
import uniqid from "uniqid";

export default {
  props: ["title", "data"],
  data() {
    return {
      fruit_title: "",
      fruit_icon_url: "",
      isDisabled: false,
      file: {},
    };
  },
  created() {
    if (this.data != undefined) {
      this.fruit_title = this.data.title;
      this.fruit_icon_url = this.data.icon_url;
    }
  },
  computed: {
    ...mapState({
      fruits: (state) => state.fruit.fruits,
      img_dir: (state) => state.fruit.img_dir,
    }),
    submitReq() {
      // create modal
      if (this.data === undefined) {
        if ((this.fruit_title = this.fruit_icon_url === "")) {
          return true;
        } else {
          return false;
        }
      }
      // edit modal
      else {
        if (
          this.fruit_title != this.data.title &&
          this.fruit_icon_url != this.data.icon_url
        ) {
          return true;
        } else {
          return false;
        }
      }
    },
  },
  methods: {
    // access vuex functions
    ...mapActions("fruit", ["add", "edit", "delete"]),

    // logic
    upload() {
      return new Promise((ressolve, reject) => {
        // delete current image if exists
        this.fruit_icon_url.length > 0 &&
        this.fruit_icon_url.startsWith(
          "https://firebasestorage.googleapis.com/"
        )
          ? fb.storage().refFromURL(this.fruit_icon_url).delete()
          : "";

        // upload image
        // generate name and put image on db
        let uploadTask = fb
          .storage()
          .ref(`${this.img_dir}/${this.fruit_title}_${this.file.name}`)
          .put(this.file);
        // progress
        uploadTask.on(
          "state_changed",
          // on file upload
          () => {
            this.isDisabled = true;
            console.log("1");
          },
          // on error
          (error) => {
            // show error message
            this.$buefy.notification.open({
              message: `${error}`,
              type: "is-danger",
            });
          },
          // on completion
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              // change url
              this.fruit_icon_url = downloadURL;
              this.isDisabled = false;
            });
          }
        );
      });
    },
    // add fruit
    addFruit() {
      this.add({
        title: this.fruit_title,
        icon_url: this.fruit_icon_url,
      }).catch((error) => {
        this.$buefy.notification.open({
          message: `${error}`,
          type: "is-danger",
        });
      });

      // emit a close modal function
      this.$emit("close");
    },
    // change fruit
    editFruit() {
      // submit fruit edit
      this.edit({
        id: this.data.id,
        title: this.fruit_title,
        icon_url: this.fruit_icon_url,
      });

      // emit a close modal function
      this.$emit("close");
    },
    deleteFruit() {
      // delete current image if exists
      this.fruit_icon_url.length > 0 &&
      this.fruit_icon_url.startsWith("https://firebasestorage.googleapis.com/")
        ? fb.storage().refFromURL(this.fruit_icon_url).delete()
        : "";

      // submit fruit delete
      this.delete([
        {
          id: this.data.id,
          title: this.fruit_title,
          icon_url: this.fruit_icon_url,
          product_count: this.data.product_count,
        },
      ]);

      // emit a close modal function
      this.$emit("close");
    },
  },
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

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
</style>