<template>
  <div class="search">
    <div class="box_v">
      <span><i class=" iconfont icon  icon-search"></i></span>
      <!-- @input 适用于实时查询，每输入一个字符都会触发该事件下面显示输入框的内容 -->
      <!--  v-model.trim绑定的时候加上 .trim 如果直接在开头输入空格，或者是在末尾输入空格，不会显示有输入内容的， -->
      <input
        type="text"
        @input="inputing = true"
        @keyup.enter="inputing = false"
        v-model.trim="inputValue"
        placeholder="查找菜名"
      />

      <!-- //有内容出来才显示 -->
      <button @click="inputValue = ''" v-if="suggests.length && inputValue">
        <i class="iconfont icon icon-qingchu3"></i>
      </button>
    </div>

    <div class="del" v-if="!suggests.length && !inputValue">
      <!-- 历史搜索 -->
      <h2>
        <div>
          <i class=" iconfont icon icon-shijian1"></i>
          <p>历史搜索</p>
        </div>
        <span @click="empty">
          <i class=" iconfont icon  icon-qingkong"></i
        ></span>
      </h2>

      <ul>
        <li
          v-for="(item, index) in historyList"
          :key="index"
          :item="item"
          @click="goSearchDetail(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>

    <div class="box-top">
      <!-- 如果没有显示搜索的内容就显示热门搜索内容 -->
      <p v-if="!suggests.length && !inputValue">
        热门搜索
      </p>
      <div class="next" v-for="(item, i) in search" :key="i">
        <div
          class="solid"
          v-if="!suggests.length && !inputValue"
          @click="getSugg_(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>

    <!-- <div class="box-v" v-if="inputing && suggests.length"> -->
    <div class="box-v">
      <!-- 搜索结果列表 -->
      <div class="list">
        <li
          v-for="(item, index) in suggests"
          :key="index"
          :item="item"
          @click="Moonlist(item.r.n)"
        >
          <i class=" iconfont icon icon-chazhao"></i>
          <span>{{ item.r.n }}</span>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: "",
      suggests: [], //搜索结果
      inputing: false,
      meen: [],
      item: [],
      search: [],
      historyList: [] //历史搜索记录，存本地
    };
  },
  mounted() {
    //如果本地存储的数据historyList有值，直接赋值给data中的historyList
    if (JSON.parse(localStorage.getItem("historyList"))) {
      this.historyList = JSON.parse(localStorage.getItem("historyList"));
      console.log(this.historyList);
    }
  },

  created() {
    this.Searchitem();
  },

  methods: {
    getSugg_(v) {
      this.inputValue = v.name;
      console.log(this.inputValue);
      // console.log("aaaa->", v.name);
      // this.$router.push({
      //   name: "Menulist",
      //   query: {
      //     title: v.name
      //   }
      // });
    },
    Moonlist(title) {
      this.$router.push({
        name: "Menulist",
        query: {
          title
        }
      });
    },
    Searchitem() {
      // get_热门_搜索

      this.axios({
        //请求类型
        method: "GET",
        url: "http://img.zzyyl.xyz/suggests.json"
      }).then(res => {
        // console.log('热门_搜索', res)
        this.search = res.data.result.suggests;
        console.log("hhhhh", this.search);
      });
      // // 搜索
      // if (this.inputValue == "") {
      //   this.$toast("请输入搜索内容");
      //   // return false;
      // } else {
      //   localStorage.tests = "我存储了";
      //   console.log("我存储了");
      // }
    },
    //点击历史搜索，跳转搜索结果页
    goSearchDetail(title) {
      // history[i] == index;
      this.$router.push({
        name: "Menulist",
        query: {
          //   name: this.inputValue
          title
        }
      });
    },

    //清空历史搜索记录
    empty() {
      this.$toast.success("清空历史搜索成功");
      localStorage.removeItem("historyList");
      this.historyList = [];
    }
  },

  watch: {
    inputValue(n, o) {
      //兼容 有时候是新的值 有时候是获取旧的值
      console.log(n || o);
      if (n.length <= 0) {
        this.suggests = [];
        return;
      }
      if (n || o) {
        // if (this.inputing) {
        this.axios({
          //请求类型
          method: "GET",
          //输入的框输入值就是 n 和 o 搜索的值在里面寻找
          url: "/recipe/list?keyword=" + n || o + "&type=seatchString"
        }).then(response => {
          this.suggests = response.data.result.list;
          console.log(this.suggests);
          // includes() 方法用来判断一个数组是否包含一个指定的值
          if (!this.historyList.includes(this.inputValue)) {
            // 如果没有就添加
            this.historyList.unshift(this.inputValue);
            //   localStorage.setItem存储historyList到本地
            localStorage.setItem(
              "historyList",
              // JSON.stringify() 方法将 historyList 对象转换为字符串 不然不能保存到。 localStorage
              JSON.stringify(this.historyList)
            );
          }
        });
      }
    }
  }
};
</script>

<style lang="less">
.box_v {
  width: 90%;
  height: 42px;
  // box-shadow: 1px 1px 1px rgb(197, 192, 192);
  margin-top: 15px;
  margin-left: 18px;
  // border-radius: 50px;
  background-color: rgb(240, 240, 240);
  border-radius: 10px;
  span {
    margin-left: 5px;
    width: 10px;
    .iconfont {
      font-family: "iconfont" !important;
      color: rgb(5, 5, 5);
      font-size: 14px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  }
  input {
    width: 70%;
    height: 30px;

    margin-left: 25px;
    background: none;
    outline: none;
    border: none;
    margin-top: 7px;
  }

  button {
    margin-left: 20px;
    // margin-top: 2px;
    outline: none;
    border: none;

    // color: rgb(230, 223, 223);
    // background-color: rgb(206, 192, 192);
    .iconfont {
      // margin-top: 20px;
      font-family: "iconfont" !important;
      // color: rgb(122, 118, 118);
      font-size: 22px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  }
}
.del {
  // width: 100%;
  h2 {
    display: flex;
    align-items: center;
    color: black;
    font-weight: 500;
    font-size: 16px;
    letter-spacing: 1.5px;
    width: 380px;
    margin-top: 25px;

    i {
      color: #585757;
      // font-size: 18px;
      margin-right: 6px;
    }
  }
  h2 > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 17px;
    // border: 1px solid;
  }
  span {
    flex: 1;
    margin-left: 245px;
  }
  & > ul {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    & > li {
      padding: 4px 12px;
      border-radius: 4px;
      color: #070707;
      background-color: #f0f3f6;

      margin-left: 14px;
      letter-spacing: 1.5px;
      margin-top: 10px;
      // margin-bottom: 8px;
      // box-shadow: 1px 1px 1px 1px rgb(216, 208, 208);
    }
  }
}
.del:first-child {
  & > h2 {
    justify-content: space-between;
  }
}

.box-top {
  margin-top: 25px;
  // width: 100%;

  p {
    color: black;
    // font-weight: 600;
    font-size: 16px;
    // margin-right: 310px;
    text-align: left;
    margin-left: 16px;
  }
  .next {
    margin-left: 11px;

    .solid {
      // border: 1px solid;
      border-radius: 4px;

      color: #070707;
      // margin: px 2px;
      margin-left: 5px;
      margin-top: 14px;
      margin-right: 10px;
      // border-radius: 6px;
      // border-bottom: 1px solid rgb(206, 204, 199);
      background-color: #f0f3f6;

      float: left;
      padding: 8px;
      // text-align: center;
      // background-color: #ececec;
      min-width: 70px;
    }
  }
}
.box-v {
  .list {
    margin-top: 30px;

    li {
      display: flex;
      margin-bottom: 26px;
      color: #4a4a4a;
      margin-left: 13px;
      i {
        flex: 0 0 8%;
      }
      span {
        // flex: 0 0 92%;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
