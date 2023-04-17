import { useState, useContext } from "react";

import axios from "axios";

import TextInput from "./components/TextInput";
import Button from "./components/Button";
import Link from "./components/Link";

import { Context } from "../functions/context";
import { projectId } from "../functions/constants";
import { PersonObject } from "react-chat-engine-advanced";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LogInFormProps {
  onHasNoAccount: () => void;
}

const LogInForm = (props: LogInFormProps) => {
  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Hooks
  const { setUser } = useContext(Context);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const headers = {
      "Project-ID": projectId,
      "User-Name": email,
      "User-Secret": password,
    };

    axios
      .get("https://api.chatengine.io/users/me/", {
        headers,
      })
      .then((r) => {
        if (r.status === 200) {
          const user: PersonObject = {
            first_name: r.data.first_name,
            last_name: r.data.last_name,
            email: email,
            username: email,
            secret: password,
            avatar: r.data.avatar,
            custom_json: {},
            is_online: true,
          };
          setUser(user);
        }
      })
      .catch((e) => {
        const errorMessage = Array.isArray(e.response.data)
          ? e.response.data[0]
          : e.response.data;
        toast.warning(JSON.stringify(errorMessage.detail));
      });
  };

  return (
    <div>
      <ToastContainer />
      <div className="form-title">Welcome Back</div>

      <div className="form-subtitle">
        New here? <Link onClick={() => props.onHasNoAccount()}>Sign Up</Link>
      </div>

      <form onSubmit={onSubmit}>
        <TextInput
          label="Email"
          name="email"
          placeholder="japhethjoepariagidife@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextInput
          label="Password"
          name="password"
          placeholder="********"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit">Log In</Button>
      </form>
      <p style={{ color: "white" }}>Made with ❤️ by Japheth Joepari</p>
    </div>
  );
};

export default LogInForm;
