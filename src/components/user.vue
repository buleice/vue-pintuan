<template lang="html">
<div class="">
  <div class="id-card">
    <img class="userIcon" :src="userInfo.img" alt="">
    <span>
      <span>昵称：{{userInfo.nick}}</span><br>
      <span>学号：{{userInfo.wid}}</span>
    </span>
    <a href="/bonus/detail" class="bonus_entry" style="display: none;">
      <img src="http://udata.youban.com/webimg/wxyx/puintuan/bonus.png" alt="">
      <b>奖学金</b>
    </a>
  </div>

  <div class="myGroup" v-if="uncompletedGroups"  v-for="item in uncompletedGroups">
  <a :href="'/purchase/detail?buyingid='+item.Fbuyingid+'&groupid='+item.Fgroupid+'&from=from'" class="a_box">
        <img v-lazy="item['Fbanner'][0]" alt="">
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

<div class="noempty" v-if="!myLesson&&!uncompletedGroups"><img src="https://udata.youban.com/webimg/other/quesheng.png"/></div>

  <div class="myGroup" v-for="item in myLesson">
    <a :href="item['url']" class="a_box" target="_blank">
			<img v-lazy="item['banner']" data-url="" alt="">
			<div class="groupInfo" :style="{background:item['total']!=0?'rgba(6,6,6,.4)':'rgba(6,6,6,0)'}">
				<div class="groupInfo__avatarbox" style="margin-left:0.63rem">
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
import {Request} from '../api/request'
export default {
  name:'usercenter',
  data(){
    return{
      userInfo:{},
      myLesson:{},
      uncompletedGroups:[]
    }
  },
  created(){
        new Request("/shop/mine.json","POST").returnJson().then(res=>{
          this.userInfo={
            nick:res.nick,
            wid:res.wid,
            img:res.img
          };
          this.myLesson=res.myLesson;
          this.uncompletedGroups=res.uncompletedGroups;
        })
  },
  methods:{
    setProgressValue(learn,total){
      return parseInt(parseInt(learn)/total*100)
    },
    computedAvatarStyle(index,ava,Fmode){
      if(index==0){
        return 'background-image:url('+ava['headimg']+');z-index:'+parseInt(10-index);
      }else{
        let marginLeft=0.31-(Fmode-3)*8/16;
        return 'background-image:url('+ava['headimg']+');margin-left:'+marginLeft+'rem;z-index:'+parseInt(10-index);
      }
    },
    addvatar(count,mode){
      let Rhtml='';
      for(let i=0; i<(mode-count); i++){
        let style='background-image:url(//udata.youban.com/webimg/wxyx/puintuan/common/shopIndex/what@2x.png);margin-left:'+(0.31-(mode-3)*8/16)+'rem;z-index:'+(8-i);
         Rhtml+='<i class="avatar" style="'+style+'"></i>';
      }
      return Rhtml
    }
  }
}
</script>

<style lang="css" scoped="true">
.id-card{background:url(//udata.youban.com/webimg/wxyx/puintuan/common/shopIndex/userbg.png);background-repeat:no-repeat;background-size:100% auto;padding-top: 58%;height: 0;position:relative;margin-top:-3.125rem}
.id-card img.userIcon{width:16vw;height:16vw;border-radius:50%;border:3px solid #fff;position:absolute;left:20%;top:54%}
.bonus_entry{display: flex;align-items: center;justify-content: space-around;width:5.63rem;height: 2.13rem;background: #fff;position: absolute;right: 0;top: 4.88rem;border-radius: 1rem 0 0 1rem;box-shadow: -2px 3px 15px 1px rgba(0,0,0,.2) ;color: #3e3e3e}
.bonus_entry img{width: 1rem;height: auto;margin-left: .63rem}
.id-card>span{display:inline-block;position:absolute;top:60%;left:45%}
.id-card span{font-size:1rem;max-width: 9rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;font-weight: 500;text-align: left;}
.mypro{background:rgba(6, 6, 6,.4);border:2px solid #fff;width:5.38rem;height:1.75rem;border-radius: .88rem;-webkit-appearance: none;overflow: hidden;color: #fff;position: relative;top: .38rem;}
.mypro+span{position: absolute;top: .94rem;right: 0.61rem;width: 5.38rem;text-align: center;line-height: 1.75rem;background: transparent;}
::-webkit-progress-bar{
  background:transparent;
}
::-webkit-progress-value{
    background:#eb6100;
 }
 .noempty{text-align:center}
 .noempty img{width:40%;height:auto;overflow:hidden;display:block;margin:10px auto 0}
 	.myGroup{display:block;height:auto;padding:0 .625rem;margin:.88rem auto;position:relative}
 	.learning_progress{position: absolute;top: 10px;left: 0.625rem;min-width: 3.25rem;padding: .5rem;border-radius: 0 .88rem 0.88rem 0;background: #fff;text-align: center;color: #3c3c3c}
 	.myGroup .a_box,img{display:block;width: 100%;height:100%;position:relative;color: rgba(0,0,0.5);color: #3c3c3c;border-radius: .625rem;}
 	.groupInfo{width: 100%;height:3.44rem;line-height: 3.44rem;color: #fff;padding: 0 .38rem 0 0;-webkit-box-sizing: border-box;box-sizing: border-box;border-radius:0 0 .625rem .625rem;position: absolute;left: 0;bottom: 0;background-color: rgba(6, 6, 6,.4)}
   .groupInfo__avatarbox{width: auto;padding: 0 .61rem 0 0;-webkit-box-sizing: border-box;box-sizing: border-box;height: 100%;overflow: hidden;float: left;display: inline-block;vertical-align: middle;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align: center;-ms-flex-align: center;align-items: center;position: relative;font-size: 1rem;}
 	.groupInfo__avatarbox >>> .avatar{display: inline-block;position: relative;width: 2.5rem;height: 2.5rem;margin-left: .31rem;float: left;border: 2px solid #fff;border-radius: 50%;background-image: url('https://avatar.youban.com/weixin/20180918/5ba0a2716fcf812493');background-repeat: no-repeat;background-size: 100% 100%;}
 	.groupInfo .remainTime{float: right;line-height: 3.44rem;margin-right: .5rem;}
 	.groupInfo__middleBox{display: inline-block;width: auto;height: 100%;float: left;position: relative;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-orient: vertical;-webkit-box-direction: normal;-ms-flex-direction: column;flex-direction: column;}
   .groupInfo__middleBox .tuan_label{display: inline;width: auto;max-width: 2.81rem;padding: .25rem .25rem;margin-top: .25rem;line-height: .94rem;text-align: center;background-image: url(//udata.youban.com/webimg/wxyx/youxue/_rentuanbg.png);background-repeat: no-repeat;background-size: cover;color:#fff;font-size:.625rem;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:4px 4px 4px 0;}
 	.groupInfo__middleBox .remainPeople{display: inline-block;line-height: 1.25rem;margin-left: .63rem}
 	.groupInfo::after{content: '';display: block;clear: both;}
 	.groupInfo .groupInfo_buttton{display: block;position: absolute;bottom: .625rem;right: 5px;width: 6.25rem;line-height: 2.2rem;text-align: center;background: #f69f00;border-radius: 1rem;color: #fff;}

</style>
