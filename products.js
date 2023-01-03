import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const app ={
    //資料
    data(){
        return{
        url : 'https://vue3-course-api.hexschool.io',
        apiPath : 'deliciousfood',
        products : [],
        tempProducts : {},
        }
    },
    //方法
    methods:{
        checkAdmin(){
            // const apiUrl = ;
            axios.post(`${this.url}/v2/api/user/check`)
            .then(()=>{
                this.getProducts();
            })
            .catch(err=>{
                alert(err.response.data.message)
                window.location = 'index.html';
            })
        },
        getProducts(){
            axios.get(`${this.url}/v2/api/${this.apiPath}/admin/products`)
            .then(res=>{
                this.products=res.data.products;
            })
            .catch(err=>{
                alert(err.response.data.message);
            })
        },

    },
    mounted(){
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)deliciousFood\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;
        this.checkAdmin()
    }
}
createApp(app)
.mount('#app')