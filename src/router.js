import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import ProjectsPage from "./pages/ProjectsPage.vue";
import AboutPage from "./pages/AboutPage.vue";
import ContactPage from "./pages/ContactPage.vue";
import SingleProjectPage from "./pages/SingleProjectPage.vue"
import NotFound from "./pages/NotFound.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
        path: "/projects",
        name: "projects",
        component: ProjectsPage,
    },
    {
      path: "/projects/:slug",
      name: "single-project",
      component: SingleProjectPage,
    },
    {
        path: "/about",
        name: "about",
        component: AboutPage,
    },
    {
        path: "/contact",
        name: "contact",
        component: ContactPage,
    },
    //la rotta non found va per ultima
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFound,
    },
  ],
});

export { router };