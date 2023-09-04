<template>
  <v-col>
    <v-row>
      <h1>Shopping Cart</h1>
    </v-row>
    <v-row>
      <v-card outlined max-width="850">
        <v-list-item v-if="cartItems.length === 0">
          <v-banner class="my-banner">
            Your Cart is empty
          </v-banner>
        </v-list-item>

        <template v-for="(item, index) in cartItems">
          <v-list-item :key="index">
            <v-row class="my-1">
              <v-col cols="1" align-self="center">
                <v-btn
                  fab
                  small
                  depressed
                  color="error"
                  @click="remoItemFromShoopingCart(item)"
                >
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="3">
                <v-img
                  max-width="460px"
                  :src="getImagePath(item.imageUrl)"
                ></v-img>
              </v-col>
              <v-col cols="5" class="text-left" align-self="center">
                <h4>{{ item.title }}</h4>
                <span>{{ currency }} {{ item.price }}</span>
                <div class="input-group d-flex align-start">
                  <v-btn
                    class="my-btn"
                    depressed
                    :disabled="item.quantity === 1"
                    @click="decrease(item)"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <input
                    class="form-control text-center"
                    type="text"
                    readonly
                    min="1"
                    :value="item.quantity"
                  />
                  <v-btn
                    class="my-btn"
                    depressed
                    :disabled="item.inventory === item.quantity"
                    @click="increment(item)"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>
              </v-col>
              <v-col cols="3" align-self="center">
                <div class="mt-3 text-right">
                  <span>{{ currency }} {{ GetItemSubTotal(item) }}</span>
                </div>
              </v-col>
            </v-row>
          </v-list-item>
          <v-divider
            v-if="index < products.length"
            :key="index + Date.now()"
          ></v-divider>
        </template>

        <v-list-item>
          <v-row>
            <v-col class="text-right">
              <strong>Total：</strong><span>NT$ {{ CartTotalPrice }}</span>
            </v-col>
          </v-row>
        </v-list-item>
      </v-card>
    </v-row>
  </v-col>
</template>

<script>
import { imgageHost } from "@/config/config";
import { mapGetters } from "vuex";
export default {
  data() {
    return { currency: "NT$" };
  },
  computed: {
    ...mapGetters({ products: "products/Items" }),
    ...mapGetters({ CartTotalPrice: "shoppingCart/CartTotalPrice" }),
    ...mapGetters({ GetItemSubTotal: "shoppingCart/GetItemSubTotal" }),
    ...mapGetters({ cartItems: "shoppingCart/CartItems" })
  },
  methods: {
    getImagePath(filename = "") {
      return `${imgageHost}/${filename.replace("./img/", "")}`;
    },
    increment(item) {
      this.$store.commit("shoppingCart/incrementItemQuantity", item);
    },
    decrease(item) {
      this.$store.commit("shoppingCart/decrementItemQuantity", item);
    },
    remoItemFromShoopingCart(item) {
      this.$store.commit("shoppingCart/remoItemFromShoopingCart", item);
    }
  }
};
</script>

<style>
.form-control {
  border: 1px solid rgba(0, 0, 0, 0.07) !important;
  height: 36px;
  min-height: 36px;
  width: 60px;
  min-width: 60px;
  box-shadow: none;
  border-radius: 0 !important;
}
.my-btn {
  font-size: 14px !important;
  border: 1px solid #e8e9ea !important;
  background-color: white !important;
  border-radius: 0 !important;
}
.my-banner {
  width: 850px;
  max-width: 850px;
}
</style>
