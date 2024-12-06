import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { createClient } from "@supabase/supabase-js";
import "./Login.css"; // Archivo CSS para estilos
import { supabase } from "../supabaseClient";

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
      <div className="background"></div>
      <div className="auth-card">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo-cetys.png/755px-Logo-cetys.png"
          alt="Logo"
          className="auth-logo"
        />
        <h1 className="auth-title">Ticket CETYS</h1>
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
                {isLogin ? "Iniciar Sesión" : "Registrarse"}
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
                Registrarse
              </button>
            </form>
            <p className="auth-footer">
              Ya tienes tu cuenta?{" "}
              <span onClick={toggleForm} className="auth-link">
                Iniciar Sesión
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
