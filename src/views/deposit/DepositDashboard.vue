<template>
  <div class="page-container">
    <PageTitle title="💴 Đặt cọc"></PageTitle>
    <br />
    <b-table :data="deposits" paginated pagination-simple :selected.sync="selected" @select="intoRow">
      <template slot-scope="props">
        <b-table-column label="SẢN PHẨM" width="500">{{props.row.title}}</b-table-column>
        <b-table-column label="TRẠNG THÁI" width="150">{{productStatus(props.row.product_status)}}</b-table-column>
        <b-table-column label="CỌC ĐẤU GIÁ" width="150">{{statusDeposit(latestAuctionDeposit(props.row))}}</b-table-column>
        <b-table-column label="CỌC GIAO KÈO" width="150">{{statusDeposit(latestAffairDeposit(props.row))}}</b-table-column>
      </template>
    </b-table>

    <b-modal :active.sync="isDeposit" trap-focus destroy-on-hide can-cancel style="width: auto">
      <DepositModal title="💵 Tiền cọc" :item="selected"></DepositModal>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  components: {
    PageTitle: () => import("@/components/PageTitle"),
    DepositModal: () => import('@/components/Modal/DepositModal')
  },
  data() {
    return {
      selected: {},
      isDeposit: false,
    };
  },
  async mounted() {
    this.populateds();
  },
  computed: {
    ...mapState({
      deposits: (state) => state.deposit.deposits,
      deposit: (state) => state.deposit.deposit,
    }),
  },
  methods: {
    ...mapActions("deposit", ["populateds", "populated", "clear"]),

    productStatus(status) {
      switch (status) {
        case 0:
          return "⚠️ CẦN CHỈNH SỬA";
        case 1:
          return "⏲️ CHỜ KIỂM DUYỆT";
        case 2:
          return "✅ ĐÃ KIỂM DUYỆT";
        case 3:
          return "💸 ĐANG ĐẤU GIÁ";
        case 4:
          return "🤝 ĐANG GIAO KÈO";
        case 5:
          return "💰 ĐÃ BÁN";
        case 9:
          return "🗑️ ĐÃ XÓA";
      }
    },

    latestAuctionDeposit(row) {
      if (row.product_status > 1) {
        let deposit = row.Deposits.filter(
          (item) => item.notes === "Tien coc cho dau gia"
        );

        return deposit[0];
      } else {
        return null;
      }
    },

    statusDeposit(deposit) {
      if (deposit === null || deposit === undefined) {
        return "⛔ CHƯA TẠO CỌC";
      } else if (deposit.user_status === 0) {
        if (deposit.date_created + 1000 * 60 * 60 * 48 - Date.now() > 0) {
          return "⚠️ MUỘN CHUYỂN CỌC";
        } else {
          return "⏲ ĐANG CHỜ CỌC";
        }
      } else if (deposit.admin_status === 0) {
        return "✔️ ĐÃ CHUYỂN CỌC";
      } else if (deposit.admin_status === 1) {
        return "↩️ ĐÃ TRẢ LẠI CỌC";
      } else if (deposit.admin_status === -1) {
        return "👎 BỊ THU HỒI CỌC"
      }
    },

    latestAffairDeposit(row) {
      if (row.product_status > 3) {
        let deposit = row.Deposits.filter(
          (item) => item.notes === "Tien coc cho giao keo"
        );

        return deposit[0];
      } else {
        return null;
      }
    },

    intoRow() {
      this.isDeposit = true
    },

    deleteAuction(rows) {
      this.deletea(rows);
    },

    intoAuction(row) {
      this.populatea(row);
    },
  },
};
</script>

<style scoped>
</style>