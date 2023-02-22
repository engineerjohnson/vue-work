import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';//要有這行 不然傳到github會出錯const apiUrl = 'https://vue3-course-api.hexschool.io/v2'; 
const apiUrl = 'https://vue3-course-api.hexschool.io/v2'; 
const apiPath = 'deliciousfood';
Object.keys(VeeValidateRules).forEach(rule => {
    if (rule !== 'default') {
        VeeValidate.defineRule(rule, VeeValidateRules[rule]);
    }
    });

  // 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');

// Activate the locale
VeeValidate.configure({
    generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});
const productModal = {
    props:['id','addToCart','openModal'],
    data(){
        return{
            modal:{},
            tempProduct:{},
            qty:1,
        }
    },
    template:'#userProductModal',
    methods:{
        hide(){//關閉model
            this.modal.hide();
        }
    },
    mounted(){
        this.modal = new bootstrap.Modal(this.$refs.modal)
            //當modal關閉時要做甚麼事
            this.$refs.modal.addEventListener('hidden.bs.modal', event => {
                this.openModal('')
            })
    },
    watch:{
        id(){
            if( this.id){
                axios.get(`${apiUrl}/api/${apiPath}/product/${this.id}`)
                .then((res)=>{
                    this.tempProduct = res.data.product;
                    this.modal.show()
                })
                .catch((err)=>{(alert(err))})
                this.qty = 1;
            }
        }
    }
}
const app = Vue.createApp({//要這樣寫 他會抓html的<script src="https://unpkg.com/vue@next"></script> 這網址會抓最新的vue cdn
    //資料
    data(){
        return{
            products:[],
            productId : '',
            cart:[],
            loadingId:'',
            user:{
            },
            isLoading: true,
        }
    },
    //方法
    methods:{
        getProduct(){
            axios.get(`${apiUrl}/api/${apiPath}/products/all`)
            .then((res)=>{
                this.products = res.data.products;
                this.isLoading = false;
            })
            .catch((err)=>{(alert(err))})
        },
        openModal(id){
            this.productId = id;
        },
        addToCart(product_id,qty = 1){//傳入商品ID及數量 數量預設為1
            const data = {
                product_id,
                qty,
            };            
            this.loadingId = product_id;
            axios.post(`${apiUrl}/api/${apiPath}/cart`, { data })
            .then((res)=>{
                alert(res.data.message);
            this.$refs.modalProductHide.hide();
            this.getCart();
            this.loadingId = '';
            })
            .catch((err)=>{(alert(err))})
        },
        getCart(){
            axios.get(`${apiUrl}/api/${apiPath}/cart`)
            .then((res)=>{
                this.cart = res.data.data;
            })
            .catch((err)=>{(alert(err))})
        },
        upDataCart(cartItem){//帶入購物車的id及商品Id資料
            const data = {
                product_id : cartItem.product.id,
                qty : cartItem.qty,
            };
            this.loadingId = cartItem.id;
            this.isLoading = true;
            axios.put(`${apiUrl}/api/${apiPath}/cart/${cartItem.id}`, { data })
            .then((res)=>{
            this.getCart();
            this.isLoading = false;
            this.loadingId = '';
            })
            .catch((err)=>{(alert(err))})
        },
        deleteCart(cartItem){//帶入購物車的id
            this.loadingId = cartItem.id;
            this.isLoading = true;
            axios.delete(`${apiUrl}/api/${apiPath}/cart/${cartItem.id}`)
            .then((res)=>{
                alert('已刪除此商品')
            this.getCart();
            this.isLoading = false;
            this.loadingId = '';
            })
            .catch((err)=>{(alert(err))})
        },
        deleteCartAll(){
            if(this.cart.length>0){
            this.loadingId = this.cart
            this.isLoading = true;
            axios.delete(`${apiUrl}/api/${apiPath}/carts`)
            .then((res)=>{
                alert('已清除購物車')
            this.getCart();
            this.loadingId = '';
            this.isLoading = false;
            })
            .catch((err)=>{(alert(err))})
            }else{
                alert('目前購物車沒有品項')
            }
        },
        onSubmit(){
        },
        isPhone(value) {
            const phoneNumber = /^(09)[0-9]{8}$/
            return phoneNumber.test(value) ? true : '需為正確的手機號碼格式'
        },
    },
    components:{productModal,loading: VueLoading.Component},
    //生命週期
    mounted(){
        this.getProduct();
        this.getCart();
    },
})
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);

app.mount('#app')