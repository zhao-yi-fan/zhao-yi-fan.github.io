import { useAuth } from "context/auth-context";
import { FormEvent } from "react";
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

export const LoginScreen = () => {
  const { login, register, user } = useAuth();

  // HTMLFormElement extends Element
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      {user ? (
        <div>
          登录成功，用户名：{user?.name} token:{user.token}
        </div>
      ) : null}
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={"password"} />
      </div>
      <button type="submit">登录</button>
      <button type="submit">注册</button>
    </form>
  );
};
