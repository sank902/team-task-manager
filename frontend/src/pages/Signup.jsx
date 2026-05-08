import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    try {
      await API.post("/auth/signup", {
        name,
        email,
        password,
      });

      alert("Signup success");

      navigate("/login");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div style={styles.page}>
      {/* styles for animations and hover states */}
      <style>
        {`
          @keyframes slideUpFade {
            0% { opacity: 0; transform: translateY(40px) scale(0.96); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes subtleGlow {
            0% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.05); }
            50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.15); }
            100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.05); }
          }
          .modern-input::placeholder {
            color: #64748b;
          }
          .modern-input:focus {
            border-color: #a855f7 !important;
            box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.15) !important;
            transform: translateY(-2px);
          }
          .modern-button:hover {
            background: #9333ea !important;
            transform: translateY(-2px);
            box-shadow: 0 10px 25px -5px rgba(168, 85, 247, 0.4) !important;
          }
          .modern-button:active {
            transform: translateY(1px);
          }
          .modern-link:hover {
            color: #d8b4fe !important;
            text-decoration: underline;
          }
        `}
      </style>

      <div style={styles.card}>
        <h1 style={styles.title}>Create Account</h1>

        <input
          className="modern-input"
          style={styles.input}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="modern-input"
          style={styles.input}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="modern-input"
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="modern-button" style={styles.button} onClick={signup}>
          Signup
        </button>

        {/*quick link back to login for better UX */}
        <p style={styles.footerText}>
          Already have an account?{" "}
          <span
            className="modern-link"
            style={styles.link}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "radial-gradient(circle at center, #1e293b 0%, #020617 100%)",
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  },

  card: {
    background: "rgba(30, 41, 59, 0.7)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    padding: "48px 40px",
    borderRadius: "24px",
    width: "380px",
    boxSizing: "border-box",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
    animation: "slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards, subtleGlow 4s infinite alternate ease-in-out",
    display: "flex",
    flexDirection: "column",
  },

  title: {
    margin: "0 0 28px 0",
    fontSize: "32px",
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: "-0.5px",
    background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)", // Slightly different gradient for signup to distinguish it
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "16px",
    marginTop: "16px",
    background: "rgba(15, 23, 42, 0.6)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    color: "#f8fafc",
    fontSize: "15px",
    outline: "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },

  button: {
    width: "100%",
    padding: "16px",
    marginTop: "32px",
    background: "#a855f7",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },

  footerText: {
    marginTop: "28px",
    textAlign: "center",
    color: "#94a3b8",
    fontSize: "14px",
    fontWeight: "500",
  },

  link: {
    color: "#c084fc",
    cursor: "pointer",
    fontWeight: "600",
    transition: "color 0.2s ease",
  },
};