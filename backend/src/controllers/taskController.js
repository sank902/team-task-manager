import Task from "../models/Task.js";
import Project from "../models/Project.js";

// create task
export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, assignedTo, projectId } = req.body;

    const project = await Project.findById(projectId);

    const isMember = project.members.find(
      (m) => m.user.toString() === req.user.id
    );

    if (!isMember) {
      return res.status(403).json({ message: "Not part of project" });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority: priority || "Medium",
      status: "To Do",
      assignedTo: assignedTo || req.user.id,
      projectId,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get tasks
export const getTasks = async (req, res) => {
  try {
    const { projectId } = req.query;

    const tasks = await Task.find({ projectId })
      .populate("assignedTo", "name email");

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update status
export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const project = await Project.findById(task.projectId);

    const isAdmin = project.members.find(
      (m) => m.user.toString() === req.user.id && m.role === "admin"
    );

    if (task.assignedTo.toString() !== req.user.id && !isAdmin) {
      return res.status(403).json({ message: "Not allowed" });
    }

    task.status = status;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// dashboard stats
export const getDashboard = async (req, res) => {
  try {
    const userProjects = await Project.find({ "members.user": req.user.id });
    const projectIds = userProjects.map(p => p._id);

    const tasks = await Task.find({ projectId: { $in: projectIds } })
                            .populate("assignedTo", "name");

    const total = tasks.length;
    const todo = tasks.filter((t) => t.status === "To Do").length;
    const inProgress = tasks.filter((t) => t.status === "In Progress").length;
    const done = tasks.filter((t) => t.status === "Done").length;
    
    const overdueTasks = tasks.filter(
      (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "Done"
    );

    // Calculate tasks per user
    const tasksPerUser = {};
    tasks.forEach(t => {
      if(t.assignedTo && t.assignedTo.name) {
        tasksPerUser[t.assignedTo.name] = (tasksPerUser[t.assignedTo.name] || 0) + 1;
      }
    });

    res.json({
      total,
      todo,
      inProgress,
      done,
      overdue: overdueTasks.length, // Count for the top card
      overdueList: overdueTasks,    // The actual array for the bottom list
      tasksPerUser 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};