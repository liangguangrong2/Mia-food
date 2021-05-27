<template>
  <div>
    <van-sticky>
      <van-nav-bar
        title="分类"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      >
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>

      <div class="al">
        <ol>
          <li
            v-for="item in Apitem"
            :key="item.value"
            :class="{ active: item.value == ar }"
            @click="tooare(item.value)"
          >
            {{ item.text }}
          </li>
        </ol>
      </div>
    </van-sticky>

    <div>
      <van-loading v-if="showload" />

      <van-list v-else>
        <!-- <div v-for="(v, e) in presitem" :key="e">
          <div>{{ v.t }}</div>
        </div> -->

        <div
          v-for="(v, e) in presitem"
          :key="e"
          class="top-box"
          @click="laout(v.id)"
        >
          <div class="left_boxitem">
            <img :src="v.ti" lazy-load alt="" />

            <div class="headline">
              {{ v.des }}
            </div>
            <p>{{ v.t }}</p>
            <div class="jiage">￥{{ v.p }}</div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ar: 0,
      showload: true,
      presitem: null,
      id: this.$route.params.id,
      Apitem: [
        {
          text: "推荐",
          value: 0
        },
        {
          text: "销量",
          value: 1
        },
        {
          text: "价格",
          value: 2
        },
        {
          text: "新品",
          value: 4
        }
      ]
    };
  },

  created() {
    // this.id = this.$route.query.id;
    this.Prseitem();
  },
  methods: {
    tooare(b) {
      console.log(b);
      this.ar = b;
      this.Prseitem();
    },

    onClickLeft() {
      this.$router.go(-1);
    },
    Prseitem() {
      this.showload = true;
      this.axios({
        url: "/shop/list",
        method: "get",
        params: {
          id: this.$route.query.id,
          ar: this.ar
        }
      }).then(res => {
        this.showload = false;
        console.log(res);
        this.presitem = res.data.result.ps;
        this.ar = this.presitem;
        console.log(this.presitem);
      });
      // console.log(this.ar);
    },
    // 上面分类详情页面跳转
    laout(id) {
      this.$router.push({
        name: "Shopping",
        query: {
          id
        }
      });
    }
  }
};
</script>

<style lang="less">
.al {
  background-color: white;
  ol {
    display: flex;
    height: 40px;
    border-bottom: 1px solid #ccc;
    align-items: center;
    justify-content: space-around;
    .active {
      color: red;
    }
  }
}
.top-box {
  margin-top: 20px;
  width: 100%;
  // border: 1px solid black;
  // height: 500px;

  .left_boxitem {
    width: 180px;
    height: 280px;
    // border: 1px solid blue;
    margin-left: 10px;
    margin-right: 15px;
    // border: 1px solid red;
    float: right;
    position: relative;

    img {
      width: 100%;
      height: 184px;
      // border-radius: 10px;
    }
    .headline {
      height: 35px;
      // padding: 0 5px;
      bottom: 10px;
      padding-left: 5px;
      line-height: 35px;
      font-size: 14px;
      background-color: #dadada;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    p {
      font-size: 13px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-align: left;
    }
    .jiage {
      text-align: left;
      color: red;
    }
  }
}
</style>
