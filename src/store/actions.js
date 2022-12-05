// https://vuex.vuejs.org/en/actions.html
import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)
export default {
  loginRequest({getters}, credentials) {
        return getters.axios.post('admins/signin', credentials)
    },
    logoutRequest({getters}) {
        return getters.axios.delete('admins')
    },
    //fetch request for all that has`nt query
    fetchListRequest({getters}, data) {
        return getters.axios.get(`${data.type}?page=${data.page}`)
    },
    //admin common values request
    adminGetValuesRequest({getters}, data) {
        return getters.axios.get(`admins/${data.type}/${data.id}`)
    },
    //categories
    getAllCategoriesRequest({getters}, data) {
        return getters.axios.get(`categories?name=${data.search}`)
    },
    createCategoryRequest({getters}, data) {
        return getters.axios.post('categories', data)
    },
    fetchCategoryListRequest({getters}) {
        return getters.axios.get('categories')
    },
    editCategoryRequest({getters}, data) {
        return getters.axios.post(`categories/${data.get('id')}`, data)
    },
    fetchCategoryValuesRequest({getters}, data) {
        return getters.axios.get(`categories/${data}`)
    },
    //booth
    createBoothRequest({getters}, data) {
        return getters.axios.post('booths', data)
    },
    fetchBoothProductListRequest({getters}, data) {
        return getters.axios.get(`booths/${data.id}/products?page=${data.page}`)
    },
    //seller
    createSellerRequest({getters}, data) {
        return getters.axios.post('sellers', data)
    },
    fetchSellerValuesRequest({getters}, data) {
        return getters.axios.get(`sellers/${data.id}`)
    },
    //city
    getCitiesRequest({getters}, data) {
        return getters.axios.get(`states/${data.state_id}`)
    },
    //user
    getUsersListRequest({getters}, data) {
        return getters.axios.get(`admins/users?page=${data.page}`)
    },
    //order
    getOrderListRequest({getters}, data) {
        return getters.axios.get(`admins/orders?page=${data.page}`)
    },
    verifyAdminOrderRequest({getters}, data) {
        return getters.axios.patch(`admins/orders/${data.id}?reject=${data.reject}`)
    },
    //product
    CreateProductRequest({getters}, data) {
        return getters.axios.post('products', data)
    },
    fetchProductValuesRequest({getters}, data) {
        return getters.axios.get(`products/${data.id}`)
    },
    editProductRequest({getters}, data) {
      console.log(data);
        return getters.axios.patch(`products/${data.id}`, data)
    },
    updateProductPicturesRequest({getters}, data) {
        return getters.axios.post(`products/${data.get('id')}`, data)
    },
    deleteProductPictureRequest({getters}, data) {
        return getters.axios.delete(`products/${data.id}/${data.picture}`)
    },
    //attribute
    getAttributeListRequest({getters}, data) {
        return getters.axios.get(`admins/attributes`)
    },
    createAttributeRequest({getters}, data) {
        return getters.axios.post('admins/attributes', data)
    },
    fetchAttributeValuesRequest({getters}, data) {
        return getters.axios.get(`admins/attributes/${data.id}`)
    },
    EditAttributeRequest({getters}, data) {
        return getters.axios.patch(`admins/attributes/${data.id}`, data)
    },
    deleteAttributeRequest({getters}, data) {
        return getters.axios.delete(`attributes/${data.id}`)
    },
    getCategoryAttributesListRequest({getters}, data) {
        return getters.axios.get(`categories/${data.category_id}/attributes`)
    },
    //discountCode
    getDiscountCodeListRequest({getters}) {
        return getters.axios.get('admins/discount_codes')
    },
    createDiscountCodeRequest({getters}, data) {
        return getters.axios.post('admins/discount_codes', data)
    },
    fetchDiscountCodeValuesRequest({getters}, data) {
        return getters.axios.get(`admins/discount_codes/${data.id}`)
    },
    editAtDiscountCodequest({getters}, data) {
        return getters.axios.patch(`admins/discount_codes/${data.id}`, data)
    },
    //brands
    getBrandListRequest({getters}, data) {
        return getters.axios.get(`admins/brands`)
    },
    createBrandRequest({getters}, data) {
        return getters.axios.post('admins/brands', data)
    },
    fetchBrandValuesRequest({getters}, data) {
        return getters.axios.get(`admins/brands/${data.id}`)
    },
    EditBrandRequest({getters}, data) {
        return getters.axios.post(`admins/brands/${data.id}`, data)
    },
    //slider
    createSlierImageRequest({getters}, data) {
        return getters.axios.post('slides', data)
    },
    deleteSliderImageRequest({getters}, data) {
        return getters.axios.delete(`slides/${data.id}`)
    },
    //subject
    createSubjectRequest({getters}, data) {
        return getters.axios.post('contact_us/subjects', data)
    },
    editSubjectRequest({getters}, data) {
        return getters.axios.patch(`contact_us/subjects/${data.id}`, data)
    },
    deleteSubjectRequest({getters}, data) {
        return getters.axios.delete(`contact_us/subjects/${data.id}`)
    },
    //UserMassage
    fetchUserMassageValuesRequest({getters}, data) {
        return getters.axios.get(`contact_us/${data.id}`)
    },
    //excel
    getExcelListRequest({getters}) {
        return getters.axios.get(`products/excel`,{responseType: 'blob'})
    },
    sendExcelRequest({getters}, data) {
        return getters.axios.post('products/mass_create', data)
    },
  }
