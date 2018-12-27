<template>
  <div class="container">
    <div class='banner'>
      <div class="myprize">
        <h3>活动奖品</h3>
        <ul class="single-prize" v-for="(item,index) in PrizeList" :key="index">
          <li><img :src="item.image" :alt="item.image"></li>
          <li>
            <div>{{item.name}}</div>
            <div class="valueAndNumber" v-if="item.number>0">&yen;<span>{{item.value}}</span>&nbsp;&nbsp;<span>共{{item.number}}份</span></div>
            <a :href="item.buy_url">马上去看看</a>
          </li>
        </ul>
      </div>
      <div class="intro">
        <img src="//udata.youban.com/webimg/wxyx/puintuan/common/20190101/intro.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import {Request} from "../../api/request";
  export default {
    name: "prizeList",
    data(){
      return{
        PrizeList:[]
      }
    },
    created(){
      new Request('/activity/20190101/prize.json',"GET").returnJson().then(res=>{
        this.PrizeList=res.prizeList;
      });
    }
  }
</script>

<style scoped lang="scss">
  .banner {
    width: 100%;
    background: url("//udata.youban.com/webimg/wxyx/puintuan/common/20190101/bg-003.png") no-repeat center top;
    background-size: 100% 554px;
    background-color: #f4f0e2;
    padding-top: 214px;
    box-sizing: border-box;
    .myprize {
      padding-top: 30px;
      width: 348px;
      height: auto;
      margin: auto;
      border: 1px solid #ed0d00;
      border-radius: 15px;
      background: #ffffff;
      position: relative;
      h3 {
        position: absolute;
        width: 150px;
        line-height: 30px;
        background: #ed0d00;
        border-radius: 15px;
        color: #ffffff;
        left: 50%;
        transform: translateX(-50%);
        top: -15px;
      }
      .single-prize {
        width: 230px;
        margin: auto;
        border-bottom: 1px dashed rgba(0, 0, 0, .3);
        list-style-type: none;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 110px;
        &:last-child {
          border: none;
        }
        li {
          height: 100%;
          &:first-child {
            display: flex;
            align-items: center;
            img {
              width: 80px;
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
              margin: 5px 0;
            }
            .valueAndNumber{
              font-size: 12px;
              color: #7c6660;
              span{
                font-size: 1rem;
              }
            }
            a {
              font-weight: 700;
              text-align: left;
              display: inline-block;
              width: 110px;
              line-height: 22px;
              color: #ed0d00;
              border-radius: 10px;
              margin: 5px 0;
              position: relative;
            }
          }
        }
      }
    }
    .intro{
      img{
        margin-top: 20px;
        width: 95%;

      }
    }
  }

</style>
