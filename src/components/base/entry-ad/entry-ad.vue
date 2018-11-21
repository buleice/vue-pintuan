<template lang="html">
  <div class="entry-push" v-if="firstVisit==0">
    <div class="content">
      <a  href="/purchase/index?id=5b91f74defcba42263692ea3">
        <img src="//udata.youban.com/webimg/wxyx/puintuan/test/test-push.png" alt="">
      </a>
      <img class="btn_close_big" src="//udata.youban.com/webimg/wxyx/puintuan/test/btn_close_big@3x.png" @click.stop="setFirstVisit(0)" alt="">
    </div>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
export default {
  name: 'entryAd',
  created(){
  },
  methods: {
    ...mapActions(['setFirstVisit'])
  },
  mounted(){
  },
  computed: {
    message: {
      get() {
        return this.$store.state.obj.message
      },
      set(value) {
        this.$store.commit('updateMessage', value)
      }
    },
    ...mapGetters(['firstVisit'])
  }
}
</script>

<style lang="scss" scoped>
.entry-push {
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.3);
    top: 0;
    bottom: 0;
    .content {
          display: block;
          width: 19.63rem;
          height: 28.44rem;
          margin: auto;
          position: relative;
          margin-top: 3.5rem;
          a img{
            width: 100%;
          }
          .btn_close_big{
            width: 2.63rem;
            position: absolute;
            right: -1.31rem;
            top: -1.31rem;
          }
      }
}

</style>
