import Vue from "vue";
import VueRouter from "vue-router";
import layout from "@/main.vue";
Vue.use(VueRouter);
const loadPage = name => () => import(`@/pages/${name}.vue`);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: layout,
      children: [
        { path: "", component: loadPage("index/index"), },
        { path: "classify/:id", component: loadPage("classify/index"), },
        { path: "video/:id", component: loadPage("video/index"), },
        { path: "search", component: loadPage("search/index"), },
      ]
    }
  ]
});
router.afterEach(() => {
  // 统计代码
  const container = document.querySelector('.container');
  if (container) {
    container.scrollTop = 0;
  }
})
// 生产环境启用百度统计
if (process.env.NODE_ENV === 'production') {
  router.afterEach(to => {
    // 统计代码
    if (to.path) {
      /* global _hmt */
      _hmt.push(['_trackPageview', to.fullPath]);
    }
  });
}
export default router;