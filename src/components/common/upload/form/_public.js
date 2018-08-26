export function isUniqueKeysMatched (uniqueKeys, columns) {
  const IsInColumns = key => columns.find(column => column.name === key)

  return uniqueKeys.every(IsInColumns)
}

/**
 * 对数据的每个值进行便利，以得到不重复或符合约束条件的数据
 */

export function filterUniqueData (data, uniqueKeys, unUniqueKeys) {
  const uploadData = []
  const ignoredData = []
  const dataLength = data.length
  const uniqueKeyLength = uniqueKeys.length
  const unUniqueKeyLength = unUniqueKeys.length

  // 遍历数据
  for (let i = 0, j, values, index, isNull; i < dataLength; i++) {
    values = []

    /**
     * 检查约束字段是否为空
     * 返回 isNull 作为标识
     */
    for (j = 0, isNull = false; j < uniqueKeyLength; j++) {
      values.push(data[i][uniqueKeys[j]])
      if (values[j] === '') {
        isNull = true
        break
      }
    }

    // 约束字段为空，将数据 ignore 并开始遍历下一条数据
    if (isNull) {
      ignoredData.push({ key: i, comment: 'isNull' })
      continue
    }

    for (j = 0; j < unUniqueKeyLength; j++) {
      values.push(data[i][unUniqueKeys[j]])
    }
    // 检查是否有重复数据存在
    index = uploadData.findIndex(item => {
      if (uniqueKeyLength === 0) return false

      for (j = 0; j < uniqueKeyLength; j++) {
        if (item[j] !== values[j]) return false
      }

      return true
    })

    if (index !== -1) {
      ignoredData.push({
        key: i, comment: ''
      })
      continue
    }

    uploadData.push(values)
  }

  return {
    uploadData,
    ignoredData
  }
}

//
export function getUniqueDataByList (data, list, uniqueKeys) {
  return data.filter(item => list.findIndex(keys => {
    return uniqueKeys.every((index, key) => {
      return item[key] === keys[index]
    })
  }) === -1)
}
