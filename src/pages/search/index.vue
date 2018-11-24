<template>
  <div>
    <!--过滤条-->
    <dd-filterbar :disabled="loading"
                  @change="handleFilterbarChange()"
                  v-model="filter" />
    <!--加载中-->
    <search-skeleton v-if="loading" />
    <!--加载失败-->
    <dd-loaderr v-else-if="loaderr"
                @click="fetch()"/>
    <!--暂无数据-->
    <dd-no-result v-else-if="items.length === 0" />

    <!--内容-->
    <div v-else>
      <div>
        <ul class="video-container"
            flex="dir:left">
          <li v-for="item of items"
              :key="item._id"
              @click="$jump(`/video/${item._id}`)"
              class="video-item">
            <div class="video-content">
              <img v-lazy="item.thumbnail"
                   alt=""
                   class="video-cover">
              <div class="video-mask">
                <p class="video-name no-margin">{{ item.name }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!--分页-->
      <div style="text-align: center">
        <dd-paging
          :per-pages="3"
          :page-index="paging.page"
          :total="total"
          :page-size="paging.per_page"
          @change="handlePageChange($event)">
        </dd-paging>
      </div>
    </div>
  </div>
</template>
<script>
  import DdFilterbar from "@/components/dd-filterbar";
  import DdPaging from "@/components/dd-paging";
  import SearchSkeleton from "@/components/skeleton/search-skeleton";
  import pageMixin from "@/mixins/page";
  export default {
    mixins: [pageMixin],
    data: () => ({
      filter: {
        year: "",
        area: "",
        sort: "2",
        query: "2",
        source: "",
        pid: "",
      },
      paging: {
        keyword: "",
        page: 1,
        per_page: 20,
      },
      items: [],
      total: 1,
    }),
    components: {
      DdFilterbar,
      SearchSkeleton,
      DdPaging,
    },
    created() {
      this.initSearch();
    },
    methods: {
      initSearch() {
        this.paging.keyword = this.$route.query.keyword;
        this.fetch();
      },
      async fetch() {
        this.loading = true;
        this.loaderr = false;
        this.$nextTick(() => {
          this.scrollToTop();
        });
        const [data, err] = await this.$http.get("/video/search", {
          params: {
            ...this.paging,
            ...this.filter,
          },
        });
        this.loading = false;
        if (err) {
          this.loaderr = true;
          return;
        }
        this.paging.page = data.page;
        this.paging.per_page = data.per_page;
        this.total = data.total;
        this.items = data.result;
      },
      handleFilterbarChange() {
        this.paging.page = 1;
        this.fetch();
      },
      handlePageChange(page) {
        this.paging.page = page;
        this.fetch();
      },
    },
    beforeRouteUpdate(to, from, next) {
      next();
      this.initSearch();
    }
  }
</script>