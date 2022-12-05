<template>
<v-container fill-height fluid grid-list-xl>
  <v-layout justify-center wrap>
    <v-flex xs12 md12>
      <material-card color="green" title="ویرایش کد تخفیف" text="تمامی فیلد ها ضروری اند">
        <v-form>
          <v-container py-0>
            <v-layout wrap>
              <v-flex xs12 md6 text-xs-right>
                <v-text-field label="درصد تخفیف *" type="number" v-model="discountCode.percent" />
              </v-flex>
              <v-flex xs12 md6 text-xs-right>
                <v-text-field label="* حداکثر مقدار" type="number" v-model="discountCode.max" />
              </v-flex>
              <v-flex xs12 md8 text-xs-right>
                <date-picker format="jYYYY-jMM-jDD" v-model="expires_date"></date-picker>
                <v-spacer></v-spacer>
              </v-flex>
              <v-flex xs12 text-xs-left>
                <v-btn :loading="loading" class="mx-0 font-weight-light" color="success" :disabled="!isDiscountCodeValid" @click="EditDiscountCode()">
                  ویرایش
                </v-btn>
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

<script>
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
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
      expire_date_switch: false,
      expires_date: null,
      discountCode: {
        percent: '',
        expires_date: '',
        max: ''
      }
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
    cancelDialog() {
      this.dialog = false
    },
    showDialog() {
      this.dialog = true
    },
    EditDiscountCode() {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      let data = {
        id: this.$route.params.id,
        'percent': this.discountCode.percent,
        'max': this.discountCode.max,
      }
      this.discountCode.expires_date = this.expires_date.date
      data.expiration_date = this.discountCode.expires_date
      data.expiration_date = this.expires_date
      this.$store.dispatch('editAtDiscountCodequest', data)
        .then(response => {
          this[l] = false
          this.loader = null
          this.snack_success()
          setTimeout(() => {
            this.$router.push({
              name: 'DiscountCodeList'
            })
          }, 500)
        })
        .catch(error => {
          this[l] = false
          this.loader = null
          this.$store.dispatch('handleError', error)
          this.snack_error()
        })
    },
    // DeleteDiscountCode() {
    //   this.loader = 'loading'
    //   const l = this.loader
    //   this[l] = !this[l]
    //   this.$store.dispatch('deleteDiscountCodeRequest', this.$route.params.id)
    //     .then(response => {
    //       this[l] = false
    //       this.loader = null
    //       this.snack_success()
    //       setTimeout(() => {
    //         this.$router.push({
    //           name: 'DiscountCodesList'
    //         })
    //       }, 500)
    //     })
    //     .catch(error => {
    //       this[l] = false
    //       this.loader = null
    //       this.$store.dispatch('handleError', error)
    //       this.snack_error()
    //     })
    // },
    fetchDiscountCodeValues() {
      this.$store.dispatch('fetchDiscountCodeValuesRequest', {
          id: this.$route.params.id
        })
        .then(response => {
          this.discountCode.max = response.data.data[0].max
          this.discountCode.count = response.data.data.length
          this.discountCode.percent = response.data.data[0].percent
          this.expires_date = response.data.data[0].expiration_date
        })
        .catch(error => {
          this.$store.dispatch('handleError', error)
          this.snack_error()
        })
    }
  },
  components: {
    datePicker: VuePersianDatetimePicker
  },
  mounted() {
    this.fetchDiscountCodeValues()
  },
  computed: {
    isDiscountCodeValid() {
      return (Boolean(this.discountCode.max && this.discountCode.percent && this.discountCode.count))
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
