import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const app = {
    data(){
        return{
            user : {
                username : "",
                password : ""
            },
            url : 'https://vue3-course-api.hexschool.io'
        }
    },
    methods : {
        login(){
            axios.post(`${this.url}/v2/admin/signin`,this.user)
            .then(res=>{
                const{ token,expired } = res.data
                document.cookie = `deliciousFood=${token};expires=${new Date(expired)}; path=/`;
                window.location='products.html';
            })
            .catch(err=>{alert(err.response.data.message)})
        }
    },
    mounted(){
    }
}
createApp(app)
.mount('#app')
