<template>
  <div class="page-container">
    <div class="columns">
      <div class="column is-full">
        <!-- notes -->
          <div class="notification is-info" v-if="noti">
            <div class="columns is-mobile is-vcentered">
              <div class="column is-narrow">
                <p style="font-size: 24px;">🤩</p>
              </div>
              <div class="column">
                <p>
                  <strong>Hãy để ý những mục có dấu sao (*) ở cuối tên trường. Bạn sẽ cần điền thông tin đầy đủ vào đó! Thông tin càng rõ ràng, người mua sẽ càng hiểu sản phẩm của bạn hơn!</strong>
                </p>
              </div>
              <div class="column is-narrow">
                <b-button rounded @click="noti = false">👍 Hiểu rồi!</b-button>
              </div>
            </div>
          </div>
        <!-- basic info -->
        <div class="card-container" ref="card-container-basic">
          <p class="card-title">📦 Thông tin cơ bản</p>
          <br />
          <!-- fruit -->
          <FruitInput @select="selectFruit"></FruitInput>
          <br />
          <!-- title -->
          <b-field label="Tên sản phẩm*" label-position="on-border" group-multiline>
            <b-input
              v-model="title"
              placeholder="Ví dụ: Táo Tàu Ninh Bình, đi ngay trong ngày!"
              required
              expanded
              maxlength="255"
            ></b-input>
          </b-field>
          <!-- weight -->
          <b-field label="Khối lượng (ước tính)*" label-position="on-border" group-multiline>
            <b-input
              type="number"
              v-model="weight"
              placeholder="Ví dụ: 54"
              required
              expanded
              min="1"
              max="1000"
            ></b-input>
            <b-select value="1">
              <option value="1" selected>tạ</option>
            </b-select>
          </b-field>
          <br />
          <!-- address -->
          <AddressSelect @address="getAddress"></AddressSelect>
        </div>

        <br />
        <!-- specific info -->
        <div class="card-container" ref="card-container-info">
          <p class="card-title">📋 Thông tin chi tiết</p>
          <br />
          <!-- weight avg -->
          <b-field label="Cân nặng quả*" label-position="on-border" group-multiline>
            <b-input
              type="number"
              v-model="weight_avg"
              placeholder="Cân nặng quả"
              required
              expanded
              min="1"
              max="10000"
            ></b-input>
            <b-select value="1">
              <option value="1" selected>g</option>
            </b-select>
          </b-field>
          <!-- diameter avg -->
          <b-field label="Đường kính quả*" label-position="on-border" group-multiline>
            <b-input
              type="number"
              v-model="diameter_avg"
              placeholder="Đường kính quả"
              required
              expanded
              min="1"
              max="1000"
            ></b-input>
            <b-select value="1">
              <option value="1" selected>cm</option>
            </b-select>
          </b-field>
          <!-- sugar pct -->
          <b-field label="Nồng độ đường" label-position="on-border" group-multiline>
            <b-input
              type="number"
              v-model="sugar_pct"
              placeholder="Nồng độ đường"
              required
              expanded
              min="1"
              max="100"
            ></b-input>
            <b-select value="1">
              <option value="1" selected>%</option>
            </b-select>
          </b-field>
          <!-- fruit pct -->
          <b-field
            label="Phần trăm quả trên tổng khối hàng"
            label-position="on-border"
            group-multiline
          >
            <b-input
              type="number"
              v-model="fruit_pct"
              placeholder="Phần trăm quả trên tổng khối hàng"
              required
              expanded
              min="1"
              max="100"
            ></b-input>
            <b-select value="1">
              <option value="1" selected>%</option>
            </b-select>
          </b-field>
          <!-- notes -->
          <b-field label="Thông tin chi tiết*" label-position="on-border" group-multiline>
            <b-input
              type="textarea"
              v-model="notes"
              placeholder="Phần trăm quả trên tổng khối hàng"
              required
              expanded
              maxlength="1000"
            ></b-input>
          </b-field>
        </div>

        <br />
        <!-- specific info -->
        <div class="card-container" ref="card-container-media">
          <p class="card-title">🖼️ Quản lý hình ảnh</p>
          <br />
          <p>Hãy chụp ảnh lại sản phẩm của bạn thật đẹp để người mua ấn tượng nhé. 📷</p>
          <br />
          <!-- upload -->
          <b-upload
            multiple
            drag-drop
            v-model="files"
            required
            accept="image/*"
            type="is-green"
            @input="uploadImages"
          >
            <a class="button is-green is-outlined">📷 Chụp hoặc chọn ảnh trong máy</a>
          </b-upload>
          <br />
          <br />
          <!-- images -->
          <div class="columns is-mobile is-multiline">
            <div
              class="column is-half-mobile is-one-third-tablet is-one-third-desktop is-one-quarter-widescreen is-one-quarter-fullhd"
              v-for="(medium, i) in media"
              :key="medium.index"
            >
              <ImageUploader
                :no="i"
                :directory="dir"
                :index="medium.index"
                :distributed="medium.file"
                @set="setImageURL"
              ></ImageUploader>
            </div>
          </div>
          <br />
          <p>
            Bạn có thể đăng tối đa
            <strong>12 tấm ảnh</strong>. 🎥
          </p>
        </div>

        <br />
        <!-- sale info -->
        <div class="card-container" ref="card-container-seller">
          <p class="card-title">💰 Thông tin bán hàng</p>
          <br />
          <!-- price init -->
          <b-field label="Giá khởi điểm*" label-position="on-border" group-multiline>
            <b-input
              type="number"
              v-model="price_init"
              placeholder="Ví dụ: 10,000,000"
              expanded
              required
              min="0"
              max="99999999999999999999"
            ></b-input>
            <b-select value="1">
              <option value="1" selected>đ</option>
            </b-select>
          </b-field>
          <!-- price step -->
          <b-field label="Bước giá*" label-position="on-border" group-multiline>
            <b-input
              type="number"
              v-model="price_step"
              placeholder="Ví dụ: 100,000"
              expanded
              required
              min="0"
              max="99999999999999999999"
            ></b-input>
            <b-select value="1">
              <option value="1" selected>đ</option>
            </b-select>
          </b-field>

          <div class="notification is-light is-warning">
            <div class="columns is-mobile">
              <div class="column is-narrow">
                <p>⚠️</p>
              </div>
              <div class="column">
                <p>Giá tiền chưa bao gồm phí vận chuyển.</p>
              </div>
            </div>
          </div>
        </div>

        <br />
        <!-- submit button -->
        <div class="columns is-mobile">
          <div class="column"></div>
          <div class="column is-narrow">
            <b-button
              @click="submitProduct"
              type="is-green"
              :disabled="isDisabled"
            >✈️ Gửi đi kiểm duyệt</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import uniqid from "uniqid";
import { mapState } from "vuex";

export default {
  components: {
    FruitInput: () => import("./Element/FruitInput"),
    AddressSelect: () => import("./Element/AddressSelect"),
    ImageUploader: () => import("@/components/ImageUploader"),
  },
  mounted() {
    this.dir = `/user/${this.user.img_dir}/product/${uniqid()}`;
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
    isDisabled: function () {
      if (
        this.title === "" ||
        (Object.keys(this.fruit).length === 0 || this.fruit === null) ||
        this.weight === "" ||
        this.weight > 1000 ||
        this.weight_avg === "" ||
        this.weight_avg > 10000 ||
        this.diameter_avg === "" ||
        this.diameter_avg > 1000 ||
        this.sugar_pct === "" ||
        this.sugar_pct > 100 ||
        this.fruit_pct === "" ||
        this.fruit_pct > 100 ||
        this.notes === "" ||
        this.media.length === 0 ||
        this.price_init === "" ||
        this.price_init > 99999999999999999999 ||
        this.price_step === "" ||
        this.price_step > 99999999999999999999
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  data() {
    return {
      // notification
      noti: true,
      // data
      title: "",
      fruit: {},
      weight: "",
      address: "",
      weight_avg: "",
      diameter_avg: "",
      sugar_pct: "",
      fruit_pct: "",
      notes: "",
      files: [],
      media: [],
      price_init: "",
      price_step: "",
      dir: "",
    };
  },
  methods: {
    selectFruit(fruit) {
      this.fruit = fruit;
    },
    getAddress(id) {
      this.address = id;
    },
    submitProduct() {
      // submit product
      this.$emit("submit", {
        fruit_id: this.fruit.id,
        title: this.title,
        weight: this.weight,
        address_id: this.address,
        weight_avg: this.weight_avg,
        diameter_avg: this.diameter_avg,
        sugar_pct: this.sugar_pct,
        fruit_pct: this.fruit_pct,
        notes: this.notes,
        price_init: this.price_init,
        price_step: this.price_step,
        media: this.media.map((item) => item.media_url),
        dir: this.dir
      });
    },
    uploadImages() {
      if (this.files.length > 12) {
        // warning dialog
        this.$buefy.dialog.alert({
          title: "Quá giới hạn ảnh cho phép. 😧",
          type: "is-warning",
          message: `Bạn chỉ có thể đăng 12 trên tổng số ${this.files.length} ảnh đã chọn thôi. 😓`,
        });

        // slice files
        this.files = this.files.slice(0, 12);
      }

      this.media = this.files.map((item) => {
        return { index: uniqid(), file: item, media_url: null };
      });
    },
    setImageURL(img) {
      // filter
      if (img.media_url !== null) {
        this.media = this.media.map((item) =>
          item.index === img.index
            ? { ...item, media_url: img.media_url }
            : item
        );
      } else {
        this.media = this.media.filter((item) => item.index !== img.index);
      }
    },
    goto(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;
      window.scrollTo(0, top);
    },
  },
};
</script>

<style scoped>
.card-container {
  box-shadow: 0 2px 8px #00000016;
  border-radius: 10px;
  background-color: white;
  padding: 32px;
  scroll-behavior: smooth;
}

.card-title {
  font-weight: 700;
  color: #07d390;
  font-size: 20px;
}

</style>