import { prisma } from "../config/prisma.js";
import bcrypt from "bcrypt";
//List all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await prisma.user.findMany({
      where: { role: "STUDENT", deletedAt: null },
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
    if (
      !studExist ||
      studExist.role !== "STUDENT" ||
      studExist.deletedAt !== null
    ) {
      // console.log("Student does not exist or is already deleted");
      return res
        .status(404)
        .json({
          success: false,
          message: "Student not found or already archived",
        });
    }

    // 3. Soft Delete (Update instead of Delete)
    await prisma.user.update({
      where: { id: studId },
      data: { deletedAt: new Date() }, // Set the timestamp
    });

    res.status(200).json({
      success: true,
      message: `Student ${studExist.fullName} is moved to archive`,
    });
  } catch (err) {
    // console.log("Error in deleting---->", err);
    res.status(500).json({ success: false, error: { message: `${err}` } });
  }
};

// Editing Student info
export const editStudent = async (req, res) => {
  const { studId } = await req.params;
  // console.log("Request Body----->",req.body)
  const { fullName, email, password, role, age,status,gender } = await req.body;
  //
  try {
    const studExist = await prisma.user.findUnique({
      where: { id: studId },
    });

    // Check if the student found or not
    if ( !studExist || studExist.deletedAt !== null ) {
      return res
        .status(404)
        .json({ success: false, error: { message: "The student not found" } });
    }
    // console.log("Update is started--->",studExist)

   const updatedData = await prisma.user.update({
      where: { id: studId },
      data: {
        fullName,
        password,
        email,
        role,
        student: {
          update: {
            age: age ? parseInt(age) : undefined,
            updatedAt:new Date(),
            
          },
        },
      },
      include:{student:true}//This tells me to return the updated student data
    });

    return res.status(200).json({ success: true ,message:"Student info updated successfully" ,data:updatedData});
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(409).json({ 
        success: false, 
        message: "This email is already used by another student or teacher." 
      });
    }
    return res .status(500) .json({ success: false, error: { message: `${err}` } });
  }
};
