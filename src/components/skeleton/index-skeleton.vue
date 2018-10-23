<template>
  <div class="index-skeleton">
    <div style="height: 10px;"></div>
    <h3 class="skeleton-title skeleton-animation">
    </h3>
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