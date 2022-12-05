// import store from '@/store'
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
//import views
import Login from '../views/LoginPage'
//category
import CreateCategory from '../views/category/CreateCategory'
import CategoryList from '../views/category/CategoryList'
import EditCategory from '../views/category/EditCategory'
//booth
import CreateBooth from '../views/booth/CreateBooth'
import BoothList from '../views/booth/BoothList'
import EditBooth from '../views/booth/EditBooth'
//product
import CreateProduct from '../views/product/CreateProduct'
import EditProduct from '../views/product/EditProduct'

import ProductList from '../views/product/ProductList'
import BoothProductList from '../views/product/BoothProductList'
// import EditProduct from '../views/product/EditProduct'
//seller
import CreateSeller from '../views/seller/CreateSeller'
import SellerList from '../views/seller/SellerList'
import EditSeller from '../views/seller/EditSeller'
//user
import UserList from '../views/user/UserList'
//order
import OrderList from '../views/order/OrderList'
import VerifyOrder from '../views/order/VerifyOrder'
//attribute
import CreateAttribute from '../views/attribute/CreateAttribute'
import AttributeList from '../views/attribute/AttributeList'
import EditAttribute from '../views/attribute/EditAttribute'
//discount
import CreateDiscountCode from '../views/discount/CreateDiscountCode'
import DiscountCodeList from '../views/discount/DiscountCodeList'
import EditDiscountCode from '../views/discount/EditDiscountCode'
import ShowDiscountCode from '../views/discount/ShowDiscountCode'
//brand
import CreateBrand from '../views/brand/CreateBrand'
import BrandList from '../views/brand/BrandList'
import EditBrand from '../views/brand/EditBrand'
//slider
import CreateSliderImage from '../views/slider/CreateSliderImage'
import SliderImageList from '../views/slider/SliderImageList'
//subject
import CreateSubject from '../views/subject/CreateSubject'
import SubjectList from '../views/subject/SubjectList'
import EditSubject from '../views/subject/EditSubject'
//usermassages
import ShowUserMassage from '../views/massage/ShowUserMassage'
import UserMassageList from '../views/massage/UserMassageList'
//excel
import CreateExcel from '../views/excel/CreateExcel'
import ExcelList from '../views/excel/ExcelList'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      component:Login,
      path: '',
      view: 'Login',
      name:'Login',
    },
    {
      component:CreateCategory,
      path: '/category/create',
      name:'CreateCategory',
      view: 'CreateCategory',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    {
      component:CategoryList,
      path: '/category/list',
      name:'CategoryList',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    {
      component:EditCategory,
      path: '/category/show/:id',
      name:'EditCategory',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    //Booth
    {
      component:CreateBooth,
      path: '/booth/create',
      name:'CreateBooth',
      view: 'CreateBooth',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    {
      component:BoothList,
      path: '/booth/list',
      name:'BoothList',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    {
      component:EditBooth,
      path: '/booth/show/:id',
      name:'EditBooth',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    //product
    {
      component:CreateProduct,
      path: '/product/create',
      name:'CreateProduct',
      view: 'CreateProduct',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    {
      component:ProductList,
      path: '/product/list',
      name:'ProductList',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    {
      component:EditProduct,
      path: '/product/:id/edit',
      name:'EditProduct',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    {
      component:BoothProductList,
      path: '/booth/:id/products',
      name:'BoothProductList',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    // {
    //   component:EditBooth,
    //   path: '/product/show/:id',
    //   name:'EditProduct',
    //   beforeEnter: (to, from, next) => {
    //       // store.commit("onLoad")
    //       next()
    //     }
    // },
    {
      component:CreateSeller,
      path: '/seller/create',
      name:'CreateSeller',
      view: 'CreateSeller',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    {
      component:SellerList,
      path: '/seller/list',
      name:'SellerList',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    {
      component:EditSeller,
      path: '/seller/show/:id',
      name:'EditSeller',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    //user
    {
      component:UserList,
      path: '/user/list',
      name:'UserList',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    //order
    {
      component:OrderList,
      path: '/order/list',
      name:'OrderList',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    {
      component:VerifyOrder,
      path: '/order/:code/verify',
      name:'VerifyOrder',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    //attribute
    {
      component:CreateAttribute,
      path: '/attribute/create',
      name:'CreateAttribute',
      view: 'CreateAttribute',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    {
      component:AttributeList,
      path: '/attribute/list',
      name:'AttributeList',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    {
      component:EditAttribute,
      path: '/attribute/show/:id',
      name:'EditAttribute',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    //discountCode
    {
      component:CreateDiscountCode,
      path: '/discount/create',
      name:'CreateDiscountCode',
      view: 'CreateDiscountCode',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    {
      component:DiscountCodeList,
      path: '/discount/list',
      name:'DiscountCodeList',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    {
      component:EditDiscountCode,
      path: '/discount/edit/:id',
      name:'EditDiscountCode',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    {
      component:ShowDiscountCode,
      path: '/discount/show/:id',
      name:'ShowDiscountCode',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    //brand
    {
      component:CreateBrand,
      path: '/brand/create',
      name:'CreateBrand',
      view: 'CreateBrand',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    {
      component:BrandList,
      path: '/brand/list',
      name:'BrandList',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    {
      component:EditBrand,
      path: '/brand/show/:id',
      name:'EditBrand',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    //slider
    {
      component:CreateSliderImage,
      path: '/slider/create',
      name:'CreateSliderImage',
      view: 'CreateSliderImage',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    {
      component:SliderImageList,
      path: '/slider/list',
      name:'SliderImageList',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    //subject
    {
      component:CreateSubject,
      path: '/subject/create',
      name:'CreateSubject',
      view: 'CreateSubject',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    {
      component:SubjectList,
      path: '/subject/list',
      name:'SubjectList',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    {
      component:EditSubject,
      path: '/subject/show/:id',
      name:'EditSubject',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    //usermassages
    {
      component:UserMassageList,
      path: '/massage/list',
      name:'UserMassageList',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    {
      component:ShowUserMassage,
      path: '/massage/show/:id',
      name:'ShowUserMassage',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    //excel
    {
      component:CreateExcel,
      path: '/excel/create',
      name:'CreateExcel',
      view: 'CreateExcel',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
    {
      component:ExcelList,
      path: '/excel/list',
      name:'ExcelList',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
    },
  ]
})
