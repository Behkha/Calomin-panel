<template>
<v-container fill-height fluid grid-list-xl>
  <v-layout justify-center wrap>
    <v-flex xs12 md12>
      <material-card color="green" title="ویرایش دسته بندی" text="فیلد عنوان دسته بندی ضروری است.">
        <v-form>
          <v-container py-0>
            <v-layout wrap>
              <v-flex xs12 md6 text-xs-right>
                <v-text-field label="عنوان*" v-model="category.name" />
              </v-flex>
              <v-flex xs12 md3 ml-auto text-xs-right style="direction: rtl">
                <h4>* فعلی </h4>
                <img :src="current_logo" width="100%" alt="">
                <h4>* آپلود لوگو</h4>
                <picture-input size="10" :zIndex="1" ref="pictureInput" :removable="true" @remove="removeAction" button-class="v-btn font-weight-light info" remove-button-class="v-btn font-weight-light danger" :crop="false" :custom-strings="{
                                    upload: '<h1>آپلود موفق!</h1>',
                                    remove: 'حذف تصویر',
                                    change: 'تغییر تصویر',
                                    drag: 'برای انتخاب و آپلود <br>لوگو جدید کلیک کنید'
                                }" @change="onChange">
                </picture-input>
              </v-flex>

              <v-flex xs12 text-xs-left>
                <v-btn :loading="loading" class="mx-0 font-weight-light" color="success" :disabled="!isCategoryValid" @click="EditCategory()">
                  ویرایش
                </v-btn>
                <v-btn :loading="loading" slot="activator" @click="showDialog()" class="mr-2 font-weight-light" color="error">
                  حذف
                </v-btn>
                <v-btn :loading="loading" class="ml-5 font-weight-light" color="primary" :disabled="!isCategoryMediaValid" @click="EditCategoryMedia()">
                  ویرایش تصویر
                </v-btn>
                <v-dialog v-model="dialog" width="500">
                  <v-card style="direction: rtl">
                    <v-card-title class="">تایید عملیات حذف</v-card-title>
                    <v-card-text>آیا از حذف این دلیوری اطمینان دارید؟</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn :loading="loading" color="green darken-1" flat="flat" @click="DeleteCategory()">
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
import PictureInput from 'vue-picture-input';
export default {
  data() {
    return {
      loader: null,
      logo: null,
      loading: false,
      color: null,
      top: false,
      bottom: true,
      left: false,
      right: false,
      snackbar_success: false,
      snackbar_error: false,
      dialog: false,
      current_logo: '',
      category: {
        name: ''
      }
    }
  },
  components: {
    PictureInput

  },
  methods: {
    onChange(image) {
      console.log('New picture selected!')
      if (image) {
        console.log('Picture loaded.')
        this.image = image
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!')
      }
    },
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
    EditCategory() {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      let formData = new FormData();
      formData.append('id', this.$route.params.id)
      formData.append('name', this.category.name)
      formData.append('logo', this.$refs.pictureInput.file)
      this.$store.dispatch('editCategoryRequest', formData)
        .then(response => {
          this[l] = false
          this.loader = null
          this.snack_success()
          setTimeout(() => {
            this.$router.push({
              name: 'CategoryList'
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
    DeleteCategory() {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      this.$store.dispatch('deleteCategoryRequest', {
          id: this.$route.params.id
        })
        .then(response => {
          this[l] = false
          this.loader = null
          this.snack_success()
          setTimeout(() => {
            this.$router.push({
              name: 'DeliveriesList'
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
    fetchCategoryValues() {
      this.$store.dispatch('fetchCategoryValuesRequest', this.$route.params.id)
        .then(response => {
          this.category.name = response.data.data.name
          this.current_logo = response.data.data.logo

        })
        .catch(error => {
          this.$store.dispatch('handleError', error)
          this.snack_error()
        })
    }
  },
  mounted() {
    this.fetchCategoryValues()
  },
  computed: {
    isCategoryValid() {
      return (Boolean(this.category.name))
    },
    isCategoryMediaValid() {
      return (Boolean(true))
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
