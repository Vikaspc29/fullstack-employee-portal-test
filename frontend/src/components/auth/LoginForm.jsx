import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        role
      }
    }
  }
`;

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("admin@demo.com");
  const [password, setPassword] = useState("admin123");
  const [login, { loading, error }] = useMutation(LOGIN);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login({ variables: { email, password } });
    if (res.data?.login.token) {
      onLogin(res.data.login.token, res.data.login.user.role);
    }
  };

  return (
    <div className="login-container">
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p className="error">{error.message}</p>}
      </form>
      <p className="hint">
        Demo users: admin@demo.com / admin123, employee@demo.com / employee123
      </p>
    </div>
  );
};

export default LoginForm;
