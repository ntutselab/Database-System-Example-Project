<template>
  <v-container fluid fill-height class="mt-5 d-flex align-start">
    <v-col v-if="!isLoading" class="text-left">
      <v-row>
        <v-col offset="2">
          <CartItems />
        </v-col>
      </v-row>
      <v-row>
        <v-col offset="2">
          <Coupon />
          <v-row style="max-width:850px" class="my-2 d-flex justify-end">
            <v-btn
              :disabled="!CartItemLength"
              color="warning"
              depressed
              large
              rounded
              @click="checkout()"
              >Checkout
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
      color="red"
      absolute
      centered
      class="text-center"
    >
      <strong>Total price cannot less than 0!</strong>
    </v-snackbar>
    <v-snackbar
      v-model="errorMessageSnackbar"
      :timeout="2000"
      color="red"
      centered
      class="text-center"
    >
      <strong>{{ ErrorMessage }}</strong>
    </v-snackbar>
  </v-container>
</template>

<script>
import CartItems from "@/components/CartItems";
import Coupon from "@/components/Coupon";
import { mapGetters } from "vuex";

export default {
  components: { CartItems, Coupon },
  data() {
    return { isLoading: true, snackbar: false, errorMessageSnackbar: false };
  },
  computed: {
    ...mapGetters({ CartItemLength: "shoppingCart/CartItemLength" }),
    ...mapGetters({ IsCanCheckout: "shoppingCart/IsCanCheckout" }),
    ...mapGetters({ ErrorMessage: "shoppingCart/ErrorMessage" })
  },
  async created() {
    await this.$store.dispatch("products/getAllItems");
    await this.$store.dispatch("shoppingCart/GetCoupon");
    this.isLoading = false;
  },
  methods: {
    async checkout() {
      if (this.IsCanCheckout)
        await this.$store.dispatch("shoppingCart/Checkout");
      else this.errorMessageSnackbar = true;
    }
  }
};
</script>

<style></style>
