<template>
  <div class="page-container">
    <div class="title-bar">
      <div class="columns is-vcentered">
        <div class="column is-2">
          <b-button type="is-danger" @click="cancel" outlined>❌ Hủy</b-button>
        </div>
        <div class="column">
          <div class="columns is-centered">
            <div class="column is-narrow"></div>
            <p class="review-title">Kiểm duyệt sản phẩm</p>
          </div>
        </div>
        <div class="column is-2"></div>
      </div>
    </div>

    <!-- content -->
    <form @submit.prevent="submitRequest">
      <div class="form" style="margin-top: 32px;">
        <!-- base -->
        <div class="columns is-centered">
          <div class="column is-two-thirds">
            <!-- name -->
            <div>
              <p class="page-subtitle">Tên gọi sản phẩm</p>
              <!-- title -->
              <div class="page-section">
                <p class="page-content-text title" :class="{'edited' : edit_title}">Tiêu đề sản phẩm</p>
                <!-- answer -->
                <div class="page-answer">
                  <p class="page-content-text">{{ this.product.title }}</p>
                </div>
                <!-- commenter -->
                <br />
                <b-field :type="edit_title ? 'is-danger' : ''">
                  <b-input v-model="edit_title" placeholder="Góp ý ..." maxlength="255" expanded></b-input>
                </b-field>
              </div>
            </div>

            <!-- basic info -->
            <div>
              <p class="page-subtitle">Thông tin chung về sản phẩm</p>
              <!-- title -->
              <div class="page-section" v-if="this.product.Fruit !== null">
                <p class="page-content-text title" :class="{'edited' : edit_fruit}">Loại quả</p>
                <!-- answer -->
                <div class="page-answer">
                  <div class="columns is-vcentered">
                    <div class="column is-narrow" v-if="this.product.Fruit.icon_url !== ''">
                      <figure class="image is-48x48">
                        <img
                          class="is-rounded"
                          :src="this.product.Fruit.icon_url ? this.product.Fruit.icon_url : '../assets/Placeholder-Icon.png'"
                        />
                      </figure>
                    </div>
                    <div class="column">
                      <p class="page-content-text">{{ this.product.Fruit.title }}</p>
                    </div>
                  </div>
                </div>
                <!-- commenter -->
                <br />
                <b-field :type="edit_fruit ? 'is-danger' : ''">
                  <b-input v-model="edit_fruit" placeholder="Góp ý ..." maxlength="255" expanded></b-input>
                </b-field>
              </div>
              <!-- weight -->
              <div class="page-section">
                <p class="page-content-text title" :class="{'edited' : edit_weight}">Khối lượng</p>
                <!-- answer -->
                <div class="page-answer">
                  <p class="page-content-text">{{ this.product.weight }} tạ</p>
                </div>
                <!-- commenter -->
                <br />
                <b-field :type="edit_weight ? 'is-danger' : ''">
                  <b-input v-model="edit_weight" placeholder="Góp ý ..." maxlength="255" expanded></b-input>
                </b-field>
              </div>
              <!-- weight -->
              <div class="page-section">
                <p
                  class="page-content-text title"
                  :class="{'edited' : edit_address}"
                >Địa điểm thu hoạch</p>
                <!-- answer -->
                <div class="page-answer">
                  <p
                    class="page-content-text"
                  >{{ this.product.Address.address }}, {{ this.product.Address.ward }}, {{ this.product.Address.district }}, {{ this.product.Address.province }}</p>
                </div>
                <!-- commenter -->
                <br />
                <b-field :type="edit_address ? 'is-danger' : ''">
                  <b-input v-model="edit_address" placeholder="Góp ý ..." maxlength="255" expanded></b-input>
                </b-field>
              </div>
            </div>

            <!-- info -->
            <div>
              <p class="page-subtitle">Thông tin chi tiết về sản phẩm</p>
              <!-- title -->
              <div class="page-section">
                <p
                  class="page-content-text title"
                  :class="{'edited' : edit_fruit_pct}"
                >Phần trăm khối lượng quả trong lô hàng</p>
                <!-- answer -->
                <div class="page-answer">
                  <p
                    class="page-content-text"
                    v-if="this.product.fruit_pct !== ''"
                  >{{ this.product.fruit_pct }}%</p>
                  <p class="page-content-text edited" v-else>Trống</p>
                </div>
                <!-- commenter -->
                <br />
                <b-field :type="edit_fruit_pct ? 'is-danger' : ''">
                  <b-input
                    v-model="edit_fruit_pct"
                    placeholder="Góp ý ..."
                    maxlength="255"
                    expanded
                  ></b-input>
                </b-field>
              </div>
              <!-- sugar -->
              <div class="page-section">
                <p
                  class="page-content-text title"
                  :class="{'edited' : edit_sugar_pct}"
                >Nồng độ đường</p>
                <!-- answer -->
                <div class="page-answer">
                  <p
                    class="page-content-text"
                    v-if="this.product.sugar_pct !== ''"
                  >{{ this.product.sugar_pct }}%</p>
                  <p class="page-content-text edited" v-else>Trống</p>
                </div>
                <!-- commenter -->
                <br />
                <b-field :type="edit_sugar_pct ? 'is-danger' : ''">
                  <b-input
                    v-model="edit_sugar_pct"
                    placeholder="Góp ý ..."
                    maxlength="255"
                    expanded
                  ></b-input>
                </b-field>
              </div>
              <!-- avg weight -->
              <div class="page-section">
                <p
                  class="page-content-text title"
                  :class="{'edited' : edit_weight_avg}"
                >Cân nặng trung bình</p>
                <!-- answer -->
                <div class="page-answer">
                  <p
                    class="page-content-text"
                    v-if="this.product.weight_avg !== ''"
                  >{{ this.product.weight_avg }}g</p>
                  <p class="page-content-text edited" v-else>Trống</p>
                </div>
                <!-- commenter -->
                <br />
                <b-field :type="edit_weight_avg ? 'is-danger' : ''">
                  <b-input
                    v-model="edit_weight_avg"
                    placeholder="Góp ý ..."
                    maxlength="255"
                    expanded
                  ></b-input>
                </b-field>
              </div>
              <!-- avg diameter -->
              <div class="page-section">
                <p
                  class="page-content-text title"
                  :class="{'edited' : edit_diameter_avg}"
                >Đường kính trung bình</p>
                <!-- answer -->
                <div class="page-answer">
                  <p
                    class="page-content-text"
                    v-if="this.product.diameter_avg !== ''"
                  >{{ this.product.diameter_avg }}cm</p>
                  <p class="page-content-text edited" v-else>Trống</p>
                </div>
                <!-- commenter -->
                <br />
                <b-field :type="edit_diameter_avg ? 'is-danger' : ''">
                  <b-input
                    v-model="edit_diameter_avg"
                    placeholder="Góp ý ..."
                    maxlength="255"
                    expanded
                  ></b-input>
                </b-field>
              </div>
              <!-- info -->
              <div class="page-section">
                <p
                  class="page-content-text title"
                  :class="{'edited' : edit_notes}"
                >Thông tin chi tiết</p>
                <!-- answer -->
                <div class="page-answer">
                  <p
                    class="page-content-text"
                    v-if="this.product.notes !== ''"
                  >{{ this.product.notes }}</p>
                  <p class="page-content-text edited" v-else>Trống</p>
                </div>
                <!-- commenter -->
                <br />
                <b-field :type="edit_notes ? 'is-danger' : ''">
                  <b-input v-model="edit_notes" placeholder="Góp ý ..." maxlength="255" expanded></b-input>
                </b-field>
              </div>
            </div>

            <!-- images -->
            <div v-if="this.product.ProductMedia.length > 0">
              <p class="page-subtitle">Sản phẩm của bạn trông thế nào?</p>
              <!-- title -->
              <div class="page-section">
                <div
                  class="page-section-media"
                  :class="{'edited-card': edit_media[i].notes}"
                  v-for="(medium, i) in this.product.ProductMedia"
                  :key="medium.id"
                >
                  <div class="columns is-vcentered">
                    <div class="column is-narrow">
                      <p
                        style="font-weight: 700; font-size: 18px;"
                        :class="{'edited' : edit_media[i].notes}"
                      >0{{(i+1)}}</p>
                    </div>
                    <!-- answer -->
                    <div class="column is-narrow">
                      <figure class="image is-128x128" style="border-radius: 5px;">
                        <img :src="medium.media_url" />
                      </figure>
                    </div>
                    <!-- commenter -->
                    <div class="column">
                      <p style="font-size: 15px;" :class="{'edited' : edit_media[i].notes}">Ảnh</p>
                      <br />
                      <b-field :type="edit_media[i].notes ? 'is-danger' : ''">
                        <b-input
                          v-model="edit_media[i].notes"
                          placeholder="Góp ý ..."
                          maxlength="255"
                          expanded
                        ></b-input>
                      </b-field>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- price -->
            <div>
              <p class="page-subtitle">Định giá sản phẩm</p>
              <!-- title -->
              <div class="page-section">
                <p
                  class="page-content-text title"
                  :class="{'edited' : edit_price_init}"
                >Giá khởi điểm</p>
                <!-- answer -->
                <div class="page-answer">
                  <p
                    class="page-content-text"
                  >{{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(this.product.price_init) }}</p>
                </div>
                <!-- commenter -->
                <br />
                <b-field :type="edit_price_init ? 'is-danger' : ''">
                  <b-input
                    v-model="edit_price_init"
                    placeholder="Góp ý ..."
                    maxlength="255"
                    expanded
                  ></b-input>
                </b-field>
              </div>
              <!-- sugar -->
              <div class="page-section">
                <p class="page-content-text title" :class="{'edited' : edit_price_step}">Bước giá</p>
                <!-- answer -->
                <div class="page-answer">
                  <p
                    class="page-content-text"
                  >{{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(this.product.price_step) }}</p>
                </div>
                <!-- commenter -->
                <br />
                <b-field :type="edit_price_step ? 'is-danger' : ''">
                  <b-input
                    v-model="edit_price_step"
                    placeholder="Góp ý ..."
                    maxlength="255"
                    expanded
                  ></b-input>
                </b-field>
              </div>
            </div>

            <!-- submission -->
            <div>
              <div class="page-section">
                <div class="columns is-centered">
                  <b-button
                    type="is-primary"
                    size="is-medium"
                    native-type="submit"
                    rounded
                  >✅ Hoàn tất kiểm định</b-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["id"],
  data() {
    return {
      // input type
      danger: "is-danger",
      normal: "is-primary",
      // address: this.product.Address,
      // media: this.product.ProductMedia,
      // fruit
      edit_fruit: "",
      edit_weight: "",
      edit_address: "",
      edit_fruit_pct: "",
      edit_sugar_pct: "",
      edit_weight_avg: "",
      edit_diameter_avg: "",
      edit_notes: "",
      edit_media: [],
      edit_price_init: "",
      edit_price_step: "",
      edit_title: "",
    };
  },
  created() {
    this.get(this.id);
  },
  watch: {
    product: function () {
      if (this.product !== undefined) {
        this.product.ProductMedia.forEach((item) => {
          this.edit_media = [...this.edit_media, { id: item.id, notes: "" }];
        });
      }
    },
  },
  computed: {
    ...mapState({
      product: (state) => state.product.product,
    }),
  },
  methods: {
    ...mapActions("product", ["get", "close", "review"]),

    cancel() {
      this.$router.go(-1);
      this.close();
    },

    submitRequest() {
      let review = {
        product_id: this.product.id,
        admin_id: 1,
        fruit_title: this.edit_fruit || null,
        title: this.edit_title || null,
        weight: this.edit_weight || null,
        fruit_pct: this.edit_fruit_pct || null,
        sugar_pct: this.edit_sugar_pct || null,
        weight_avg: this.edit_weight_avg || null,
        diameter_avg: this.edit_diameter_avg || null,
        price_init: this.edit_price_init || null,
        price_step: this.edit_price_step || null,
        notes: this.edit_notes || null,
      };

      let media = this.edit_media.map((item) =>
        item.notes.length === 0 ? { ...item, notes: null } : item
      );

      this.review({ review, media });
    },
  },
};
</script>

<style scoped>
.review-title {
  font-size: 25px;
  font-family: "Merriweather";
  font-weight: 900;
  color: #b88cd8;
  padding-bottom: 4px;
  border-bottom: 3px solid #01d28e;
  text-align: center;
}

.title-bar {
  position: sticky;
  top: 0px;
  z-index: 1;
  background-color: #ffffff;
  transition: 0.12s;
  padding: 20px 0;
}

.page-subtitle {
  font-size: 28px;
  font-family: "Merriweather";
  font-weight: 900;
  color: #b88cd8;
  margin-bottom: 16px;
}

.page-section-media {
  background-color: white;
  box-shadow: 0;
  margin-top: 16px;
  border-radius: 10px;
  border: 0.5px solid #efefef;
  box-shadow: 0 2px 8px #00000016;
  padding: 16px;
}

.page-section {
  margin-bottom: 36px;
}

.title {
  color: #707070 !important;
}

.edited {
  color: #fd5f55 !important;
}

.edited-card {
  background-color: #ffe7e6;
  border: 0.5px solid #fd5f55;
}

.edited-input input {
  border: 0.5px solid #fd5f55 !important;
  background-color: #ffe7e6 !important;
}

.page-content-text {
  font-size: 18px;
  font-family: "Roboto";
  font-weight: 700;
  color: #01d28e;
}
</style>