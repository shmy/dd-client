<template>
  <footer class="auto-show-footer">
    <div class="footer">
      <div style="text-align: center">
        <div style="padding-top: 30px;" @click="scrollTop()">↑返回顶部↑</div>
      </div>
      <p class="power-by no-margin">Powered by 2018 @ <a target="_blank" href="https://github.com/shmy">SHMY</a></p>
    </div>
  </footer>
</template>
<script>
  import scrollTo from "@/plugins/scrollTo";
  export default {
    methods: {
      scrollTop() {
        const container = document.querySelector('.container');
        if (container) {
          scrollTo(container, 0, 500);
        }
      }
    }
  }
</script>