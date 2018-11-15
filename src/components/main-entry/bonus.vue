<template lang="html">
<div class="bonus-page">
  <div class="myAcount">
    <div class="rule">
      <img src="//udata.youban.com/webimg/wxyx/puintuan/bonus-rule-icon.png" alt="奖学金规则">
    </div>
    <div class="balance">
       <span>{{bonus}}</span><sub>优币</sub>
    </div>
    <div class="btn">
      查看明细
    </div>
  </div>
  <div class="cash"><div>
  <span class="ok-icon"><span class="test2"></span></span>可提现&nbsp;<span>{{bonus/100}}</span>元</div> <a href="/bonus/cash/center">立即提现</a>
 </div>
  <ul class="canGetCourses">
  <li v-for="item in canGetCourses">
    <!-- <a :href="item.url" @click="gotoUrl(item.title)"> -->
    <a href="javascript:void(0);" @click="gotoUrl(item.url,item.title)">
      <img :src="item.img" :alt="item.title">
      <div class="infos">
        <div class="title" v-text="item.title"></div>
        <div class="subtitle" v-html="item.subtitle"></div>
        <div class="bonus">预计可得奖学金：￥
          <span v-text="Number(item.bonus)"></span>
        </div>
      </div>
    </a>
  </li>
</ul>
</div>
</template>

<script>
import {
  Request
} from '../../api/request'
export default {
  name: 'BonusPage',
  data() {
    return {
      canGetCourses: [],
      bonus:0,
      count:0,
    }
  },
  created() {
    new Request("/shop/bonus.json", "POST").returnJson().then(res => {
      this.canGetCourses = res.data;
      this.bonus=res.bonus;
      this.count=res.count;
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
p {
  max-height: 2.19rem;
  overflow-y: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical
}
.ok-icon{display:inline-block;line-height:1.5625rem;width:1.5625rem;height:1.5625rem;border:1px solid #13d799;border-radius:50%;margin-right:.625rem}
.test2{display:inline-block;width:.38rem;height:.1875rem;background:#13d799;line-height:0;font-size:0;vertical-align:middle;-webkit-transform:rotate(45deg);position:relative;top:.13rem;left:-.38rem;margin-left:.4375rem}
.test2:after{content:'/';display:block;width:.75rem;height:.1875rem;background:#13d799;-webkit-transform:rotate(-90deg) translateY(-50%) translateX(50%)}
</style>
<style lang="scss" scoped>
.myAcount{
  height: 10.31rem;
  background: url(//udata.youban.com/webimg/wxyx/puintuan/bonus-bg.png) no-repeat;
  background-size: 100% 100%;
  .rule{
    img{float: right;margin: .75rem 15px 0 0;width: 4.88rem;height: .81rem;}
    &::after{
      content: '';display: block;clear: both;
    }
  }
  .balance{
    border-top: 1px solid rgba(0,0,0,0);
    margin-top: 2.38rem;
    span{
      font-size: 1.88rem;color: #ff4e09; margin-right: .19rem;
    }
    sub{color: #ff4e09;}
  }
  .btn{
    width: 3.88rem;
    margin: .94rem auto 0;
    height: 2.13rem;
    background-color: #ff4e09;
    line-height: 2.13rem;
    text-align: center;
    border-radius: 1.06rem;
    padding: 0 .63rem;
    color:#fff;
  }
}
.cash {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 2.5rem !important;
    background: #F5F5F5;
    font-size: 0.88rem;
    box-sizing: border-box;
    padding: 0 0.31rem;
    letter-spacing: 1px;
    position: relative;
    a {
        color: #656565;
        display: block;
        padding-right: 1.25rem;
        &::after {
            content: "";
            position: absolute;
            width: .5rem;
            height: .5rem;
            top: 50%;
            right: .63rem;
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
                width: 16px;
                height: 16px;
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
                height: 7.81rem;
                padding: 0.63rem 0;
                box-sizing: border-box;
                text-align: left;
                .title {
                    font-size: 0.88rem;
                    line-height: 1.56rem;
                    font-weight: bold;
                    margin-bottom: 0.13rem;
                }
                .subtitle {
                    font-size: 0.81rem;
                    line-height: 1.06rem;
                    color: #666;
                    max-height: 2.19rem;
                    overflow-y: hidden;
                    margin-bottom: 0.63rem;
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
                    }
                }

            }
        }
    }
}
</style>
