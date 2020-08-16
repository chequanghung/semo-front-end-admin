<template>
  <div class="page-container">
    <page-title
    title="👋 Chào mừng bạn đã trở lại!">
    </page-title>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    PageTitle: () => import('@/components/PageTitle')
  },
  data(){
    return{
      dark: []
    }
  },
  methods: {
  }
}
</script>
