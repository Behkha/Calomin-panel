<template>
<v-container fill-height fluid grid-list-xl style="direction: rtl">
  <v-layout justify-center wrap>
    <v-flex md12>
      <material-card color="green" title="لیست عکس های اسلایدر" hide-default-footer>
        <v-data-table class="elevation-1" :headers="headers" :key="k" :items="items" :items-per-page="10000" sort-by="id" hide-default-footer loading-text="در حال لود شدن ... لطفا ضبر کنید">
          <template v-slot:item.image="{ item }">
            <img class="slider-picture" :src="item.image_url">
          </template>
          <template v-slot:item.operation="{ item }">
            <v-btn :loading="loading" class="my-3 " color="error" @click="deleteSliderImage(item)">
              حذف
            </v-btn>
          </template>
        </v-data-table>
      </material-card>
    </v-flex>
    <v-flex xs12>
      <!-- <div class="text-xs-center pt-2">
        <v-pagination v-model="pagination.page" v-if="items.length" :length="pagesNumber"></v-pagination>
      </div> -->
    </v-flex>
  </v-layout>
</v-container>
</template>
<script>
// import VPagination from 'vuetify/es5/components/VPagination'
export default {
  data: () => ({
    totalItems: 0,
    items: [],
    fromItems: 0,
    loading: false,
    toItems: 0,
    pagination: {
      page: 1
    },
    headers: [{
        align: 'center',
        text: 'ID',
        value: 'id'
      }, {
        align: 'center',
        sortable: false,
        text: 'عکس',
        value: 'image'
      },
      {
        align: 'center',
        sortable: false,
        text: 'عملیات',
        value: 'operation'
      },
    ],
  }),
  methods: {
    snack_error() {
      this.color = 'error'
      this.snackbar_error = true
    },
    snack_success() {
      this.color = 'success'
      this.snackbar_success = true
    },
    fetchSliderImageList() {
      this.$store.dispatch('fetchListRequest', {
          type: 'slides'
        })
        .then(response => {
          this.items = response.data.data
          this.loading = false
        })
        .catch(error => {
          this.$store.dispatch('handleError', error)
          this.snack_error()
        })
    },
    deleteSliderImage(item) {
      this.loading = true
      this.$store.dispatch('deleteSliderImageRequest', {
          id: item.id
        })
        .then(response => {

          this.fetchSliderImageList()
        })
        .catch(error => {
          this.$store.dispatch('handleError', error)
          this.snack_error()
        })
    }
  },
  computed: {
    pagesNumber() {
      return Math.ceil(this.totalItems / 15)
    }
  },
  components: {
    // VPagination
  },
  mounted() {
    this.fetchSliderImageList()
  },
}
</script>

<style lang="css" scoped>
.itemCreate {
  z-index: 2;
    position: absolute;
    top: 20px;
    left: 45px;
}
i {
    margin-left: 10px;
}
.slider-picture{
width: 20em;
height:20em;
border-radius: 100%;
margin-top: 5px;
}
</style>
