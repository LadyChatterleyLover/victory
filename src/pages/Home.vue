<template>
  <div class="home">
    <navHeader></navHeader>
    <a-tabs defaultActiveKey="1">
      <a-tab-pane tab="疫情地图" key="1">
        <detail :allData='allData' v-if='allData && allData.history'></detail>
        <navMap :allData='allData' v-if='allData && allData.area'></navMap>
        <table-data :allData='allData' v-if='allData && allData.area'></table-data>
      </a-tab-pane>
      <a-tab-pane tab="最新消息" key="2" forceRender>
        <news></news>
      </a-tab-pane>
      <a-tab-pane tab="辟谣消息" key="3">
        <rumour></rumour>
      </a-tab-pane>
      <a-tab-pane tab="疫情趋势" key="4">
        <trend :allData='allData' v-if='allData && allData.history'></trend>
      </a-tab-pane>
    </a-tabs>
    <div class="footer flex a-center j-between">
      <div>武汉加油 中国加油</div>
      <div @click="git">github</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from '@vue/composition-api'
import api from '../http/api'
import navHeader from '../components/navHeader/NavHeader'
import navMap from '../components/navMap/NavMap'
import detail from '../components/detail/Detail'
import tableData from '../components/tableData/tableData'
import news from '../components/news/News'
import rumour from '../components/rumour/Rumour'
import trend from '../components/trend/Trend'
export default {
  name: 'home',
  components: {
    navHeader,
    detail,
    navMap,
    tableData,
    news,
    rumour,
    trend
  },
  setup(props, ctx) {
    let allData = ref({})
    let getData = () => {
      api.getData().then(res => {
        if (res.errcode === 0) {
          allData.value = res.data
        }
      })
    }
    let git = () => {
      window.open('https://github.com/LadyChatterleyLover/victory')
    }
    onMounted(() => {
      getData()
    })
    return {
      getData,
      allData,
      git
    }
  }
}
</script>

<style lang='scss' scoped>
  .footer {
    width: 100%;
    padding: 0 20px;
    margin-bottom: 15px;
    color: skyblue;
  }
</style>