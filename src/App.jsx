/* eslint no-console:"off" */

import { AutoComplete, Card, Flex, Input, Tag } from 'antd'
import { useEffect, useState } from 'react'
import AppStyle from './App.module.less'
import { useFormartData } from './hooks/useFormatData'
import viteLogo from '/vite.svg'

function Title({ title }) {
  return (
    <Flex align="center" justify="space-between">
      {title}
    </Flex>
  )
}
function renderItem(title) {
  return {
    value: title,
    label: (
      <Flex align="center" justify="space-between">
        {title}
      </Flex>
    ),
  }
}

function App() {
  console.log('app')
  // 1. 初始渲染
  // 当组件 App 首次挂载时，React 会执行组件的渲染逻辑，因此 console.log('app') 会第一次输出。

  // 2. 状态更新触发的重新渲染
  // 在 useEffect 中，你调用了 setList([])，这会更新 list 的状态。

  // 状态更新会触发组件的重新渲染，因此 console.log('app') 会第二次输出。
  const [list, setList] = useState([])

  const { dataList, labelArr } = useFormartData()
  console.log(labelArr)
  useEffect(() => {
    setList(dataList)
  }, [dataList])
  function itemClick(item) {
    const itemId = item.id
    const itemLabel = item.label
    const dataFilterList = dataList.filter((dataItem) => {
      const flag = dataItem.labels.some((label) => {
        return label.id === itemId || label.label === itemLabel
      })

      return flag || dataItem.name.includes(item)
    })
    setList(dataFilterList)
  }
  const [options, setOptions] = useState([
    {
      label: <Title title="Libraries" />,
      options: [renderItem('AntDesign'), renderItem('AntDesign UI')],
    },
    {
      label: <Title title="Solutions" />,
      options: [renderItem('AntDesign UI FAQ'), renderItem('AntDesign FAQ')],
    },
    {
      label: <Title title="Articles" />,
      options: [renderItem('AntDesign design language')],
    },
  ])
  const [value, setValue] = useState('')

  const getPanelValue = (searchText) => {
    console.log(searchText)
    const labelFilterArr = labelArr.filter((item) => {
      return item.label.label.includes(searchText)
    })
    console.log('dataList', dataList)
    const dataFilterList = dataList.filter((dataItem) => {
      const flag = dataItem.labels.some((label) => {
        return label.label.includes(searchText) || dataItem.name.includes(searchText)
      })
      return flag
    })
    console.log(labelFilterArr)
    console.log(dataFilterList)
    let arr1 = []
    let arr2 = []
    if (labelFilterArr.length > 0) {
      arr1 = [{
        label: <Title title="标签" />,
        options: labelFilterArr.map((item) => {
          return renderItem(item.label.label)
        }),
      }]
    }
    if (dataFilterList.length > 0) {
      arr2 = [{
        label: <Title title="答案" />,
        options: dataFilterList.map((item) => {
          return renderItem(item.name)
        }),
      }]
    }
    return arr1.concat(arr2)
  }
  // return [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
  const onSelect = (data) => {
    console.log('onSelect', data)
    console.log('onSelect option', options)
    // setList(dataList)
    itemClick(data)
  }
  const onChange = (data) => {
    setValue(data)
  }
  const onSearch = (text) => {
    console.log('onSearch', text)
    setOptions(getPanelValue(text))
  }
  return (
    <>
      {/* 顶部导航 */}
      <div className={AppStyle.header}>
        <div className={AppStyle.logo}>
          <img src={viteLogo} alt="" />
        </div>
        <div className={AppStyle.search}>
          <div className={AppStyle.wrap}>
            <AutoComplete
              value={value}
              options={options}
              style={{
                width: '100%',
              }}
              onSelect={onSelect}
              onChange={onChange}
              onSearch={onSearch}
              placeholder="input here"
            />
          </div>
        </div>
        <div className={AppStyle.tools}>user</div>
      </div>
      <div className={AppStyle.main}>
        {/* 左侧导航 */}
        <div className="filterNav">
          <div className="search">
            <Input placeholder="Basic usage" />
          </div>
          <div className={AppStyle.tagList}>
            {
              labelArr.map((item) => {
                return (
                  <div className={AppStyle.tagItem} key={item.label.id} onClick={() => itemClick(item.label)}>
                    <div className={AppStyle.tagLabel}>{item.label.label}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
        {/* 主要部分 */}
        <div className={AppStyle.cardContainer}>
          <div className={AppStyle.leftNav}></div>
          <div className={AppStyle.viewCard}>
            <div className={AppStyle.category}></div>
            <div className={AppStyle.card}>
              {
                list.map((item) => {
                  return (
                    <Card
                      className={AppStyle.cardItem}
                      key={item.name}
                      style={{
                      }}
                    >
                      <div className={AppStyle.cardItemName}>{item.name}</div>
                      <div className={AppStyle.cardItemContent}>
                        {
                          item.labels.map((name) => {
                            return <Tag className={AppStyle.cardItemContentName} key={name.id} onClick={() => itemClick(name)}>{name.label}</Tag>
                          })
                        }
                      </div>
                    </Card>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
