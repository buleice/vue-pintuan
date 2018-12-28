<template>
<div class="container">
  <div class="lucky-wheel">
    <!--<div class="lucky-title"></div>-->
    <div class="lucky-danmuku">
      <div class="" v-show="danmakuText.name">
        <span>{{danmakuText.name}}</span><span>&nbsp;&nbsp;刚刚获得了</span> <span>{{danmakuText.prize}}</span>
      </div>
    </div>
    <div class="wheel-main">
      <div class="wheel-pointer-box">
        <div class="wheel-pointer" @click="rotate_handle()" :style="{transform:rotate_angle_pointer,transition:rotate_transition_pointer}"></div>
      </div>
      <div class="wheel-outerbg">
        <div class="wheel-bg" :style="{transform:rotate_angle,transition:rotate_transition}">
          <div class="prize-list">
            <div class="prize-item" v-for="(item,index) in prize_list" :key="index">
              <div class="prize-type">
                {{item.name}}
              </div>
              <div class="prize-pic">
                <img :src="item.image">
              </div>
              <!--<div class="prize-count" v-if="item.count">-->
              <!--{{item.count}}-->
              <!--</div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="lottery_ticket">今日剩余抽奖次数：{{chances}}</div>
    <img class="xbl" src="//udata.youban.com/webimg/wxyx/puintuan/common/20190101/xbl (2).png" alt="">
  </div>
  <div class="main">
    <div class="myprize"  v-if="myPrizeList.length>0">
      <h3>我的奖品</h3>
      <ul class="single-prize" v-for="(item,index) in myPrizeList" :key="index">
        <li><img :src="item.image" :alt="item.image"></li>
        <li>
          <div>{{item.name}}</div>
          <a :href="item.url">马上领取</a>
        </li>
      </ul>
    </div>
    <!-- <h3 v-else class="velse">您还未获得奖品</h3> -->
    <div class="intro">
      <img src="//udata.youban.com/webimg/wxyx/puintuan/common/20190101/intro.png" alt="">
    </div>

  </div>
  <div class="toast" v-show="toast_control">
    <div class="toast-container">
      <h3>恭喜你获得</h3>
      <h3>{{prizeInfo.name}}</h3>
      <img :src="prizeInfo.image" alt="">
      <a :href="prizeInfo.url" class="getPrize"></a>
      <div class="close" @click="close_toast()"></div>
    </div>
  </div>
  <div class="toast-mask" v-show="toast_control"></div>
  <WxDialog :alertDesc="alertDesc" :showAlertDialog="showAlertDialog" @AOk="delPok"></WxDialog>
</div>
</template>
<script>
import WxDialog from '../base/weixin-dialog/weixin-dialog'
import {
  Request
} from "../../api/request";

export default {
  name: 'lottery',
  components:{
    WxDialog,
  },
  data() {
    return {
      alertDesc:'您还没有获得抽奖机会,快去购买课程赚取抽奖机会吧！',
      showAlertDialog:false,
      easejoy_bean: 0, //金豆
      lottery_ticket: 0, //抽奖次数
      prize_list: [], //奖品列表
      toast_control: false, //抽奖结果弹出框控制器
      hasPrize: true, //是否中奖
      start_rotating_degree: 0, //初始旋转角度
      rotate_angle: 0, //将要旋转的角度
      start_rotating_degree_pointer: 0, //指针初始旋转角度
      rotate_angle_pointer: 0, //指针将要旋转的度数
      rotate_transition: "transform 6s ease-in-out", //初始化选中的过度属性控制
      rotate_transition_pointer: "transform 12s ease-in-out", //初始化指针过度属性控制
      click_flag: true, //是否可以旋转抽奖
      index: 0,
      myPrizeList: [],
      prizeInfo: {},
      chances: 0,
      danmakuText:{},
      messageList:[]
    };
  },
  created() {
    this.init_prize_list();
  },
  computed: {
    toast_title() {
      return this.hasPrize ?
        "恭喜您，获得" + this.prize_list[this.index].name :
        "未中奖";
    },
    toast_pictrue() {
      return this.hasPrize ?
        require("../../assets/img/congratulation.png") :
        require("../../assets/img/sorry.png");
    }
  },
  methods: {
    delPok(){
      this.showAlertDialog=false;
    },
    //此方法为处理奖品数据
    init_prize_list() {
      new Request('/activity/20190101/index.json', "GET").returnJson().then(res => {
        this.prize_list = res.lotterPrizeList;
        this.myPrizeList = res.myPrizeList;
        this.chances = res.chances;
        this.messageList=res.messageList;
      });
    },
    rotate_handle() {
      if (this.click_flag) {
        this.click_flag=false;
        if(this.chances > 0){
          new Request('/lottery/execute.json', 'GET').returnJson().then(res => {
            if (res.rc == 0) {
              this.chances = this.chances - 1;
              this.index = res.result;
              this.prizeInfo = Object.assign({}, this.prize_list[this.index], {
                url: res.url
              })
              this.rotating();
            }
          })
        }else{
          this.$router.push({path:'/activitylessons'})
        }
      }else{
        // this.showAlertDialog=true;
        return
      }
    },
    rotating() {
      // if (!this.click_flag) return;
      var type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
      var during_time = 5; // 默认为1s
      var random = Math.floor(Math.random() * 7);
      var result_index = this.index; // 最终要旋转到哪一块，对应prize_list的下标
      var result_angle = [337.5, 292.5, 247.5, 202.5, 157.5, 112.5, 67.5, 22.5]; //最终会旋转到下标的位置所需要的度数
      var rand_circle = 6; // 附加多转几圈，2-3
      this.click_flag = false; // 旋转结束前，不允许再次触发
      if (type == 0) {
        // 转动盘子
        var rotate_angle =
          this.start_rotating_degree +
          rand_circle * 360 +
          result_angle[result_index] -
          this.start_rotating_degree % 360;
        this.start_rotating_degree = rotate_angle;
        this.rotate_angle = "rotate(" + rotate_angle + "deg)";
        // // //转动指针
        // this.rotate_angle_pointer = "rotate("+this.start_rotating_degree_pointer + 360*rand_circle+"deg)";
        // this.start_rotating_degree_pointer =360*rand_circle;
        var that = this;
        // 旋转结束后，允许再次触发
        setTimeout(function() {
          that.click_flag = true;
          that.game_over();
        }, during_time * 1000 + 1500); // 延时，保证转盘转完
      } else {
        //
      }
    },
    game_over() {
      this.init_prize_list();
      this.toast_control = true;
    },
    //关闭弹窗
    close_toast() {
      this.toast_control = false;
    },
    rnd(n, m) {
      var num = Math.floor(Math.floor(Math.random() * (m - n + 1) + n))
      return num;
    }
  },
  watch:{
    messageList(){
      if (this.messageList.length > 0) {
        let initIndex=0;
        let interval = setInterval(() => {
          this.danmakuText = this.messageList[initIndex];
          initIndex++;
          if (initIndex>=this.messageList.length) {
            initIndex=0;
          }
        }, 4000)
      }
    }
  }
};
</script>
<style scoped>
@keyframes danmu {
  0 {
    -webkit-transform: translateY(.9375rem);
    transform: translateY(.9375rem);
    opacity: 1
  }

  40% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1
  }

  65% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1
  }

  85% {
    -webkit-transform: translateY(-.9375rem);
    transform: translateY(-.9375rem);
    opacity: 0
  }

  100% {
    opacity: 0
  }
}

.container {
  width: 100%;
}

.lucky-wheel {
  width: 100%;
  height: 40.5625rem;
  background: rgb(252, 207, 133) url("//udata.youban.com/webimg/wxyx/puintuan/common/20190101/bg-02.jpg") no-repeat center top;
  background-size: 100%;
  position: relative;
}

.lucky-danmuku {
  position: relative;
  top: 7.81rem;
  width: 14.69rem;
  height: 2rem;
  margin: auto;
  background: rgba(0, 0, 0, 0) url("//udata.youban.com/webimg/wxyx/puintuan/common/20190101/pop-bg.png") no-repeat;
  background-size: 100%;
  overflow: hidden;
}

.lucky-danmuku div {
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  color: #fff;
  animation: danmu 4s;
  /* animation-delay: 1s; */
  animation-iteration-count: infinite;
  font-size: .75rem;
  box-sizing: border-box;
padding-left: 3rem;
text-align:left;
transform: translateY(1rem);
}
.lucky-danmuku div span{
    display: inline-block;
    float: left;
}
.lucky-danmuku div span:first-child{
  width: auto;
  max-width: 3rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.xbl {
  display: flex;
  position: absolute;
  width: 4.25rem;
  bottom: 7.13rem;
  right: .63rem;
}

.lucky-title {
  width: 100%;
  height: 8.125rem;
  background: url("../../assets/img/lucky_title.png") no-repeat center top;
  background-size: 100%;
}

.wheel-main {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 8rem;
}

.wheel-outerbg {
  width: 21.5rem;
  height: 23.75rem;
  background: url("//udata.youban.com/webimg/wxyx/puintuan/common/20190101/bg-022.png") no-repeat center top;
  background-size: 100%;
  box-sizing: border-box;
  padding-top: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  /*transition: transform 3s ease;*/
}

.wheel-bg {
  width: 21.13rem;
  height: 21.13rem;
  margin: auto;
  background: url("//udata.youban.com/webimg/wxyx/puintuan/common/20190101/wheel2.png?") no-repeat center top;
  background-size: 100%;
  color: #fff;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  transition: transform 3s ease;
  transform-origin: center;
}

.wheel-pointer-box {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;
  transform: translate(-50%, -75%);
  width: 5.3125rem;
  height: 5.3125rem;
}

.wheel-pointer {
  width: 5.44rem;
  height: 7.38rem;
  background: url("//udata.youban.com/webimg/wxyx/puintuan/common/20190101/jiantou4.png") no-repeat center top;
  background-size: 100%;
  /*transform-origin: center 60%;*/
  transform-origin: center;
  /*margin-top: .25rem;*/
}

.wheel-bg div {
  text-align: center;
}

.prize-list {
  width: 100%;
  height: 100%;
  position: relative;
}

.prize-list .prize-item {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}

.prize-list .prize-item:first-child {
  top: 0;
  /*left: 8.3125rem;*/
  left: 9.527rem;
  transform: rotate(20deg);
}

.prize-list .prize-item:nth-child(2) {
  /*top: 2.8rem;*/
  top: 3.209rem;
  /*left: 10.8rem;*/
  left: 12.37rem;
  transform: rotate(67deg);
}

.prize-list .prize-item:nth-child(3) {
  /*top: 6.4rem;*/
  top: 7.335rem;
  /*left: 10.6rem;*/
  left: 12.14rem;
  transform: rotate(-250deg);
}

.prize-list .prize-item:nth-child(4) {
  /*top: 9rem;*/
  top: 10.315rem;
  /*left: 8.2125rem;*/
  left: 9.4126rem;
  transform: rotate(-210deg);
}

.prize-list .prize-item:nth-child(5) {
  /*top: 9.2125rem;*/
  top: 10.559rem;
  /*left: 4.4rem;*/
  left: 5.042rem;
  transform: rotate(-160deg);
}

.prize-list .prize-item:nth-child(6) {
  /*top: 6.3875rem;*/
  top: 7.3209rem;
  /*left: 1.9rem;*/
  left: 2.177rem;
  transform: rotate(-111deg);
}

.prize-list .prize-item:nth-child(7) {
  /*top: 2.8rem;*/
  top: 3.209rem;
  /*left: 1.8125rem;*/
  left: 2.077rem;
  transform: rotate(-69deg);
}

.prize-list .prize-item:nth-child(8) {
  top: 0;
  /*left: 4.5rem;*/
  left: 5.157rem;
  transform: rotate(-20deg);
}

.prize-item {
  /*width: 5.875rem;*/
  /*height: 9rem;*/
  width: 6.73354rem;
  height: 10.31522122rem;
}

.prize-pic img {
  width: 2.2rem;
  margin-top: .63rem;
  /*height: 2.5rem;*/
}

.prize-count {
  font-size: 0.875rem;
}

.prize-type {
  margin-top: 2.5rem;
  font-size: 1rem;
  color: #9f090e;
}

.lottery_ticket {
  position: absolute;
  bottom: 5rem;
  width: 100%;
  text-align: center;
  color: #ff481d;
}

.toast-mask {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10000;
  width: 100%;
  height: 100%;
}

.toast-btn div {
  background-image: -moz-linear-gradient(-18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%);

  background-image: -ms-linear-gradient(-18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%);
  background-image: -webkit-linear-gradient(-18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%);
  box-shadow: 0px .25rem 0px 0px rgba(174, 34, 5, 0.7);
  width: 4.6875rem;
  height: 1.875rem;
  border-radius: 1.875rem;
  text-align: center;
  line-height: 1.875rem;
  color: #fff;
}

.close {
  position: absolute;
  top: 1.88rem;
  right: 0px;
  width: 2rem;
  height: 5rem;
  background: url('//udata.youban.com/webimg/wxyx/puintuan/common/20190101/close(2).png') no-repeat center top;
  background-size: 100%;
}
</style>
<style lang="scss" scoped>
.toast {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 20000;
    transform: translate(-50%, -50%);
    .toast-container {
        position: relative;
        width: 20rem;
        height: 23.25rem;
        background: url("//udata.youban.com/webimg/wxyx/puintuan/common/20190101/prize-bg.png") no-repeat center top;
        background-size: 100% 100%;
        box-sizing: border-box;
        padding-top: 7.81rem;
        h3 {
            color: #4c2416;
            &:nth-child(2) {
                font-size: 1.25rem;
                color: #ff481d;
            }
        }
        img {
            margin-top: 1.75rem;
            height: 4.25rem;
            width: auto;
        }
        .getPrize {
            display: block;
            width: 10.63rem;
            height: 2.75rem;
            margin: 1.88rem auto 0;
            text-decoration: none;
            background: url("//udata.youban.com/webimg/wxyx/puintuan/common/20190101/getbtn.png") no-repeat center top;
            background-size: 100% 100%;

        }

    }
}
.main {
      transform: translateY(-3.13rem);
    background-color: #f4f0e2;
    .myprize {
        padding-top: 1.88rem;
        width: 21.75rem;
        height: auto;
        margin: auto;
        border: 1px solid #ed0d00;
        border-radius: 0.94rem;
        background: #ffffff;
        position: relative;
        h3 {
            position: absolute;
            width: 9.38rem;
            line-height: 1.88rem;
            background: #ed0d00;
            border-radius: 0.94rem;
            color: #ffffff;
            left: 50%;
            transform: translateX(-50%);
            top: -.94rem;
        }
        .single-prize {
            width: 17.5rem;
            margin: auto;
            border-bottom: 1px dashed rgba(0,0,0,.3);
            list-style-type: none;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            height: 6.88rem;
            &:last-child {
                border: none;
                margin: auto;
            }
            li {
                height: 100%;
                &:first-child {
                    display: flex;
                    align-items: center;
                    img {
                        width: 5rem;
                    }
                }
                &:last-child {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    div {
                        font-weight: 700;
                        font-size: 1rem;
                        text-align: left;
                        margin: 0.31rem 0;
                    }
                    a {
                        font-weight: 700;
                        text-align: center;
                        display: inline-block;
                        width: 6.88rem;
                        line-height: 1.38rem;
                        color: #ed0d00;
                        border-radius: 0.63rem;
                        text-decoration: none;
                        border: 1px solid currentColor;
                        margin: 0.31rem 0;
                        position: relative;
                        &::after {
                            content: "";
                            position: absolute;
                            width: 0.5rem;
                            height: 0.5rem;
                            top: 50%;
                            right: 0.63rem;
                            border-top: 0.13rem solid #ed0d00;
                            border-right: 0.13rem solid #ed0d00;
                            transform: translate(-50%,-50%) rotate(45deg);
                            -webkit-transform: translateY(-50%) rotate(45deg);
                        }

                    }
                }
            }
        }
    }
    .velse{color: #ed0d00;}
    .intro{
      img{
        margin-top: 1.25rem;
        width: 95%;
      }
    }
}

</style>
