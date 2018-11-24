<template>
  <div>
    <!--加载中-->
    <index-skeleton v-if="loading" />
    <!--加载失败-->
    <dd-loaderr v-else-if="loaderr"
                @click="fetch()"/>
    <!--内容-->
    <div v-else
         v-for="item of latest"
         :key="item._id">
      <h3 class="tag-title no-margin">{{ item.name }}</h3>
      <ul class="video-container"
          flex="dir:left">
        <li v-for="item of item.children"
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
  </div>
</template>
<script>
  import indexSkeleton from "@/components/skeleton/index-skeleton";
  import pageMixin from "@/mixins/page";
  export default {
    mixins: [pageMixin],
    data: () => ({
      latest: []
    }),
    components: {
      indexSkeleton,
    },
    created() {
      this.fetch();
    },
    methods: {
      async fetch() {
        this.loading = true;
        this.loaderr = false;
        const [data, err] = await this.$http.get("/recommended")
        this.loading = false;
        if (err) {
          this.loaderr = true;
          return;
        }
        this.latest = data.latest;
      }
    }
  }
</script>