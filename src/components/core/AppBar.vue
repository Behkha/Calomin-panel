<template>
<v-app-bar id="core-app-bar" absolute app color="transparent" flat height="88">
  <v-spacer />
  <v-toolbar-items>
    <v-row align="center" class="mx-0">
      <v-icon @click="userLogout" color="error">mdi-exit-to-app</v-icon>
    </v-row>
  </v-toolbar-items>
</v-app-bar>
</template>

<script>
// Utilities
import {
  mapMutations
} from 'vuex'

export default {
  mounted() {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },

  methods: {
    userLogout() {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push({
            name: 'Login'
          })
        })
        .catch(error => {
          this.$store.dispatch('handleError', error)
        })
    },
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onClick() {
      this.setDrawer(!this.$store.state.app.drawer)
    },
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    }
  }
}
</script>

<style>
/* Fix coming in v2.0.8 */
#core-app-bar {
  width: auto;
}

#core-app-bar a {
  text-decoration: none;
}
</style>
