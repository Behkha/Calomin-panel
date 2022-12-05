<template>
<v-container fill-height fluid grid-list-xl>
  <v-layout justify-center wrap>
    <v-flex xs12 md12>
      <material-card color="green" title="نمایش کد های تخفیف">
        <v-form>
          <v-container py-0>
            <v-layout wrap>
              <v-flex my-5 xs12 text-xs-right>
                <h2>لیست کدها :</h2>
              </v-flex>
              <v-flex xs12 md6 text-xs-right v-for="code in items">
                <h3>{{code.code}}</h3>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </material-card>
    </v-flex>
  </v-layout>
  <v-snackbar :color="color" :bottom="bottom" :top="top" :left="left" :right="right" v-model="snackbar_success" dark>
    <v-icon size="16" @click="snackbar = false" color="white">
      mdi-close-circle
    </v-icon>
    <div>عملیات درخواستی شما موفقیت آمیز بود.</div>
  </v-snackbar>
  <v-snackbar :color="color" :bottom="bottom" :top="top" :left="left" :right="right" v-model="snackbar_error" dark>
    <v-icon size="16" @click="snackbar = false" color="white">
      mdi-close-circle
    </v-icon>
    <div>عملیات درخواستی شما موفقیت آمیز نبود.</div>
  </v-snackbar>
</v-container>
</template>

<script >
export default {
  data() {
    return {
      loader: null,
      loading: false,
      color: null,
      top: false,
      bottom: true,
      left: false,
      right: false,
      snackbar_success: false,
      snackbar_error: false,
      items: []
    }
  },
  methods: {
    snack_error() {
      this.color = 'error'
      this.snackbar_error = true
    },
    snack_success() {
      this.color = 'success'
      this.snackbar_success = true
    },
    getDiscountValues() {
      this.$store.dispatch('adminGetValuesRequest', {
          type: 'discount_codes',
          id: this.$route.params.id
        })
        .then(response => {
          this.items = response.data.data
        }).catch(error => {
          this.loader = null
          this.$store.dispatch('handleError', error)
          this.snack_error()
        })
    }
  },
  mounted() {
    this.getDiscountValues()
  },
}
</script>
<style lang="scss" scoped>
.v-input--selection-controls__input {
    margin-right: 0 !important;
    margin-left: 8px !important;
}
</style>
