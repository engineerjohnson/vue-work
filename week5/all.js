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
const app = Vue.createApp({
    //資料
    data(){
        return{
            products:[],
            productId : '',
            cart:{},
            loadingId:'',
            user:{

            },
        }
    },
    //方法
    methods:{
        getProduct(){
            axios.get(`${apiUrl}/api/${apiPath}/products/all`)
            .then((res)=>{
                this.products = res.data.products;
            })
        },
        openModal(id){
            this.productId = id;
        },
        addToCart(product_id,qty = 1){//傳入商品ID及數量 數量預設為1
            const data = {
                product_id,
                qty,
            };
            axios.post(`${apiUrl}/api/${apiPath}/cart`, { data })
            .then((res)=>{
                alert(res.data.message);
            this.$refs.modalProductHide.hide();
            this.getCart();
            })
        },
        getCart(){
            axios.get(`${apiUrl}/api/${apiPath}/cart`)
            .then((res)=>{
                this.cart = res.data.data;
            })
        },
        upDataCart(cartItem){//帶入購物車的id及商品Id資料
            const data = {
                product_id : cartItem.product.id,
                qty : cartItem.qty,
            };
            this.loadingId = cartItem.id;
            axios.put(`${apiUrl}/api/${apiPath}/cart/${cartItem.id}`, { data })
            .then((res)=>{
                console.log('更新購物車:',res.data)
            this.getCart();
            this.loadingId = '';
            })
        },
        deleteCart(cartItem){//帶入購物車的id
            this.loadingId = cartItem.id;
            console.log(cartItem.id)
            axios.delete(`${apiUrl}/api/${apiPath}/cart/${cartItem.id}`)
            .then((res)=>{
                alert('已刪除此商品')
            this.getCart();
            this.loadingId = '';
            })
        },
        deleteCartAll(){
            axios.delete(`${apiUrl}/api/${apiPath}/carts`)
            .then((res)=>{
                alert('已清除購物車')
            this.getCart();
            this.loadingId = '';
            })
        },
        onSubmit(){
            console.log('onSubmit')
        },
        isPhone(value) {
            const phoneNumber = /^(09)[0-9]{8}$/
            return phoneNumber.test(value) ? true : '需要正確的電話號碼'
        },
    },
    components:{productModal,},
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