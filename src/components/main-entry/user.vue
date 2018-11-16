<template lang="html">
<div class="">
  <div class="id-card">
    <img class="userIcon" :src="userInfo.img" alt="">
    <span class="spans">
      <span>昵称：{{userInfo.nick}}</span><br>
      <span>学号：{{userInfo.wid}}</span>
    </span>
  </div>
  <ul class="lists">
    <li >
        <a href="#/bonus/center"><span class="title">奖学金</span><span class="about"></span></a>
    </li>
    <li>
      <a href="/voucher/list"><span class="title">优惠券</span>
        <span v-if="voucherCount>0" class="about">{{voucherCount}}张优惠券可用&nbsp;&nbsp;</span>
        <span v-else class="about">&nbsp;&nbsp;</span>
      </a>
    </li>
  </ul>
</div>
</template>

<script>
import {
  LazyImage
} from '../../common/js/lazy'
import {
  Request
} from '../../api/request'
export default {
  name: 'usercenter',
  data() {
    return {
      userInfo: {},
      myLesson: {},
      uncompletedGroups: [],
      observer: '',
      voucherCount:0,
    }
  },
  created() {
    new Request("/shop/center.json", "POST").returnJson().then(res => {
      this.userInfo = {
        nick: res.nick,
        wid: res.wid,
        img: res.img
      };
      this.voucherCount=res.voucherCount;
    })
  }
}
</script>


<style media="screen" lang="scss" scoped>
.id-card {
  width: 100%;
    height: 8.75rem;
    background: url(//udata.youban.com/webimg/wxyx/puintuan/bonus-bg.png) no-repeat;
    background-size: 100% 100%;
    position: relative;
    border-bottom: 1px solid rgba(0,0,0,.1);
    .userIcon {
        width: 16vw;
        height: 16vw;
        border-radius: 50%;
        border: 3px solid #fff;
        position: absolute;
        left: 20%;
        top: 19%;
    }
    .bonus_entry {
        width: auto;
        height: auto;
        position: absolute;
        right: 0;
        top: 9.375rem;
        z-index: 100;
        img {
            width: 4.5rem;
        }
    }
    .spans {
        display: inline-block;
        position: absolute;
        top: 27%;
        left: 45%;
        span {
            font-size: 1rem;
            max-width: 9rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 500;
            text-align: left;
        }
    }
}
.lists{
  li{
    height: 3.13rem;
    line-height: 3.13rem;
    box-sizing: border-box;
    padding: 0 .75rem;
    border-bottom: 1px solid rgba(0,0,0,.1);
    position: relative;
    a{
      color: #2c3e50;
      display: block;
      height: 100%;
      .title{
        float: left;
        font-weight: 600;
      }
      .about{float: right;color: rgba(0,0,0,.5)}
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
}
</style>
<style media="screen" lang="css">
::-webkit-progress-bar {
    background: transparent;
}
::-webkit-progress-value {
    background: #eb6100;
}
/* .groupInfo__avatarbox >>> .avatar {
    display: inline-block;
    position: relative;
    width: 2.5rem;
    height: 2.5rem;
    margin-left: 0.31rem;
    float: left;
    border: 2px solid #fff;
    border-radius: 50%;
    background-image: url("https://avatar.youban.com/weixin/20180918/5ba0a2716fcf812493");
    background-repeat: no-repeat;
    background-size: 100% 100%;
} */
</style>
