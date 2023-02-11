import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
const apiUrl = 'https://vue3-course-api.hexschool.io/v2/'; 
const apiPath = 'deliciousfood';
const productModal = {
    props:['id','addToCart'],
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
    },
    watch:{
        id(){
            axios.get(`${apiUrl}/api/${apiPath}/product/${this.id}`)
            .then((res)=>{
                this.tempProduct = res.data.product;
                this.modal.show()
            })
            .catch((err)=>{(alert(err))})
        }
    }
}
const app = createApp({
    //資料
    data(){
        return{
            products:[],
            productId : '',
        }
    },
    //方法
    methods:{
        getProduct(){
            axios.get(`${apiUrl}/api/${apiPath}/products/all`)
            .then((res)=>{
                this.products = res.data.products;
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
            axios.post(`${apiUrl}/api/${apiPath}/cart`, { data })
            .then((res)=>{
                alert(res.data.message);
                console.log(res.data);
            this.$refs.modalProductHide.hide();
            })
        }
    },
    components:{productModal,},
    //生命週期
    mounted(){
        this.getProduct()
    },
})
app.mount('#app')