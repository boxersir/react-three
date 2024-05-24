/*
 * @Author: caixin caixin185@163.com
 * @Date: 2023-08-08 15:42:56
 * @LastEditors: caixin
 * @LastEditTime: 2024-03-14 22:20:07
 * @Description: file content
 */
import * as actions from '@/redux/actions/tiger'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { TigerVo } from '@/redux/reducers/tiger'
import { Button, List, Typography } from 'antd'
import { nanoid } from 'nanoid'

function Tiger(props: {
  increTiger: Function
  delTigerById: Function
  tigerArr: TigerVo[]
  countNum?: number
}) {
  const add = () => {
    const obj = {
      id: nanoid(),
      name: '雄狮院长',
      age: 6,
    }
    props.increTiger(obj)
  }
  const delOne = (id: string) => {
    props.delTigerById({ id })
  }
  return (
    <List
      header={
        <div>
          <Button type='primary' onClick={add}>
            添加一个
          </Button>
          <div>
            展示一下
            <strong>Count组件</strong>
            的总数： {props.countNum}
          </div>
        </div>
      }
      bordered
      dataSource={props.tigerArr}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <Typography.Text mark>ID：</Typography.Text>
          {item.id}---
          <Typography.Text mark>名称：</Typography.Text>
          {item.name} ---
          <Typography.Text mark>年龄：</Typography.Text>
          {item.age}
          <Button
            type='primary'
            danger
            style={{ marginLeft: '20px' }}
            onClick={() => delOne(item.id)}
          >
            删除
          </Button>
        </List.Item>
      )}
    />
  )
}

export default connect(
  (state: { tigerArr: TigerVo[]; count: number }) => ({
    tigerArr: state.tigerArr,
    countNum: state.count,
  }),
  // {
  //   // 此处定义的名称就是组件调用方法时的名称
  //   increTiger,
  //   delTigerById,
  // }
  (dispatch) => {
    return {
      ...bindActionCreators(actions,dispatch)
    }
  }
)(Tiger)
