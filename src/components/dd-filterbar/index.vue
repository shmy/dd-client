<template>
  <div class="dd-filterbar"
       :class="open && 'open'">
    <div @click="open = !open"
         class="show-more">
      <span>{{ open ? '折叠选项↑' : '展开选项↓' }}</span>
    </div>
    <!--分类-->
    <ul flex="dir:left"
        class="flex-wrap dd-filterbar-wrapper">
      <li v-for="(item, index) of classes"
          @click="handleSet('pid', item.value)"
          class="dd-filterbar-item"
          :class="[value.pid === item.value && 'active', disabled && 'disabled']"
          :key="index">
        {{ item.title }}
      </li>
    </ul>
    <!--年份-->
    <ul flex="dir:left"
        class="flex-wrap dd-filterbar-wrapper">
      <li v-for="(item, index) of years"
          @click="handleSet('year', item.value)"
          class="dd-filterbar-item"
          :class="[value.year === item.value && 'active', disabled && 'disabled']"
          :key="index">
        {{ item.title }}
      </li>
    </ul>
    <!--区域-->
    <ul flex="dir:left"
        class="flex-wrap dd-filterbar-wrapper">
      <li v-for="(item, index) of areas"
          @click="handleSet('area', item.value)"
          class="dd-filterbar-item"
          :class="[value.area === item.value && 'active', disabled && 'disabled']"
          :key="index">
        {{ item.title }}
      </li>
    </ul>
    <!--来源-->
    <ul flex="dir:left"
        class="flex-wrap dd-filterbar-wrapper">
      <li v-for="(item, index) of sources"
          @click="handleSet('source', item.value)"
          class="dd-filterbar-item"
          :class="[value.source === item.value && 'active', disabled && 'disabled']"
          :key="index">
        {{ item.title }}
      </li>
    </ul>
    <!--查询方式-->
    <ul flex="dir:left"
        class="flex-wrap dd-filterbar-wrapper">
      <li v-for="(item, index) of querys"
          @click="handleSet('query', item.value)"
          class="dd-filterbar-item"
          :class="[value.query === item.value && 'active', disabled && 'disabled']"
          :key="index">
        {{ item.title }}
      </li>
    </ul>
    <!--排序方式-->
    <ul flex="dir:left"
        class="flex-wrap dd-filterbar-wrapper">
      <li v-for="(item, index) of sorts"
          @click="handleSet('sort', item.value)"
          class="dd-filterbar-item"
          :class="[value.sort === item.value && 'active', disabled && 'disabled']"
          :key="index">
        {{ item.title }}
      </li>
    </ul>
    <div style="height: 50px;"></div>
  </div>
</template>
<script>
  import {
    classes,
    years,
    areas,
    querys,
    sorts,
    sources,
  } from "@/plugins/static";
  import set from "lodash/set";
  import cloneDeep from "lodash/cloneDeep";
  export default {
    model: {
      prop: "value",
      event: "change",
    },
    data: () => ({
      classes,
      years,
      areas,
      querys,
      sorts,
      sources,
      open: false,
    }),
    props: {
      value: {
        type: Object,
        default: () => ({
          year: "",
          area: "",
          sort: "2",
          query: "2",
          source: "",
          pid: "",
        }),
      },
      disabled: {
        type: Boolean,
        default: false,
      }
    },
    methods: {
      handleSet(key, val) {
        const value = cloneDeep(this.value);
        set(value, key, val);
        this.$emit('change', value);
      }
    }
  }
</script>
<style lang="scss">
  .dd-filterbar {
    /*margin-top: 80px;*/
    padding-top: 20px;
    height: 90px;
    position: relative;
    overflow: hidden;
    border-bottom: 2px solid #0af;
    /*mask-image: linear-gradient(#1a1a1a calc(100% - 50px),transparent calc(100% - 50px));*/
    /*mask-size: 100% 100%;*/
    &.open {
      height: auto;
    }
    .show-more {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 50px;
      line-height: 75px;
      text-align: center;
      width: 100%;
      color: #0af;
      font-size: 14px;
      font-weight: bold;
      background-color: rgba(255, 255, 255, .8);
      cursor: pointer;
    }
  }
  .dd-filterbar-wrapper {
    margin: 0;
    padding: 0 10px;
    box-sizing: border-box;
    list-style: none;

    .dd-filterbar-item {
      height: 35px;
      line-height: 35px;
      margin-right: 10px;
      padding: 0 10px;
      box-sizing: border-box;
      border-radius: 4px;
      margin-bottom: 10px;
      cursor: pointer;
      transition: background-color .3s, color .3s;
      &:hover:not(.disabled),
      &.active{
        background: #0af;
        color: #fff;
      }
      &.disabled {
        cursor: not-allowed;
        color: #ccc;
      }
    }
  }
</style>