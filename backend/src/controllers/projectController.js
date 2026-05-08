import Project from "../models/Project.js";
import User from "../models/User.js";

// create project
export const createProject = async (req, res) => {
  try {
    const { name } = req.body;

    const project = await Project.create({
      name,
      createdBy: req.user.id,
      members: [
        {
          user: req.user.id,
          role: "admin",
        },
      ],
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all projects for logged user
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      "members.user": req.user.id,
    }).populate("members.user", "name email");

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get single project details (for the frontend board)
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("members.user", "name email");
      
    if(!project) return res.status(404).json({ message: "Project not found" });
    
    const adminId = project.members.find(m => m.role === 'admin')?.user._id;
    const mappedMembers = project.members.map(m => m.user);

    res.json({
        _id: project._id,
        name: project.name,
        admin: adminId,
        members: mappedMembers
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// add member (admin only) via Email
export const addMember = async (req, res) => {
  try {
    const projectId = req.params.id || req.body.projectId;
    const { email } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // check if current user is admin
    const isAdmin = project.members.find(
      (m) => m.user.toString() === req.user.id && m.role === "admin"
    );

    if (!isAdmin) {
      return res.status(403).json({ message: "Only admin can add members" });
    }

    // find user by email
    const userToInvite = await User.findOne({ email });
    if (!userToInvite) {
        return res.status(404).json({ message: "User with this email not found" });
    }

    // check if user already exists in project
    const alreadyMember = project.members.find(
      (m) => m.user.toString() === userToInvite._id.toString()
    );

    if (alreadyMember) {
      return res.status(400).json({ message: "User already in project" });
    }

    project.members.push({
      user: userToInvite._id,
      role: "member",
    });

    await project.save();

    res.json({ message: "Member added", project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};