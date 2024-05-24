// 容器组件作为redux与UI组件的桥梁
import { useState } from 'react'
// 引入connect方法链接组件与redux
import { connect } from 'react-redux'
import { decrement, increment, incrementAsync } from '@/redux/actions/count'
import { Select, Button } from 'antd'

function Count(props: {
  increment: Function
  decrement: Function
  incrementAsync: Function
  count: number
}) {
  const { increment, decrement, incrementAsync, count } = props
  let [selectNum, setSelectNum] = useState(1)
  const add = () => {
    increment(Number(selectNum))
  }
  const del = () => {
    decrement(Number(selectNum))
  }
  const addAsync = () => {
    incrementAsync(Number(selectNum))
  }
  // 切换数字
  const handleSelectChange = (value: string) => {
    setSelectNum(Number(value))
  }
  return (
    <div>
      <h1>总数为：{count}</h1>
      <Select
        defaultValue='1'
        style={{ width: 120 }}
        onChange={handleSelectChange}
        options={[
          { value: '1', label: '1' },
          { value: '2', label: '2' },
          { value: '3', label: '3' },
        ]}
      />
      &nbsp; <Button onClick={add}>+</Button>
      &nbsp; <Button onClick={del}>-</Button>
      <Button onClick={addAsync}>异步加</Button>
    </div>
  )
}

// state为redux中所有的数据源
export default connect((state: { count: number }) => ({ count: state.count }), {
  increment,
  decrement,
  incrementAsync,
})(Count)
