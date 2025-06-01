import { createRouter, createWebHistory } from "vue-router";
import WelcomeView from "@/views/WelcomeView.vue";
import HomeView from "@/views/HomeView.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const router = createRouter({
  history: createWebHistory(""),
  routes: [
    {
      path: "/",
      name: "welcome",
      component: WelcomeView
    },
    {
      path: "/loading",
      name: "loading",
      component: LoadingSpinner
    },
    {
      path: "/home",
      name: "home",
      component: HomeView
    }
  ]
});

export default router;