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
          <a :href="item.buy_url" v-if='item.type==1'>马上去看看</a>
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
import {
  Request
} from "../../api/request";
export default {
  name: "prizeList",
  data() {
    return {
      PrizeList: []
    }
  },
  created() {
    new Request('/activity/20190101/prize.json', "GET").returnJson().then(res => {
      this.PrizeList = res.prizeList;
    });
  }
}
</script>

<style scoped lang="scss">
.container {
    padding-bottom: 2.5rem;
    .banner {
        width: 100%;
        background: url("//udata.youban.com/webimg/wxyx/puintuan/common/20190101/bg-003.png") no-repeat center top;
        background-size: 100% 34.63rem;
        background-color: #f4f0e2;
        padding-top: 13.38rem;
        box-sizing: border-box;
        transform: translateY(-57px);
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
                border-bottom: 1px dashed rgba(0, 0, 0, .3);
                list-style-type: none;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                height: 6.88rem;
                &:last-child {
                    border: none;
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
                        width:auto;
                        margin-left: 2.5rem;
                        margin-right: auto;
                        div {
                            font-weight: 700;
                            font-size: 1rem;
                            text-align: left;
                            margin: 0.31rem 0;
                            color: #ed0d00;
                        }
                        .valueAndNumber {
                            font-size: 0.75rem;
                            color: #7c6660;
                            span {
                                font-size: 1rem;
                            }
                        }
                        a {
                            font-weight: 700;
                            text-align: left;
                            display: inline-block;
                            width: 6.88rem;
                            line-height: 1.38rem;
                            color: inherit;
                            font-size: .88rem;
                            border-radius: 0.63rem;
                            margin: 0.31rem 0;
                            position: relative;
                        }
                    }
                }
            }
        }
        .intro {
            img {
                margin-top: 1.25rem;
                width: 95%;

            }
        }
    }
}
</style>
