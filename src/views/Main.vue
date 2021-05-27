<template>
  <div class="main">
    <!-- 二级路由 -->
    <div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <!-- <van-tabbar v-model="active" @change="onChange"> -->

    <van-tabbar v-model="active">
      <van-tabbar-item
        v-for="(item, index) in tabbarData"
        :key="index"
        replace
        :to="item.name"
      >
        <span>{{ item.title }}</span>
        <template #icon="props">
          <img :src="props.active ? item.activeImg : item.inactiveImg" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
    <!-- 具有插槽作用域的插槽 -->
  </div>
</template>

<script>
import { Notify } from "vant";
export default {
  name: "Main",
  data() {
    return {
      // 激活标签的名称
      active: 0,
      /*  icon: {
        active: "https://img01.yzcdn.cn/vant/user-active.png",
        inactive: "https://img01.yzcdn.cn/vant/user-inactive.png"
      }, */
      activeName: "Home",
      tabbarData: [
        {
          title: "首页",
          icon: "home-o",
          //标签名称、路由名称
          name: "Home",
          path: "/main/home",
          inactiveImg: require("../assets/images/home.png"),
          activeImg: require("../assets/images/home_active.png")
        },
        {
          title: "热门学做",
          icon: "search",
          name: "Menu",
          path: "/main/menu",
          inactiveImg: require("../assets/images/menu.png"),
          activeImg: require("../assets/images/menu_active.png")
        },
        {
          title: "查找",
          icon: "friends-o",
          name: "Moon",
          path: "/main/moon",
          inactiveImg: require("../assets/images/moon2.png"),
          activeImg: require("../assets/images/moon1.png")
        },
        {
          title: "商城",
          icon: "friends-o",
          name: "Mall",
          path: "/main/mall",
          inactiveImg: require("../assets/images/mall2.png"),
          activeImg: require("../assets/images/mall1.png")
        },
        {
          title: "我的",
          icon: "friends-o",
          name: "Shopbag",
          path: "/main/shopbag",
          inactiveImg: require("../assets/images/shopbag.png"),
          activeImg: require("../assets/images/shopbag_active.png")
        }
      ]
    };
  },

  methods: {
    onChange(index) {
      Notify({ type: "primary", message: index });
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  padding-bottom: 50px;
  .main_tabbar {
    height: 50px;
  }
}</style
>yle>
