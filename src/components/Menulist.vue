<template>
  <div class="box_T">
    <van-sticky>
      <div @click="Top">
        <van-nav-bar
          title="菜名列表"
          left-text="返回"
          left-arrow
          @click-left="back"
        />
      </div>
    </van-sticky>
    <!-- 加载 -->
    <div v-if="show">
      <van-loading color="#1989fa" />
    </div>
    <div
      class="next"
      v-for="(item, index) in meen"
      :key="index"
      :item="item"
      @click="Faature(item.r.id)"
    >
      <div class="box">
        <img :src="item.r.img" alt="" />
      </div>

      <div class="boom">
        <p class="nun">{{ item.r.n }}</p>
        <p class="list">
          <span>{{ item.r.rate }}分 -</span>
          <span> {{ item.r.recommend_label }}</span>
        </p>

        <div class="item">
          <p>
            <img :src="item.r.a.p" alt />
          </p>
          <h4>
            {{ item.r.an }}
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      meen: [],
      major: [],
      cook: [],
      value: 1,
      search: [],
      show:true
    };
  },

  mounted() {

  },
  created() {

    this.GetMenulist();
  },
  activated() {
    this.GetMenulist();
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
    Faature(id) {
      console.log(id);
      this.$router.push({
        name: "Cookstep",
        query: {
          id
        }
      });
    },
    GetMenulist() {
      this.meen = "";
      this.axios({
        //请求类型
        method: "GET",
        url: "/recipe/list",
        params: {
          keyword: this.$route.query.title
        }
      }).then(response => {
        console.log(response.data.result);
        this.meen = response.data.result.list;
        console.log(this.meen);
        this.show = false
      });
      console.log(this.$route.query.title);
    }
  }
};
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
  border: 0;
}

.box_T {
  // border: 1px solid;
  .next {
    width: 100%;
    // height: 100%;
    // border: 1px solid;
    margin-top: 20px;
    display: flex;
    .box {
      flex: 1;
      // border: 1px solid;
      height: 120px;
      // width: 100px;
      img {
        width: 200px;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
        margin-left: 10px;
      }
    }
    .boom {
      // border: 1px solid;
      // margin-right: 10px;
      flex: 1;
      // position: relative;
      // border: 1px solid;
      position: relative;
      margin-left: 15px;
      .nun {
        // font-weight: bold;
        width: 100%;
        font-size: 16px;
        position: absolute;
        left: 0;
        padding-top: 15px;
        text-align: left;
        // border: 1px solid;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .list {
        font-size: 30px;
        position: absolute;
        left: 0;
        top: 25px;
        // border: 1px solid;
        margin-top: 10px;
        span {
          font-size: 12px;
        }
      }
      .item {
        display: flex;
        align-items: center;
        // margin-left: 4px;
        margin-top: 82px;
        img {
          width: 25px;
          height: 25px;
          border-radius: 50%;
        }

        h4 {
          color: #0d0d0d;
          font-weight: 400;
          font-size: 10px;
          margin: 0 4px;
          letter-spacing: 1px;
        }
      }
    }
  }
}
</style>
