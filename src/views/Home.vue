<template>
  <div class="home">
    <van-sticky>
      <van-nav-bar>
        <template #left>
          <div>
            <div @click="getBom">
              <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
            </div>
            <!-- <div class="t2">11</div> -->
          </div>
        </template>
        <template #right>
          <div class="home-search">
            <van-search placeholder="输入商品名称" @click="Aonse" />
          </div>
          <!-- <van-icon name="plus" /> -->
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="home-cont">
      <!-- <div v-for="(item, index) in bannerData" :key="index"> -->
      <div class="banner-box">
        <!-- <div><img :src="item.d.i" alt="" /></div> -->
        <van-swipe @change="changeCurrentIndex" :autoplay="2000" loop>
          <van-swipe-item
            v-for="(item, index) in bannerData"
            :key="index"
            @click="Content(item.d.url)"
          >
            <div class="box-v">
              <img class="auto-img" :src="item.d.i" alt="" />
            </div>
          </van-swipe-item>
        </van-swipe>

        <!-- 轮播图 -->

        <!-- <el-carousel
          :interval="5000"
          change="changeCurrentIndex"
          arrow="always"
        >
          <el-carousel-item v-for="(item, index) in bannerData" :key="index">
            <div class="box-v" @click="Content(item.d.url)">
              <img class="auto-img" :src="item.d.i" alt="" />
            </div>
          </el-carousel-item>
        </el-carousel> -->
      </div>
    </div>

    <div class="Text">
      <Classify class="box" />
    </div>

    <div class="comments">
      <!-- <h3>热门活动</h3> -->

      <!-- <div v-for="(Hot, h) in Hot.events" :key="h">
				<img :src="Hot.image" alt="" />
			</div> -->
      <van-swipe
        :loop="true"
        :width="300"
        :autoplay="3000"
        :show-indicators="false"
      >
        <van-swipe-item
          v-for="(Hot, h) in Hot.events"
          :key="h"
          @click="toHot(Hot)"
        >
          <!-- <div class="Box-r">
						{{ Hot.name }}
					</div> -->
          <div class="fllo">
            <p>
              {{ Hot.time_text }}
            </p>
            <img :src="Hot.image" alt="" />
          </div>
          <div class="Box-xx">{{ Hot.name }}</div>
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 加载 -->
    <div v-if="show">
      <van-loading type="spinner" color="#1989fa" />
    </div>

    <!-- <van-loading type="spinner" /> -->
    <div class="Reem">
      <div>
        <p class="title_it">今日推荐</p>

        <div
          class="recom"
          v-for="(item, index) in feat.list"
          :key="index"
          @click="Faature(item.r.id)"
        >
          <template v-if="item.type == 2">
            <div class="box_t">
              <div class="item">
                <div></div>
                <p>
                  <img :src="item.r.p" alt />
                  <!-- {{ item.r.id }} -->
                </p>
                <h3>
                  {{ item.r.an }}
                </h3>
                <span>Lv.{{ item.r.a.lvl }}</span>
                <p class="right_collect">{{ item.r.recommend_label }}</p>
              </div>

              <div class="letm">
                <img :src="item.r.img" alt="" />

                <p>{{ item.recommend_label }}</p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Classify from "@/components/Classify.vue";
// import Features from "@/components/Features.vue";
export default {
  name: "Home",
  components: {
    Classify
    // Features,
  },

  data() {
    return {
      //轮播数据
      bannerData: [],
      //当前轮播图片索引
      currentIndex: 0,
      // 分类
      hearData: [],

      // 热门活动
      Hot: [],
      //今日推荐
      feat: [],
      show: true
    };
  },
  // 在created函数中调用axiox获取页面初始化所需的数据。
  created() {
    this.getHotProduct();
  },
  methods: {
    Aonse() {
      // 获取路径
      this.$router.push({
        name: "Moon"
      });
    },

    //获取当前这个页面的链接格式
    toHot(Hot) {
      this.$router.push({
        name: "Hot",
        params: {
          id: Hot.id,
          name: Hot.name,
          url: Hot.url
        }
      });
      // console.log(this.id);
    },
    getBom() {
      this.$router.push({
        name: "Shopbag"
      });
    },
    // @click="Content(item.d.url)"点击事件里面的参数
    Content(v) {
      // id = item.d.url;
      // let pid = item.d.url;
      let res = /^[\D]{1,}/gi;
      // console.log(res);
      // 截取id
      let id = v.split(res)[1];
      console.log(id);
      console.log(v);
      this.$router.push({
        name: "Cookstep",
        query: {
          id
        }
      });
    },
    Faature(id) {
      this.$router.push({
        name: "Faatur",
        query: {
          id
        }
      });
    },

    //修改轮播图片索引
    changeCurrentIndex(index) {
      this.currentIndex = index;
    },
    getHotProduct() {
      this.$axios
        .get(
          "http://120.55.28.235/public/getDifferentdataList.shtml?machine=595c6d26e89da93f055cbd6c8aca3cec&appid=cn.ecookxuezuofan&ids=60638,60637,60636,60623,60622,60621,60620,60619,60618,60617"
        )
        .then(res => {
          console.log(res.data.list);
          // this.menulist = res.data.list;
        });
      //发起注册请求
      this.axios({
        //请求类型
        method: "GET",
        //请求路径
        url: "/home"
      }).then(response => {
        // this.recommends = response.result.header;

        // let res=s

        console.log(" fghjk=>", response);
        this.bannerData = response.data.result.header.dsps;
        console.log(this.bannerData);
        console.log(response.data.result.header);
        this.hearData = response.data.result.header.channels;
        console.log(this.hearData);
        this.Hot = response.data.result.header.hot_events;
        console.log(this.Hot);
        this.feat = response.data.result.features_list;
        console.log("hhhhh=>", this.feat.list);

        // this.feat.splice(0, this.feat.length);

        // // this.feat = response.data.result.features_list.list;
        // for (let i = 0; i < this.feat.length; i++) {
        //   // console.log(i);
        //   this.feat.push(response.data.result.features_list.list[i].r);
        // }
        // this.feat.shift();
        // this.feat = [...new Set(this.feat)];
        // console.log(this.feat);
        // console.log(response);

        // this.feat.splice(0, this.feat.length);

        // console.log(response.data.result.features_list.list);

        // for (
        //   let i = 0;
        //   i < response.data.result.features_list.list.length;
        //   i++
        // ) {
        //   // console.log(i);
        //   // !!!!!!!!!!!!!!!!!!!!!!!1  this.feat.push(response.data.result.features_list.list[i].r);
        // }
        // this.feat.shift();
        // this.feat = [...new Set(this.feat)];

        this.show = false;
      });
    }
  }

  //   computed: {
  //     TodayDemo: function() {
  //       return this.feat;
  //     }
  //   }
};
</script>
<style scoped lang="less">
.home {
  width: 100vw;
  /deep/ .van-icon {
    font-size: 25px;
  }
  .home-search {
    // margin-top: 2px;
    height: 62px;
    width: 280px;
    .van-search {
      padding-top: 15px;
      padding-bottom: 0;
    }
  }

  .banner-box {
    .box-v {
      // margin: 0 auto;

      width: 100%;
      // height: 200px;
      img {
        width: 100%;
        height: 100%;
        display: block;
        // border-radius: 2%;
      }
    }
  }

  .comments {
    // margin-top: 30px;
    padding-top: 20px;
    padding-bottom: 20px;
    h3 {
      font-size: 16px;
      // margin-top: 20px;
      margin-right: 300px;
      padding-top: 20px;
      // padding-bottom: 20px;
    }
    height: 270px;
    // border: 1px solid;
    // margin-top: 20px;
    .fllo {
      // border: 1px solid;
      // margin-top: 20px;
      margin-left: 20px;
      width: 90%;
      height: 10px;
      position: relative;
      top: 10px;

      img {
        width: 100%;

        display: block;
        border-radius: 2%;
      }
      p {
        width: 60px;
        height: 25px;
        // border-radius: 6px;
        position: absolute;
        color: red;
        top: -15px;
        right: 15px;
        background-color: rgb(248, 241, 241, 0.2);
      }
    }
    .Box-xx {
      margin-top: 165px;
      z-index: 1000;
      font-size: 15px;
    }
  }
  .Reem {
    margin-top: -105px;
    // border: 1px solid;
    .title_it {
      text-align: left;
      padding-top: 20px;
      padding-bottom: 20px;
      padding-left: 20px;
      font-size: 18px;
    }
    .box_t {
      .item {
        // border: 1px solid;
        display: flex;
        align-items: center;
        margin-left: 10px;
        // margin-top: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
        // justify-content: space-between;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        h3 {
          color: #0d0d0d;
          font-size: 13px;
          margin: 0 8px;
          letter-spacing: 1px;
        }

        span {
          display: flex;
          color: #e4b235;
          font-size: 12px;
          font-weight: 600;
          font-style: italic;
        }
        .right_collect {
          // float: right;
          text-align: right;
          font-size: 13px;
          color: #a09a8d;
          // border: 1px solid black;
          // margin-right:; 0
          // margin-left:100px;
          // margin-left: 0;
          flex: 1;
          margin-right: 10px;
        }
      }

      .letm {
        // width: 90.5%;
        // margin-left: 19px;
        // border: 1px solid;
        // margin-top: 20px;
        // border: 1px solid;
        img {
          width: 100%;
          height: 300px;
          //自适应
          object-fit: cover;
          // border-radius: 5px;
        }

        h3 {
          margin: 13px 0;
          font-weight: 600;
          line-height: 20px;
          font-size: 15px;
        }

        p {
          color: #a14c4c;

          margin-top: 8px;
          font-size: 11px;
        }
      }
    }
  }
}
</style>
