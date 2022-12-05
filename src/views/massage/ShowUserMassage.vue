<template>
<v-container fill-height fluid grid-list-xl>
  <v-layout justify-center wrap>
    <v-flex xs12 md12>
      <material-card color="green" title="مشاهده پیام">
        <v-form>
          <v-container py-0>
            <v-layout wrap>
              <!-- <v-flex xs12 text-xs-left> -->
              <v-flex xs6 md3 text-xs-right>
                <label>نام :</label>
                <v-list-item-title>{{massage.name}}</v-list-item-title>
              </v-flex>
              <v-flex xs6 md3 text-xs-right>
                <label>تاریخ ارسال :</label>
                <v-list-item-title>{{massage.created_at}}</v-list-item-title>
              </v-flex>
              <v-flex xs6 md3 text-xs-right>
                <label>تلفن :</label>
                <v-list-item-title>{{massage.phone}}</v-list-item-title>
              </v-flex>
              <v-flex xs6 md3 text-xs-right>
                <label>ایمیل :</label>
                <v-list-item-title>{{massage.email}}</v-list-item-title>
              </v-flex>
              <v-flex xs6 md3 text-xs-right>
                <label class="font-weight-bold">موضوع :</label>
                <v-list-item-title>{{massage.subject}}</v-list-item-title>
              </v-flex>
              <v-flex xs12 class="text-center">
                <label>متن :</label>
                <v-list-item-title>{{massage.body}}</v-list-item-title>
              </v-flex>
              <!-- <v-btn :loading="loading" slot="activator" @click="showDialog()" class="mr-2 font-weight-light" color="error">
                  حذف
                </v-btn> -->
              <v-dialog v-model="dialog" width="500">
                <v-card style="direction: rtl">
                  <v-card-title class="">تایید عملیات حذف</v-card-title>
                  <v-card-text>آیا واقعا میخواهید این موضوع را حذف کنید ؟</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :loading="loading" color="green darken-1" flat="flat" @click="DeleteMassage()">
                      بله
                    </v-btn>
                    <v-btn color="green darken-1" flat="flat" @click="cancelDialog()">
                      خیر
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- </v-flex> -->
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
export default {
  data() {
    return {
      loader: null,
      loading: false,
      color: null,
      top: false,
      bottom: true,
      left: false,
      right: false,
      snackbar_success: false,
      snackbar_error: false,
      dialog: false,
      massage: {
        name: '',
        email: '',
        subject: '',
        phone: '',
        body: ''
      }
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
    cancelDialog() {
      this.dialog = false
    },
    showDialog() {
      this.dialog = true
    },
    DeleteMassage() {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      this.$store.dispatch('deleteMassageRequest', {
          id: this.$route.params.id,
        })
        .then(response => {
          this[l] = false
          this.loader = null
          this.snack_success()
          setTimeout(() => {
            this.$router.push({
              title: 'UserMassageList'
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
    fetchMassageValues() {
      this.$store.dispatch('fetchUserMassageValuesRequest', {
          id: this.$route.params.id,
        })
        .then(response => {
          this.massage = response.data.data
        })
        .catch(error => {
          this.$store.dispatch('handleError', error)
          this.snack_error()
        })
    }
  },
  mounted() {
    this.fetchMassageValues()
  }
}
</script>

<style lang="scss" scoped>

</style>
