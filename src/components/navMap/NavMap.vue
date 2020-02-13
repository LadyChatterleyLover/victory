<template>
  <div class="container">
    <div class="top">各省最新疫情查询(点击选择具体省份)</div>
    <div class="select">
      <a-select @change="changeSelect" defaultValue="全国" style="width:100%">
        <a-select-option v-for="(item, index) in provinces" :key="index" :value="item">{{item}}</a-select-option>
      </a-select>
    </div>
    <div class="charts">
      <ve-map
        ref="charts"
        :settings="chartSettings"
        :legend-visible="false"
        :data="mapData"
        :grid="grid"
        :visual-map="visualMap"
      ></ve-map>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from '@vue/composition-api'
import 'echarts/lib/component/visualMap'
import pinyin from 'js-pinyin'
pinyin.setOptions({ checkPolyphone: false, charCase: 0 });
export default {
  name: 'navMap',
  props: {
    allData: {
      type: Object,
      default: () => { }
    }
  },
  setup(props, ctx) {
    let charts = ref(null)
    let chartSettings = ref({
      position: 'china'
    })
    let visualMap = ref([
      {
        type: 'piecewise',
        splitNumber: 5,
        pieces: [
          { min: 1000, label: '>1000' },
          { min: 500, max: 999, label: '500-999' },
          { min: 100, max: 499, label: '100-499' },
          { min: 10, max: 99, label: '10-99' },
          { min: 1, max: 9, label: '1-9' }
        ],
        top: "top",
        left: "center",
        right: "auto",
        bottom: "auto",
        orient: "horizontal",
      }
    ])
    let grid = ref({
      top: 0
    })
    let mapData = ref({
      columns: ['name', '确诊'],
      rows: []
    })
    let provinces = computed(() => {
      let arr = []
      arr.unshift('全国')
      props.allData.area.map(item => {
        arr.push(item.provinceShortName)
      })
      return arr
    })

    let changeSelect = (val) => {
      if (val !== '全国') {
        chartSettings.value.position = 'province/' + pinyin.getFullChars(val).toLowerCase()
        let area = props.allData.area
        let province = area.filter(item => item.provinceShortName === val)[0]
        let arr = []
        province.cities.map(item => {
          arr.push({
            name: item.cityName + '市',
            '确诊': item.confirmedCount
          })
        })
        mapData.value.rows = arr
      } else {
        chartSettings.value.position = 'china'
        let arr = []
        props.allData.area.map(item => {
          arr.push({
            name: item.provinceShortName,
            '确诊': item.confirmedCount
          })
          mapData.value.rows = arr
        })
      }
    }
    onMounted(() => {
      let arr = []
      props.allData.area.map(item => {
        arr.push({
          name: item.provinceShortName,
          '确诊': item.confirmedCount
        })
        mapData.value.rows = arr
      })
      ctx.root.$nextTick(_ => {
        charts.value.echarts.resize()
      })
    })
    return {
      provinces,
      mapData,
      charts,
      visualMap,
      grid,
      chartSettings,
      changeSelect
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .top {
    width: 100%;
    text-align: center;
    margin: 20px 0 10px 0;
  }
  .select {
    width: 90%;
    margin-left: 5%;
    margin-bottom: 20px;
  }
  .charts {
    width: 100%;
    height: 400px;
  }
}
</style>