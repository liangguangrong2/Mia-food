<template>
  <div>
    <van-sticky>
      <!-- <van-nav-bar title="商城" right-text="搜索" @click-right="onClickRight" /> -->
      <div class="top_x">
        <div>商城</div>
        <div><i class="icon iconfont icon-chazhao2"></i></div>
      </div>
    </van-sticky>
    <div class="listviten">
      <van-grid :gutter="2" column-num="5" :border="false">
        <van-grid-item
          v-for="item in large"
          :key="item.id"
          :icon="item.i"
          :text="item.n"
          @click="Ount(item.id)"
        />
      </van-grid>
    </div>
    <!-- 加载 -->
    <div v-if="show">
      <van-loading type="spinner" color="#1989fa" />
    </div>
    <div class="seckill">
      <h3>{{ rpsitem.t }}</h3>
      <van-swipe :loop="true" :width="120" :show-indicators="false">
        <van-swipe-item
          v-for="(e, t) in rpsitem.ps"
          :key="t"
          @click="trade(e.id)"
        >
          <div class="fllo">
            <img :src="e.i" alt="" />
          </div>

          <div class="Box-xx">{{ e.n }}</div>
          <p>￥{{ e.p }}</p>
        </van-swipe-item>
      </van-swipe>
    </div>

    <h3 class="h3_v" v-if="hidden">全部商品</h3>

    <div v-for="(x, z) in all" :key="z" class="top-box">
      <div class="left_boxitem" @click="trade(x.rp.id)">
        <img :src="x.rp.ti" alt="" />
        <div class="headline">
          {{ x.rp.des }}
        </div>
        <p>{{ x.rp.t }}</p>
        <div class="jiage">￥{{ x.rp.p }}</div>
        <div></div>
      </div>
    </div>
    <div class="aiyou" v-if="hidden">哎哟,到底了</div>
  </div>
</template>

<script>
import { Toast } from "vant";
// import { Button } from 'element-ui';
export default {
  data() {
    return {
      large: [],
      rpsitem: [],
      all: [],
      show: true,
      hidden: false
    };
  },

  created() {
    this.Licheng();
  },

  methods: {
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    },

    Licheng() {
      this.axios({
        //请求类型
        method: "GET",
        url: "/shop"
      }).then(res => {
        console.log(res);
        this.large = res.data.result.cs;
        console.log(this.large);
        this.rpsitem = res.data.result.rps[0];
        console.log(this.rpsitem);
        this.show = false;
        this.hidden = true;
      });

      this.axios({
        //请求类型
        method: "GET",
        url: "http://foods.keuaile75.top/peshop"
      }).then(res => {
        // console.log(res);
        // this.all = res.data.result.rps;

        if (res.data.result.rps.length) {
          this.all.push(...res.data.result.rps);
        }

        console.log(this.all);
      });
    },
    // 上面分类详情页面跳转
    Ount(id) {
      this.$router.push({
        name: "Partic",
        query: {
          id: id
        }
      });
    },
    // 跳转详情页面
    trade(id) {
      console.log(id);
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
.top_x {
  display: flex;
  height: 40px;
  background-color: white;
  div {
    flex: 1;
    line-height: 40px;
  }
  div:nth-last-child(2) {
    text-align: left;
    color: rgb(20, 20, 20);
    margin-left: 20px;
  }
  div:nth-last-child(1) {
    text-align: right;
    color: rgb(21, 43, 245);
    margin-right: 30px;
  }
}
.listviten {
  width: 100%;
  height: 237px;
  border-top: 1px solid gainsboro;
}
.seckill {
  margin-top: 40px;
  width: 90%;
  margin: 0 auto;
  h3 {
    text-align: left;
    // margin-left: 10px;
    margin-top: 30px;
  }
  .fllo {
    box-shadow: 1px 1px 2px #acacb8;
    margin-left: -3px;
    width: 90%;
    height: 110px;
    position: relative;
    border-radius: 4%;
    margin-top: 10px;
    img {
      width: 100%;
      height: 100%;
      // display: block;
      border-radius: 4%;
    }
  }
  .Box-xx {
    width: 92%;
    margin-top: 5px;
    z-index: 1000;
    font-size: 14px;
    // margin-left: 10px;

    overflow: hidden;

    text-overflow: ellipsis;

    display: -webkit-box;

    -webkit-line-clamp: 2;

    -webkit-box-orient: vertical;
  }
  p {
    width: 46px;
    height: 19px;
    border: 1px solid white;
    position: absolute;
    font-size: 2px;
    top: 10px;
    right: 20px;
    color: white;
    border-radius: 6px;
    background: red;
  }
}
.h3_v {
  text-align: left;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-left: 20px;
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
      // width: 100%;
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
      width: 100%;
    }
    p {
      font-size: 13px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-align: left;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-top: 5px;
    }
    .jiage {
      text-align: left;
      color: red;
    }
  }
  .aiyou {
    color: #dadada;
  }
}
</style>
