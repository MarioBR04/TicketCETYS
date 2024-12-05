import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { createClient } from "@supabase/supabase-js";
import "./Login.css"; // Archivo CSS para estilos

const supabase = createClient(
  "https://tfkgssvsqrlybxxjzwxx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRma2dzc3ZzcXJseWJ4eGp6d3h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNzM2NDIsImV4cCI6MjA0ODk0OTY0Mn0.z4f4u68nZRuelSi_2yIVQZERjKjyIivtgHdO53OjPkk"
);

function Login({ setUser }) {
  const [matricula, setMatricula] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("matricula", matricula)
        .eq("contrasena", password)
        .single();

      if (error) throw error;

      alert("Login successful:", data.nombre);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data.nombre);
    } catch (err) {
      alert("Login failed:", err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("usuarios")
        .insert([{ matricula, nombre, contrasena: password }]);

      if (error) throw error;

      alert("Registration successful:", data);
    } catch (err) {
      alert("Registration failed:", err.message);
    }
    window.location.reload();
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Ticket CETYS</h1>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo-cetys.png/755px-Logo-cetys.png"
          alt="Logo"
          className="auth-logo"
        />
        {isLogin ? (
          <>
            <form className="auth-form" onSubmit={handleLogin}>
              <div className="auth-input-group">
                <label htmlFor="username">Matricula</label>
                <input
                  type="text"
                  id="matricula"
                  placeholder="Ingrese su matricula"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                />
              </div>
              <div className="auth-input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="auth-button" type="submit">
                {"Login"}
              </button>
            </form>
            <p className="auth-footer">
              No tienes una cuenta?{" "}
              <span onClick={toggleForm} className="auth-link">
                Registrarse
              </span>
            </p>
          </>
        ) : (
          <>
            <form className="auth-form" onSubmit={handleRegister}>
              <div className="auth-input-group">
                <label htmlFor="username">Matricula</label>
                <input
                  type="text"
                  id="matricula"
                  placeholder="Ingrese su matricula"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  required
                />
              </div>
              <div className="auth-input-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  placeholder="Ingrese su nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="auth-input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className="auth-button" type="submit">
                {registerLoading ? "Loading..." : "Register"}
              </button>
            </form>
            <p className="auth-footer">
              Ya tienes tu cuenta?{" "}
              <span onClick={toggleForm} className="auth-link">
                Iniciar Sesión
              </span>
            </p>
            {registerError && (
              <p className="auth-error">{registerError.message}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
