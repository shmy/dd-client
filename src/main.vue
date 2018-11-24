<template>
  <div @scroll="handleScroll($event)"
       class="container">
    <dd-header :is-hidden="isHidden"
               :menus="menus" />
    <router-view class="router-view" />
    <dd-footer />
  </div>
</template>
<script>
// import sal from "sal.js";
import DdHeader from "@/components/dd-header";
import DdFooter from "@/components/dd-footer";
import Hub from "@/plugins/hub";
const HEADER_HEIGHT = 65;
export default {
  data: () => ({
    beforeScrollTop: 0,
    isHidden: false,
    menus: [
      { name: "首页", path: "/" },
      { name: "电影", path: "/classify/5b1362ab30763a214430d036" },
      { name: "电视剧", path: "/classify/5b1fce6330025ae5371a6a8a" },
      { name: "综艺", path: "/classify/5b1fd85730025ae5371abaed" },
      { name: "动漫", path: "/classify/5b1fdbee30025ae5371ac363" }
    ]
  }),
  components: {
    DdHeader,
    DdFooter
  },
  methods: {
    handleScroll({ target }) {
      const afterScrollTop = target.scrollTop;
      const delta = afterScrollTop - this.beforeScrollTop;
      if (delta === 0) return false;
      this.beforeScrollTop = afterScrollTop;
      const fn = () => {
        Hub.emit("scroll");
        this.isHidden = afterScrollTop > HEADER_HEIGHT && delta > 0;
      };
      !window.requestAnimationFrame
        ? setTimeout(fn, 300)
        : requestAnimationFrame(fn);
    }
  },
  // mounted() {
  //   sal();
  // }
};
</script>