import service from './index'
import config from '../config'
export default {
  // 疫情数据
  getData () {
    return service.get(`https://tianqiapi.com/api?version=epidemic&appid=${config.appid}&appsecret=${config.appsecret}`)
  },
  // 最新消息
  getNews() {
    return service.get(`http://api.tianapi.com/txapi/ncov/index?key=${config.apikey}`)
  },
  // 辟谣
  getRumour() {
    return service.get(`http://api.tianapi.com/txapi/rumour/index?key=${config.apikey}`)
  }
}