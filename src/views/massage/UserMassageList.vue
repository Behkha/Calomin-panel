<template>
<v-container fill-height fluid grid-list-xl style="direction: rtl">
  <v-layout justify-center wrap>
    <v-flex md12>
      <material-card color="green" title="لیست پیام های مشتریان" :text="`نمایش موارد ${fromItems} تا ${toItems} از ${totalItems} مورد`" hide-default-footer>
        <v-data-table class="elevation-1" :headers="headers" :items="items" :server-items-length="totalItems" :options.sync="pagination" :items-per-page-options="[15]" sort-by="id" hide-default-footer loading-text="در حال لود شدن ... لطفا ضبر کنید">
          <template v-slot:item.operation="{ item }">
            <router-link :to="{name: 'ShowUserMassage', params: {id: item.id}}">
              <v-btn class="my-3 " color="success">
                مشاهده
              </v-btn>
            </router-link>
          </template>
        </v-data-table>
      </material-card>
    </v-flex>
    <v-flex xs12>
      <div class="text-xs-center pt-2">
        <v-pagination v-model="pagination.page" v-if="items.length" :length="pagesNumber"></v-pagination>
      </div>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import VPagination from 'vuetify/es5/components/VPagination'
export default {
  data: () => ({
    items: [],
    fromItems: 0,
    toItems: 0,
    totalItems: 0,
    pagination: {
      page: 1
    },
    headers: [{
        align: 'center',
        text: 'ID',
        value: 'id'
      },
      {
        align: 'center',
        sortable: false,
        text: 'تاریخ ارسال',
        value: 'created_at'
      }, {
        align: 'center',
        sortable: false,
        text: 'نام',
        value: 'name'
      },
      {
        align: 'center',
        sortable: false,
        text: 'تلفن',
        value: 'phone'
      },
      {
        align: 'center',
        sortable: false,
        text: 'ایمیل',
        value: 'email'
      },
      {
        align: 'center',
        sortable: false,
        text: 'موضوع',
        value: 'subject'
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
        this.fetchUserMassages()
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
    fetchUserMassages() {
      this.$store.dispatch('fetchListRequest', {
          type: 'contact_us',
          page: this.pagination.page
        })
        .then(response => {
          this.items = response.data.data
          this.totalItems = response.data.total
          if (response.data.from) {
            this.fromItems = response.data.from
          }
          if (response.data.to) {
            this.toItems = response.data.to
          }
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
    VPagination
  },
  mounted() {
    this.fetchUserMassages()
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
