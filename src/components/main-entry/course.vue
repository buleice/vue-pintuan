<template lang="html">
<div class="">
  <div class="miniProgram" v-if="showMiniQrcode">
      <img class="qrcode" src="//udata.youban.com/webimg/wxyx/puintuan/miniQrcode(1)@3x.png" alt="">
      <div class="mini-text">
        <p>您报名的课程也可在小程序进行打卡学习</p>
        <div class="info">
          —长按识别二维码 —
        </div>
      </div>
      <div class="closeMini" @click="showMiniQrcode=false">
        &times;
      </div>
  </div>
  <div class="myGroup" v-if="uncompletedGroups"  v-for="item in uncompletedGroups">
  <a :href="'/purchase/detail?buyingid='+item.Fbuyingid+'&groupid='+item.Fgroupid+'&from=from'" class="a_box">
        <img v-view="item['Fbanner'][0]" ref="lazy" alt="" class="course-img">
      <div class="groupInfo">
        <div class="groupInfo__avatarbox">
          <i v-for="(ava,index) in item['userList']" class="avatar" :style="computedAvatarStyle(index,ava,item.Fmode)"></i>
          <div class="" v-html="addvatar(item['userList'].length,item.Fmode)">

          </div>
        </div>
        <div class="groupInfo__middleBox">
          <span class="tuan_label">{{item['Fmode']}}人团</span>
          <span class="remainPeople">还差{{item['leftCount']}}人</span>
        </div>
        <div  class="groupInfo_buttton">邀请好友</div>
      </div>
  </a>
</div>

<div class="noempty" v-if="myLesson.length==0&&uncompletedGroups.length==0"><img src="https://udata.youban.com/webimg/other/quesheng.png"/></div>
  <div class="myGroup" v-for="item in myLesson">
    <a :href="item['url']" class="a_box" target="_blank">
			<img v-view="item['banner']" ref="lazy"  alt=""  class="course-img">
			<div class="groupInfo" :style="{background:item['total']!=0?'rgba(6,6,6,.4)':'rgba(6,6,6,0)'}">
				<div class="groupInfo__avatarbox">
          <div v-if="item['total']!=0">
             进度&nbsp;：<progress v-if="item['total']!=0" class="mypro" :value="setProgressValue(item['learned'],item['total'])" max="100"></progress><span>{{item['learned']}}/{{item['total']}}</span>
          </div>
				</div>
				<div  class="groupInfo_buttton">去学习</div>
			</div>
		</a>
		</div>
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
      showMiniQrcode:true,
    }
  },
  created() {
    new Request("/shop/mycourse.json", "POST").returnJson().then(res => {
      this.userInfo = {
        nick: res.nick,
        wid: res.wid,
        img: res.img
      };
      this.myLesson = res.myLesson;
      this.uncompletedGroups = res.uncompletedGroups;
    })
  },
  mounted() {

  },
  methods: {
    setProgressValue(learn, total) {
      return parseInt(parseInt(learn) / total * 100)
    },
    computedAvatarStyle(index, ava, Fmode) {
      if (index == 0) {
        return 'background-image:url(' + ava['headimg'] + ');z-index:' + parseInt(10 - index)+'display:inline-block;position:relative;width:2.5rem;height:2.5rem;margin-left:.31rem;float:left;border:2px solid #fff;border-radius:50%;background-repeat:no-repeat;background-size:100% 100%';
      } else {
        let marginLeft = 0.31 - (Fmode - 3) * 8 / 16;
        return 'background-image:url(' + ava['headimg'] + ');margin-left:' + marginLeft + 'rem;z-index:' + parseInt(10 - index)+'display:inline-block;position:relative;width:2.5rem;height:2.5rem;float:left;border:2px solid #fff;border-radius:50%;background-repeat:no-repeat;background-size:100% 100%';
      }
    },
    addvatar(count, mode) {
      let Rhtml = '';
      for (let i = 0; i < (mode - count); i++) {
        let style = 'background-image:url(//udata.youban.com/webimg/wxyx/puintuan/common/shopIndex/what@2x.png);margin-left:' + (0.31 - (mode - 3) * 8 / 16) + 'rem;z-index:' + (8 - i)+'display:inline-block;position:relative;width:2.5rem;height:2.5rem;float:left;border:2px solid #fff;border-radius:50%;background-repeat:no-repeat;background-size:100% 100%';
        Rhtml += '<i style="' + style + '"></i>';
      }
      return Rhtml
    }
  },
  // watch:{
  //     myLesson(){
  //       this.$nextTick(function(){
  //         this.observer=new LazyImage(this.$refs.lazy)
  //       })
  //     }
  // }
}
</script>


<style media="screen" lang="scss" scoped>
.miniProgram{
  width: 100%;
  height: 8.75rem;
  background: #fffbcb;
  position: relative;
  box-sizing: border-box;
  padding-top: 1rem;
  .qrcode{
    width: 6.88rem;
    height: 6.88rem;
    border-radius: 10px;
    vertical-align: middle;
  }
  .mini-text{
    display: inline-block;
    width: 9.38rem;
    height: 4.69rem;
    margin-left: 2.25rem;
    vertical-align: middle;
    .info{
      margin-top: 1rem;
      color: #b8b594;
    }
  }
  .closeMini{position: absolute;right: 0;top: 0;width: 2.5rem;height: 1.75rem;line-height: 1.75rem;border-radius: .88rem 0 0 .88rem;text-align: center;font-size: 2.25rem;background: #f69f00;color: #fff;}
}
.id-card {
    background: url("//udata.youban.com/webimg/wxyx/puintuan/common/shopIndex/userbg.png");
    background-repeat: no-repeat;
    background-size: 100% auto;
    padding-top: 58%;
    height: 0;
    position: relative;
    margin-top: -3.125rem;
    .userIcon {
        width: 16vw;
        height: 16vw;
        border-radius: 50%;
        border: 3px solid #fff;
        position: absolute;
        left: 20%;
        top: 54%;
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
        top: 60%;
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
.myGroup {
    display: block;
    width: 96%;
    height: auto;
    // padding: 0 0.625rem;
    margin: 0.88rem auto;
    position: relative;
    .a_box {
        display: block;
        position: relative;
        background: rgba(0,0,0,.1);
        height: auto;
        min-height: 10.69rem;
        color: #3c3c3c;
        border-radius: 0.625rem;
        .course-img {
            display: block;
            width: 100%;
            height: auto;
            border-radius: 0.625rem;
        }
        .groupInfo {
            width: 100%;
            height: 3.44rem;
            line-height: 3.44rem;
            color: #fff;
            padding: 0 0.38rem 0 0;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            border-radius: 0 0 0.625rem 0.625rem;
            position: absolute;
            left: 0;
            bottom: 0;
            background-color: rgba(6, 6, 6,.4);
            .groupInfo__avatarbox {
                width: auto;
                padding: 0 0.61rem 0 0;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                height: 100%;
                overflow: hidden;
                float: left;
                display: inline-block;
                vertical-align: middle;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                position: relative;
                font-size: 1rem;
                margin-left:0.63rem;
                .mypro {
                    background: rgba(6, 6, 6,.4);
                    border: 2px solid #fff;
                    width: 5.38rem;
                    height: 1.75rem;
                    border-radius: 0.88rem;
                    -webkit-appearance: none;
                    overflow: hidden;
                    color: #fff;
                    position: relative;
                    top: 0.38rem;
                    &+span {
                        position: absolute;
                        top: 0.94rem;
                        right: 0.61rem;
                        width: 5.38rem;
                        text-align: center;
                        line-height: 1.75rem;
                        background: transparent;
                    }
                }
            }
            .groupInfo__middleBox {
                display: inline-block;
                width: auto;
                height: 100%;
                float: left;
                position: relative;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                -ms-flex-direction: column;
                flex-direction: column;
                .tuan_label {
                    display: inline;
                    width: auto;
                    max-width: 2.81rem;
                    padding: 0.25rem;
                    margin-top: 0.25rem;
                    line-height: 0.94rem;
                    text-align: center;
                    background-image: url("//udata.youban.com/webimg/wxyx/youxue/_rentuanbg.png");
                    background-repeat: no-repeat;
                    background-size: cover;
                    color: #fff;
                    font-size: 0.625rem;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    border-radius: 4px 4px 4px 0;
                }
                .remainPeople {
                    display: inline-block;
                    line-height: 1.25rem;
                    margin-left: 0.63rem;
                }
            }
            &::after {
                content: '';
                display: block;
                clear: both;
            }
            .groupInfo_buttton {
                display: block;
                position: absolute;
                bottom: 0.625rem;
                right: 5px;
                width: 5.25rem;
                line-height: 2.2rem;
                text-align: center;
                background: #f69f00;
                border-radius: 1rem;
                color: #fff;
            }
        }
    }

}
.noempty {
    text-align: center;
    img {
        width: 40%;
        height: auto;
        overflow: hidden;
        display: block;
        margin: 10px auto 0;
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
</style>
