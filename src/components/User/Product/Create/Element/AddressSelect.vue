<template>
  <b-field label="Địa chỉ*" label-position="on-border" required>
    <b-select required :value="index" expanded>
      <option
        v-for="ad in address"
        :key="ad.id"
        :value="ad.id"
      >{{ad.address}}, {{ad.ward}}, {{ad.district}}, {{ad.province}}</option>
    </b-select>
  </b-field>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["address_id"],
  computed: {
    ...mapState ({
      address: state => state.user.address
    })
  },
  data() {
    return {
      index: ''
    }
  },
  async mounted() {
    await this.geta()

    if(this.address_id !== undefined) {
      this.index = this.address_id
    } else {
      this.index = this.address[0].id
    }
  },
  methods: {
    ...mapActions('user', ['geta']),
    chooseAddress (row) {
      this.$emit('address', row)
      alert(row)
    }
  },
  watch: {
    index: function() {
      this.$emit('address', this.index)
    }
  }
};
</script>

<style>
</style>