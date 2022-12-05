<template>
<v-container fill-height fluid grid-list-xl>
  <v-layout justify-center wrap>
    <v-flex xs12 md12>
      <material-card color="green" title="ویرایش ویژگی" text="فیلد عنوان ویژگی ضروری است">
        <v-form>
          <v-container py-0>
            <v-layout wrap>
              <v-flex xs12 md6 text-xs-right>
                <v-text-field label="عنوان ویژگی *" v-model="attribute.name" />
              </v-flex>
              <v-flex xs12 text-xs-left>
                <v-btn :loading="loading" class="mx-0 font-weight-light" color="success" :disabled="!isAttributeValid" @click="EditAttribute()">
                  ویرایش
                </v-btn>
                <!-- <v-btn :loading="loading" slot="activator" @click="showDialog()" class="mr-2 font-weight-light" color="error">
                  حذف
                </v-btn> -->
                <v-dialog v-model="dialog" width="500">
                  <v-card style="direction: rtl">
                    <v-card-title class="">تایید عملیات حذف</v-card-title>
                    <v-card-text>آیا واقعا میخواهید این ویژگی را حذف کنید ؟</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn :loading="loading" color="green darken-1" flat="flat" @click="DeleteAttribute()">
                        بله
                      </v-btn>
                      <v-btn color="green darken-1" flat="flat" @click="cancelDialog()">
                        خیر
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
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
      dialog: false,
      attribute: {
        name: ''
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
    EditAttribute() {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      let data = {
        'name': this.attribute.name,
        'id': this.$route.params.id
      }
      this.$store.dispatch('EditAttributeRequest', data)
        .then(response => {
          this[l] = false
          this.loader = null
          this.snack_success()
          setTimeout(() => {
            this.$router.push({
              name: 'AttributeList'
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
    DeleteAttribute() {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      this.$store.dispatch('deleteAttributeRequest', {
          id: this.$route.params.id,
        })
        .then(response => {
          this[l] = false
          this.loader = null
          this.snack_success()
          setTimeout(() => {
            this.$router.push({
              name: 'AttributeList'
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
    fetchAttributeValues() {
      this.$store.dispatch('fetchAttributeValuesRequest', {
          id: this.$route.params.id,
          field: 'attributes'
        })
        .then(response => {
          this.attribute.name = response.data.data.name
        })
        .catch(error => {
          this.$store.dispatch('handleError', error)
          this.snack_error()
        })
    }
  },
  mounted() {
    this.attribute.name = this.$route.params.name
  },
  computed: {
    isAttributeValid() {
      return (Boolean(this.attribute.name))
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
