import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
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
    method: {
        checkAdmin() {
            axios.post(`${this.url}/api/user/check`)
                .then((res) => { this.getData() })
                .catch((err) => {
                    alert(err.response.data.message)
                    window.location = 'login.html'
                })
        },
        getData() {
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
            axios.get(url).then((response) => {
                this.products = response.data.products;
            }).catch((err) => {
                alert(err.response.data.message);
            })
        },
        
    },
    mounted(){
        // 取出 Token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)deliciousFood\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;
        this.checkAdmin();
    }
}
createApp(app)
.mount('#app')