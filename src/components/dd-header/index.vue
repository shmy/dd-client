<template>
  <div class="auto-hide-header"
       :class="isHidden && 'is-hidden'">
    <header class="header"
            flex="dir:left">
      <img class="logo"
           style="width: 240px"
           src="~@/assets/img/logo.png" alt="">
      <div class="menu"
           flex="dir:left">
        <div flex-box="1"
             v-for="menu of menus"
             :key="menu.path"
             :class="$route.path === menu.path && 'active'"
             @click="$router.push(menu.path)"
             class="menu-item">
          {{ menu.name }}
        </div>
      </div>
      <div flex-box="1">
        <dd-search />
      </div>
    </header>
  </div>
</template>
<script>
  import DdSearch from "@/components/dd-search";
  export default {
    components: {
      DdSearch,
    },
    props: {
      isHidden: {
        type: Boolean,
        default: false,
      },
      menus: {
        type: Array,
        default: () => ([]),
      },
    }
  }
</script>