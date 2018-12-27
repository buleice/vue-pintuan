<template>
    <div>
        <div v-if="item.list.length>0" v-for="(item,index) in list" :key="index">
            <div class="divide"></div>
            <div class="recommend-box">
                <div class="recommend-banner"><span>{{item.title}}</span><router-link :to="'/shop/classify/'+item.id">更多</router-link></div>
                <CourseBox class="course" v-for="(item2,index2) in item.list" @imgLoad="imgLoad" :data="item2"
                           :key="index2"></CourseBox>
            </div>
        </div>
    </div>
</template>

<script>
    import CourseBox from '../course-box/course-box'

    export default {
        name: "recomend-box",
        props: ['list'],
        methods:{
            imgLoad(){
                this.$emit('imgLoad')
            }
        },
        components: {
            CourseBox,
        }
    }
</script>

<style scoped lang="scss">
    .divide {
        width: 100%;
        height: .63rem;
        background: #f5f5f5;
    }

    .recommend-box {
        width: 100%;
        box-sizing: border-box;
        padding: 0 .5rem;
        margin: .63rem 0;
        .recommend-banner {
            display: flex;
            justify-content: space-between;
            span {
                font-size: 1rem;
                font-weight: 700;
            }
            a {
                color: rgba(0, 0, 0, .7);
                position: relative;
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
                    transform: translate(-50%, -50%) rotate(45deg);
                    -webkit-transform: translateY(-50%) rotate(45deg);
                }
            }
        }
        .course {
            border-bottom: 1px solid rgba(0, 0, 0, .2);
            &:last-child {
                border: none;
            }
        }
    }
</style>
