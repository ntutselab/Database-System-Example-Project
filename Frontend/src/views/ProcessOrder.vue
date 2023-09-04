<template>
  <v-container fluid fill-height class="d-flex align-start">
    <v-row class="mb-5" justify="center">
      <v-col cols="8">
        <h1 class="text-left my-5">Order List</h1>
        <v-expansion-panels v-model="clickedItem" accordion>
          <v-expansion-panel v-for="(item, i) in orders" :key="i">
            <!-- :readonly="IsReadonly(item.Finished)"-->
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
                    Order Id：{{ item.OrderID }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="mb-2">
                    Order Date：{{ item.Date }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="mb-2">
                    Cost：{{ item.Price }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-col>
                <v-row
                  v-for="(orderItem, j) in orderItems"
                  :key="j + item.OrderID"
                >
                  <v-col cols="3" class="mr-2 d-flex align-center">
                    <v-img :src="getImagePath(orderItem)"></v-img>
                  </v-col>
                  <v-col class="text-left">
                    <h4>{{ orderItem.Name }}</h4>
                    <span>{{ orderItem.Description }}</span>
                    <br />
                    <span>{{ currency }} {{ orderItem.Price }} x </span>
                    <span>{{ orderItem.Amount }}</span>
                  </v-col>
                </v-row>
                <v-btn
                  v-if="IsReadonly(item.Finished)"
                  color="amber"
                  class="mt-3"
                  @click="handleConfirm(item)"
                  >Confirm
                </v-btn>
              </v-col>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  GetOrders,
  GetOrderInformation,
  UpdateOrder,
  GetSalesAmount,
  UpdateSalesAmount
} from "@/api/processorder";
import { UpdateProfit } from "@/api/walletOrProfit";
import { GetOrderItems } from "@/api/order";
import { mapGetters } from "vuex";
import { imgageHost } from "@/config/config";

export default {
  data: () => {
    return {
      orders: [],
      detailOrders: [],
      clickedItem: null,
      orderItems: [],
      currency: "NT$",
      TEST: []
    };
  },
  computed: {
    ...mapGetters({ UserId: "login/Id" })
  },
  watch: {
    clickedItem: async function() {
      if (this.clickedItem !== undefined) {
        this.orderItems = (
          await GetOrderItems(this.orders[this.clickedItem].OrderID)
        ).data;
        // this.handleDataMap(this.orders[this.clickedItem].OrderID);
      } else {
        this.orderItems.length = 0;
        this.orderItems = [];
      }
    }
  },
  async created() {
    await this.initData();
  },
  methods: {
    IsReadonly: finished => {
      return !(finished === "1");
    },
    getImagePath(product) {
      if (!product) return "https://www.pixiv.net/artworks/86483702";
      return `${imgageHost}/${product.ImageURL.replace("./img/", "")}`;
    },
    async initData() {
      this.orders = [];
      this.orders.length = 0;
      this.orders = (await GetOrders(this.UserId)).data;
      let data = [];
      for (const i in this.orders) {
        data.push(
          GetOrderInformation(this.orders[i].OrderID)
            .then(response => response.data)
            .catch(err => err)
        );
      }
      const vm = this;
      await Promise.all(data).then(res => {
        for (const i in vm.orders) {
          vm.orders[i].Date = res[i][0].Date;
          vm.orders[i].Price = res[i][0].Order_Price;
        }
      });
      this.orders.reverse();
    },
    async handleConfirm(item) {
      await UpdateOrder(item.OrderID);
      await UpdateProfit(item.Price);
      this.$store.dispatch("wallet/init");
      const salesamount = (await GetSalesAmount(item.OrderID)).data;
      for (const i in salesamount) {
        await UpdateSalesAmount(
          salesamount[i].ProductID,
          salesamount[i].Amount
        );
      }
      await this.initData();
    },
    async handleDataMap(orderId) {
      const salesamount = (await GetSalesAmount(orderId)).data;
      const temp = this.orderItems.map(function(item) {
        const product = salesamount.find(element => element.ID === item.ID);
        item.Amount = product.Amount;
        return item;
      });
      this.orderItems = temp;
    }
  }
};
</script>

<style></style>
