<template>
  <v-col class="mb-5">
    <v-row>
      <h1>Coupons</h1>
    </v-row>
    <v-row>
      <v-card outlined max-width="850" width="850">
        <v-list-item-group v-model="selected_coupon" color="indigo">
          <template v-for="(coupon, index) in Coupons">
            <v-list-item :key="index" :disabled="!CartItemLength > 0">
              <v-row class="my-1">
                <v-col cols="3" class="d-flex align-center">
                  <img src="@/img/coupon.jpg" alt="coupon" width="180" />
                </v-col>
                <v-col>
                  <span><strong>Coupon</strong></span>
                  <br />
                  <span>Expiry Date：{{ coupon.Expiry_date }}</span>
                  <br />
                  <span>{{ currency }}：{{ coupon.Amount }}</span>
                </v-col>
              </v-row>
            </v-list-item>
            <v-divider
              v-if="index < 4"
              :key="index + Date.now()"
            ></v-divider> </template
        ></v-list-item-group>
      </v-card>
    </v-row>
  </v-col>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      radios: null,
      currency: "NT$",
      snackbar: false,
      selected_coupon: null
    };
  },
  computed: {
    ...mapGetters({ CartItemLength: "shoppingCart/CartItemLength" }),
    ...mapGetters({ Coupons: "shoppingCart/Coupons" }),
    ...mapGetters({ SelectedCoupon: "shoppingCart/SelectedCoupon" }),
    ...mapGetters({ IsCouponCanUse: "shoppingCart/IsCouponCanUse" })
  },
  watch: {
    CartItemLength: function() {
      if (!this.CartItemLength) this.selected_coupon = null;
    },
    selected_coupon: function() {
      if (this.IsCouponCanUse(this.Coupons[this.selected_coupon])) {
        this.$store.commit(
          "shoppingCart/SetSelectedCoupon",
          this.Coupons[this.selected_coupon]
        );
      } else {
        this.snackbar = true;
        this.selectedCoupon = null;
        this.$store.commit("shoppingCart/SetSelectedCoupon", null);
      }
    }
  },
  methods: {}
};
</script>

<style></style>
