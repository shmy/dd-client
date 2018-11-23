<template>
  <div>
    <!--加载中-->
    <detail-skeleton v-if="loading" />
    <!--加载失败-->
    <dd-loaderr v-else-if="loaderr"
                @click="fetch()"/>
    <!--内容-->
    <div v-else>
      <div ref="container" class="video-player-container"></div>
      <div class="video-detail-title">播放来源</div>
      <ul class="video-btn-wrapper"
          flex="dir:left">
        <li v-for="(item, index) of detail.remote_url"
            @click="handlePlay(item.url, index)"
            class="video-btn"
            :class="listIndex === index && 'active'"
            :key="item.url">
          {{ item.tag }}
        </li>
      </ul>
      <div class="video-detail-title">视频介绍</div>
      <div class="video-detail-introduction">
        <h3>
          <span class="video-name">{{ detail.name }}</span>
          <span class="video-classify-name">&nbsp;&nbsp;&nbsp;{{ detail.classify.name }}</span>
        </h3>
        <p>
          <span class="video-number">{{ detail.number }}</span>
          <span class="video-sub-introduce">&nbsp;&nbsp;次浏览</span>
        </p>
        <p class="video-sub-introduce">导演： {{ detail.director.join(' ') }}</p>
        <p class="video-sub-introduce">主演： {{ detail.starring.join(' ') }}</p>
        <p class="video-introduce">简介： {{ detail.introduce }}</p>

      </div>
    </div>
  </div>
</template>
<script>
  // import DPlayer from 'dplayer';
  import Xgplayer from "xgplayer";
  import detailSkeleton from "@/components/skeleton/detail-skeleton";
  import pageMixin from "@/mixins/page";
  export default {
    mixins: [pageMixin],
    data: () => ({
      detail: {
        classify: {},
        remote_url: [],
        starring: [],
        director: [],
      },
      dp: null,
      listIndex: -1,
    }),
    components: {
      detailSkeleton,
    },
    created() {
      this.fetch();
    },
    methods: {
      async fetch() {
        this.loading = true;
        this.loaderr = false;
        const [data, err] = await this.$http.get(`/video/${this.$route.params.id}`)
        this.loading = false;
        if (err) {
          this.loaderr = true;
          return;
        }
        data.remote_url.reverse();
        this.detail = data;
        this.handlePlay(this.detail.remote_url[0].url, 0);
      },
      createPlayer() {
        this.dp = new Xgplayer({
          el: this.$refs.container,
          autoplay: true,
          preload: "metadata",
        });
        this.dp.on("play", () => {
          this.dp.notice('记得分享本站给您的朋友哦:)');
        });
        this.dp.on("canplay", () => {
          this.dp.play();
        });
      },
      handlePlay(url, index) {
        if (index === this.listIndex) {
          return;
        }
        this.$nextTick(() => {
          if (!this.dp) {
            this.createPlayer();
          }
          // console.log(this.dp)
          this.dp.switchVideo({
            url: url,
            // pic: 'second.png',
            // thumbnails: 'second.jpg'
          });
          this.listIndex = index;
          this.dp.play();
        });
      },
      destroyPlayer() {
        if (this.dp) {
          this.dp.destroy();
        }
        this.listIndex = -1;
        this.dp = null;
      },
    },
    beforeRouteUpdate(to, from, next) {
      next();
      this.destroyPlayer();
      this.fetch();
    },
    beforeRouteLeave(to, from, next) {
      this.destroyPlayer();
      next();
    }
  }
</script>