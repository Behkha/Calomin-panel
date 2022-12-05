SellerSeller<template>
<v-container fill-height fluid grid-list-xl>
  <v-layout justify-center wrap>
    <v-flex xs12 md12>
      <material-card color="green" title="ویرایش دسته بندی" text="فیلد عنوان دسته بندی ضروری است.">
        <v-form>
          <v-container py-0>
            <v-layout wrap>
              <v-flex xs12 md6 text-xs-right>
                <v-text-field label="* نام " v-model="seller.name" />
              </v-flex>
              <v-flex xs12 md6 text-xs-right>
                <label class="body-1">* استان</label>
                <multiselect :multiple="false" v-model="seller.selected_state" :options="states" placeholder="جستجو و انتخاب کنید" label="name" track-by="id" @select="getCitiesList"><span slot="noResult">نتیجه ای یافت نشد!</span></multiselect>
              </v-flex>
              <v-flex xs12 text-xs-right v-if="seller.selected_state && cities">
                <label class="body-1">* شهر</label>
                <multiselect :multiple="false" v-model="seller.selected_city" :options="cities" placeholder="جستجو و انتخاب کنید" label="name" track-by="id"><span slot="noResult">نتیجه ای یافت نشد!</span></multiselect>
              </v-flex>
              <v-flex xs12 md12 text-xs-right>
                <v-textarea label="* داستان" v-model="seller.story" />
              </v-flex>
              <v-flex xs12 md3 text-xs-right>
                <uploader left v-model="fileList" title="اپلود عکس  های فروشنده"></uploader>
              </v-flex>
              <v-flex xs12 md3 ml-auto text-xs-right style="direction: rtl">
                <label class="body-1">* عکس پروفایل فر وشنده</label>
                <picture-input size="10" multiple :zIndex="1" ref="pictureInput" :removable="true" @remove="removeAction" button-class="v-btn font-weight-light info" remove-button-class="v-btn font-weight-light danger" :crop="false" :custom-strings="{
                                    upload: '<h1>آپلود موفق!</h1>',
                                    remove: 'حذف تصویر',
                                    change: 'تغییر تصویر',
                                    drag: 'برای انتخاب و آپلود <br>لوگو جدید کلیک کنید'
                                }" @change="onChange">
                </picture-input>
              </v-flex>
              <v-flex xs12 text-xs-left>
                <v-btn :loading="loading" class="mx-0 font-weight-light" color="success" :disabled="!isSellerValid" @click="CreateSeller()">
                  ایجاد فروشنده
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
import PictureInput from 'vue-picture-input'
import Multiselect from 'vue-multiselect'
import Uploader from "vux-uploader-component"
export default {
  data() {
    return {
      loader: null,
      image: null,
      loading: false,
      color: null,
      top: false,
      bottom: true,
      left: false,
      right: false,
      snackbar_success: false,
      snackbar_error: false,
      imageChange: false,
      fileList: [],
      cities: [],
      states: [],
      seller: {
        name: '',
        selected_city: null,
        selected_state: null,
        story: ''
      }
    }
  },
  components: {
    Uploader,
    PictureInput,
    Multiselect
  },
  methods: {
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
    onChange(image) {
      if (image) {
        this.imageChange = true
      } else {
        this.imageChange = false
      }
    },
    AppendImages(formData) {
      let i = 0;
      this.fileList.forEach(item => {
        formData.append(`gallery[${i}]`, item.blob)
        i++;
      })
    },
    EditSeller() {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      let formData = new FormData();
      formData.append('name', this.seller.name)
      formData.append('story', this.seller.story)
      formData.append('state_id', this.seller.selected_state.id)
      formData.append('city_id', this.seller.selected_city.id)
      formData.append('profile_picture', this.$refs.pictureInput.file)
      this.AppendImages(formData)
      this.$store.dispatch('createSellerRequest', formData)
        .then(response => {
          this[l] = false
          this.loader = null
          this.snack_success()
          setTimeout(() => {
            this.$router.push({
              name: 'SellerList'
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
    DeleteSeller() {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      this.$store.dispatch('deleteSellerRequest', {
          id: this.$route.params.id
        })
        .then(response => {
          this[l] = false
          this.loader = null
          this.snack_success()
          setTimeout(() => {
            this.$router.push({
              name: 'SellerList'
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
    fetchSellerValues() {
      this.$store.dispatch('fetchSellerValuesRequest', {
          id: this.$route.params.id
        })
        .then(response => {
          this.seller.name = response.data.data.name
          this.current_logo = response.data.data.logo
          this.seller.selected_city = response.data.data.city
          this.seller.selected_state = response.data.data.state
          this.seller.story = response.data.data.story
          console.log(this.seller.selected_state);
          this.getCitiesList(this.seller.selected_state)
        })
        .catch(error => {
          this.$store.dispatch('handleError', error)
          this.snack_error()
        })
    },
    getAllStatesList() {
      this.$store.dispatch('fetchListRequest', {
          type: 'states'
        })
        .then(response => {
          this.states = response.data.data
        })
        .catch(error => {
          this.$store.dispatch('handleError', error)
          this.snack_error()
        })
    },
    getCitiesList(selected_state) {
      this.$store.dispatch('getCitiesRequest', {
          state_id: selected_state.id
        })
        .then(response => {
          this.cities = response.data.data.cities
        })
        .catch(error => {
          this.$store.dispatch('handleError', error)
          this.snack_error()
        })
    }
  },
  mounted() {
    this.fetchSellerValues()
    this.getAllStatesList()
    //cities fetch in fetchSellerValues function
  },
  computed: {
    isSellerValid() {
      return (Boolean(this.seller.name))
    },
    isCategoryMediaValid() {
      return (Boolean(true))
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
