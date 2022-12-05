<template>
<v-container fill-height fluid grid-list-xl style="direction: rtl">
  <v-layout justify-center wrap>
    <v-flex md12>
      <material-card color="green" title="لیست ویژگی ها" hide-default-footer>
        <v-data-table class="elevation-1" :headers="headers" :items="items" :items-per-page="10000" sort-by="id" hide-default-footer loading-text="در حال لود شدن ... لطفا ضبر کنید">
          <template v-slot:item.operation="{ item }">
            <router-link :to="{name: 'EditAttribute', params: {id: item.id, name : item.name}}">
              <v-btn class="my-3 " color="success">
                ویرایش
              </v-btn>
            </router-link>
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
        text: 'عنوان',
        value: 'name'
      },
      {
        align: 'center',
        sortable: false,
        text: 'عملیات',
        value: 'operation'
      },
    ],
  }),
  watch: {
    pagination: {
      handler() {
        this.fetchAttributes()
      },
      deep: true
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
    fetchAttributes() {
      this.$store.dispatch('getAttributeListRequest', {
          page: this.pagination.page
        })
        .then(response => {
          this.items = response.data.data
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
    this.fetchAttributes()
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
</style>
