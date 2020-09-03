<template>
  <div class="bar-container">
    <div class="columns title-bar is-vcentered is-mobile">
      <div class="column is-narrow" style="padding: 20px;">
        <b-button @click="showMenu" icon-left="menu" type="is-green"></b-button>
      </div>
      <div class="column">
        <p class="dashboard-title">{{ title }}</p>
      </div>
      <div class="column is-narrow">
        <slot name="page-function"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["title"],
  computed: {
    ...mapState({
      menu: (state) => state.ui.menu,
    }),
  },
  methods: {
    ...mapActions("ui", ["open_menu", "close_menu"]),

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
}

.title-bar {
  position: sticky;
  top: 0px;
  z-index: 1;
  background-color: #fcfcfc89;
  backdrop-filter: saturate(180%) blur(20px);
  transition: 0.12s;
}
</style>