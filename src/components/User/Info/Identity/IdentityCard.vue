<template>
  <div
    class="card-container"
    :class="{'failed': identity.identity_status === 0, 'pending': identity.identity_status === 1, 'success': identity.identity_status === 2}"
  >
    <p class="card-title">CHỨNG MINH NHÂN DÂN</p>
    <br />
    <p class="card-number">{{ identity.number }}</p>
    <br />
    <p class="card-content">{{ identity.name }}</p>
    <p class="card-content">{{ identity.date_dist }} | {{ identity.province_dist }}</p>
    <br />
    <p class="card-status">{{ status }}</p>
  </div>
</template>

<script>
export default {
  props: ["img_url", "identity"],
  computed: {
    status: function () {
      switch (this.identity.identity_status) {
        case 0:
          return "❌ XÁC THỰC KHÔNG THÀNH CÔNG";
  
        case 1:
          return "⏳ ĐANG CHỜ XÁC THỰC";
  
        default:
          return "✔️ ĐÃ XÁC THỰC";
      }
    }
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>
.card-container {
  padding: 40px;
  box-shadow: 0 2px 8px #00000016;
  border-radius: 10px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}

.card-title {
  font-size: 15px;
  color: #01d28e;
  letter-spacing: 6px;
  text-align: center;
}

.card-content {
  text-transform: uppercase;
  padding: 4px;
}

.card-number {
  font-size: 28px;
  letter-spacing: 10px;
  font-weight: 900;
}

.card-content, .card-status {
  letter-spacing: 3px;
}

.failed {
  background-color: #ffe8e6;
}

.pending {
  background-color: #fcfcfc;
}

.success {
  background-color: white;
}

.failed .card-status {
  color: #fd5e53;
}

.pending .card-status {
  color: #707070;
}

.success .card-status {
  color: #01d28e;
}
</style>