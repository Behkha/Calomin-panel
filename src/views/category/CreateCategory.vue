<template>
<v-container fill-height fluid grid-list-xl>
  <v-layout justify-center wrap>
    <v-flex xs12 md12>
      <material-card color="green" title="ایجاد دسته بندی" text="تمامی فیلد ها ضروری اند.">
        <v-form>
          <v-container py-0>
            <v-layout wrap>
              <v-flex xs12 md6 text-xs-right>
                <v-text-field label="عنوان دسته بندی" v-model="category.name" />
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
                <v-btn :loading="loading" class="mx-0 font-weight-light" color="success" :disabled="!isCategoryValid" @click="CreateCategory()">
                  ایجاد دسته بندی
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
import PictureInput from 'vue-picture-input';
import Multiselect from 'vue-multiselect'
import lodash from 'lodash'
export default {
  data() {
    return {
      loader: null,
      loading: false,
      top: false,
      color: '',
      bottom: true,
      left: false,
      right: false,
      snackbar_success: false,
      snackbar_error: false,
      imageChange: false,
      image: null,
      search: '',
      categories: [],
      attributes: [],
      category: {
        selected_category: null,
        name: '',
        selected_attributes: null,
      }
    }
  },
  components: {
    PictureInput,
    Multiselect
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
    removeAction() {
      this.imageChange = false
    },
    snack_error() {
      this.color = 'error'
      this.snackbar_error = true
    },
    snack_success() {
      this.color = 'success'
      this.snackbar_success = true
    },
    AppendAttributes(formData) {
      let i = 0;
      this.category.selected_attributes.forEach(item => {
        formData.append(`attributes[${i}]`, item.id)
        i++;
      })
    },
    CreateCategory() {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      let data = {
        name: this.category.name,
      }
      let formData = new FormData();
      formData.append('name', this.category.name)
      if (this.category.selected_category) {
        formData.append('parent_id', this.category.selected_category.id)
      }
      formData.append('logo', this.$refs.pictureInput.file)
      if (this.category.selected_attributes) {
        this.AppendAttributes(formData)
      }
      this.$store.dispatch('createCategoryRequest', formData)
        .then(response => {
          this[l] = false
          this.loader = null
          this.snack_success()
          setTimeout(() => {
            this.$router.push({
              path: '/category/list'
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
  computed: {
    isCategoryValid() {
      return (Boolean(this.category.name && this.image))
    },
  },
  mounted() {
    this.getAllAttributesList()
    this.getAllCategories()
  }
}
</script>

<style lang="scss" scoped>

</style>
