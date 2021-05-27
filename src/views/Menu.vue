<template>
  <div class="list">
    <div class="next">
      <p>
        菜品分类
        <span>
          <i class=" iconfont icon icon-chazhao" @click="Aonse"></i>
        </span>
      </p>
    </div>
    <!-- 加载 -->
    <div v-if="show">
      <van-loading type="spinner" color="#1989fa" />
    </div>
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item
        :title="item.name"
        v-for="(item, index) in cata"
        v-show="item.cs[0].name.length != 0"
        :key="index"
        :name="index"
      >
        <div class="list-box">
          <van-dropdown-menu v-model="activeNames" color="#48803f">
            <van-dropdown-item
              v-for="(menu, i) in item.cs"
              :key="i"
              :title="menu.name"
              :name="menu.name"
            >
              <div
                class="omg"
                v-for="(ce, index) in menu.cs"
                :key="index"
                @click="Menutail(ce.name, menu.name)"
              >
                <p>{{ ce.name }}</p>
                <!-- <p>{{ cs.image_url }}</p> -->
              </div>
            </van-dropdown-item>
          </van-dropdown-menu>
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cata: [],
      // activeNames: ["1"],
      //   通过 accordion 可以设置为手风琴模式，最多展开一个面板，此时 activeName 为字符串格式。
      activeName: 0,
      //	切换面板时触发	      回调函数  类型与 v-model 绑定的值一致
      activeNames: "b",
      show: true
      // itemlist: [],
    };
  },

  // 初始化数据
  created() {
    this.GetMenu();
  },
  methods: {
    //   跳转
    Aonse() {
      this.$router.push({
        name: "Moon"
      });
    },
    //返回上一级
    back() {
      this.$router.go(-1);
    },
    //绑定一个方法调用数据
    GetMenu() {
      this.axios({
        //请求类型
        method: "GET",
        url: "/recipe/catalogs"
      }).then(response => {
        this.cata = response.data.result.cs;
        // for (let i = 0; i < this.cata.length; i++) {
        // 	this.itemlist.push(this.cata[i].name);
        // }
        console.log(this.itemlist);
        console.log(this.cata);
        this.show = false;
      });
    },
    Menutail(title, name) {
      this.$router.push({
        name: "Menulist",
        query: {
          title: title,
          name: name
        }
      });
    }
  }
};
</script>

<style lang="less">
.list {
  .next {
    border-bottom: 1px solid rgb(198, 192, 212);
    p {
      width: 100%;
      margin-right: 100px;
      // border: 1px solid;
      // font-weight: 550px;
      font-size: 18px;
      span {
        margin-left: 245px;
        // margin-top: 20px;
        line-height: 50px;
        .iconfont {
          font-family: "iconfont" !important;
          color: rgb(5, 5, 5);
          font-size: 25px;
          font-style: normal;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      }
    }
  }

  .van-collapse-item {
    .van-cell {
      display: flex;
      box-sizing: border-box;
      // padding: 16px;
      // overflow: hidden;
      color: #323233;
      font-size: 14px;
      line-height: 24px;
      background-color: white;
      // border: 1px solid;
      .van-cell__title {
        margin-right: 200px;
        position: relative;
        text-align: left;
        width: 100%;
      }
      .van-icon {
        flex: 1;
        // margin-left: 200px;
        position: absolute;
        right: 30px;
      }
    }
    .van-dropdown-item__content {
      display: flex;
      flex-direction: row;
    }
    div::-webkit-scrollbar {
      display: none;
    }
    .omg {
      // width: 60%;
      width: 100%;
      // display: inline-block;
      // display: flex;
      // flex-direction: row;
      // justify-content: space-between;
      // border: 1px solid #dfdada;
      // margin-left: 20px;
      border-radius: 6px;
      p {
        display: block;
        padding-bottom: 20px;
        padding-top: 20px;
        width: 100px;
        border-radius: 6px;
        color: rgb(117, 94, 94);
        // background-color: rgb(253, 253, 253);
        background-color: white;
        // margin-right: 200px;
        border-right: 1px solid rgb(185, 172, 172);
      }
    }
  }
}
</style>
