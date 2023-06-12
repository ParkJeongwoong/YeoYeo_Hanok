import Table from "@components/admin/Table";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useCookies } from "react-cookie";

function App() {
  const [cookie, setCookie, removeCookie] = useCookies(["SESSION"]);

  const onFinish = (values: any) => {
    axios({
      method: "post",
      url: `/admin/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        userId: values.username,
        userPassword: values.password,
      },
    })
      .then((res) => {
        console.log(res.data)
        setCookie("SESSION", "1234", { path: "/admin" });
      })
      .catch((error) => console.log("error", error));
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      {cookie.SESSION === undefined?
        (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "Please input your username!" }]}
              >
                <Input />
              </Form.Item>
      
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="default" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        ) :
        (
          <Table removeCookie={removeCookie} />
        )
      }
    </div>
  );
}

export default App;
