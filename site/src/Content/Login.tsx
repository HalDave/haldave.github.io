import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { useLogin } from "../Services/hooks/useLogin";

interface LoginProps {
  onSuccess: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = await login(password);
    if (token) onSuccess(token);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 320,
        margin: "80px auto",
        alignItems: "center",
      }}
    >
      <Typography variant="h5">Dashboard</Typography>
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        autoFocus
        error={!!error}
        helperText={error ?? " "}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isLoading || !password}
      >
        {isLoading ? <CircularProgress size={22} color="inherit" /> : "Sign in"}
      </Button>
    </Box>
  );
};

export default Login;
