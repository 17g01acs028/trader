import  {createContext, useContext, useEffect, useState} from 'react';
import { useQueryClient} from "@tanstack/react-query";
import {
  authenticationQueryKeys, GetAccount,
  Logout,
} from "../data-access/authedication.ts";
import { useMantineNotification } from "../../../Components/Notification/useMantineNotification.tsx";

// AuthContext to store the user globally
const AuthContext = createContext<{
  user: any;
  login: (user: any, token: any) => void;
  logout: () => void;
  refresh: () => void;
  isLoading: boolean;
  data: any;
  error: any;
  isSuccess: boolean;
  isAuthenticated: boolean;
  setUserFC: (user: any) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
} | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const queryClient = useQueryClient();
  const useLogout = Logout();
  const useClient = useQueryClient();

  const { data, error, isLoading, isSuccess } = GetAccount();

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
    }
  }, [data, isSuccess]);

  const setUserFC = (user: any) => {
    setUser(user);
  };

  const refresh = () => {
    useClient.invalidateQueries(authenticationQueryKeys.all);
  };
  const login = (user, token) => {
    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem("authToken", token);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
    useLogout.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries(authenticationQueryKeys?.all);
      },
      onError: () => {
        useMantineNotification({
          type: "error",
          message: "Error Occurred Please Try again",
        });
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        refresh,
        data,
        isLoading,
        isSuccess,
        isAuthenticated,
        setUserFC,
        login,
        logout,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
