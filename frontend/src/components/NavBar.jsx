import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.navbar}>
      <div>
        <h2 style={styles.logo}>TeamFlow</h2>
        <p style={styles.subText}>Task Management System</p>
      </div>

      <button style={styles.logoutBtn} onClick={logout}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  navbar: {
    background: "white",
    borderRadius: "16px",
    padding: "20px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    marginBottom: "30px",
  },

  logo: {
    margin: 0,
    color: "#2563eb",
  },

  subText: {
    marginTop: "5px",
    color: "#666",
    fontSize: "14px",
  },

  logoutBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    fontWeight: "bold",
  },
};