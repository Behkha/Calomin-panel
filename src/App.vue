<template>
<v-app>
  <core-app-bar v-if="!( this.$route.path === '/')" />
  <core-drawer v-if="!( this.$route.path === '/')" />
  <core-view />
  <!-- <core-footer /> -->
</v-app>
</template>

<script>
export default {
  components: {
    CoreDrawer: () => import('@/components/core/Drawer'),
    // CoreFooter: () => import('@/components/core/Footer'),
    CoreAppBar: () => import('@/components/core/AppBar'),
    CoreView: () => import('@/components/core/View')
  },
  methods: {
    changeRTL() {
      this.$vuetify.rtl = true
    }
  }
}
</script>
<style lang="scss">
* {
    text-decoration: none;
}
.v-input label {
    right: 0 !important;
    left: auto !important;
}
//
.v-input.v-input--selection-controls {
    left: auto !important;
    right: 0 !important;
}
//
.v-input--switch.v-input--is-dirty .v-input--switch__thumb {
    transform: translate(-16px, 0px);
}
//
.v-input--text-field-box:not(.v-input-group--textarea):not(.v-input-group--multi-line) label {
    right: 10px !important;
}
//
.v-input--text-field-box:not(.v-input-group--textarea).v-input-group--multi-line label {
    right: 10px !important;
}
//
.v-input__prepend-icon {
    margin-right: -30px !important;
    justify-content: flex-end !important;
}
.v-input__details {
    direction: rtl !important;
    text-align: right !important;
}
//
.v-toolbar__content {
    justify-content: flex-end !important;
}
//
.v-list__group__header__append-icon {
    padding-left: 0 !important;
    padding-right: 10px !important;
}
//
.v-list__group__header {
    padding-left: 10px !important;

    .list__tile {
        padding-right: 0 !important;
    }

}

.application.theme--light {
    background: #f2f2f2 !important;
}
//
.p-datetime-picker-input-group {
    background: white !important;
    border: none !important;
    height: 56px !important;
    border-radius: 4px 4px 0 0 !important;
    box-shadow: gray 0 2px !important;

    label {
        background-color: gray !important;
        border-radius: 4px 0 0 0 !important;
    }

    input {
        margin-top: 20px !important;
        margin-right: 10px !important;
    }

}
.body-1,
.body-2,
.title,
body,
div,
h1,
h2,
h3,
h4,
h5,
h6,
i,
input,
label,
li,
ol,
p,
table,
textarea,
title {
    font-family: IRANSans !important;

}
v-application .title {
    font-family: IRANSans !important;
}
</style>
<style lang="scss" src="../src/styles/fontface_IRANSans.scss"></style>
