<template>
<v-container fill-height fluid grid-list-xl>
  <v-layout justify-center wrap>
    <v-flex xs12 md12>
      <material-card color="green" title="ویرایش دسته بندی" text="تمامی فیلد ها ضروری اند">
        <v-form>
          <v-container py-0>
            <v-layout wrap>
              <v-flex xs12 md6 text-xs-right>
                <v-text-field label="عنوان*" v-model="category.name" />
              </v-flex>
              <v-flex xs12 md6 text-xs-right>
                <label class="body-1">دسته بندی *</label>
                <multiselect :multiple="false" v-model='category.selected_category' :internalSearch='false' :options="categories" @search-change="asyncFind" placeholder="جستجو و انتخاب کنید" label="name" track-by="id"><span slot="noResult">نتیجه ای
                    یافت نشد!</span>
                </multiselect>
              </v-flex>
              <v-flex xs12 md6 text-xs-right>
                <label class="body-1">* ویژگی ها</label>
                <multiselect :multiple="true" v-model="category.selected_attributes" :options="attributes" placeholder="جستجو و انتخاب کنید" label="name" track-by="id"><span slot="noResult">نتیجه ای یافت نشد!</span></multiselect>
              </v-flex>
              <v-flex xs12 md3 ml-auto text-xs-right style="direction: rtl">
                <h4>* فعلی </h4>
                <img :src="current_logo" width="100%" alt="">
                <h4>* آپلود لوگو</h4>
                <picture-input size="10" :zIndex="1" ref="pictureInput" :removable="true" button-class="v-btn font-weight-light info" remove-button-class="v-btn font-weight-light danger" :crop="false" :custom-strings="{
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
import PictureInput from 'vue-picture-input'
import Multiselect from 'vue-multiselect'
import lodash from 'lodash'
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
      categories: [],
      attributes: [],
      search: '',
      category: {
        selected_category: null,
        name: '',
        selected_attributes: null,
      }
    }
  },
  components: {
    Multiselect,
    PictureInput

  },
  methods: {
    asyncFind: lodash.debounce(function(searchQuery) {
      this.search = searchQuery
      this.getAllCategories()
    }, 600),
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
    AppendAttributes(formData) {
      let i = 0;
      this.category.selected_attributes.forEach(item => {
        formData.append(`attributes[${i}]`, item.id)
        i++;
      })
    },
    EditCategory() {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      let formData = new FormData();
      formData.append('id', this.$route.params.id)
      formData.append('name', this.category.name)
      formData.append('name', this.category.name)
      if (this.category.selected_category) {
        formData.append('parent_id', this.category.selected_category.id)
      }
      if (this.$refs.pictureInput.file) {
        formData.append('logo', this.$refs.pictureInput.file)
      }
      if (this.category.selected_attributes) {
        this.AppendAttributes(formData)
      }
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
          this.category.name = response.data.name
          this.category.selected_category = response.data.parent
          this.current_logo = response.data.logo
          this.category.selected_attributes = response.data.attributes
        })
        .catch(error => {
          this.$store.dispatch('handleError', error)
          this.snack_error()
        })
    },
    getAllCategories() {
      this.$store.dispatch('getAllCategoriesRequest', {
          search: this.search
        })
        .then(response => {
          this.categories = response.data.data
        })
        .catch(error => {
          this.$store.dispatch('handleError', error)
          this.snack_error()
        })
    },
    getAllAttributesList() {
      this.$store.dispatch('getAttributeListRequest')
        .then(response => {
          this.attributes = response.data.data
        })
        .catch(error => {
          this.$store.dispatch('handleError', error)
          this.snack_error()
        })
    },
  },
  mounted() {
    this.getAllAttributesList()
    this.getAllCategories()
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
