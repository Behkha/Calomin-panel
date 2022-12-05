<template>
<v-container fill-height fluid grid-list-xl>
  <v-layout justify-center wrap>
    <v-flex xs12 md12>
      <material-card color="green" title="ایجاد برند" text="فیلد عنوان ضروری است">
        <v-form>
          <v-container py-0>
            <v-layout wrap>
              <v-flex xs12 md6 text-xs-right>
                <v-text-field label="عنوان برند*" v-model="brand.title" />
              </v-flex>
              <v-flex xs12 text-xs-left>
                <v-btn :loading="loading" class="mx-0 font-weight-light" color="success" :disabled="!isBrandValid" @click="CreateBrand()">
                  ایجاد برند
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
      imageChange: false,
      brand: {
        title: ''
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
    CreateBrand() {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      let data = {
        title: this.brand.title
      }
      this.$store.dispatch('createBrandRequest', data)
        .then(response => {
          this[l] = false
          this.loader = null
          this.snack_success()
          setTimeout(() => {
            this.$router.push({
              name: 'BrandList'
            })
          }, 500)
        })
        .catch(error => {
          this[l] = false
          this.loader = null
          this.$store.dispatch('handleError', error)
          this.snack_error()
        })
    }
  },
  computed: {
    isBrandValid() {
      return (Boolean(this.brand.title))
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
