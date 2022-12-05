<template >
<v-layout row wrap justify-center>
  <v-flex xs4 mx-auto>
    <div class="loginBox ">
      <img width="150px" :src="mainLogo" />
      <v-form>
        <v-text-field label="نام کاربری" ref="form" v-model="username" :rules="usernameRules" @keyup.enter="submit"></v-text-field>
        <v-text-field rtl label="رمز عبور" v-model="password" :rules="passwordRules" type="password" @keyup.enter="submit" required></v-text-field>
        <v-btn @click.prevent="submit" :disabled="!valid" color="light-green" class="white--text submit__btn">ورود
        </v-btn>
        <p class="loginBox__error" v-if="error">اطلاعات ورود شما صحیح نمی باشد.</p>
      </v-form>
    </div>
  </v-flex>
</v-layout>
</v-container>
</template>

<script>
export default {
  data() {
    return {
      mainLogo: require('../images/ratin.png'),
      username: null,
      password: null,
      usernameRules: [
        v => !!v || 'نام کاربری الزامی است .'
      ],
      passwordRules: [
        v => !!v || 'رمزورود الزامی است',
        v => (v && v.length >= 4) || 'رمز ورود حداقل ۶ کاراکتر باید باشد'
      ],
      valid: true,
      error: false
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('login', {
            username: this.username,
            password: this.password
          })
          .then(() => {
            if (this.$store.getters.isLoggedIn) {
              this.$router.push({
                name: 'OrderList'
              })
              this.error = false
            } else {
              this.error = true
            }
          })
      }
    }
  },
  computed: {
    isPending() {
      return this.$store.getters.isPending
    }
  }
}
</script>
<style lang="scss" scoped>
.loginBox {
    direction: rtl !important;
    /*text-align: right !important;*/
    text-align: center !important;
    margin: 100px auto;
    width: 400px;
    background: #fafafa;
    padding: 30px;
    border-radius: 5px;
    box-shadow: #ccc 0 2px 5px;
    .submit__btn {
        position: relative;
        top: 10px;
        right: 5px;
    }
    p.loginBox__error {
        position: relative;
        color: red;
        text-align: center;
        top: 30px;
        direction: rtl;
    }
    img {
        display: block;
        margin: 0 auto;
        width: 100%;
    }
}
</style>
