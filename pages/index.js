import {useState} from "react"
import {Table, Button, Input, Form} from "antd"
import "antd/dist/antd.css"
import usePage from "../index"
import axios from 'axios'

export default () => {
  const [query,setQuery] = useState({})
  const {dataSource, pagination, refresh} = usePage(function (query) {
    return axios.get('https://mock.doveaz.xyz/mock/5dc8fbb72e824853c2c661dd/blabla/article', {params: query})
  },query)
  const columns = [
    {
      title: "标题",
      dataIndex: "title",
    },
    {
      title: "作者",
      dataIndex: "author",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
    }
  ]

  function onFinish(values) {
    setQuery(values)
  }

  return (
  <div>
    <Form onFinish={onFinish}>
      <Form.Item label="标题"
                 name="title">
        <Input></Input>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    <Table
    dataSource={dataSource}
    columns={columns}
    pagination={pagination}
    rowKey="id"
    />
  </div>
  )
};
