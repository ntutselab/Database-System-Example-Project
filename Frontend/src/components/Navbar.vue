<template>
  <v-main class="mb-10">
    <v-app-bar app flat dark>
      <v-spacer></v-spacer>
      <router-link
        v-if="isLogin && IsSeller"
        to="/myproduct"
        class="my-router-link pa-1"
      >
        <v-btn>myproduct</v-btn>
      </router-link>
      <router-link
        v-if="isLogin && IsSeller"
        to="/newproduct"
        class="my-router-link pa-1"
      >
        <v-btn>Add New Product</v-btn>
      </router-link>
      <router-link
        v-if="isLogin"
        :event="!IsSeller ? 'click' : ''"
        to="/deposit"
        class="my-router-link pa-1"
      >
        <v-btn :disabled="isLogin && IsSeller">
          <v-icon>mdi-cash-plus</v-icon>
          <a v-if="isLogin" class="text-h6 moneyInfo">
            【{{ moneyInfo.name }} {{ moneyInfo.value }}】
          </a>
        </v-btn>
      </router-link>
      <router-link
        v-if="isLogin && !IsSeller"
        class="my-router-link"
        to="/orderrecord"
      >
        <v-btn block>
          My Order
        </v-btn>
      </router-link>
      <router-link
        v-if="isLogin && IsSeller"
        class="my-router-link"
        to="/processorder"
      >
        <v-btn block>
          processorder
        </v-btn>
      </router-link>
      <router-link
        v-if="isLogin && !IsSeller"
        class="my-router-link pa-1"
        to="/shoppingcart"
      >
        <v-badge
          v-if="true"
          :content="CartItemLength"
          :value="CartItemLength"
          overlap
        >
          <v-btn block>
            <v-icon>mdi-cart-arrow-down</v-icon>
            Shopping Cart
          </v-btn>
        </v-badge>
      </router-link>
      <div class="pa-1 d-flex flex-row">
        <router-link v-if="!isLogin" class="my-router-link" to="/login">
          <v-btn block>
            login
          </v-btn>
        </router-link>
        <v-btn v-if="isLogin" block @click="logout">
          Logout
        </v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer permanent floating app dark>
      <a href="/home">
        <img id="logo" src="@/img/logo.png" alt="logo" />
      </a>
      <v-list>
        <router-link class="my-router-link" to="/home?category=all">
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>All</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link
          v-for="(category, i) in categories"
          :key="i"
          class="my-router-link"
          :to="getUrl(category)"
        >
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>{{ titleCase(category) }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <router-view />
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";
import { GetProductsCategories } from "@/api/home";
export default {
  data() {
    return {
      categories: []
    };
  },
  computed: {
    ...mapGetters({ isLogin: "login/IsLogin" }),
    ...mapGetters({ CartItemLength: "shoppingCart/CartItemLength" }),
    ...mapGetters({ IsSeller: "login/IsSeller" }),
    ...mapGetters({ moneyInfo: "wallet/GetWallet" }),
    getUrl: () =>
      function(category) {
        return `/home?category=${category}`;
      }
  },
  async created() {
    await this.$store.dispatch("wallet/init");
    this.categories = (await GetProductsCategories()).categories;
  },
  methods: {
    logout() {
      this.$store.dispatch("login/logout");
      this.$router.push("/home").catch(err => {
        err;
      });
    },
    titleCase(str) {
      const newStr = str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
      return newStr;
    }
  }
};
</script>

<style>
#logo {
  width: 250px;
}

.my-router-link {
  text-decoration: none !important;
}

.moneyInfo {
  text-decoration: none !important;
  color: white !important;
}
</style>
