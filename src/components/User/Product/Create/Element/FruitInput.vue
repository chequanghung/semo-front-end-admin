<template>
  <b-field label="Loại quả*" label-position="on-border">
    <b-autocomplete
      :data="data"
      placeholder="Ví dụ: 🍎 Táo Tàu"
      maxlength="255"
      :has-counter="true"
      field="title"
      :loading="isFetching"
      @typing="getFruit"
      @select="option => {selected = option; $emit('select', option)}"
    >
      <template slot-scope="props">
        <div>
          <div class="columns is-mobile">
            <div class="column is-narrow">
              <div
                class="image is-32x32"
                :style="{backgroundImage: 'url(' + props.option.icon_url + ')'}"
                style="background-size: cover; background-position: center;"
              ></div>
            </div>
            <div class="column">{{ props.option.title }}</div>
          </div>
        </div>
      </template>
    </b-autocomplete>
  </b-field>
</template>

<script>
import debounce from "debounce";
import axios from "axios";

export default {
  props: ["fruit"],
  data() {
    return {
      selected: this.fruit !== undefined ? this.fruit : null,
      name: "",
      data: [],
      isFetching: false,
    };
  },
  methods: {
    getFruit: debounce(function (name) {
      // String update
      if (this.name !== name) {
        this.name = name;
        this.data = [];
      }
      // String cleared
      if (!name.length) {
        this.data = [];
        console.log(this.selected)
        return;
      }
      this.isFetching = true;
      axios
        .get(`/fruit/search/${name}`)
        .then(({ data }) => {
          data.forEach((item) => this.data.push(item));
        })
        .catch((error) => {
          throw error;
        })
        .finally(() => {
          this.isFetching = false;
        });
    }, 500),
  },
};
</script>

<style>
</style>