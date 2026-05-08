import { useNavigate } from "react-router-dom";

import robotImage from "../assets/mascot.png";

export default function Landing() {
  const navigate = useNavigate();

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
            transition: all 0.2s;
          }
          .glass-card:hover { transform: translateY(-4px); box-shadow: 0 20px 60px -20px oklch(0.62 0.24 280 / 0.45); }

          .btn-hover:hover { filter: brightness(1.1); transform: scale(1.02); }

          @media (max-width: 768px) {
            .hero-grid { grid-template-columns: 1fr !important; text-align: center; }
            .hero-badge { margin: 0 auto 20px auto !important; }
            .hero-buttons { justify-content: center !important; }
            .hero-checks { justify-content: center !important; }
            .hero-title { font-size: 40px !important; }
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
        <div style={styles.navActions}>
          <button onClick={() => navigate("/login")} style={styles.navGhostBtn}>Sign in</button>
          <button onClick={() => navigate("/login")} className="btn-hover" style={styles.navBrandBtn}>Get started</button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main style={styles.mainContainer}>
        <section className="hero-grid" style={styles.heroGrid}>
          
          {/* LEFT: Text Content */}
          <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="hero-badge" style={styles.badge}>
              <span style={{color: 'oklch(0.58 0.24 295)'}}>⚡</span> Built for fast-moving teams
            </div>
            
            <h1 className="hero-title" style={styles.heroTitle}>
              Plan projects.<br/>
              <span style={styles.gradientText}>Assign tasks.</span><br/>
              Ship faster,<br/> together.
            </h1>
            
            <p style={styles.heroSub}>
              Tasky is a delightful team task manager — invite your crew, organize work into projects, and watch progress roll in from a beautiful dashboard.
            </p>
            
            <div className="hero-buttons" style={styles.buttonGroup}>
              <button onClick={() => navigate("/login")} className="btn-hover" style={styles.primaryBtn}>
                Start free →
              </button>
              <button className="btn-hover" style={styles.secondaryBtn}>
                See features
              </button>
            </div>
            
            <div className="hero-checks" style={styles.checkGroup}>
              <div style={styles.checkItem}><span style={styles.checkIcon}>✅</span> Role-based access</div>
              <div style={styles.checkItem}><span style={styles.checkIcon}>✅</span> Realtime ready</div>
            </div>
          </div>

          {/* RIGHT: Floating Robot */}
          <div className="animate-slide-up" style={styles.mascotContainer}>
            <div style={styles.mascotGlow}></div>
            <img src={robotImage} alt="Tasky Mascot" className="animate-float" style={styles.mascotImg} />
          </div>

        </section>

        {/* FEATURES SECTION */}
        <section style={styles.featuresSection}>
          <div style={styles.featuresGrid}>
            
            <div className="glass-card" style={styles.featureCard}>
              <div style={styles.featureIconBox}>👥</div>
              <h3 style={styles.featureTitle}>Teams & Roles</h3>
              <p style={styles.featureDesc}>Admins manage members and tasks. Members focus on what's assigned to them.</p>
            </div>

            <div className="glass-card" style={styles.featureCard}>
              <div style={styles.featureIconBox}>✅</div>
              <h3 style={styles.featureTitle}>Smart Tasks</h3>
              <p style={styles.featureDesc}>Priority, status, due dates, and assignees — everything you need, nothing you don't.</p>
            </div>

            <div className="glass-card" style={styles.featureCard}>
              <div style={styles.featureIconBox}>📊</div>
              <h3 style={styles.featureTitle}>Live Dashboard</h3>
              <p style={styles.featureDesc}>See totals, status splits, per-user load, and overdue work at a glance.</p>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}

const styles = {
  appContainer: { position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", background: "linear-gradient(135deg, oklch(0.97 0.04 295), oklch(0.97 0.05 340))", color: "oklch(0.18 0.04 280)", fontFamily: "ui-sans-serif, system-ui, sans-serif", overflowX: "hidden" },
  
  // Blobs
  blob1: { position: "absolute", top: "-8rem", left: "-8rem", width: "24rem", height: "24rem", background: "oklch(0.58 0.24 295 / 0.3)", borderRadius: "50%", filter: "blur(64px)", zIndex: 0 },
  blob2: { position: "absolute", top: "10rem", right: "-8rem", width: "28rem", height: "28rem", background: "oklch(0.7 0.22 25 / 0.3)", borderRadius: "50%", filter: "blur(64px)", zIndex: 0 },
  blob3: { position: "absolute", bottom: "0", left: "33%", width: "20rem", height: "20rem", background: "oklch(0.65 0.26 330 / 0.4)", borderRadius: "50%", filter: "blur(64px)", zIndex: 0 },

  // Navbar
  navbar: { position: "relative", zIndex: 10, width: "100%", maxWidth: "1280px", margin: "0 auto", padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  brand: { display: "flex", alignItems: "center", gap: "8px" },
  logoIcon: { width: "36px", height: "36px", background: "linear-gradient(135deg, oklch(0.62 0.24 280), oklch(0.65 0.26 330) 55%, oklch(0.75 0.22 35))", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "16px", boxShadow: "0 20px 60px -20px oklch(0.62 0.24 280 / 0.45)" },
  brandName: { fontSize: "20px", fontWeight: "800", letterSpacing: "-0.02em" },
  navActions: { display: "flex", alignItems: "center", gap: "12px" },
  navGhostBtn: { background: "transparent", border: "none", color: "oklch(0.18 0.04 280)", fontSize: "15px", fontWeight: "600", cursor: "pointer", padding: "8px 16px" },
  navBrandBtn: { background: "linear-gradient(135deg, oklch(0.62 0.24 280), oklch(0.65 0.26 330) 55%, oklch(0.75 0.22 35))", color: "white", border: "none", padding: "10px 20px", borderRadius: "0.85rem", fontWeight: "600", cursor: "pointer", boxShadow: "0 10px 25px -5px oklch(0.62 0.24 280 / 0.4)", transition: "all 0.2s" },

  // Main & Hero
  mainContainer: { position: "relative", zIndex: 10, flex: 1, width: "100%", maxWidth: "1280px", margin: "0 auto", padding: "0 24px" },
  heroGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center", minHeight: "70vh", padding: "40px 0" },
  
  badge: { display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.8)", padding: "6px 16px", borderRadius: "99px", fontSize: "13px", fontWeight: "600", color: "oklch(0.58 0.24 295)", width: "fit-content", marginBottom: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" },
  heroTitle: { fontSize: "clamp(48px, 6vw, 72px)", fontWeight: "800", margin: "0 0 24px 0", lineHeight: "1.05", letterSpacing: "-0.02em", color: "oklch(0.18 0.04 280)" },
  gradientText: { backgroundImage: "linear-gradient(135deg, oklch(0.62 0.24 280), oklch(0.65 0.26 330) 55%, oklch(0.75 0.22 35))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  heroSub: { fontSize: "18px", color: "oklch(0.5 0.04 280)", margin: "0 0 32px 0", lineHeight: "1.6", maxWidth: "500px" },
  
  buttonGroup: { display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "32px" },
  primaryBtn: { background: "linear-gradient(135deg, oklch(0.62 0.24 280), oklch(0.65 0.26 330) 55%, oklch(0.75 0.22 35))", color: "white", border: "none", padding: "16px 32px", borderRadius: "1rem", fontSize: "16px", fontWeight: "700", cursor: "pointer", boxShadow: "0 20px 60px -20px oklch(0.62 0.24 280 / 0.45)", transition: "all 0.2s" },
  secondaryBtn: { background: "rgba(255,255,255,0.6)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.8)", color: "oklch(0.18 0.04 280)", padding: "16px 32px", borderRadius: "1rem", fontSize: "16px", fontWeight: "700", cursor: "pointer", transition: "all 0.2s" },

  checkGroup: { display: "flex", gap: "24px", flexWrap: "wrap", fontSize: "14px", color: "oklch(0.5 0.04 280)", fontWeight: "500" },
  checkItem: { display: "flex", alignItems: "center", gap: "8px" },
  checkIcon: { color: "oklch(0.7 0.18 155)", fontSize: "16px" }, // Success green color

  mascotContainer: { position: "relative", display: "flex", justifyContent: "center", alignItems: "center" },
  mascotGlow: { position: "absolute", inset: "10%", borderRadius: "50%", background: "linear-gradient(135deg, oklch(0.62 0.24 280), oklch(0.65 0.26 330))", opacity: 0.3, filter: "blur(64px)" },
  mascotImg: { position: "relative", width: "100%", maxWidth: "520px", filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.25))" },

  // Features Section
  featuresSection: { paddingBottom: "100px" },
  featuresGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" },
  featureCard: { padding: "24px", borderRadius: "1.5rem" },
  featureIconBox: { width: "44px", height: "44px", background: "linear-gradient(135deg, oklch(0.62 0.24 280), oklch(0.65 0.26 330) 55%, oklch(0.75 0.22 35))", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "20px", marginBottom: "16px", boxShadow: "0 10px 20px -10px oklch(0.62 0.24 280 / 0.45)" },
  featureTitle: { fontSize: "18px", fontWeight: "700", margin: "0 0 8px 0" },
  featureDesc: { fontSize: "14px", color: "oklch(0.5 0.04 280)", margin: 0, lineHeight: "1.6" }
};