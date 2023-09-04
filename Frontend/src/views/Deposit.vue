<template>
  <v-container fluid fill-height class="d-flex align-center">
    <v-row class="d-flex justify-center">
      <v-col cols="3">
        <div class="text-h3 text-center mb-3">Charge</div>

        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="amount"
            type="text"
            :rules="numberRules"
            label="Amount"
            required
            outlined
            solo
            prepend-inner-icon="mdi-currency-usd "
            @submit.prevent="handleSubmit"
          ></v-text-field>
          <v-btn type="submit" :disabled="!valid" rounded @click="handleSubmit"
            >charge</v-btn
          >
        </v-form>
        <v-snackbar
          v-model="isSuccess"
          :timeout="2000"
          color="success"
          top
          right
        >
          Success
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      valid: true,
      amount: "",
      isSuccess: this.IsUpdateSuccess,
      numberRules: [
        v => !!v || "Amount is required",
        v => /^[1-9]+[0-9]*$/.test(v) || "Value is invalid."
      ]
    };
  },
  computed: {
    ...mapGetters({ IsUpdateSuccess: "wallet/IsUpdateSuccess" })
  },
  methods: {
    async handleSubmit() {
      await this.$store.dispatch("wallet/UpdateWallet", this.amount);
      this.$refs.form.reset();
      this.isSuccess = this.IsUpdateSuccess;
    }
  }
};
</script>

<style>
.my-from {
  height: 800px;
}
</style>
