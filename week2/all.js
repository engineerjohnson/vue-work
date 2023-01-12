import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const app={
  data(){
    return{
      user:{
          username : "" ,
          password : "",
      },
    }
  },
  //方法
  methods:{
  singIn(){
//     const login = document.querySelector('#login')
// login.addEventListener('click',()=>{
  // const email = document.querySelector('#floatingInput')
  // const pwInput = document.querySelector('#floatingPassword')
  
  // const username = email.value;
  // const password = pwInput.value
  // const user={
  //   username,
  //   password
  // }
  axios.post('https://vue3-course-api.hexschool.io/v2/admin/signin',this.user)
  .then(res=>{
    const {token,uid,expired} = res.data;
    document.cookie = ` deliciousFood=${token}; expires=${expired};`;
    console.log(res);
    window.location = 'products.html';
  })
  .catch(err=>{
    alert(err.response.data.message)
  })
  }
  },
}
createApp(app)
  .mount('#app')
