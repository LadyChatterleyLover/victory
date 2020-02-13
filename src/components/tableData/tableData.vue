<template>
  <div class="table">
    <a-table :columns="columns" :dataSource="allData.area" rowKey="locationId">
      <div slot="expandedRowRender" slot-scope="record" style="margin: 0">
        <div v-for="(item, index) in record.cities" :key="index">
          <div class="flex a-center desc">
            <div class="f-1 item">{{item.cityName}}</div>
            <div class="f-1 item">{{item.confirmedCount}}</div>
            <div class="f-1 item">{{item.deadCount}}</div>
            <div class="f-1 item">{{item.curedCount}}</div>
          </div>
        </div>
      </div>
    </a-table>
  </div>
</template>

<script>
import { ref, onMounted } from '@vue/composition-api'
export default {
  name: 'tableData',
  props: {
    allData: {
      type: Object,
      default: () => { }
    }
  },
  setup(props, ctx) {
    let columns = ref([
      { title: '地区', dataIndex: 'provinceShortName', key: 'provinceShortName', align: 'center' },
      { title: '确诊', dataIndex: 'confirmedCount', key: 'confirmedCount', align: 'center' },
      { title: '死亡', dataIndex: 'deadCount', key: 'deadCount', align: 'center' },
      { title: '治愈', dataIndex: 'curedCount', key: 'curedCount', align: 'center' },
    ])

    return {
      columns
    }
  }
}
</script>

<style lang="scss" scoped>
.desc {
  position: relative;
  left: -16px;
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    &:nth-child(2) {
      position: relative;
      left: 8px;
    }
    &:nth-child(3) {
      position: relative;
      left: 20px;
    }
    &:nth-child(4) {
      position: relative;
      left: 28px;
    }
  }
}
</style>