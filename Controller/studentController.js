import { prisma } from "../config/prisma.js";
import bcrypt from "bcrypt";
//List all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await prisma.user.findMany({
      where: { role: "STUDENT",deletedAt:null },
      select: { id: true, fullName: true, email: true, gender: true },
    });
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: { message: `${err}` } });
  }
};
export const getClassStudents = async (req, res) => {};
export const addStudent = async (req, res) => {
  const { fullName, gender, password, email } = req.body;
  try {
    const userExists = await prisma.user.findUnique({
      where: { email },
    });
    if (userExists) {
      return res
        .status(409)
        .json({ error: { message: "Student Already Exists" } });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newStudent = await prisma.user.create({
      data: {
        fullName,
        gender,
        password: hashedPassword,
        email,
        role: "STUDENT",
      },
    });
    res.status(200).json({
      data: newStudent,
      success: true,
      message: "New Student Registered",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: { message: `Your error---->  ${err}` } });
  }
};
export const editStudent = async (req, res) => {};
export const deleteStudent = async (req, res) => {
  const { studId } = req.params;
// console.log("Student to be deleted ID  ----> ",studId)


  try {
    // 1. Check if the student exists
    const studExist = await prisma.user.findUnique({
      where: { id: studId },
      include: { student: true },
    });

// console.log("Student to be deleted ID  ----> ",studExist)

    // 2. Validation: Check existence, Role, and if ALREADY deleted
    if (!studExist || studExist.role !== "STUDENT" || studExist.deletedAt !==null) {
      // console.log("Student does not exist or is already deleted");
      return res
        .status(404)
        .json({ success: false, message: "Student not found or already archived" });
    }

    // 3. Soft Delete (Update instead of Delete)
    await prisma.user.update({
      where: { id: studId },
      data: { deletedAt: new Date() }, // Set the timestamp
    });

    res.status(200).json({ 
      success: true, 
      message: `Student ${studExist.fullName} is moved to archive` 
    });

  } catch (err) {
    // console.log("Error in deleting---->", err);
    res.status(500).json({ success: false, error: { message: `${err}` } });
  }
};