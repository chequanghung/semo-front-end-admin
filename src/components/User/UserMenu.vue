<template>
  <div class="menu-container">
    <b-menu-list>
        <b-menu-item v-for="(menu, i) in menus" :key="i" :label="menu.name" :active="index === menu.index" @click="$emit('click', menu.index)">
        </b-menu-item>
    </b-menu-list>
  </div>
</template>

<script>
export default {
    props: ['index', 'menus'],
};
</script>

<style>
</style>