<template>
  <div class="cell-container columns is-vcentered">
    <div class="column">
      <p class="cell-content">{{ title }}</p>
    </div>
    <div class="column is-narrow">
      <p class="cell-content" v-if="user === undefined">{{ content }}</p>
      <div class="columns is-vcentered" style="margin: 0;" v-else>
        <div class="column is-narrow">
          <div
            class="image is-24x24"
            style="border-radius: 50%;"
            :style="{backgroundImage: 'url(' + user.img_url + ')'}"
          ></div>
        </div>
        <div class="column is-narrow">
          <p class="cell-content">{{ user.name }}</p>
        </div>
      </div>
    </div>
    <!-- edit btn -->
    <div class="column is-narrow" id="edit-btn">
      <b-button type="is-success">🖊️</b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "content", "user"],
};
</script>

<style scoped>
.cell-container {
  padding: 8px;
  background-color: white;
  border: 1px solid #efefef;
  box-shadow: 0 2px 4px #00000016;
  border-radius: 10px;
  margin: 12px 0;
}

.cell-content {
  font-weight: 500;
}

#edit-btn {
  display: none;
}

.cell-container:hover {
  box-shadow: 0 4px 8px #00000019;
  padding: 2px 8px;
}

.cell-container:hover #edit-btn {
  display: block;
}
</style>