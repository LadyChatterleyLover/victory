<template>
  <div>
    <ve-line :data="chartData1" :colors="colors1"></ve-line>
    <ve-line :data="chartData2"></ve-line>
    <div class="title">
      全国
      <span class="active">确诊人数</span>总览
    </div>
    <ve-pie :data="chartData3"></ve-pie>
    <div class="title">
      全国
      <span class="active">疑似人数</span>总览
    </div>
    <ve-pie :data="chartData4"></ve-pie>
    <div class="title">
      全国
      <span class="active">治愈人数</span>总览
    </div>
    <ve-pie :data="chartData5"></ve-pie>
    <div class="title">
      全国
      <span class="active">死亡人数</span>总览
    </div>
    <ve-pie :data="chartData6"></ve-pie>
  </div>
</template>

<script>
import { ref, onMounted } from '@vue/composition-api'
export default {
  name: 'trend',
  props: {
    allData: {
      type: Object,
      default: () => { }
    }
  },
  setup(props, ctx) {
    let chartData1 = ref({
      columns: ['date', '确诊人数', '疑似人数'],
      rows: []
    })
    let colors1 = ref(['#f4e0c4', '#e57471'])
    let chartData2 = ref({
      columns: ['date', '治愈人数', '死亡人数'],
      rows: []
    })
    let chartData3 = ref({
      columns: ['name', '确诊人数'],
      rows: []
    })
    let chartData4 = ref({
      columns: ['name', '疑似人数'],
      rows: []
    })
    let chartData5 = ref({
      columns: ['name', '治愈人数'],
      rows: []
    })
    let chartData6 = ref({
      columns: ['name', '死亡人数'],
      rows: []
    })
    let colors2 = ref(['#f4e0c4', '#e57471'])
    onMounted(() => {
      let arr1 = []
      let arr2 = []
      let arr3 = []
      let arr4 = []
      let arr5 = []
      let arr6 = []
      props.allData.history.reverse().map(item => {
        arr1.push({
          date: item.date,
          '确诊人数': item.confirmedNum,
          '疑似人数': item.suspectedNum
        })
        arr2.push({
          date: item.date,
          '治愈人数': item.curesNum,
          '死亡人数': item.deathsNum
        })
      })
      let num1 = 0
      let num2 = 0
      let num3 = 0
      let num4 = 0
      props.allData.area.map(item => {
        if (item.provinceShortName === '湖北') {
          arr3.push({
            name: item.provinceShortName,
            '确诊人数': item.confirmedCount
          })
          arr3.push({
            name: item.cities[0].cityName,
            '确诊人数': item.confirmedCount
          })
          arr4.push({
            name: item.provinceShortName,
            '疑似人数': item.suspectedCount
          })
          arr4.push({
            name: item.cities[0].cityName,
            '疑似人数': item.suspectedCount
          })
          arr5.push({
            name: item.provinceShortName,
            '治愈人数': item.curedCount
          })
          arr5.push({
            name: item.cities[0].cityName,
            '治愈人数': item.cities[0].curedCount
          })
          arr6.push({
            name: item.provinceShortName,
            '死亡人数': item.deadCount
          })
          arr6.push({
            name: item.cities[0].cityName,
            '死亡人数': item.cities[0].deadCount
          })
        } else {
          num1 += item.confirmedCount
          num2 += item.suspectedCount
          num3 += item.curedCount
          num4 += item.deadCount
        }
      })
      arr3.push({
        name: '非湖北',
        '确诊人数': num1
      })
      arr4.push({
        name: '非湖北',
        '疑似人数': num2
      })
      arr5.push({
        name: '非湖北',
        '治愈人数': num3
      })
      arr6.push({
        name: '非湖北',
        '死亡人数': num4
      })
      console.log(num3)
      chartData1.value.rows = arr1
      chartData2.value.rows = arr2
      chartData3.value.rows = arr3
      chartData4.value.rows = arr4
      chartData5.value.rows = arr5
      chartData6.value.rows = arr6
      console.log(chartData5.value.rows)
    })

    return {
      chartData1,
      colors1,
      chartData2,
      chartData3,
      chartData4,
      chartData5,
      chartData6,
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin: 20px 0 20px 20px;
  font-weight: 700;
  .active {
    color: skyblue;
  }
}
</style>