<template>
  <div class="container">
    <a-timeline>
      <a-timeline-item class="content" v-for="(item, index) in newsList" :key="index">
        <div class="time">
          <div>{{item.pubDate}}({{item.pubDateStr}})</div>
        </div>
        <a-card :title="item.title" style="margin-top:15px;" @click="goToDetail(item)">
          <div>{{item.summary}}</div>
          <div class="desc flex a-center j-between">
            <div class="flex a-center">
              <div style="margin-right: 4px;">地区:</div>
              <div v-if="item.provinceName">{{item.provinceName}}</div>
              <div v-else>党中央</div>
            </div>
            <div style="color: #1890ff;">
              来源: {{item.infoSource}}
            </div>
          </div>
        </a-card>
      </a-timeline-item>
    </a-timeline>
  </div>
</template>

<script>
import { ref, onMounted } from '@vue/composition-api'
import api from '../../http/api'
import dayjs from 'dayjs'
export default {
  name: 'news',
  props: {},
  setup(props, ctx) {
    let newsList = ref([])
    let getData = () => {
      api.getNews().then(res => {
        if (res.code === 200) {
          res.newslist[0].news.map(item => {
            item.pubDate = dayjs(item.pubDate).format('YYYY年MM月DD日 hh:ss:mm')
          })
          newsList.value = res.newslist[0].news
        }
      })
    }
    let goToDetail = (item) => {
      window.open(item.sourceUrl)
    }
    onMounted(() => {
      getData()
    })
    return {
      getData,
      newsList,
      goToDetail
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0 30px;
  margin-top: 20px;
  .desc {
    margin-top: 10px;
    font-size: 12px;
  }
}
</style>