import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

import robotImage from "../assets/mascot.png";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  // Toggle between 'login' and 'register' mode
  const [isLogin, setIsLogin] = useState(true);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await API.post("/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        const res = await API.post("/auth/register", { name, email, password });
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      alert("Authentication failed. Please check your details.");
    }
  };

  return (
    <div style={styles.appContainer}>
      <style>
        {`
          @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes float { 0%, 100% { transform: translateY(0px) rotate(-2deg); } 50% { transform: translateY(-18px) rotate(2deg); } }
          @keyframes blob { 0%, 100% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px,-40px) scale(1.1); } 66% { transform: translate(-20px,20px) scale(0.95); } }
          
          .animate-slide-up { animation: slideUp 0.6s ease-out forwards; }
          .animate-float { animation: float 6s ease-in-out infinite; }
          .animate-blob { animation: blob 18s ease-in-out infinite; }
          
          .glass-card { 
            background: linear-gradient(160deg, rgba(255,255,255,0.85), rgba(255,255,255,0.55)); 
            backdrop-filter: blur(14px); 
            -webkit-backdrop-filter: blur(14px); 
            border: 1px solid rgba(255,255,255,0.6); 
            box-shadow: 0 8px 30px -10px oklch(0.4 0.1 295 / 0.18); 
          }
          
          .input-field:focus {
             outline: none;
             border-color: oklch(0.58 0.24 295);
             box-shadow: 0 0 0 2px oklch(0.58 0.24 295 / 0.2);
          }
        `}
      </style>

      {/* BACKGROUND BLOBS */}
      <div className="animate-blob" style={styles.blob1}></div>
      <div className="animate-blob" style={{...styles.blob2, animationDelay: '-6s'}}></div>
      <div className="animate-blob" style={{...styles.blob3, animationDelay: '-12s'}}></div>

      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <div style={styles.brand}>
          <div style={styles.logoIcon}>✨</div>
          <span style={styles.brandName}>Tasky</span>
        </div>
      </nav>

      {/* MAIN CONTENT SPLIT */}
      <main style={styles.mainGrid}>
        
        {/* LEFT SIDE: Hero Text & Mascot */}
        <div className="animate-slide-up" style={styles.leftCol}>
          <h1 style={styles.heroTitle}>
            Welcome to your <span style={styles.gradientText}>team HQ</span>.
          </h1>
          <p style={styles.heroSub}>
            Sign in to continue or create a free account to start organizing projects with your team.
          </p>
          
          <div style={styles.mascotContainer}>
            <div style={styles.mascotGlow}></div>
            <img src={robotImage} alt="Mascot" className="animate-float" style={styles.mascotImg} />
          </div>
        </div>

        {/* RIGHT SIDE: Auth Card */}
        <div className="animate-slide-up" style={styles.rightCol}>
          <div className="glass-card" style={styles.authCard}>
            
            {/* Toggle Tabs */}
            <div style={styles.tabContainer}>
              <button 
                onClick={() => setIsLogin(true)} 
                style={{...styles.tabBtn, ...(isLogin ? styles.activeTab : styles.inactiveTab)}}
              >
                Sign in
              </button>
              <button 
                onClick={() => setIsLogin(false)} 
                style={{...styles.tabBtn, ...(!isLogin ? styles.activeTab : styles.inactiveTab)}}
              >
                Create account
              </button>
            </div>

            {/* Auth Form */}
            <form onSubmit={handleSubmit} style={styles.form}>
              {!isLogin && (
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Name</label>
                  <input 
                    className="input-field"
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    style={styles.input} 
                    required 
                  />
                </div>
              )}
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email</label>
                <input 
                  className="input-field"
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  style={styles.input} 
                  required 
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <input 
                  className="input-field"
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  style={styles.input} 
                  required 
                />
              </div>

              <button type="submit" style={styles.submitBtn}>
                {isLogin ? "Sign in" : "Create account"}
              </button>
            </form>
            
          </div>
        </div>

      </main>
    </div>
  );
}

const styles = {
  appContainer: { position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", background: "linear-gradient(135deg, oklch(0.97 0.04 295), oklch(0.97 0.05 340))", color: "oklch(0.18 0.04 280)", fontFamily: "ui-sans-serif, system-ui, sans-serif", overflow: "hidden" },
  
  // Animated Blobs
  blob1: { position: "absolute", top: "-8rem", left: "-8rem", width: "24rem", height: "24rem", background: "oklch(0.58 0.24 295 / 0.3)", borderRadius: "50%", filter: "blur(64px)", zIndex: 0 },
  blob2: { position: "absolute", top: "10rem", right: "-8rem", width: "28rem", height: "28rem", background: "oklch(0.7 0.22 25 / 0.3)", borderRadius: "50%", filter: "blur(64px)", zIndex: 0 },
  blob3: { position: "absolute", bottom: "0", left: "33%", width: "20rem", height: "20rem", background: "oklch(0.65 0.26 330 / 0.4)", borderRadius: "50%", filter: "blur(64px)", zIndex: 0 },

  navbar: { position: "relative", zIndex: 10, width: "100%", maxWidth: "1280px", margin: "0 auto", padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  brand: { display: "flex", alignItems: "center", gap: "8px" },
  logoIcon: { width: "36px", height: "36px", background: "linear-gradient(135deg, oklch(0.62 0.24 280), oklch(0.65 0.26 330) 55%, oklch(0.75 0.22 35))", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "16px", boxShadow: "0 20px 60px -20px oklch(0.62 0.24 280 / 0.45)" },
  brandName: { fontSize: "20px", fontWeight: "800", letterSpacing: "-0.02em" },

  mainGrid: { position: "relative", zIndex: 10, flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", maxWidth: "1200px", margin: "0 auto", padding: "40px 24px", alignItems: "center" },
  
  // Left Column
  leftCol: { display: "flex", flexDirection: "column", justifyContent: "center" },
  heroTitle: { fontSize: "clamp(40px, 5vw, 56px)", fontWeight: "800", margin: "0 0 16px 0", lineHeight: "1.1", letterSpacing: "-0.02em" },
  gradientText: { backgroundImage: "linear-gradient(135deg, oklch(0.62 0.24 280), oklch(0.65 0.26 330) 55%, oklch(0.75 0.22 35))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  heroSub: { fontSize: "18px", color: "oklch(0.5 0.04 280)", margin: "0 0 40px 0", lineHeight: "1.5", maxWidth: "480px" },
  
  mascotContainer: { position: "relative", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" },
  mascotGlow: { position: "absolute", inset: "40px", borderRadius: "50%", background: "linear-gradient(135deg, oklch(0.62 0.24 280), oklch(0.65 0.26 330))", opacity: 0.3, filter: "blur(64px)" },
  mascotImg: { position: "relative", width: "80%", maxWidth: "350px", filter: "drop-shadow(0 25px 25px rgba(0,0,0,0.15))" },

  // Right Column (Auth Card)
  rightCol: { display: "flex", justifyContent: "center" },
  authCard: { width: "100%", maxWidth: "440px", padding: "32px", borderRadius: "1.5rem" },
  
  tabContainer: { display: "flex", background: "rgba(255,255,255,0.5)", borderRadius: "99px", padding: "4px", marginBottom: "32px", border: "1px solid oklch(0.92 0.015 285)" },
  tabBtn: { flex: 1, padding: "10px", borderRadius: "99px", fontSize: "14px", fontWeight: "600", border: "none", cursor: "pointer", transition: "all 0.2s" },
  activeTab: { background: "white", color: "oklch(0.18 0.04 280)", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" },
  inactiveTab: { background: "transparent", color: "oklch(0.5 0.04 280)" },

  form: { display: "flex", flexDirection: "column", gap: "20px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "14px", fontWeight: "600", color: "oklch(0.18 0.04 280)" },
  input: { width: "100%", padding: "12px 16px", borderRadius: "0.85rem", border: "1px solid oklch(0.92 0.015 285)", background: "white", fontSize: "15px", transition: "0.2s", boxSizing: "border-box" },
  
  submitBtn: { marginTop: "12px", width: "100%", padding: "14px", borderRadius: "0.85rem", background: "linear-gradient(135deg, oklch(0.62 0.24 280), oklch(0.65 0.26 330) 55%, oklch(0.75 0.22 35))", color: "white", fontSize: "16px", fontWeight: "700", border: "none", cursor: "pointer", boxShadow: "0 20px 60px -20px oklch(0.62 0.24 280 / 0.45)", transition: "0.2s" }
};