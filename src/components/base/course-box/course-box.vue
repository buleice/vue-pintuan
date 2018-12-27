<template>
    <a class="coursre-box" :href="data.url">
        <img class="course-img" @imgLoad="imgLoad" :src="data.icon" alt="">
        <div class="coursre-intro">
            <h4 class="course-title">{{data.title}}</h4>
            <div class="course-desc" v-html="data.subtitle"></div>
            <div class="course-label"><img src="../../../assets/课时(1).png" alt=""><span>{{data.number}}</span><img src="../../../assets/人物拷贝.png" alt=""><span>{{data.sales}}</span></div>
        </div>
        <a class="coursre-button">去学习</a>
    </a>
</template>

<script>

    export default {
        name: "coursre-box",
        props:{
            data:{
                type:Object,
                default:null
            }
        },
        methods:{
            imgLoad(){
                this.$emit('imgLoad')
            }
        }
    }
</script>

<style scoped lang="scss">
    .coursre-box{
        width: 100%;
        height: 6.88rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        color:#555;
        position: relative;
        .course-img{
            width: 5.25rem;
            height: 5.25rem;
            border-radius: .31rem;
            margin-right: 0.625rem;
        }
        .coursre-intro{
            box-sizing: border-box;
            text-align: left;
            .course-title{
                max-width: 16.3rem;
                width: 16.3rem;
                line-height: 1.5;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 1rem;
                color:#2c3e50;
                font-weight: 550;
            }
            .course-desc{
                max-width: 16.25rem;
                font-size: .875rem;
                color: rgba(0,0,0,.7);
                box-sizing: border-box;
                /*display: -webkit-box;*/
                height: auto;
                max-height: 3rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-top: .25rem;
                /*-webkit-line-clamp: 2;*/
                /*-webkit-box-orient: vertical;*/
                p{
                    color: rgba(0,0,0,.7);
                    max-width: 16.25rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
            .course-label{
                display: inline-block;
                vertical-align: middle;
                margin-top: .625rem;
                img,span{
                    display: inline-block;vertical-align: middle
                }
                span{margin: 0 5px;color: #929292}
            }

        }
        .coursre-button{
            position: absolute;
            width: 4.1875rem;
            line-height: 1.625rem;
            border-radius: .63rem;
            text-align: center;
            background-color: #f69f00;
            color: #ffffff;
            margin-top: auto;
            bottom: .63rem;
            right: 0;
        }
    }

</style>

