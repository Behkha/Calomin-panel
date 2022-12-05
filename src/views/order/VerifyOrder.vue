<template>
<v-container fill-height fluid grid-list-xl>
  <v-layout justify-center wrap>
    <v-flex xs12 md12>
      <material-card color="green" title="تایید سفارش" text="">
        <v-form>
          <v-container py-0>
            <v-layout v-if="item" wrap>
              <template v-if="item.user">
                <v-flex xs12 text-xs-right>
                  <h2>مشخصات کاربر :</h2>
                </v-flex>
                <v-flex xs6 md3 text-xs-right>
                  <label>نام :</label>
                  <v-list-item-title>{{item.user.name}}</v-list-item-title>
                </v-flex>
                <v-flex xs6 md3 text-xs-right>
                  <label>تلفن:</label>
                  <v-list-item-title>{{item.user.phone}}</v-list-item-title>
                </v-flex>
                <v-flex v-if="item.home_phone" xs6 md3 text-xs-right>
                  <label>تلفن منزل:</label>
                  <v-list-item-title>{{item.user.home_phone}}</v-list-item-title>
                </v-flex>
                <v-flex v-if="item.user.state" xs6 md3 text-xs-right>
                  <label>استان:</label>
                  <v-list-item-title>{{item.user.state.name}}</v-list-item-title>
                </v-flex>
                <v-flex v-if="item.user.city" xs6 md3 text-xs-right>
                  <label>شهر:</label>
                  <v-list-item-title>{{item.user.city.name}}</v-list-item-title>
                </v-flex>
              </template>
              <template>
                <v-flex xs12 text-xs-right>
                  <h2>اطلاعات پرداخت :</h2>
                </v-flex>
                <v-flex xs6 md3 text-xs-right>
                  <label>تاریخ ایجاد سفارش:</label>
                  <v-list-item-title>{{item.created_at}}</v-list-item-title>
                </v-flex>
                <v-flex xs6 md3 text-xs-right>
                  <label>قیمت کل :</label>
                  <v-list-item-title>{{item.total_price}}</v-list-item-title>
                </v-flex>
                <v-flex xs6 md3 text-xs-right>
                  <label>قیمت قبل از تخفیف :</label>
                  <v-list-item-title>{{item.total_price_wo_discount}}</v-list-item-title>
                </v-flex>
                <v-flex v-if="item.home_phone" xs6 md3 text-xs-right>
                  <label>نحوه پرداخت :</label>
                  <v-list-item-title>{{item.payment_type}}</v-list-item-title>
                </v-flex>
              </template>
              <template>
                <v-flex xs12 text-xs-right>
                  <h2>اطلاعات ارسال :</h2>
                </v-flex>
                <v-flex xs6 md3 text-xs-right>
                  <label>نحوه ارسال :</label>
                  <v-list-item-title>{{item.delivery_method.name}}</v-list-item-title>
                </v-flex>
                <v-flex xs6 md3 text-xs-right>
                  <label>هزینه ارسال :</label>
                  <v-list-item-title>{{item.delivery_method.price}}</v-list-item-title>
                </v-flex>
                <v-flex v-if="item.delivery_method.description" xs6 md3 text-xs-right>
                  <label>توضیحات :</label>
                  <v-list-item-title>{{item.delivery_method.description}}</v-list-item-title>
                </v-flex>
                <v-flex v-if="item.home_phone" xs6 md3 text-xs-right>
                  <label>نحوه پرداخت :</label>
                  <v-list-item-title>{{item.payment_type}}</v-list-item-title>
                </v-flex>
                <v-flex xs6 md3 text-xs-right>
                  <label>تلفن همراه گیرنده :</label>
                  <v-list-item-title>{{item.address.receiver_phone}}</v-list-item-title>
                </v-flex>
                <v-flex xs12 text-xs-right>
                  <label>آدرس :</label>
                  <v-list-item-title>{{item.address.state.name}}، {{item.address.city.name}}، {{item.address.address}} </v-list-item-title>
                </v-flex>
              </template>
              <template>
                <v-flex xs12 text-xs-right>
                  <h2>محصولات :</h2>
                </v-flex>
                <template xs12 v-for="product in item.products">
                  <v-flex xs12 text-xs-right>
                    <h3 for="">جزئیات محصول :</h3>
                  </v-flex xs12>
                  <v-flex xs3 text-xs-right>
                    <h4>عنوان محصول :</h4>
                    <v-list-item-title>{{product.title}}</v-list-item-title>
                  </v-flex>
                  <v-flex v-if="product.cart_quantity" xs3 text-xs-right>
                    <h4>تعداد :</h4>
                    <v-list-item-title>{{product.cart_quantity}}</v-list-item-title>
                  </v-flex>
                  <v-flex xs3 text-xs-right>
                    <h4>تعداد سفارش داده شده مشتری:</h4>
                    <v-list-item-title>{{product.order_qty}}</v-list-item-title>
                  </v-flex>
                  <v-flex xs3 text-xs-right>
                    <h4>موجودی:</h4>
                    <v-list-item-title>{{product.quantity}}</v-list-item-title>
                  </v-flex>
                  <v-flex xs3 text-xs-right>
                    <h4>قیمت :</h4>
                    <v-list-item-title>{{product.price}}</v-list-item-title>
                  </v-flex>
                  <v-flex xs3 text-xs-right>
                    <h4>قیمت سفارش:</h4>
                    <v-list-item-title>{{product.order_price}}</v-list-item-title>
                  </v-flex>
                  <v-flex xs12 class="line"></v-flex>
                </template>
              </template>
              <v-flex xs12 text-xs-left>
                <v-btn v-if="item.status_code !=4" :loading="loading" class="mx-2 font-weight-light" color="success" @click="VerifyOrder(1)">
                  مرحله بعد
                </v-btn>
                <v-btn v-if="item.status_code == 2" :loading="loading" class="mx-2 font-weight-light" color="error" @click="VerifyOrder(2)">
                  رد
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
      item: []
    }
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
    VerifyOrder(k) {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      let data = {
        'reject': 0,
        id: this.$route.params.id
      }
      if (k == 2)
        data.reject = 1
      this.$store.dispatch('verifyAdminOrderRequest', data)
        .then(response => {
          this[l] = false
          this.loader = null
          this.snack_success()
          setTimeout(() => {
            this.$router.push({
              name: 'OrderList'
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
    getOrderValues() {
      this.$store.dispatch('adminGetValuesRequest', {
          type: 'orders',
          id: this.$route.params.id
        })
        .then(response => {
          this.item = response.data.data
          console.log(this.item);
        }).catch(error => {
          this.loader = null
          this.$store.dispatch('handleError', error)
          this.snack_error()
        })
    }
  },
  mounted() {
    this.getOrderValues()
  },
  computed: {
    isPaymentValid() {
      return (Boolean(this.payment.file && this.payment.description))
    }
  },
}
</script>

<style lang="scss" scoped>
.line {
    padding: 0 !important;
    height: 5px !important;
    margin: 2em;
    border-radius: 100%;
    display: block;
    background-color: #4caf50;
}
</style>
