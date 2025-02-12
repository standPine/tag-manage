import { useEffect, useState } from 'react'

export function useFormartData() {
  // console.log('useFormartData')
  const [dataList, setDataList] = useState([])
  const [labelArr, setLabelArr] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const files = import.meta.glob('/src/data/*.json') // 仅匹配 JSON 文件
        if (Object.keys(files).length === 0) {
          console.warn('No JSON files found in /src/data')
          return
        }

        const dataPromises = Object.keys(files).map(async (item) => {
          try {
            const module = await files[item]() // 动态导入文件
            return module.default // 假设 JSON 文件默认导出数据
          }
          catch (error) {
            console.error(`Error importing file ${item}:`, error)
            return null
          }
        })

        const data = await Promise.all(dataPromises) // 等待所有数据加载完成
        const list = []
        // const list2 = []
        data.forEach((item) => {
          if (item) {
            const label = Object.keys(item)[0]
            if (label && Object.keys(item[label]).length !== 0) {
              Object.keys(item[label]).forEach((key) => {
                list.push({
                  name: key,
                  labels: item[label][key],
                })
              })
            }
          }
        })

        setDataList(list) // 一次性更新状态
        // 格式化数据 为 [{label: 'xxx',value:'xxx', names: ['xxx','xxx']}]
        let list2 = []
        list.forEach((item) => {
          item.labels.forEach((label) => {
            // 检测数组中是否有 label 和 item.name
            const flag = list2.some((item2) => {
              return item2?.label?.label === label && item2.names.includes(item.name)
            })
            if (!flag) {
              const existingLabel = list2.find((item2) => {
                return item2?.label?.label === label?.label // 修正此处比较
              })
              if (existingLabel) {
                const updatedLabelArr = list2.map((item2) => {
                  if (item2.label?.label === label?.label) {
                    return {
                      ...item2,
                      names: [...item2.names, item.name],
                    }
                  }
                  return item2
                })
                list2 = updatedLabelArr
              }
              else {
                // const arr = [
                //   ...list2,
                //   {
                //     label,
                //     names: [item.name],
                //   },
                // ]
                list2 = [
                  ...list2,
                  {
                    label,
                    names: [item.name],
                  },
                ]
              }
            }
          })
        })
        setLabelArr(list2)
      }
      catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return {
    dataList,
    labelArr,
  }// 返回初始空数组，实际应用中可以返回状态或其他值
}

// // 检查数据是否已经存在于数组中
// function checkDataExists(data, name, label) {
//   return data.some((item) => item.name === name && item.labels.includes(label))
// }
