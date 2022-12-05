<template>
<v-container fill-height fluid grid-list-xl>
  <v-layout justify-center wrap>
    <v-flex xs12 md12>
      <material-card color="green" title="ایجاد غرفه" text="فیلد عنوان غرفه و فروشنده و دسته بندی ضروری هستند">
        <v-form>
          <v-container py-0>
            <v-layout wrap>
              <v-flex xs12 text-xs-right>
                <v-text-field label="عنوان غرفه" v-model="booth.title" />
              </v-flex>
              <v-flex xs12 md6 text-xs-right>
                <label class="body-1">فروشنده *</label>
                <multiselect :multiple="false" v-model='booth.seller' :options="sellers" placeholder="جستجو و انتخاب کنید" label="name" track-by="id"><span slot="noResult">نتیجه ای یافت نشد!</span></multiselect>
              </v-flex>
              <v-flex xs12 md6 text-xs-right>
                <label class="body-1">دسته بندی *</label>
                <multiselect :multiple="false" v-model='booth.category' :options="categories" placeholder="جستجو و انتخاب کنید" label="name" track-by="id"><span slot="noResult">نتیجه ای یافت نشد!</span></multiselect>
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
              <v-flex xs12 md12 text-xs-right>
                <v-textarea label="توضیحات" v-model="booth.description" />
              </v-flex>
              <v-flex xs12 text-xs-left>
                <v-btn :loading="loading" class="mx-0 font-weight-light" color="success" :disabled="!isBoothValid" @click="CreateBooth()">
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
      search: '',
      categories: [],
      sellers: [],
      booth: {
        title: '',
        seller: null,
        category: null,
        description: ''
      }
    }
  },
  components: {
    PictureInput,
    lodash: lodash,
    Multiselect
  },
  methods: {
    asyncFind: lodash.debounce(function(searchQuery) {
      this.search = searchQuery
      this.getSellers()
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
    CreateBooth() {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      let formData = new FormData();
      formData.append('title', this.booth.title)
      formData.append('description', this.booth.description)
      formData.append('seller_id', this.booth.seller.id)
      formData.append('category_id', this.booth.category.id)
      formData.append('logo', this.$refs.pictureInput.file)
      this.$store.dispatch('createBoothRequest', formData)
        .then(response => {
          this[l] = false
          this.loader = null
          this.snack_success()
          setTimeout(() => {
            this.$router.push({
              path: 'booth/list'
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
      this.$store.dispatch('getAllCategoriesRequest')
        .then(response => {
          this.categories = response.data.data
        })
        .catch(error => {
          this.$store.dispatch('handleError', error)
          this.snack_error()
        })
    },
    getSellers() {
      this.$store.dispatch('fetchListRequest', {
          type: 'sellers'
        })
        .then(response => {
          this.sellers = response.data.data
        })
        .catch(error => {
          this.$store.dispatch('handleError', error)
          this.snack_error()
        })
    }
  },
  computed: {
    isBoothValid() {
      return (Boolean(this.booth.title && this.booth.seller && this.booth.category))
    },
  },
  mounted() {
    this.getSellers()
    this.getAllCategories()
  }

}
</script>

<style lang="scss" scoped>

</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
