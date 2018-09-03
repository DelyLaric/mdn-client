import axios from '@/core/axios'
import get from 'lodash/get'

/**
 * @case
 * schema: [
 *  [$actionType, $apiUrl, $result]
 * ]
 * 
 * @param $actionType
 *    Api 被映射成的方法名
 * @param $apiUrl
 *    Api 地址
 * @param $result
 *    返回值
 */

export default function (schema) {
  const result = {}
  schema.forEach(([name, url, data]) => {
    result[name] = async (params) => {
      return get(await axios.post(url, params), data)
    }
  })

  return result
}
