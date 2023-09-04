<template>
  <v-container fluid fill-height class="d-flex align-start">
    <v-row class="mb-5" justify="center">
      <v-col cols="8">
        <h1 class="text-left my-5">Order List</h1>
        <v-expansion-panels v-model="clickedItem" accordion>
          <v-expansion-panel
            v-for="(item, i) in orders"
            :key="i"
            :readonly="IsReadonly(item.Finished)"
          >
            <v-expansion-panel-header disable-icon-rotate>
              <template v-slot:actions>
                <v-icon v-if="parseInt(item.Finished)" color="teal">
                  mdi-check
                </v-icon>
                <v-icon v-if="!parseInt(item.Finished)" color="error">
                  mdi-timer-sand
                </v-icon>
              </template>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="mb-2">
                    Order Id：{{ item.ID }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="mb-2">
                    Order Date：{{ item.Date }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="mb-2">
                    Cost：{{ item.Price }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    Discount：{{ item.Coupon_Amount ? item.Coupon_Amount : 0 }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-col>
                <v-row v-for="(orderItem, j) in orderItems" :key="j + item.ID">
                  <v-col cols="3" class="mr-2 d-flex align-center">
                    <v-img :src="getImagePath(orderItem)"></v-img>
                  </v-col>
                  <v-col class="text-left">
                    <h4>{{ orderItem.Name }}</h4>
                    <span>{{ orderItem.Description }}</span>
                    <br />
                    <span>{{ currency }} {{ orderItem.Price }}</span>
                    <span> x {{ orderItem.Amount }}</span>
                  </v-col>
                </v-row>
              </v-col>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GetOrdersRecord, GetOrderItems } from "@/api/order";
import { mapGetters } from "vuex";
import { imgageHost } from "@/config/config";

export default {
  data: () => {
    return {
      orders: [],
      clickedItem: null,
      orderItems: [],
      currency: "NT$"
    };
  },
  computed: {
    ...mapGetters({ UserId: "login/Id" })
  },
  watch: {
    clickedItem: async function() {
      if (this.clickedItem !== undefined) {
        this.orderItems = (
          await GetOrderItems(this.orders[this.clickedItem].ID)
        ).data;
      } else {
        this.orderItems.length = 0;
      }
    }
  },
  async created() {
    this.orders = (await GetOrdersRecord(this.UserId)).data;
    this.orders.reverse();
  },
  methods: {
    IsReadonly: finished => {
      return !(finished === "1");
    },
    getImagePath(product) {
      if (!product) return "https://www.pixiv.net/artworks/86483702";
      return `${imgageHost}/${product.ImageURL.replace("./img/", "")}`;
    }
  }
};
</script>

<style></style>
