<template>
  <div class="box">
    <van-sticky>
      <div class="back" @click="Top">
        <van-nav-bar
          title="菜谱详情"
          left-text="返回"
          right-text="按钮"
          left-arrow
          @click-left="back"
        />
      </div>
    </van-sticky>
    <!-- 加载 -->
    <div v-if="show">
      <van-loading color="#1989fa" />
    </div>
    <div class="box_d" v-for="(item, index) in rice" :key="index" :item="item">
      <img :src="item.original_photo_path" alt />

      <div class="next" v-for="(item, index) in rice" :key="index" :item="item">
        <h3>{{ item.title }}</h3>
        <a href="#">精品</a><span class="plen"> 浏览 -- {{ item.vc }}</span>
        <span class="autie">收藏{{ item.views_count_text }}</span>

        <div class="item">
          <p>
            <img :src="item.author_photo" alt />
          </p>
          <h4>
            {{ item.author }}
          </h4>
          <span>LV.{{ item.user.lvl }}</span>
        </div>

        <div class="meet">
          <!-- <p>{{ item.tips }}</p> -->
          <p>{{ item.cookstorys[0].c }}</p>
        </div>
        <div class="ball" v-if="item.cook_time">
          <span>
            <i class="iconfont icon-shijian"></i>
            {{ item.cook_time }}
          </span>
          <span>
            <el-rate v-model="value" show-text> </el-rate>

            <!-- {{ item.cook_difficulty }} -->
          </span>
        </div>
      </div>
      <p class="listfind">
        食品清单
      </p>
      <div class="dall">
        <div class="foot">
          <div
            class="iten"
            v-for="(item, index) in major"
            :key="index"
            :item="item"
          >
            <span>{{ item.title }}</span>

            <span>{{ item.note }}</span>
          </div>
        </div>
      </div>
      <p class="meen">烹饪步骤</p>

      <div class="list">
        <div v-for="(item, index) in cook" :key="index" :item="item">
          <span>步骤:{{ item.position }}</span>

          <div class="box-o">
            <img :src="item.image" alt="" />
          </div>
          <p>{{ item.content }}</p>
        </div>
      </div>

      <div class="time">发布于{{ item.create_time }}</div>

      <div class="tips">
        <h4>小贴士</h4>
        <p>{{ item.tips }}</p>
      </div>
      <!-- 评论 -->
      <div class="discuss">
        <h4>热门评论</h4>
        <div class="observer" v-for="(item, index) in child" :key="index">
          <div class="adbse">
            <img :src="item.u.p" alt="" />

            <div class="dkname">
              {{ item.u.n }} <span>lv.{{ item.u.lvl }}</span>

              <p class="fsize">{{ item.city }}</p>
              <p class="button_is">{{ item.content[0].c }}</p>
              <!-- <div class="oute">22</div> -->
            </div>
            <!-- <img :src="item.comments.u[].p" alt="" /> -->
          </div>

          <div>1</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 菜谱详细内容id
      id: "",
      rice: [],
      major: [],
      cook: [],
      value: 1,
      child: [],
      show: true
    };
  },
  // created() {
  // 	// //截取id
  // 	// this.id = this.$route.query.id;
  // 	// console.log(this.id);
  // 	// // 获取菜品详情数据
  // 	console.log(this.$route.query.id);
  // },
  mounted() {
    console.log(this.$route.query.id);
  },
  created() {
    this.id = this.$route.query.id;
    this.GetMenu();
  },
  methods: {
    //返回上一级
    back() {
      this.$router.go(-1);
    },

    Top() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
    },
    GetMenu() {
      this.axios({
        //请求类型
        method: "GET",
        url: "/recipe/detail",
        params: {
          id: this.$route.query.id
        }
      }).then(response => {
        this.rice = response.data.result;
        console.log(this.rice);
        // console.log(this.id);
        this.major = response.data.result.recipe.major;
        console.log(this.major);
        // console.log(response);
        this.cook = response.data.result.recipe.cookstep;
        console.log(this.cook);

        this.child = response.data.result.recipe.comments;
        console.log(this.child);
        this.show = false;
      });
    }
  }
};
</script>

import Viewer from 'v-viewer' import 'viewerjs/dist/viewer.css'

<style scoped lang="less">
.box {
  width: 100%;
  // border: 1px solid;

  .box_d {
    width: 100%;
    // border: 1px solid;
    box-shadow: 1px 1px 1px 1px rgb(238, 229, 229);
    img {
      display: block;
      width: 100%;
      // height: 200px;
      //适应度
      object-fit: cover;
    }
  }
  .next {
    width: 100%;
    h3 {
      font-size: 17px;
      // margin-left: 10px;
      // margin-top: 10px;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    a {
      font-size: 12px;
      color: blue;
    }
    .plen {
      display: inline;
      margin-right: 148px;
      font-size: 12px;
    }
    .autie {
      font-size: 12px;
    }
  }
  .item {
    display: flex;
    align-items: center;
    margin-left: 16px;
    margin-top: 15px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    h4 {
      color: #0d0d0d;
      font-weight: 400;
      font-size: 15px;
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
  }
  .meet {
    width: 90%;
    margin-left: 21px;
    margin-top: 16px;
    p {
      display: block;
      letter-spacing: 1px;
      line-height: 30px;
      // border: 1px dashed #666666;
      padding: 10px;
      border-radius: 20px 0 20px;
      text-align: left;
    }
  }
  .ball {
    display: flex;
    // border: 1px solid;
    margin-top: 20px;
    span {
      flex: 1;
      text-align: center;
      font-size: 14px;
      // font-weight: bold;
      .van-rate {
        margin-right: 6px;
      }
    }
  }
  .listfind {
    color: #7c8e8f;
    // font-weight: bold;
    // margin-right: 200px;
    margin-top: 30px;
    text-align: left;
    margin-left: 20px;
  }
  .dall {
    margin-top: 25px;
    // border: 1px solid;
    width: 89%;
    margin-left: 20px;
    // border: 1px rgb(184, 178, 178) solid;
    border-radius: 10px;
    .iten {
      border-bottom: 1px solid gainsboro;

      margin-right: 50px;
      display: flex;
      margin-top: 15px;
      // padding: 0 14px;
      padding-bottom: 10px;
      box-sizing: border-box;
      font-size: 14px;

      margin-left: 50px;
      span {
        flex: 1;
        letter-spacing: 1.5px;
        // margin-left: 30px;
        // border: 1px solid #b6b6b6;
      }

      & > span:first-of-type {
        color: #62ec4c;
        // margin-right: 70px;
      }
      & > span:nth-of-type(2) {
        color: #1b1b1b;
        margin-left: 30px;
      }
    }
  }
  .meen {
    color: #787d7e;
    // font-weight: bold;
    margin-right: 250px;
    padding-top: 30px;
    padding-bottom: 20px;
  }
  .list {
    width: 100%;

    span {
      margin-right: 320px;
      text-align: left;
      font-size: 15px;
      // border: 1px solid;
      color: #1a1818;
      font-weight: 600;
      font-family: "fantasy";
    }
    .box-o {
      margin-top: 20px;
      img {
        border-radius: 10px;
        // box-shadow: 1px 1px 3px 3px rgb(207, 196, 196);
        width: 90%;
        margin-left: 20px;
        height: 400px;
      }
    }

    p {
      width: 90%;
      margin-left: 20px;
      text-align: left;
      // font-weight: 600;
      font-size: 14px;
      padding-top: 10px;
      padding-bottom: 20px;
    }
  }
  .time {
    text-align: left;
    margin-left: 20px;
    font-size: 14px;
    color: #787d7e;
  }
  .tips {
    text-align: left;
    width: 90%;
    margin: 0 auto;
    // border: 1px solid black;
    // padding-top: 10px;
    margin-top: 10px;
    background-color: #f5f9fa;
    h4 {
      margin-left: 15px;
      padding-top: 10px;
      padding-bottom: 5px;
    }
    p {
      padding-top: 10px;
      font-size: 16px;
      padding-left: 15px;
      padding-right: 15px;
      padding-top: 10px;
      padding-bottom: 15px;
      line-height: 30px;
      word-spacing: 307px;
    }
  }
  .discuss {
    width: 90%;
    margin: 0 auto;
    margin-top: 20px;
    h4 {
      text-align: left;
      // margin-left: 20px;
    }
    .observer {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      .adbse {
        display: flex;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .dkname {
          margin-left: 10px;
          font-size: 14px;
          text-align: left;
          span {
            color: #e4b235;
          }
          .fsize {
            text-align: left;
            font-size: 12px;
            color: #aeb8bb;
            line-height: 30px;
          }
          .button_is {
            text-align: left;
            // line-height: 30px;
            margin-top: 10px;
          }
          .oute {
            border: 1px solid black;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
