import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  
  const [activeTab, setActiveTab] = useState("dashboard");
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  
  const [stats, setStats] = useState({
    total: 0, todo: 0, inProgress: 0, done: 0, overdue: 0, tasksPerUser: {}, overdueList: []
  });

  useEffect(() => {
  const t = localStorage.getItem("token");

  if (t && t.split(".").length === 3) {
    try {
      const payload = JSON.parse(atob(t.split(".")[1]));
      i(payload); 
    } catch (err) {
      console.error("Token decoding failed:", err);
      e("/login"); 
    }
  } else {
    
    e("/login");
  }
}, []);

  const fetchDashboardData = async () => {
    try {
      const [projRes, statsRes] = await Promise.all([
        API.get("/projects"),
        API.get("/tasks/dashboard")
      ]);
      setProjects(projRes.data);
      setStats(statsRes.data);
      setLoading(false);
    } catch (err) { console.log(err); setLoading(false); }
  };

  const createProject = async (e) => {
    e.preventDefault();
    if (!projectName.trim()) return;
    try {
      await API.post("/projects", { name: projectName });
      setProjectName("");
      fetchDashboardData();
      setActiveTab("projects");
    } catch (err) { alert("Project creation failed"); }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const completionRate = stats.total ? Math.round((stats.done / stats.total) * 100) : 0;
  const sortedUsers = Object.entries(stats.tasksPerUser || {}).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const maxUserTasks = sortedUsers.length > 0 ? sortedUsers[0][1] : 1;

  const statCards = [
    { label: "Total tasks", value: stats.total, icon: "📋", gradient: "linear-gradient(135deg, oklch(0.62 0.24 280), oklch(0.65 0.26 330))" },
    { label: "In progress", value: stats.inProgress, icon: "⏳", gradient: "linear-gradient(135deg, oklch(0.78 0.17 75), oklch(0.7 0.22 25))" },
    { label: "Completed", value: stats.done, icon: "✅", gradient: "linear-gradient(135deg, oklch(0.7 0.18 155), oklch(0.8 0.15 180))" },
    { label: "Overdue", value: stats.overdue, icon: "⚠️", gradient: "linear-gradient(135deg, oklch(0.62 0.24 25), oklch(0.75 0.22 35))" },
  ];

  return (
    <div style={styles.appContainer}>
      <style>
        {`
          @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes blob { 0%, 100% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px,-40px) scale(1.1); } 66% { transform: translate(-20px,20px) scale(0.95); } }
          .animate-slide-up { animation: slideUp 0.5s ease-out forwards; }
          .animate-blob { animation: blob 18s ease-in-out infinite; }
          .glass { background: linear-gradient(160deg, oklch(1 0 0 / 0.85), oklch(1 0 0 / 0.55)); backdrop-filter: blur(14px); border: 1px solid oklch(1 0 0 / 0.6); box-shadow: 0 8px 30px -10px oklch(0.4 0.1 295 / 0.18); transition: all 0.2s; }
          .glass:hover { transform: translateY(-4px); box-shadow: 0 20px 60px -20px oklch(0.62 0.24 280 / 0.45); }
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: oklch(0.92 0.015 285); border-radius: 10px; }
        `}
      </style>

      {/* BACKGROUND BLOBS */}
      <div className="animate-blob" style={styles.blob1}></div>
      <div className="animate-blob" style={{...styles.blob2, animationDelay: '2s'}}></div>
      <div className="animate-blob" style={{...styles.blob3, animationDelay: '4s'}}></div>

      {/* EXACT "TASKY" SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={styles.brand}>
          <div style={styles.logoIcon}>✨</div>
          <span style={styles.brandName}>Tasky</span>
        </div>
        
        <nav style={styles.navMenu}>
          <button onClick={() => setActiveTab("dashboard")} style={activeTab === "dashboard" ? styles.activeNavItem : styles.navBtn}>
            <span>⌘</span> Dashboard
          </button>
          <button onClick={() => setActiveTab("projects")} style={activeTab === "projects" ? styles.activeNavItem : styles.navBtn}>
            <span>📁</span> Projects
          </button>
        </nav>

        {/* BOTTOM USER CARD */}
        <div style={styles.userCard}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <div style={styles.userAvatar}>{currentUser?.name?.charAt(0).toUpperCase() || 'U'}</div>
            <div style={{minWidth: 0}}>
              <div style={{fontWeight: '800', fontSize: '14px', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{currentUser?.name}</div>
              <div style={{fontSize: '12px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{currentUser?.email}</div>
            </div>
          </div>
          <button onClick={logout} style={styles.logoutBtn}>
            ↪ Sign out
          </button>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="custom-scrollbar" style={styles.viewport}>
        <header style={styles.header}>
          <div>
            <p style={styles.greetingSub}>Welcome back 👋</p>
            <h1 style={styles.greetingTitle}>
              Hi, <span style={styles.gradientText}>{currentUser?.name?.split(" ")[0] || "there"}</span>
            </h1>
          </div>
          <button style={styles.brandBtn} onClick={() => setActiveTab("projects")}>
            + New project
          </button>
        </header>

        {activeTab === "dashboard" ? (
          <div className="animate-slide-up">
            <section style={styles.statsRow}>
              {statCards.map((s) => (
                <div key={s.label} className="glass" style={{ padding: '24px', borderRadius: '1.5rem', textAlign: 'center' }}>
                  <div style={{...styles.iconBox, background: s.gradient, margin: '0 auto'}}>{s.icon}</div>
                  <div style={styles.statValue}>{loading ? "—" : s.value}</div>
                  <div style={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </section>

            <section style={styles.middleGrid}>
              <div className="glass" style={{ padding: '24px', borderRadius: '1.5rem' }}>
                <h2 style={styles.sectionTitle}>Tasks by status</h2>
                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { key: "todo", label: "To Do", val: stats.todo, color: "oklch(0.62 0.24 280)" },
                    { key: "inProgress", label: "In Progress", val: stats.inProgress, color: "oklch(0.78 0.17 75)" },
                    { key: "done", label: "Done", val: stats.done, color: "oklch(0.7 0.18 155)" },
                  ].map((row) => {
                    const pct = stats.total ? Math.round((row.val / stats.total) * 100) : 0;
                    return (
                      <div key={row.key}>
                        <div style={styles.progressHeader}>
                          <span style={{ fontWeight: '600', color: 'oklch(0.18 0.04 280)' }}>{row.label}</span>
                          <span style={{ color: 'oklch(0.5 0.04 280)', fontSize: '14px' }}>{row.val} · {pct}%</span>
                        </div>
                        <div style={styles.progressTrack}>
                          <div style={{...styles.progressFill, background: row.color, width: `${pct}%`}} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div style={styles.miniStatsGrid}>
                  <div style={styles.miniStatBox}>
                    <div style={styles.miniStatLabel}>Projects</div>
                    <div style={styles.miniStatValue}>{projects.length}</div>
                  </div>
                  <div style={styles.miniStatBox}>
                    <div style={styles.miniStatLabel}>Completion rate</div>
                    <div style={styles.miniStatValue}>{completionRate}%</div>
                  </div>
                </div>
              </div>

              <div className="glass" style={{ padding: '24px', borderRadius: '1.5rem' }}>
                <h2 style={styles.sectionTitle}>Tasks per teammate</h2>
                {sortedUsers.length === 0 ? (
                  <p style={styles.emptyText}>No tasks assigned yet.</p>
                ) : (
                  <ul style={styles.userList}>
                    {sortedUsers.map(([name, count]) => {
                      const pct = Math.round((count / maxUserTasks) * 100);
                      return (
                        <li key={name} style={styles.userRow}>
                          <div style={styles.memberAvatar}>{name.charAt(0).toUpperCase()}</div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={styles.progressHeader}>
                              <span style={{ fontWeight: '600', color: 'oklch(0.18 0.04 280)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</span>
                              <span style={{ color: 'oklch(0.5 0.04 280)', fontSize: '14px' }}>{count}</span>
                            </div>
                            <div style={{...styles.progressTrack, height: '8px', marginTop: '4px'}}>
                              <div style={{...styles.progressFill, backgroundImage: "linear-gradient(135deg, oklch(0.62 0.24 280), oklch(0.65 0.26 330))", width: `${pct}%`}} />
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </section>
          </div>
        ) : (
          <section className="glass animate-slide-up" style={{ padding: '32px', borderRadius: '1.5rem' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px', color: 'oklch(0.18 0.04 280)' }}>Your Projects</h2>
            <p style={{ color: 'oklch(0.5 0.04 280)', fontSize: '14px', marginBottom: '24px' }}>Create or manage your team workspaces.</p>
            
            <form onSubmit={createProject} style={styles.createBox}>
              <input value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Name your new project..." style={styles.input} required />
              <button type="submit" style={styles.brandBtn}>Create Project</button>
            </form>

            <div style={styles.projectGrid}>
              {projects.map(p => (
                <Link key={p._id} to={`/project/${p._id}`} className="glass" style={{ padding: '24px', borderRadius: '1rem', textDecoration: 'none', display: 'block' }}>
                  <h3 style={{ margin: '0 0 8px 0', color: 'oklch(0.18 0.04 280)', fontSize: '18px' }}>{p.name}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: '13px', color: 'oklch(0.5 0.04 280)', margin: 0 }}>{p.members?.length || 1} Member(s)</p>
                    <span style={{ color: 'oklch(0.58 0.24 295)', fontWeight: 'bold' }}>→</span>
                  </div>
                </Link>
              ))}
              {projects.length === 0 && <p style={styles.emptyText}>You haven't created any projects yet.</p>}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

const styles = {
  appContainer: { position: "relative", display: "flex", height: "100vh", background: "oklch(0.99 0.005 280)", color: "oklch(0.18 0.04 280)", fontFamily: "ui-sans-serif, system-ui, sans-serif", overflow: "hidden" },
  
  blob1: { position: "absolute", top: "-10%", left: "-10%", width: "40vw", height: "40vw", background: "oklch(0.58 0.24 295 / 0.15)", borderRadius: "50%", filter: "blur(100px)", zIndex: 0 },
  blob2: { position: "absolute", bottom: "-10%", right: "-10%", width: "40vw", height: "40vw", background: "oklch(0.7 0.22 25 / 0.15)", borderRadius: "50%", filter: "blur(100px)", zIndex: 0 },
  blob3: { position: "absolute", top: "40%", left: "30%", width: "30vw", height: "30vw", background: "oklch(0.65 0.26 330 / 0.1)", borderRadius: "50%", filter: "blur(100px)", zIndex: 0 },

  // EXACT TASKY SIDEBAR
  sidebar: { position: "relative", zIndex: 1, width: "280px", background: "white", borderRight: "1px solid #f1f5f9", display: "flex", flexDirection: "column", padding: "24px" },
  brand: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "40px", paddingLeft: "8px" },
  logoIcon: { width: "36px", height: "36px", background: "linear-gradient(135deg, oklch(0.65 0.26 330), oklch(0.62 0.24 280))", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "18px" },
  brandName: { fontSize: "22px", fontWeight: "800", letterSpacing: "-0.02em" },
  navMenu: { flex: 1, display: "flex", flexDirection: "column", gap: "8px" },
  navBtn: { background: "transparent", border: "none", color: "#64748b", padding: "12px 16px", textAlign: "left", cursor: "pointer", fontSize: "15px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "12px", transition: "0.2s", fontWeight: "600" },
  activeNavItem: { background: "linear-gradient(135deg, oklch(0.62 0.24 280), oklch(0.65 0.26 330))", color: "white", padding: "12px 16px", borderRadius: "12px", fontSize: "15px", fontWeight: "700", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 10px 20px -10px oklch(0.62 0.24 280 / 0.5)" },
  
  userCard: { marginTop: "auto", background: "#f8fafc", border: "1px solid #f1f5f9", padding: "16px", borderRadius: "16px", display: "flex", flexDirection: "column", gap: "16px" },
  userAvatar: { width: "40px", height: "40px", borderRadius: "50%", background: "#f97316", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "16px" },
  logoutBtn: { background: "transparent", border: "none", color: "#64748b", fontSize: "13px", fontWeight: "600", cursor: "pointer", textAlign: "left", padding: "0", display: "flex", alignItems: "center", gap: "8px", transition: "0.2s" },

  viewport: { position: "relative", zIndex: 1, flex: 1, padding: "40px 60px", display: "flex", flexDirection: "column", overflowY: "auto" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "40px" },
  greetingSub: { fontSize: "14px", color: "oklch(0.5 0.04 280)", margin: "0 0 4px 0" },
  greetingTitle: { fontSize: "36px", fontWeight: "800", margin: 0, letterSpacing: "-0.02em" },
  gradientText: { backgroundImage: "linear-gradient(135deg, oklch(0.65 0.26 330), oklch(0.62 0.24 280))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  brandBtn: { background: "linear-gradient(135deg, oklch(0.65 0.26 330), oklch(0.62 0.24 280))", color: "white", border: "none", padding: "12px 24px", borderRadius: "12px", fontWeight: "700", cursor: "pointer", boxShadow: "0 10px 20px -10px oklch(0.62 0.24 280 / 0.5)", transition: "0.2s" },
  
  statsRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px", marginBottom: "24px" },
  iconBox: { width: "48px", height: "48px", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", color: "white", boxShadow: "0 10px 20px -10px rgba(0,0,0,0.2)" },
  statValue: { fontSize: "36px", fontWeight: "800", marginTop: "16px", fontFamily: "tabular-nums" },
  statLabel: { fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "oklch(0.5 0.04 280)", marginTop: "4px" },
  
  middleGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "24px" },
  sectionTitle: { fontSize: "18px", fontWeight: "800", margin: 0 },
  progressHeader: { display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "8px" },
  progressTrack: { height: "12px", background: "oklch(0.96 0.01 280)", borderRadius: "999px", overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: "999px", transition: "width 0.7s ease" },
  
  miniStatsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "24px" },
  miniStatBox: { background: "rgba(255,255,255,0.8)", border: "1px solid #f1f5f9", padding: "16px", borderRadius: "16px" },
  miniStatLabel: { fontSize: "14px", color: "oklch(0.5 0.04 280)", marginBottom: "4px", fontWeight: "600" },
  miniStatValue: { fontSize: "28px", fontWeight: "800" },
  
  userList: { margin: "20px 0 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "16px" },
  userRow: { display: "flex", alignItems: "center", gap: "16px" },
  memberAvatar: { width: "40px", height: "40px", borderRadius: "50%", background: "#f1f5f9", color: "#475569", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "16px" },
  
  emptyText: { marginTop: "16px", fontSize: "14px", color: "oklch(0.5 0.04 280)" },
  createBox: { display: "flex", gap: "12px", marginBottom: "32px", maxWidth: "600px" },
  input: { flex: 1, padding: "12px 16px", borderRadius: "12px", border: "1px solid oklch(0.92 0.015 285)", background: "oklch(0.94 0.012 285)", outline: "none", fontSize: "15px" },
  projectGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" },
};