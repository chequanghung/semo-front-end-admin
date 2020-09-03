<template>
  <div class="card-container">
    <p class="home-section-title">{{ title }}</p>
    <!-- content -->
    <div class="form">
      <b-field>
        <!-- province -->
        <b-autocomplete
          placeholder="Tỉnh/Thành phố"
          :loading="isFetchingP"
          :data="dataP"
          :value="addressInfo ? addressInfo.province : ''"
          field="title"
          maxlength="255"
          :has-counter="false"
          clearable
          expanded
          required
          validation-message="Đừng bỏ trống chứ!"
          @typing="loadProvince"
          @select="option => province = option"
        >
          <template slot-scope="props">
            <div class="media-content">{{ props.option.title }}</div>
          </template>
          <template slot="empty">Không tìm thấy tỉnh/thành phố nào</template>
        </b-autocomplete>
      </b-field>
      <!-- district -->
      <b-field>
        <b-autocomplete
          placeholder="Quận/Huyện"
          :loading="isFetchingD"
          :data="dataD"
          :value="addressInfo ? addressInfo.district : ''"
          field="title"
          maxlength="255"
          :has-counter="false"
          clearable
          expanded
          required
          validation-message="Đừng bỏ trống chứ!"
          @typing="loadDistrict"
          @select="option => district = option"
        >
          <template slot-scope="props">
            <div class="media-content">{{ props.option.title }}</div>
          </template>
          <template slot="empty">Không tìm thấy quận/huyện nào</template>
        </b-autocomplete>
      </b-field>
      <!-- ward -->
      <b-field>
        <b-autocomplete
          placeholder="Phường/Xã"
          :loading="isFetchingW"
          :data="dataW"
          :value="addressInfo ? addressInfo.ward : ''"
          field="title"
          :has-counter="false"
          clearable
          expanded
          required
          maxlength="255"
          validation-message="Đừng bỏ trống chứ!"
          @typing="loadWard"
          @select="option => ward = option"
        >
          <template slot-scope="props">
            <div class="media-content">{{ props.option.title }}</div>
          </template>
          <template slot="empty">Không tìm thấy phường/xã nào</template>
        </b-autocomplete>
      </b-field>
      <!-- address info -->
      <b-field>
        <b-input
          v-model="address"
          placeholder="Số nhà, tên đường/phố, làng/ấp"
          maxlength="255"
          :has-counter="false"
          required
          validation-message="Đừng bỏ trống số nhà bạn chứ!"
          expanded
        ></b-input>
      </b-field>

      <br />

      <!-- submit -->
      <div class="columns is-centered is-mobile">
        <div class="column is-narrow">
          <b-button type="is-green" :disabled="isDisabled" @click="submitAddress">{{ btn_title }}</b-button>
        </div>
        <div
          class="column is-narrow"
          v-if="addressInfo !== undefined && addressInfo.default_address !== 1"
        >
          <b-button type="is-danger" @click="deleteAddress">🗑️ Xóa địa chỉ</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from "debounce";
import axios from "axios";

export default {
  props: ["title", "btn_title", "addressInfo"],
  data() {
    return {
      // fetching for inputs
      isFetchingP: false,
      isFetchingD: false,
      isFetchingW: false,
      // address
      dataP: [],
      dataD: [],
      dataW: [],
      // for v-model
      province: {},
      district: {},
      ward: {},
      address: this.addressInfo !== undefined ? this.addressInfo.address : "",
      // for button
      isDisabled: false,
    };
  },
  async mounted() {
    if (this.addressInfo !== undefined) {
      this.province.title = this.addressInfo.province;
      this.district.title = this.addressInfo.district;
      this.ward.title = this.addressInfo.ward;
      this.address = this.addressInfo.address;
    }
  },
  methods: {
    //  load provinces
    loadProvince: debounce(function (province) {
      if (!province.length) {
        this.dataP = [];
        return;
      }

      this.isFetchingP = true;
      axios
        .get("/address/province")
        .then(({ data }) => {
          this.dataP = data.LtsItem.map((item) => ({
            id: item.ID,
            title: item.Title,
          })).filter((option) => {
            return (
              option.title
                .toString()
                .toLowerCase()
                .indexOf(province.toLowerCase()) >= 0
            );
          });
        })
        .catch((error) => {
          this.dataP = [];
          throw error;
        })
        .finally(() => {
          this.isFetchingP = false;
        }, 250);
    }),
    // load districts
    loadDistrict: debounce(function (district) {
      if (!district.length) {
        this.dataD = [];
        return;
      }

      this.isFetchingD = true;
      axios
        .get(`/address/province/${this.province.id}/district`)
        .then(({ data }) => {
          this.dataD = data
            .map((item) => ({
              id: item.ID,
              title: item.Title,
            }))
            .filter((option) => {
              return (
                option.title
                  .toString()
                  .toLowerCase()
                  .indexOf(district.toLowerCase()) >= 0
              );
            });
        })
        .catch((error) => {
          this.dataD = [];
          throw error;
        })
        .finally(() => {
          this.isFetchingD = false;
        });
    }, 250),
    // load ward
    loadWard: debounce(function (ward) {
      if (!ward.length) {
        this.dataW = [];
        return;
      }

      this.isFetchingW = true;
      axios
        .get(`/address/district/${this.district.id}/ward`)
        .then(({ data }) => {
          this.dataW = data
            .map((item) => ({
              id: item.ID,
              title: item.Title,
            }))
            .filter((option) => {
              return (
                option.title
                  .toString()
                  .toLowerCase()
                  .indexOf(ward.toLowerCase()) >= 0
              );
            });
        })
        .catch((error) => {
          this.dataW = [];
          throw error;
        })
        .finally(() => {
          this.isFetchingW = false;
        });
    }, 250),
    submitAddress() {
      this.isDisabled = true;
      if (
        (this.addressInfo === undefined &&
          Object.keys(this.province).length > 0 &&
          Object.keys(this.district).length > 0 &&
          Object.keys(this.ward).length > 0 &&
          this.address !== "") ||
        (this.addressInfo !== undefined &&
          ((this.province.title !== this.addressInfo.province &&
            Object.keys(this.province).length > 0) ||
            (this.district.title !== this.addressInfo.district &&
              Object.keys(this.district).length > 0) ||
            (this.ward.title !== this.addressInfo.ward &&
              Object.keys(this.ward).length > 0) ||
            this.address !== this.addressInfo.address))
      ) {
        this.$emit("submit", {
          id: this.addressInfo !== undefined ? this.addressInfo.id : "",
          province: this.province.title,
          district: this.district.title,
          ward: this.ward.title,
          address: this.address,
          default_address:
            this.addressInfo !== undefined
              ? this.addressInfo.default_address
              : 0,
        });
      } else {
        if (this.addressInfo === undefined) {
          this.$buefy.toast.open({
            type: "is-warning",
            message: "Đừng để trống trường nào nhé! ⚠️",
            position: "is-top",
          });
        } else {
          this.$buefy.toast.open({
            type: "is-warning",
            message: "Hừm, chúng tôi chưa thấy thay đổi gì cả. 🤔",
            position: "is-top",
          });
        }
      }
      this.isDisabled = false;
    },
    deleteAddress() {
      this.$emit("deleteFromCard", {
        id: this.addressInfo.id,
        province: this.province.title,
        district: this.district.title,
        ward: this.ward.title,
        address: this.address,
      });
    },
  },
};
</script>

<style scoped>
.card-container {
  max-width: 640px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px #00000016;
  padding: 40px 24px;
}
</style>