import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../FrontLayout.vue"),
      children: [
        {
          path: "",
          component: () => import("../views/front/HomeView.vue"),
        },
        {
          path: "about",
          component: () => import("../views/front/AboutView.vue"),
        },
        {
          path: "Product",
          component: () => import("../views/front/ProductView.vue"),
        },
        {
          path: "Products",
          component: () => import("../views/front/ProductsView.vue"),
        },
        {
          path: "Cart",
          component: () => import("../views/front/CartView.vue"),
        },
      ],
    },
  ],
});

export default router;
