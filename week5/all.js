import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
const apiUrl = 'https://vue3-course-api.hexschool.io/v2/'; 
const apiPath = 'deliciousfood';
const app = createApp({
    //資料
    data(){
        return{
            products:[],
        }
    },
    //方法
    methods:{
        getProduct(){
            axios.get(`${apiUrl}/api/${apiPath}/products/all`)
            .then((res)=>{console.log(res.data.products)
                this.products = res.data.products;
            })
            .catch((err)=>{console.log(err)})
        }
    },
    //生命週期
    mounted(){
        this.getProduct()
    },
})
app.mount('#app')