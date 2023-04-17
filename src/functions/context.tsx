import { useState, createContext, ReactNode, useEffect } from "react";
import { PersonObject } from "react-chat-engine-advanced";

const USER_SESSION_KEY = "user_details";

export interface ContextInterface {
  user: PersonObject | undefined;
  setUser: (u: PersonObject | undefined) => void;
}

interface ProviderInterface {
  children: ReactNode;
}

export const Context = createContext<ContextInterface>({
  user: undefined,
  setUser: () => {},
});

export const ContextProvider = (props: ProviderInterface) => {
  const [user, setUser] = useState<PersonObject | undefined>(() => {
    const storedUser = sessionStorage.getItem(USER_SESSION_KEY);
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return undefined;
  });

  useEffect(() => {
    if (user) {
      sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
    } else {
      sessionStorage.removeItem(USER_SESSION_KEY);
    }
  }, [user]);

  const value = { user, setUser };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
