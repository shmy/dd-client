<template>
  <div id="app">
    <div class="pressureScreen"
         v-if="show"
         @click.stop.self="show = false">
      <div class="redpack-wrap">
        <p class="title">支持本站，欢迎领取支付宝红包。</p>
        <img class="redpack"
             src="/img/redpack.png"
             alt="">
        <a href="/img/redpack.png"
           download="黑人视频红包.png"
           class="save">点击保存原图</a>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data: () => ({
    show: true
  })
};
</script>

<style>
</style>
