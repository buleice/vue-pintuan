<template lang="html">
<div class="bonus-page">
  <div class="myAcount">
    <div class="rule" @click="showGuize=true">
      <img src="//udata.youban.com/webimg/wxyx/puintuan/bonus-rule-icon.png" alt="奖学金规则">
    </div>
    <div class="balance">
       <span>{{bonus}}</span><sub>优币</sub>
    </div>
    <div class="btn" @click="$router.push({path:'bill'})">
      查看明细
    </div>
    <div class="danmaku-box">
      <DanMaku :lists="barrage"/>
    </div>
  </div>
  <div class="cash">
  <div>
  <img src="//udata.youban.com/webimg/wxyx/puintuan/duigou.png" alt="">可提现&nbsp;<span>{{bonus/100}}</span>元</div> <a href="/bonus/cash/center">立即提现</a>
 </div>
 <div class="share_ad">
   分享课程获取更多奖学金
 </div>
  <ul class="canGetCourses">
  <li v-for="item in canGetCourses">
    <!-- <a :href="item.url" @click="gotoUrl(item.title)"> -->
    <a href="javascript:void(0);" @click="gotoUrl(item.url,item.title)">
      <img :src="item.img" :alt="item.title">
      <div class="infos">
        <div class="title" v-text="item.title"></div>
        <div class="subtitle" v-html="item.subtitle"></div>
        <div class="bonus">预计可得奖学金：<span>{{Number(item.bonus)}}&nbsp
            <b>优币</b>
          </span>
        </div>
      </div>
    </a>
  </li>
</ul>
<transition name="fade">
<div class="rule-pultop" v-if="showGuize">
 <div class="closeBtn"@click="showGuize=false"></div>
  <h2>提现规则</h2>
  <ul>
    <li>
      <h3>1. 什么是奖学金？</h3>
      <p>奖学金是小伴龙优学商城发放给学员的积分，学员可以使用奖学金兑换各种福利。</p>
    </li>
    <li>
      <h3>2. 如何获取奖学金？</h3>
      <p>目前奖学金主要通过邀请好友报名课程获得。你可以将自己正在参与的评课分享给好友，也可以直接分享推荐课程的邀请卡片分享至朋友圈，只要有好友通过你的邀请报名成功你即可获得奖学金。
        <br>后续将更新更多获得奖学金的方式，敬请期待。</p>
    </li>
    <li>
      <h3>3. 奖学金有什么用？</h3>
      <p>奖学金可用于兑换小伴龙优学的课程，后续将定期更新奖学金专属福利奖品；同时奖学金还可直接用于提现。</p>
    </li>
  </ul>
</div>
</transition>
</div>
</template>

<script>
import {
  Request
} from '../../../api/request';
import DanMaku from '../danmaku/danmaku'
export default {
  name: 'BonusIndex',
  components:{
    DanMaku
  },
  data() {
    return {
      canGetCourses: [],
      bonus: 0,
      count: 0,
      showGuize: false,
      barrage:[]
    }
  },
  created() {
    new Request("/shop/bonus.json", "POST").returnJson().then(res => {
      this.canGetCourses = res.data;
      this.bonus = res.bonus;
      this.count = res.count;
      this.barrage=res.barrage;
    })
  },
  methods: {
    gotoUrl: function(url, title) {
      window.location.href = url;
    },
  }
}
</script>

<style media="screen">
.subtitle p {
  display: block;
  height: 1.88rem;
  max-height: 2.19rem;
  overflow-y: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical
}

.share_ad{background: #f5f5f5;height: 2.5rem;line-height: 2.5rem;font-size: .88rem;border-bottom: 1px solid #f5f5f5;}
</style>
<style lang="scss" scoped>
.myAcount {
    height: 10.31rem;
    background:#fffbcb;
    background-size: 100% 100%;
    position: relative;
    .rule {
        img {
            float: right;
            margin: 0.75rem 15px 0 0;
            width: 4.88rem;
        }
        &::after {
            content: '';
            display: block;
            clear: both;
        }
    }
    .balance {
        border-top: 1px solid rgba(0,0,0,0);
        margin-top: 1.53rem;
        span {
            font-size: 2.06rem;
            color: #ff4e09;
            margin-right: 0.19rem;
           font-weight: 700;
        }
        sub {
            color: #ff4e09;
        }
    }
    .btn {
        width: 7rem;
        margin: 0.94rem auto 0;
        height: 2.13rem;
        font-size: 1rem;
        background-color: #ff4e09;
        line-height: 2.13rem;
        text-align: center;
        border-radius: 1.06rem;
        // padding: 0 0.63rem;
        color: #fff;
    }
    .danmaku-box{
      position: absolute;
      top: 1rem;
      left: 0rem;
      z-index: 5;
      width: 50%;
      height: 2.5rem;
    }
}
.cash {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 2.5rem !important;
    background: #fff;
    font-size: 0.88rem;
    box-sizing: border-box;
    padding: 0 0.31rem;
    position: relative;
    img{
      width: .94rem;
      vertical-align: sub;
      padding-bottom: 1px;
      padding-right: .31rem;
    }
    a {
        color: #656565;
        display: block;
        padding-right: 1.25rem;
        &::after {
            content: "";
            position: absolute;
            width: 0.5rem;
            height: 0.5rem;
            top: 50%;
            right: 0.63rem;
            border-top: 1px solid #656565;
            border-right: 1px solid #656565;
            transform: translate(-50%,-50%) rotate(45deg);
            -webkit-transform: translateY(-50%) rotate(45deg);
        }
    }
}
.canGetCourses {
    li {
        height: 8rem;
        border-bottom: 1px solid #DEDEDE;
        position: relative;
        a {
            color: #2c3e50;
            display: block;
            height: 100%;
            &::after {
                content: "";
                position: absolute;
                width: 0.5rem;
                height: 0.5rem;
                top: 50%;
                right: 0.94rem;
                border-top: 1px solid #656565;
                border-right: 1px solid #656565;
                transform: translate(-50%,-50%) rotate(45deg);
                -webkit-transform: translateY(-50%) rotate(45deg);
            }
            img {
                width: 6.75rem;
                height: 6.25rem;
                border-radius: 0.63rem;
                position: absolute;
                top: 0.63rem;
                left: 0.63rem;
            }
            .infos {
                position: absolute;
                left: 8.13rem;
                width: 13rem;
                height: 8rem;
                box-sizing: border-box;
                text-align: left;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .title {
                    font-size: 0.88rem;
                    line-height: 1.56rem;
                    font-weight: bold;
                }
                .subtitle {
                    font-size: 0.81rem;
                    line-height: 1.06rem;
                    color: #666;
                    max-height: 2.19rem;
                    overflow-y: hidden;
                }
                .bonus {
                    height: 1.88rem;
                    line-height: 1.88rem;
                    font-size: 1rem;
                    color: #FF4E09;
                    border-radius: 0.81rem;
                    & > span {
                        color: #FF4E09;
                        font-size: 1.13rem;
                        font-weight: bold;
                        b{
                          font-size: .75rem;
                        }
                    }
                }

            }
        }
    }
}
.rule-pultop {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    background: #fff;
    z-index: 5;
    .closeBtn {
        position: fixed;
        border-radius: 50%;
        width: 2.5rem;
        height: 2.5rem;
        top: 1.56rem;
        right: 0.63rem;
        &::before {
            content: "";
            position: absolute;
            width: 4px;
            height: 80%;
            background: #000;
            border-radius: 4px;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%) rotate(45deg);
            -webkit-transform: translate(-50%,-50%) rotate(45deg);
        }
        &::after {
            content: "";
            position: absolute;
            width: 4px;
            height: 80%;
            background: #000;
            border-radius: 4px;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%) rotate(-45deg);
            -webkit-transform: translate(-50%,-50%) rotate(-45deg);
        }
    }
    ul {
        padding: 0 0.63rem;
        h3 {
          color: #333;
          font-size: 1.06rem;
          line-height: 1.88rem;
          text-align: left;
        }
        p{
          padding: 0 1.25rem;
          margin-bottom: .63rem;
          text-align: left;
       }
    }
    h2 {
      text-align: center;
      font-size: 1.25rem;
      color: #333;
      line-height: 4.06rem;
    }

}
</style>
