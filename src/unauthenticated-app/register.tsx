import { Button, Form, Input } from 'antd';
import { useAuth } from 'context/auth-context';
import { FormEvent } from 'react';
import { LongButton } from 'unauthenticated-app';
import { useAsync } from 'utils/use-async';
/* 
interface Base {
  id: number;
}
interface Advance extends Base {
  name: string;
}

const test = (p: Base) => {}; // java: test方法的参数必须是Base类型 ts: 方法入参不必须是Base类型，只要满足Base类型就不会报错

// 鸭子类型(duck typing)：面向接口编程 而不是 面向对象编程
// const a:Advance = { id: 1, name: "jack" };
const a = { id: 1, name: "jack" };
test(a);
 */

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  // HTMLFormElement extends Element
  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error('请确认两次输入的密码相同'));
      return;
    }
    try {
      await run(register(values));
    } catch (e: any) {
      onError(e);
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={'username'}
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input type="text" id={'username'} placeholder={'用户名'} />
      </Form.Item>
      <Form.Item
        name={'password'}
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input type="text" id={'password'} placeholder={'密码'} />
      </Form.Item>
      <Form.Item
        name={'cpassword'}
        rules={[{ required: true, message: '请确认密码' }]}
      >
        <Input type="text" id={'cpassword'} placeholder={'确认密码'} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={'submit'} type={'primary'}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
