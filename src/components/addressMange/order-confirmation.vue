<template>
<div class="order-confirmation">
  <ul class="goodsInfo">
    <li class="course-img">
      <img src="//hiphotos.baidu.com/image/%77%3D%35%30%32%3B%63%72%6F%70%3D%30%2C%31%35%37%2C%35%30%32%2C%33%33%34/sign=c78b155c8dd6277fe91232381a037c42/b219ebc4b74543a9c2ac7b2b14178a82b80114a5.jpg" alt="">
    </li>
    <li class="course-infos">
      <div class="course-title">小伴龙是上的你会欸额vhi和vi会v</div>
      <div class="add-number">*1</div>
      <div class="the-price">￥69</div>
      <div class="course-hint">本课程包含实物商品，需要填写收获地址</div>
    </li>
  </ul>
  <div class="address-manage">
    <AddressBox></AddressBox>
    <AddAddress></AddAddress>
  </div>

</div>
</template>

<script>
  import AddAddress from './addAddress';
  import AddressBox from './userAddress'
    export default {
        name: "order-confirmation",
      components:{
        AddAddress,
        AddressBox
      }
    }
</script>

<style scoped lang="scss">
.order-confirmation{
  .goodsInfo{
    padding: 5px;
    box-sizing: border-box;
    height: 200px;
    li{
      float: left;
      &.course-img{
        width: 35%;
        height: 100%;
        img{
          width: 100%;
        }
      }
      &.course-infos{
        padding-left: 5px;
        box-sizing: border-box;
        width: 65%;
        height: 100%;
        .the-price,.add-number{
          text-align: right;
        }
        .course-hint{
          font-size: 12px;
          color: lightgray;
        }
      }
    }
  }
}
</style>
