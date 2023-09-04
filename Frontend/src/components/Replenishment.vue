<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        Replenishment
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Replenishment Dialog</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row justify="center">
            <v-col cols="12" sm="8" md="6">
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                @submit.prevent="handleSubmit"
              >
                <v-text-field
                  v-model="inventory"
                  :rules="rules"
                  required
                  label="amount"
                  hint="enter an integer greater than one"
                ></v-text-field>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="handleClick()">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { Replenishment } from "@/api/myproduct";
export default {
  props: {
    product: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      inventory: 1,
      valid: false,
      dialog: false,
      rules: [
        v => !!v || "amount is required",
        v => /^[1-9]+[0-9]*$/.test(v) || "amount must be valid"
      ]
    };
  },
  methods: {
    async handleClick() {
      this.$refs.form.validate();
      if (this.$refs.form && this.$refs.form.validate()) {
        if ((await Replenishment(this.product, this.inventory)).success) {
          this.$emit("init");
          this.$refs.form.resetValidation();
          this.$refs.form.reset();
          this.dialog = false;
        }
      }
    }
  }
};
</script>
