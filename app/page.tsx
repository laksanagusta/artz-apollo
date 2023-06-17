"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { LOGIN } from "./graphql/mutations/user";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isLogin = false;
  const router = useRouter();

  const client = useApolloClient();

  if (isLogin) {
    router.replace("member");
  }

  const _signIn = async () => {
    setIsLoading(true);
    const { data } = await client.mutate({
      mutation: LOGIN,
      variables: {
        email: email,
        password: password,
      },
    });

    if (data.login.token) {
      localStorage.setItem("token", data.login.token);
      router.replace("member");
    }

    setIsLoading(false);
  };

  return (
    <div className="h-screen w-full flex justify-center items-center border-2">
      <div className="space-y-4 w-96">
        <input
          type="text"
          placeholder="Email"
          className="input input-bordered w-full"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          className="input input-bordered w-full"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn btn-primary w-full"
          onClick={_signIn}
          disabled={isLoading}
        >
          {isLoading && <span className="loading loading-spinner"></span>}
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
