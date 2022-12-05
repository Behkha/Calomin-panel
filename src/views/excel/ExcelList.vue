<template>
<v-container fill-height fluid grid-list-xl style="direction: rtl">
  <v-layout justify-center wrap>
    <v-flex md12>
      <material-card color="green" title="دانلود فایل " hide-default-footer>
        <!-- <v-data-table class="elevation-1" :headers="headers" :items="items" :items-per-page="10000" sort-by="id" hide-default-footer loading-text="در حال لود شدن ... لطفا ضبر کنید">
          <template v-slot:item.operation="{ item }">
            <v-btn color="blue-grey" class="ma-2 white--text" fab @click="downloadExcel(item)">
              <v-icon dark>mdi-cloud-upload</v-icon>
            </v-btn>
          </template>
        </v-data-table> -->
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
      sortable: false,
      text: 'دانلود فایل',
      value: 'operation'
    }, ],
  }),
  watch: {
    pagination: {
      handler() {
        this.fetchExcels()
      },
      deep: true
    }
  },
  methods: {
    downloadExcel(item) {
      let blob = new Blob([item], {
        type: '.xlxs'
      })
      let link = document.createElement('a')
      console.log(link);
      link.href = window.URL.createObjectURL(blob)
      link.download = 'test.pdf'
      link.click()
    },
    snack_error() {
      this.color = 'error'
      this.snackbar_error = true
    },
    snack_success() {
      this.color = 'success'
      this.snackbar_success = true
    },
    fetchAttributes() {
      this.$store.dispatch('getExcelListRequest', {
          page: this.pagination.page
        })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'file.xlsx');
          document.body.appendChild(link);
          link.click();
          console.log(response.data);
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
