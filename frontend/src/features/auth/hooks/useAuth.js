import { login, register, getme, logout } from "../services/auth.api";
import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { useEffect } from "react";

export function useAuth() {
  const context = useContext(AuthContext);

  const {
    user,
    setUser,
    loading,
    setLoading,
    isInitialized,
    setIsInitialized,
  } = context;

  async function handleRegister({ username, email, password }) {
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      setUser(data.user);
      setIsInitialized(true);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin({ email, username, password }) {
    setLoading(true);
    try {
      const data = await login({ email, username, password });
      setUser(data.user); //data.user mai user backend se aayega
      setIsInitialized(true);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  }

  // async function handleGetMe() {
  //   setLoading(true);
  //   try {
  //     const data = await getme();
  //     setUser(data.user);
  //   } catch (error) {
  //     console.error("Get me failed:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  async function handleGetMe() {
    try {
      const data = await getme();
      setUser(data.user);
    } catch (error) {
      console.error(error);
    } finally {
      setIsInitialized(true);
    }
  }

  useEffect(() => {
    if (!isInitialized) {
      handleGetMe();
    }
  }, [isInitialized]);

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  }

  // useEffect(() => {
  // handleGetMe();
  // }, []);

  return {
    handleRegister,
    handleLogin,
    handleGetMe,
    handleLogout,
    user,
    loading,
    isInitialized,
  };
}
