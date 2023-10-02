import React, { useState } from 'react';
import AppHeader from '../../layout/Header';
import AppFooter from '../../layout/Footer';
import AppSidebar from '../../layout/Sidebar';
import {
  Layout,
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from 'antd';
import Paragraph from 'antd/es/skeleton/Paragraph';

const { Content } = Layout;


const Home = () => {
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <AppSidebar />
      <Layout>
        <AppHeader />
        <Content style={{ textAlign: 'center' }}>
         <h1>HAHA</h1>
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            initialValues={{
              size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
            style={{
              maxWidth: 600,
              margin: '0 auto',
              padding: '20px', // Add padding for spacing
              border: '1px solid #dcdcdc', // Add border
              borderRadius: '5px', // Add rounded corners
              textAlign: 'left',
            }}
          >
           
            <Form.Item label="Input">
              <Input />
            </Form.Item>
            <Form.Item label="Select">
              <Select>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="TreeSelect">
              <TreeSelect
                treeData={[
                  {
                    title: 'Light',
                    value: 'light',
                    children: [
                      {
                        title: 'Bamboo',
                        value: 'bamboo',
                      },
                    ],
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="Cascader">
              <Cascader
                options={[
                  {
                    value: 'zhejiang',
                    label: 'Zhejiang',
                    children: [
                      {
                        value: 'hangzhou',
                        label: 'Hangzhou',
                      },
                    ],
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="DatePicker">
              <DatePicker />
            </Form.Item>
            <Form.Item label="InputNumber">
              <InputNumber />
            </Form.Item>
            <Form.Item label="Switch" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item label="Button">
              <Button>Button</Button>
            </Form.Item>
          </Form>

        </Content>
        <AppFooter />
      </Layout>
    </Layout>
  );
};

export default Home;
