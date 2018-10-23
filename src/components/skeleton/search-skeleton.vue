<template>
  <div class="index-skeleton">
    <ul class="video-container" flex="dir:left">
      <li v-for="n of 10"
          :key="n"
          class="video-item">
        <div :style="{ animationDelay: `${n * 0.3}s` }" class="video-content skeleton-background skeleton-animation">
        </div>
      </li>
    </ul>
  </div>
</template>