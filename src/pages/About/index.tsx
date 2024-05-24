/*
 * @Author: caixin caixin185@163.com
 * @Date: 2023-08-08 15:42:56
 * @LastEditors: caixin
 * @LastEditTime: 2024-05-15 18:10:34
 * @Description: file content
 */
import {useState,useContext,useEffect} from 'react'
import { Button, Checkbox, DatePicker, Form, Input,Row,Col,Radio , Select, Space ,Typography} from 'antd';
import { ApartmentOutlined, BarsOutlined } from '@ant-design/icons';
import { GlobalContext } from '@/global/provider';

export default function About() {
  const globalContext = useContext(GlobalContext)
  const [checkInfo,setCheckInfo] = useState({checked:false,disabled:false})
  const label = (checkInfo.checked ? '选中' : '取消') + '-' + (checkInfo.disabled ? '不可用' : '可用')
  const onChange = (e:any) => {
    console.log('checked = ', e.target.checked);
    setCheckInfo({...checkInfo,
      checked: e.target.checked
    })
  }
  const locale = 'zh-cn'; // 设置为中文语言环境
const defaultValue = globalContext.dayjs('2024-04-01'); // 设置默认值为当前时间
// const datepickerValue = defaultValue.locale(locale); // 将默认值转化为中文语言环
  const handleSubmit = async (e: any) => {
  console.log(e);
    const rs = await formInfo.validateFields()
    console.log(rs);
    
  }
  const [formInfo] = Form.useForm()
   const nameValue = Form.useWatch('nameUser', formInfo);
  useEffect(() => {
    setTimeout(() => {
      const username = formInfo.getFieldsValue(['userName','password'])
      console.log(username);
    },3000)
    
  // 其他逻辑
  }, [formInfo]);
  
  const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const [form] = Form.useForm();

  const onGenderChange = (value: string) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({ note: 'Hi, man!' });
        break;
      case 'female':
        form.setFieldsValue({ note: 'Hi, lady!' });
        break;
      case 'other':
        form.setFieldsValue({ note: 'Hi there!' });
        break;
      default:
    }
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({ note: 'Hello world!', gender: 'male' });
  };

 
  return (
    <div>
      About组件
      <Button type="primary" shape="circle" size="large">
        <ApartmentOutlined></ApartmentOutlined>
      </Button>
      <Button type="primary" shape="circle" size="large">
         <BarsOutlined></BarsOutlined>
      </Button>
       <p style={{marginBottom: '20px'}}>
        <label>
          <Checkbox checked={checkInfo.checked}
            disabled={checkInfo.disabled}
            onChange={onChange} />
          {label}
          <Button type="dashed" shape="circle" size="large" onClick={()=>setCheckInfo({...checkInfo,
      disabled:!checkInfo.disabled
    })}>
            { checkInfo.disabled?'禁用':'可用' }
          </Button>
        </label>
      </p>
      <div>
        <DatePicker defaultValue={globalContext.dayjs('2024-04-01')} />
        {/* {globalContext.initUser} */}
        {/* <DatePicker defaultValue={Dayjs('2024-04-01').format('YYYY-MM-DD')}  /> */}
      </div>
       <Form form={formInfo} onFinish={onFinish}>
        <Form.Item
          label="用户名："
          labelCol={{span: 6}}
          wrapperCol={{ span: 6 }}
          initialValue="优雅家的"
          name="userName"
          required>
          <span className="ant-form-text" id="userName" >优雅家的</span>
        </Form.Item>
          <Form.Item name="nameUser" label="身份证姓名：">
          <Input />
        </Form.Item>
         <Typography>
        <pre>Name Value: {nameValue}</pre>
      </Typography>
        <Form.Item
          id="password"
          label="密码："
          labelCol={{span: 6}}
          wrapperCol={{ span: 14 }}
           name="password"
          required>
          <Input type="password" id="password" placeholder="请输入密码" />
        </Form.Item>
        <Form.Item
          label="您的性别："
          labelCol={{span: 6}}
          wrapperCol={{ span: 14 }}
          name="gender" 
          required>
            <Radio.Group defaultValue="male">
              <Radio value="male">男的</Radio>
              <Radio value="female">女的</Radio>
            </Radio.Group>
        </Form.Item>
        <Form.Item
          id="remark"
          label="备注："
          labelCol={{span: 6}}
          wrapperCol={{span: 14}}
          required
          help="随便写点什么"
          name="remark"
        >
          <Input type="textarea" placeholder="随便写" id="remark"  />
        </Form.Item>
         <Form.Item
         labelCol={{span: 6}}
          wrapperCol={{span: 14}}
          label="爱好："
           name="loves"
        >
          <label>
            <Checkbox.Group>
              <Checkbox value="book"/> 读书
              <Checkbox value="travel"/> 旅行
              <Checkbox value="hard"/> 健身
            </Checkbox.Group>
          </label>
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 14, offset: 6 }}
          name="agreement"
        >
          <label>
            <Checkbox /> 同意
          </label>
        </Form.Item>
        <Row>
          <Col span="16" offset="6">
            <Button type="primary" htmlType="submit">确定</Button>
          </Col>
        </Row>
      </Form>
      <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="note" label="Note" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          onChange={onGenderChange}
          allowClear
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
      >
        {({ getFieldValue }) =>
          getFieldValue('gender') === 'other' ? (
            <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
          <Button type="link" htmlType="button" onClick={onFill}>
            Fill form
          </Button>
        </Space>
      </Form.Item>
    </Form>
    </div>
  )
}
