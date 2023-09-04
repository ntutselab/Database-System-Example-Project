<template>
  <v-container fluid fill-height class="d-flex align-start">
    <v-row v-if="isLoading">
      <v-col cols="8" offset="2">
        <Loading :is-loading="isLoading" />
      </v-col>
    </v-row>
    <template v-if="!isLoading">
      <v-row v-for="i in rowSize" :key="i">
        <v-col v-for="n in getColoumNumber(i)" :key="n">
          <v-card class="mx-auto my-12" max-width="380" max-height="500">
            <a
              ><v-img
                contain
                max-height="250"
                :src="getImagePath(products[(i - 1) * 3 + n - 1])"
            /></a>
            <v-card-title>{{
              products[(i - 1) * 3 + n - 1].Name
            }}</v-card-title>
            <v-card-subtitle class="text-start">
              NT$ {{ products[(i - 1) * 3 + n - 1].Price }}
            </v-card-subtitle>
            <v-card-text>
              <div class="text-left">
                {{ products[(i - 1) * 3 + n - 1].Description }}
              </div>
            </v-card-text>

            <v-card-actions>
              <span>
                Inventory：{{ products[(i - 1) * 3 + n - 1].Inventory }}
              </span>
              <v-spacer></v-spacer>
              <v-btn
                color="deep-purple lighten-2"
                text
                @click="addToCart(products[(i - 1) * 3 + n - 1])"
              >
                Add to Cart
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { imgageHost } from "@/config/config";
import { mapGetters } from "vuex";
import Loading from "@/components/Loading";

export default {
  name: "Home",
  components: { Loading },
  data() {
    return {
      isLoading: true,
      rowSize: 0,
      category: this.$route.query.category
    };
  },
  computed: {
    ...mapGetters({ products: "products/Items" })
  },
  watch: {
    $route: async function() {
      this.isLoading = true;
      this.category = this.$route.query.category;
      await this.loadData();
      this.isLoading = false;
    }
  },
  async created() {
    await this.loadData();
    this.isLoading = false;
  },
  methods: {
    async loadData() {
      await this.$store.dispatch("products/getAllItems", this.category);
      this.rowSize = Math.ceil(
        this.products.length < 3 ? 1 : this.products.length / 3
      );
    },
    getImagePath(product) {
      if (!product) return "https://www.pixiv.net/artworks/86483702";
      return `${imgageHost}/${product.ImageURL.replace("./img/", "")}`;
    },
    getColoumNumber(index) {
      const length = this.products.length;
      if ((length - index * 3) % 3 >= 0) return 3;
      else if (length - index * 3 < 0) return length - index * 3 + 3;
      else return length - index * 3;
    },
    addToCart(product) {
      this.$store.dispatch("shoppingCart/addProductToCart", product);
    }
  }
};
</script>
