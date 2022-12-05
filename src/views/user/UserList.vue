<template>
<v-container fill-height fluid grid-list-xl style="direction: rtl">
  <v-layout justify-center wrap>
    <v-flex md12>
      <material-card color="green" title="لیست کاربران" :text="`نمایش موارد ${fromItems} تا ${toItems} از ${totalItems} مورد`" hide-default-footer>
        <v-data-table class="elevation-1" :headers="headers" :items="items" :server-items-length="totalItems" :options.sync="pagination" :items-per-page-options="[15]" sort-by="id" hide-default-footer loading-text="در حال لود شدن ... لطفا ضبر کنید">
          <template v-slot:item.profile_picture="{ item }">
            <span v-if="item.profile_picture">
              <img class="profile-picture" :src="item.profile_picture">
            </span>
          </template>
          <template v-slot:item.state="{ item }">
            <span v-if="item.state">
              {{item.state.name}}
            </span>
          </template>
          <template v-slot:item.city="{ item }">
            <span v-if="item.city">
              {{item.city.name}}
            </span>
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
        text: 'تصویر',
        value: 'profile_picture'
      }, {
        align: 'center',
        sortable: false,
        text: 'نام',
        value: 'name'
      },
      {
        align: 'center',
        sortable: false,
        text: 'کد ملی',
        value: 'id_code'
      },
      {
        align: 'center',
        sortable: false,
        text: 'جنسیت',
        value: 'sex'
      },
      {
        align: 'center',
        sortable: false,
        text: 'تاریخ تولد',
        value: 'bearth_date'
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
        text: 'تلفن منزل',
        value: 'home_phone'
      },
      {
        align: 'center',
        text: 'ایمیل',
        value: 'email'
      },
      {
        align: 'center',
        sortable: false,
        text: 'استان',
        value: 'state'
      },
      {
        align: 'center',
        sortable: false,
        text: 'شهر',
        value: 'city'
      },
    ],
  }),
  watch: {
    pagination: {
      handler() {
        this.fetchUsers()
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
    fetchUsers() {
      this.$store.dispatch('getUsersListRequest', {
          page: this.pagination.page
        })
        .then(response => {
          this.items = response.data.data
          this.totalItems = response.data.meta.total
          if (response.data.meta.from) {
            this.fromItems = response.data.meta.from
          }
          if (response.data.meta.to) {
            this.toItems = response.data.meta.to
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
    this.fetchUsers()
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
.profile-picture{
  width: 5em;
  height:5em;
  border-radius: 100%;
  margin-top: 5px;
}
</style>
