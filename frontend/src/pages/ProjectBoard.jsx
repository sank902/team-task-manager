import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

const PRIORITY_COLOR = {
  Low: { bg: "oklch(0.96 0.01 280)", text: "oklch(0.5 0.04 280)" },
  Medium: { bg: "oklch(0.96 0.05 75)", text: "oklch(0.4 0.1 75)" },
  High: { bg: "oklch(0.95 0.05 25)", text: "oklch(0.62 0.24 25)" },
};

const STATUS_COLS = [
  { key: "To Do", label: "To Do", grad: "linear-gradient(to bottom right, rgba(99, 102, 241, 0.1), rgba(217, 70, 239, 0.05))" },
  { key: "In Progress", label: "In Progress", grad: "linear-gradient(to bottom right, rgba(245, 158, 11, 0.1), rgba(236, 72, 153, 0.05))" },
  { key: "Done", label: "Done", grad: "linear-gradient(to bottom right, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.05))" },
];

export default function ProjectBoard() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [taskOpen, setTaskOpen] = useState(false);
  const [memOpen, setMemOpen] = useState(false);

  const [tTitle, setTTitle] = useState("");
  const [tDesc, setTDesc] = useState("");
  const [tDue, setTDue] = useState("");
  const [tPriority, setTPriority] = useState("Medium");
  const [tAssignee, setTAssignee] = useState("unassigned");
  const [memEmail, setMemEmail] = useState("");
  const [memBusy, setMemBusy] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setCurrentUser(JSON.parse(atob(token.split(".")[1])));
    else navigate("/login");
    loadProject();
  }, [id]);

  const loadProject = async () => {
    setLoading(true);
    try {
      const [projRes, taskRes] = await Promise.all([
        API.get(`/projects/${id}`),
        API.get(`/tasks?projectId=${id}`)
      ]);
      setProject(projRes.data);
      setTasks(taskRes.data);
    } catch (err) { console.log(err); }
    setLoading(false);
  };

  const isAdmin = project?.admin === currentUser?.id;

  const createTask = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks", { projectId: id, title: tTitle.trim(), description: tDesc.trim(), dueDate: tDue || null, priority: tPriority, assignedTo: tAssignee === "unassigned" ? null : tAssignee, status: "To Do" });
      setTaskOpen(false); setTTitle(""); setTDesc(""); setTDue(""); setTPriority("Medium"); setTAssignee("unassigned");
      loadProject();
    } catch (err) { alert("Failed to create task"); }
  };

  const updateStatus = async (taskId, status) => {
    try {
      await API.put(`/tasks/${taskId}`, { status });
      setTasks(tasks.map(t => t._id === taskId ? { ...t, status } : t));
    } catch (err) { alert("Not allowed"); }
  };

  const deleteTask = async (taskId) => {
    if(!window.confirm("Delete this task?")) return;
    try {
      await API.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(t => t._id !== taskId));
    } catch (err) { alert("Failed"); }
  };

  const addMember = async (e) => {
    e.preventDefault();
    setMemBusy(true);
    try {
      await API.post(`/projects/${id}/invite`, { email: memEmail.trim() });
      setMemEmail(""); setMemOpen(false); loadProject();
    } catch (err) { alert(err.response?.data?.message || "Failed"); }
    setMemBusy(false);
  };

  const removeMember = async (memberId) => {
    if(memberId === project.admin) return alert("Cannot remove owner");
    if(!window.confirm("Remove member?")) return;
    try {
      await API.delete(`/projects/${id}/members/${memberId}`);
      loadProject();
    } catch (err) { alert("Failed"); }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const canUpdateTask = (t) => isAdmin || t.assignedTo?._id === currentUser?.id;
  const todayDate = new Date().toISOString().slice(0, 10);

  if (loading) return <div style={{height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}>Loading...</div>;

  return (
    <div style={styles.appContainer}>
      <style>
        {`
          @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes pop { 0% { transform: scale(0.9); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
          @keyframes blob { 0%, 100% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px,-40px) scale(1.1); } 66% { transform: translate(-20px,20px) scale(0.95); } }
          .animate-slide-up { animation: slideUp 0.5s ease-out forwards; }
          .animate-pop { animation: pop 0.3s ease-out; }
          .animate-blob { animation: blob 18s ease-in-out infinite; }
          .glass { background: linear-gradient(160deg, rgba(255,255,255,0.85), rgba(255,255,255,0.55)); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border: 1px solid oklch(1 0 0 / 0.6); box-shadow: 0 8px 30px -10px oklch(0.4 0.1 295 / 0.18); transition: all 0.2s; }
          .task-card { background: white; border-radius: 1.5rem; padding: 20px; box-shadow: 0 8px 30px -10px oklch(0.4 0.1 295 / 0.18); transition: all 0.3s; cursor: pointer; border: 1px solid transparent; }
          .task-card:hover { transform: translateY(-4px); box-shadow: 0 20px 60px -20px oklch(0.62 0.24 280 / 0.45); }
          .delete-icon { opacity: 0; color: oklch(0.5 0.04 280); cursor: pointer; transition: 0.2s; }
          .task-card:hover .delete-icon { opacity: 1; }
          .delete-icon:hover { color: oklch(0.62 0.24 25); }
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
          <button onClick={() => navigate("/dashboard")} style={styles.navBtn}>
            <span>⌘</span> Dashboard
          </button>
          <button style={styles.activeNavItem}>
            <span>📁</span> Project Board
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
        <div><Link to="/dashboard" style={styles.backLink}>← All projects</Link></div>

        <header className="glass animate-slide-up" style={styles.header}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={styles.pageTitle}>{project?.name}</h1>
            <p style={styles.pageDesc}>{project?.description || "Project workspace"}</p>
            
            <div style={styles.memberAvatars}>
              {project?.members.slice(0, 5).map(m => (
                <div key={m._id} style={{ position: 'relative' }}>
                  <div style={styles.avatar(32)}>{m.name.charAt(0).toUpperCase()}</div>
                  {m._id === project.admin && <div style={styles.crown}>👑</div>}
                </div>
              ))}
              <span style={styles.roleTag}>{isAdmin ? "Admin" : "Member"}</span>
            </div>
          </div>

          <div style={styles.headerActions}>
            {isAdmin && <button onClick={() => setMemOpen(true)} style={styles.btnOutline}>👤+ Add member</button>}
            {isAdmin && <button onClick={() => setTaskOpen(true)} style={styles.btnBrand}>➕ New task</button>}
          </div>
        </header>

        {isAdmin && (
          <section className="glass animate-slide-up" style={styles.membersSection}>
            <h2 style={styles.sectionTitle}>Members ({project?.members.length})</h2>
            <div style={styles.membersGrid}>
              {project?.members.map(m => {
                const isOwner = m._id === project.admin;
                return (
                  <div key={m._id} style={styles.memberCard}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0}}>
                      <div style={styles.avatar(36)}>{m.name.charAt(0).toUpperCase()}</div>
                      <div style={{minWidth: 0}}><div style={styles.memName}>{m.name}</div><div style={styles.memEmail}>{m.email}</div></div>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                      <span style={styles.roleBadge(isOwner)}>{isOwner ? "Owner" : "Member"}</span>
                      {!isOwner && <span onClick={() => removeMember(m._id)} style={{cursor: 'pointer'}}>🗑️</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <section style={styles.kanbanGrid}>
          {STATUS_COLS.map(col => {
            const colTasks = tasks.filter(t => t.status === col.key);
            return (
              <div key={col.key} className="glass animate-slide-up" style={{...styles.column, background: col.grad}}>
                <div style={styles.colHeader}>
                  <h3 style={styles.colTitle}>{col.label}</h3>
                  <span style={styles.colCount}>{colTasks.length}</span>
                </div>
                
                <div style={styles.taskList}>
                  {colTasks.length === 0 && <p style={styles.emptyCol}>No tasks</p>}
                  {colTasks.map(t => {
                    const isOverdue = t.dueDate && t.status !== "Done" && t.dueDate < todayDate;
                    return (
                      <div key={t._id} className="task-card animate-pop">
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                          <h4 style={styles.cardTitle}>{t.title}</h4>
                          {isAdmin && <span className="delete-icon" onClick={() => deleteTask(t._id)}>✖</span>}
                        </div>
                        {t.description && <p style={styles.cardDesc}>{t.description}</p>}
                        <div style={styles.cardTags}>
                          <span style={{...styles.tag, background: PRIORITY_COLOR[t.priority].bg, color: PRIORITY_COLOR[t.priority].text}}>🚩 {t.priority}</span>
                          {t.dueDate && <span style={{...styles.tag, background: isOverdue ? "oklch(0.95 0.05 25)" : "oklch(0.96 0.01 280)", color: isOverdue ? "oklch(0.62 0.24 25)" : "oklch(0.5 0.04 280)"}}>📅 {new Date(t.dueDate).toLocaleDateString()}</span>}
                        </div>
                        <div style={styles.cardFooter}>
                          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                            <div style={styles.avatar(24)}>{t.assignedTo ? t.assignedTo.name.charAt(0) : "?"}</div>
                            <span style={{fontSize: '12px', color: 'oklch(0.5 0.04 280)', fontWeight: '600'}}>{t.assignedTo ? t.assignedTo.name : "Unassigned"}</span>
                          </div>
                          {canUpdateTask(t) && (
                            <select value={t.status} onChange={(e) => updateStatus(t._id, e.target.value)} style={styles.statusSelect}>
                              <option value="To Do">To Do</option><option value="In Progress">In Progress</option><option value="Done">Done</option>
                            </select>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      </main>

      {/* MODALS */}
      {taskOpen && (
        <div style={styles.modalOverlay}>
          <div className="animate-pop" style={styles.modalContent}>
            <h2 style={{marginBottom: '20px', fontWeight: '800'}}>Create task</h2>
            <form onSubmit={createTask} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
              <input required value={tTitle} onChange={e=>setTTitle(e.target.value)} placeholder="Task Title" style={styles.input} />
              <textarea value={tDesc} onChange={e=>setTDesc(e.target.value)} placeholder="Description..." style={{...styles.input, height: '80px'}} />
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                <input type="date" value={tDue} onChange={e=>setTDue(e.target.value)} style={styles.input} />
                <select value={tPriority} onChange={e=>setTPriority(e.target.value)} style={styles.input}>
                  <option value="Low">Low</option><option value="Medium">Medium</option><option value="High">High</option>
                </select>
              </div>
              <select value={tAssignee} onChange={e=>setTAssignee(e.target.value)} style={styles.input}>
                <option value="unassigned">Unassigned</option>
                {project?.members.map(m => <option key={m._id} value={m._id}>{m.name}</option>)}
              </select>
              <div style={styles.modalActions}>
                <button type="button" onClick={() => setTaskOpen(false)} style={styles.btnGhost}>Cancel</button>
                <button type="submit" style={styles.btnBrand}>Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {memOpen && (
        <div style={styles.modalOverlay}>
          <div className="animate-pop" style={styles.modalContent}>
            <h2 style={{marginBottom: '20px', fontWeight: '800'}}>Add member</h2>
            <form onSubmit={addMember}>
              <input type="email" required value={memEmail} onChange={e=>setMemEmail(e.target.value)} placeholder="teammate@email.com" style={styles.input} />
              <div style={styles.modalActions}>
                <button type="button" onClick={() => setMemOpen(false)} style={styles.btnGhost}>Cancel</button>
                <button type="submit" disabled={memBusy} style={styles.btnBrand}>{memBusy ? "Adding..." : "Add"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  appContainer: { position: "relative", display: "flex", height: "100vh", background: "oklch(0.99 0.005 280)", padding: "0", fontFamily: "ui-sans-serif, system-ui, sans-serif", color: "oklch(0.18 0.04 280)", overflow: "hidden" },
  
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
  backLink: { display: "inline-flex", fontSize: "14px", color: "oklch(0.5 0.04 280)", textDecoration: "none", marginBottom: "24px", fontWeight: "600" },
  header: { borderRadius: "1.5rem", padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "20px", marginBottom: "32px" },
  pageTitle: { fontSize: "32px", fontWeight: "800", margin: "0 0 4px 0", letterSpacing: "-0.02em" },
  pageDesc: { fontSize: "14px", color: "oklch(0.5 0.04 280)", margin: "0 0 16px 0" },
  memberAvatars: { display: "flex", alignItems: "center", gap: "8px" },
  avatar: (size) => ({ width: size, height: size, borderRadius: "50%", background: "linear-gradient(135deg, oklch(0.97 0.04 295), oklch(0.97 0.05 340))", border: "2px solid white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.4, fontWeight: "800", color: "oklch(0.58 0.24 295)", marginLeft: size > 30 ? "-8px" : "0", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }),
  crown: { position: "absolute", top: "-5px", right: "-5px", fontSize: "12px", background: "white", borderRadius: "50%" },
  roleTag: { fontSize: "12px", color: "oklch(0.5 0.04 280)", marginLeft: "8px", background: "oklch(0.96 0.01 280)", padding: "4px 10px", borderRadius: "20px" },
  headerActions: { display: "flex", gap: "10px", flexWrap: "wrap" },
  btnBrand: { background: "linear-gradient(135deg, oklch(0.62 0.24 280), oklch(0.65 0.26 330) 55%, oklch(0.75 0.22 35))", color: "white", border: "none", padding: "10px 20px", borderRadius: "0.85rem", fontWeight: "600", cursor: "pointer", boxShadow: "0 20px 60px -20px oklch(0.62 0.24 280 / 0.45)", transition: "0.2s" },
  btnOutline: { background: "rgba(255,255,255,0.7)", border: "1px solid oklch(0.92 0.015 285)", color: "oklch(0.18 0.04 280)", padding: "10px 20px", borderRadius: "0.85rem", fontWeight: "600", cursor: "pointer" },
  
  membersSection: { borderRadius: "1.5rem", padding: "24px", marginBottom: "32px" },
  sectionTitle: { fontSize: "18px", fontWeight: "800", margin: "0 0 16px 0" },
  membersGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "12px" },
  memberCard: { display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.6)", padding: "12px", borderRadius: "0.85rem", border: "1px solid oklch(0.92 0.015 285)" },
  memName: { fontSize: "14px", fontWeight: "800" },
  memEmail: { fontSize: "12px", color: "oklch(0.5 0.04 280)" },
  roleBadge: (isOwner) => ({ fontSize: "10px", fontWeight: "800", textTransform: "uppercase", padding: "4px 8px", borderRadius: "20px", background: isOwner ? "oklch(0.96 0.05 75)" : "oklch(0.96 0.02 295)", color: isOwner ? "oklch(0.4 0.1 75)" : "oklch(0.25 0.08 295)" }),
  
  kanbanGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" },
  column: { borderRadius: "1.5rem", padding: "20px", border: "1px solid oklch(0.92 0.015 285)" },
  colHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" },
  colTitle: { fontSize: "14px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 },
  colCount: { background: "rgba(255,255,255,0.8)", padding: "2px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "800" },
  taskList: { display: "flex", flexDirection: "column", gap: "12px" },
  emptyCol: { border: "1px dashed oklch(0.92 0.015 285)", background: "rgba(255,255,255,0.4)", padding: "16px", borderRadius: "1.5rem", textAlign: "center", fontSize: "12px", color: "oklch(0.5 0.04 280)" },
  
  cardTitle: { fontSize: "16px", fontWeight: "800", margin: 0, color: "#0f172a" },
  cardDesc: { fontSize: "13px", color: "oklch(0.5 0.04 280)", margin: "8px 0" },
  cardTags: { display: "flex", gap: "8px", marginTop: "12px", flexWrap: "wrap" },
  tag: { fontSize: "11px", fontWeight: "700", padding: "4px 8px", borderRadius: "20px" },
  cardFooter: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" },
  statusSelect: { fontSize: "12px", padding: "6px 10px", borderRadius: "0.5rem", border: "1px solid oklch(0.92 0.015 285)", background: "oklch(0.99 0.005 280)", cursor: "pointer", fontWeight: "700" },
  
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modalContent: { background: "white", width: "100%", maxWidth: "450px", padding: "32px", borderRadius: "1.5rem", boxShadow: "0 20px 60px -20px rgba(0,0,0,0.2)" },
  input: { width: "100%", background: "oklch(0.94 0.012 285)", border: "1px solid oklch(0.92 0.015 285)", borderRadius: "0.85rem", padding: "12px 14px", fontSize: "14px", outline: "none", marginBottom: "12px" },
  modalActions: { display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" },
  btnGhost: { background: "transparent", border: "none", color: "oklch(0.5 0.04 280)", fontWeight: "600", cursor: "pointer", padding: "10px 20px" }
};