<template>
  <div class="search">
    <input v-click-outside="hide"
           @click="showPanel ? closePanel() : openPanel()"
           @input="handleInput()"
           v-model="keyword"
           placeholder="输入关键字搜索"
           @keyup.enter="handleJumpSearch()"
           type="text">
    <button type="button"
            @click="handleJumpSearch()">搜索</button>
    <div v-show="showPanel"
         ref="autoComplete"
         class="auto-complete">
      <template v-if="keyword === ''">
        <div class="search-title">近期热门搜索：</div>
        <div class="flex-wrap"
             flex="dir:left">
          <div v-for="item of hotData"
               :key="item._id"
               class="hot-search-item"
               @click="handleItemClick(item.video._id)">{{ item.name }}</div>
        </div>
      </template>
      <template v-if="keyword !== ''">
        <div v-for="item of quickData"
             :key="item._id"
             class="hot-search-item"
             @click="handleItemClick(item._id)">{{ item.name }}</div>
      </template>
    </div>
  </div>
</template>
<script>
  import Hub from "@/plugins/hub";
  import ClickOutside from "vue-click-outside";
  import throttle from "lodash/throttle";
  export default {
    data: () => ({
      showPanel: false,
      keyword: "",
      hotData: [],
      quickData: [],
    }),
    directives: {
      ClickOutside
    },
    created() {
      Hub.on("scroll", this.closePanel);
      this.fetchHot();
    },
    methods: {
      async fetchHot() {
        const [data, err] = await this.$http.get('/video/hot')
        if (err) return
        this.hotData = data
      },
      openPanel() {
        this.showPanel = true;
        this.$nextTick(() => {
          this.$refs.autoComplete.scrollTop = 0;
        })
      },
      closePanel() {
        this.showPanel = false;
      },
      handleItemClick(id) {
        this.$router.push(`/video/${id}`);
        this.closePanel();
      },
      hide() {
        this.showPanel = false;
      },
      async fetch() {
        const [data, err] = await this.$http.get("/video/search", {
          params: {
            keyword: this.keyword,
            page: 1,
            per_page: 10,
            sort: "1",
          }
        });
        if (err) {
          return;
        }
        this.quickData = data.result;
        this.openPanel();
      },
      handleInput: throttle(async function() {
        if (!this.keyword.trim()) {
          this.quickData = []
          return;
        }
        await this.fetch();
      }, 500),
      handleJumpSearch() {
        this.closePanel();
        this.$router.push({
          path: "/search",
          query: {
            keyword: this.keyword,
          }
        });
      },
    }
  }
</script>