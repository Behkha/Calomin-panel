<template>
<v-navigation-drawer id="app-drawer" v-model="inputValue" :src="image" app color="grey darken-2" dark floating mobile-break-point="991" persistent width="260" right style="direction:rtl">
  <template v-slot:img="attrs">
    <v-img v-bind="attrs" gradient="to top, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)" />
  </template>
  <v-list-item two-line>
    <v-list-item-title class="title text-center">
      کالومین
    </v-list-item-title>
  </v-list-item>
  <v-divider class="mx-3 mb-3" />

  <!-- ************
    menu whit submenu
  ************ -->
  <template v-for="link in links">
    <v-list-group style="direction: rtl; ">
      <template v-slot:activator>
        <v-list-item-title v-text="link.name"></v-list-item-title>
        <v-list-item-action>
          <v-icon append-icon="mdi-arrow-down" class="mr-auto"></v-icon>
        </v-list-item-action>
      </template>
      <v-list-item v-if="link.children" style="direction: rtl" v-for="(child, i) in link.children" :key="i" :to="{path: child.to }">
        <v-list-item-action>
          <v-icon class="mx-4">{{child.icon}}</v-icon>
        </v-list-item-action>
        <v-list-item-title v-text="child.text"></v-list-item-title>
      </v-list-item>
    </v-list-group>
  </template>
</v-navigation-drawer>
</template>
<style media="screen">
.sub-icon {
  font-size: 15px !important;
}

#app-drawer {
  display: absolute;
  /* float: right; */
}
</style>
<script>
// Utilities
import {
  mapMutations,
  mapState
} from 'vuex'

export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    admins: [
      ['Management', 'people_outline'],
      ['Settings', 'settings'],
    ],
    links: [{
        name: 'دسته بندی ها',
        children: [{
            to: '/category/list',
            icon: 'mdi-clipboard-outline',
            text: 'لیست دسته بندی ها'
          },
          {
            to: '/category/create',
            icon: 'mdi-clipboard-outline',
            text: 'ایجاد دسته بندی'
          }
        ]
      },
      {
        name: 'کد تخفیف',
        children: [{
            to: '/discount/list',
            icon: 'mdi-clipboard-outline',
            text: 'لیست کد تخفیف ها'
          },
          {
            to: '/discount/create',
            icon: 'mdi-clipboard-outline',
            text: 'ایجاد کد تخفیف'
          }
        ]
      }, {
        name: 'ویژگی ها',
        children: [{
            to: '/attribute/list',
            icon: 'mdi-clipboard-outline',
            text: 'لیست ویژگی ها'
          },
          {
            to: '/attribute/create',
            icon: 'mdi-clipboard-outline',
            text: 'ایجاد ویژگی'
          }
        ]
      },
      {
        name: 'اسلایدر',
        children: [{
            to: '/slider/list',
            icon: 'mdi-clipboard-outline',
            text: 'لیست عکس ها'
          },
          {
            to: '/slider/create',
            icon: 'mdi-clipboard-outline',
            text: 'افزودن عکس'
          }
        ]
      },
      {
        name: 'برند ها',
        children: [{
            to: '/brand/list',
            icon: 'mdi-clipboard-outline',
            text: 'لیست برند ها'
          },
          {
            to: '/brand/create',
            icon: 'mdi-clipboard-outline',
            text: 'ایجاد برند'
          }
        ]
      },
      //  {
      //   name: 'غرفه ها',
      //   children: [{
      //       to: '/booth/list',
      //       icon: 'mdi-clipboard-outline',
      //       text: 'لیست غرفه ها'
      //     },
      //     {
      //       to: '/booth/create',
      //       icon: 'mdi-clipboard-outline',
      //       text: 'ایجاد غرفه'
      //     }
      //   ]
      // },
      {
        name: 'محصولات',
        children: [{
            to: '/product/list',
            icon: 'mdi-clipboard-outline',
            text: 'لیست محصولات'
          },
          {
            to: '/product/create',
            icon: 'mdi-clipboard-outline',
            text: 'ایجاد محصول'
          }
        ]
      },
      {
        name: 'اکسل محصولات',
        children: [{
            to: '/excel/list',
            icon: 'mdi-clipboard-outline',
            text: 'دانلود'
          },
          {
            to: '/excel/create',
            icon: 'mdi-clipboard-outline',
            text: 'ارسال فایل'
          }
        ]
      },
      // {
      //   name: 'فروشنده ها',
      //   children: [{
      //       to: '/seller/list',
      //       icon: 'mdi-clipboard-outline',
      //       text: 'لیست فروشنده ها'
      //     },
      //     {
      //       to: '/seller/create',
      //       icon: 'mdi-clipboard-outline',
      //       text: 'ایجاد فروشنده'
      //     }
      //   ]
      // },
      {
        name: 'کاربران',
        children: [{
          to: '/user/list',
          icon: 'mdi-clipboard-outline',
          text: 'لیست کابران'
        }]
      },
      {
        name: 'سفارشات',
        children: [{
          to: '/order/list',
          icon: 'mdi-clipboard-outline',
          text: 'لیست سفارشات'
        }]
      },
      {
        name: 'موضوعات',
        children: [{
            to: '/subject/list',
            icon: 'mdi-clipboard-outline',
            text: 'لیست موضوعات'
          },
          {
            to: '/subject/create',
            icon: 'mdi-clipboard-outline',
            text: 'ایجاد موضوع'
          }
        ]
      },
      {
        name: 'پیام های کاربران',
        children: [{
          to: '/massage/list',
          icon: 'mdi-clipboard-outline',
          text: 'لیست پیام ها'
        }]
      },

    ]
  }),

  computed: {
    ...mapState('app', ['image', 'color']),
    inputValue: {
      get() {
        return this.$store.state.app.drawer
      },
      set(val) {
        this.setDrawer(val)
      }
    }
  },

  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer'])
  }
}
</script>
