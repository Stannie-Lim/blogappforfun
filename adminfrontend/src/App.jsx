import { useState, useEffect } from "react";
import { TextField, Grid, Button, Paper } from "@mui/material";
import axios from "axios";

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import { Nav } from "./components/Nav";
import { AdminPage } from "./components/AdminPage";
import { SingleBlogPost } from "./components/SingleBlogPost";
import { UserContext } from "./UserContext";

const AuthForm = ({ onAuthFormSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();

  // if im on /login, that means it'll be a login form
  // if im on /register, that means it'll be a register form

  const onSubmit = (event) => {
    event.preventDefault();

    onAuthFormSubmit(username, password);
  };

  return (
    <Grid container item justifyContent="center">
      <Paper variant="outlined" style={{ padding: 16, width: 500 }}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              placeholder="Username"
              value={username}
              fullWidth
              onChange={(ev) => setUsername(ev.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              placeholder="Password"
              value={password}
              fullWidth
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </Grid>
          <Grid item>
            <Button onClick={onSubmit} fullWidth variant="outlined">
              {location.pathname === "/login" ? "Login" : "Register"}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

function App() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const possiblyLogin = async () => {
      const token = window.localStorage.getItem("token");

      if (token) {
        const userResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
          {
            headers: {
              authorization: token,
            },
          }
        );

        const user = userResponse.data;

        setUser(user);

        navigate("/blog");
      }
    };

    possiblyLogin();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          username,
          password,
        }
      );

      const token = response.data;

      window.localStorage.setItem("token", token);

      const userResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      const user = userResponse.data;

      setUser(user);

      navigate("/blog");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Nav />
      <Routes>
        {user ? (
          <>
            <Route path="/blog" element={<AdminPage />} />
            <Route path="/blog/:id" element={<SingleBlogPost />} />
          </>
        ) : (
          <>
            <Route
              path="/login"
              element={<AuthForm onAuthFormSubmit={login} />}
            />
            <Route path="*" element={<RedirectToLogin />} />
          </>
        )}
      </Routes>
    </UserContext.Provider>
  );
}

const RedirectToLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, []);

  return <></>;
};

export default App;
