import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

const Students = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false); 
  const [student, setStudent] = useState({
    id: "",
    name: "",
    class: "",
    section: "",
    rollNumber: "",
  });
  const [studentsList, setStudentsList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);


  const fetchStudents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "students"));
      const students = [];
      querySnapshot.forEach((doc) => {
        students.push({ ...doc.data(), id: doc.id });
      });
      setStudentsList(students);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleInputChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !student.id ||
      !student.name ||
      !student.class ||
      !student.section ||
      !student.rollNumber
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "students"), student);
      alert("Student added successfully!");
      setModalOpen(false);
      setStudent({ id: "", name: "", class: "", section: "", rollNumber: "" });
      fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
      alert("There was an error adding the student.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "students", id));
      alert("Student deleted successfully!");
      fetchStudents(); 
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("There was an error deleting the student.");
    }
  };

  const handleEdit = (studentData) => {
    setSelectedStudent(studentData);
    setEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (
      !selectedStudent.id ||
      !selectedStudent.name ||
      !selectedStudent.class ||
      !selectedStudent.section ||
      !selectedStudent.rollNumber
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const studentDoc = doc(db, "students", selectedStudent.id);
      await updateDoc(studentDoc, {
        name: selectedStudent.name,
        class: selectedStudent.class,
        section: selectedStudent.section,
        rollNumber: selectedStudent.rollNumber,
      });
      alert("Student updated successfully!");
      setEditModalOpen(false);
      fetchStudents();
    } catch (error) {
      console.error("Error updating student:", error);
      alert("There was an error updating the student.");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 w-full">
        <h2 className="text-2xl font-bold mb-4">Students Page</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Student
        </button>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Class</th>
              <th className="border border-gray-300 px-4 py-2">Section</th>
              <th className="border border-gray-300 px-4 py-2">Roll Number</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentsList.map((student) => (
              <tr key={student.id}>
                <td className="border border-gray-300 px-4 py-2">{student.id}</td>
                <td className="border border-gray-300 px-4 py-2">{student.name}</td>
                <td className="border border-gray-300 px-4 py-2">{student.class}</td>
                <td className="border border-gray-300 px-4 py-2">{student.section}</td>
                <td className="border border-gray-300 px-4 py-2">{student.rollNumber}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button onClick={() => handleEdit(student)} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="m-4 px-2 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        
        {modalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg">
              <h3 className="text-lg font-bold mb-4">Add Student</h3>
              <form onSubmit={handleSubmit} className="space-y-2">
                <input
                  name="id"
                  placeholder="ID"
                  value={student.id}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  name="name"
                  placeholder="Name"
                  value={student.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  name="class"
                  placeholder="Class"
                  value={student.class}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  name="section"
                  placeholder="Section"
                  value={student.section}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  name="rollNumber"
                  placeholder="Roll Number"
                  value={student.rollNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 ml-2"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

       
        {editModalOpen && selectedStudent && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg">
              <h3 className="text-lg font-bold mb-4">Edit Student</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdate();
                }}
                className="space-y-2"
              >
                <input
                  name="id"
                  value={selectedStudent.id}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  name="name"
                  value={selectedStudent.name}
                  onChange={(e) =>
                    setSelectedStudent({
                      ...selectedStudent,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  name="class"
                  value={selectedStudent.class}
                  onChange={(e) =>
                    setSelectedStudent({
                      ...selectedStudent,
                      class: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  name="section"
                  value={selectedStudent.section}
                  onChange={(e) =>
                    setSelectedStudent({
                      ...selectedStudent,
                      section: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  name="rollNumber"
                  value={selectedStudent.rollNumber}
                  onChange={(e) =>
                    setSelectedStudent({
                      ...selectedStudent,
                      rollNumber: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 ml-2"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;
