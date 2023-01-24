export default {
    props:['pages','getData'],
    template: `<div>
<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item" :class="{disabled: !pages.has_pre}">
      <a class="page-link" href="#" aria-label="Previous"  @click="getData(pages.current_page-1)">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item" v-for="page in pages.total_pages" :key= "page + page" :class="{active: page === pages.current_page}">
        <!--使用emit('元件名稱',參數)-->
        <a class="page-link" href="#" @click.prevent="$emit('change_page',page)">{{ page }}</a>
    </li>

    
    <li class="page-item" :class="{disabled: !pages.has_next}">
      <a class="page-link" href="#" aria-label="Next" @click="getData(pages.current_page+1)">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
</div>`,
mounted(){
}
}