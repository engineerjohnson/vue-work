import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
let delProductModal = null
let productModal = null
const app = {
    data(){
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'deliciousfood',
            products: [],
            isNew: false,
            tempProduct: {
                imagesUrl: [],
            },
        }
    },
    methods: {
        checkAdmin() {
            axios.post(`${this.apiUrl}/api/user/check`)
                .then(() => { this.getData() })
                .catch((err) => {
                    alert(err.response.data.message)
                    window.location = 'index.html'
                })
        },
        getData() {
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
            axios.get(url).then((response) => {
                this.products = response.data.products;
                // console.log(this.products)
            }).catch((err) => {
                alert(err.response.data.message);
            })
        },
        updateProduct(){
            let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
            let api = 'post';

            if(!this.isNew){
                url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
                api = 'put';
            }
            console.log(url,api)
            axios[api](url, { data:this.tempProduct })
            .then(res=>{
                alert(res.data.message);
                productModal.hide();
                this.getData();
            })
            .catch(err=>{
                alert(err.response.data.message);
            })
        },
        openModal(New,item){
            if(New === 'delete'){
                this.tempProduct = {...item};
                delProductModal.show()
            }else if(New === 'new'){
                this.tempProduct = {
                    imagesUrl: [],
                };
                this.isNew = true;
                productModal.show();
            }else if(New === 'edit'){
                this.tempProduct = {...item};
                productModal.show()
                this.isNew = false;
            }
        },
        delProduct(){
            axios.delete(`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`)
            .then(res=>{
                alert(res.data.message);
                delProductModal.hide();
                this.getData();
            })
            .catch(err=>{
                alert(err.data.message);
            })
        },
        // createImage(){
        //     this.tempProduct.imagesUrl = [];//確保是一個array
        //     this.tempProduct.imagesUrl.push('');
        // }
    },
    mounted(){
        productModal = new bootstrap.Modal(document.getElementById('productModal'));
        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'));
        // 取出 Token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)deliciousFood\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;
        this.checkAdmin();
    }
}
createApp(app)
.mount('#app')