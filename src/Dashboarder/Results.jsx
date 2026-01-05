import React, { useState } from "react";
import Sidebar from './Sidebar';
import './Result.css'

const Result = () => {
  const [term, setTerm] = useState("");
  const [session, setSession] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const handleCheckResult = (e) => {
    e.preventDefault();
    setLoading(true);

    // Mock result data (replace with API call)
    setTimeout(() => {
      setResult({
        studentName: `${storedUser?.firstName || ""} ${storedUser?.lastName || ""}`.trim(),
        // studentName: [storedUser?.firstName, storedUser?.lastName].filter(Boolean).join(" "),
        class: "SS2 Science",
        session: "2024/2025",
        term: "2nd Term",
        subjects: [
          { name: "Mathematics", ca: 22, exam: 55, total: 77, grade: "B2" },
          { name: "English Language", ca: 25, exam: 48, total: 73, grade: "B3" },
          { name: "Physics", ca: 26, exam: 60, total: 86, grade: "A1" },
          { name: "Chemistry", ca: 20, exam: 50, total: 70, grade: "B3" },
          { name: "Biology", ca: 24, exam: 54, total: 78, grade: "B2" },
          { name: "Civic Education", ca: 28, exam: 63, total: 91, grade: "A1" },
          { name: "Computer Science", ca: 27, exam: 67, total: 94, grade: "A1" },
        ],
        average: 80,
        position: "3rd",
      });

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="check-result-container">
      <h2>Check Result</h2>

      {/* FORM SECTION */}
      <form className="result-form" onSubmit={handleCheckResult}>
        <div className="form-group">
          <label>Session</label>
          <select value={session} onChange={(e) => setSession(e.target.value)} required>
            <option value="">Select Session</option>
            <option value="2024/2025">2024/2025</option>
            <option value="2023/2024">2023/2024</option>
            <option value="2022/2023">2022/2023</option>
          </select>
        </div>

        <div className="form-group">
          <label>Term</label>
          <select value={term} onChange={(e) => setTerm(e.target.value)} required>
            <option value="">Select Term</option>
            <option value="1st Term">1st Term</option>
            <option value="2nd Term">2nd Term</option>
            <option value="3rd Term">3rd Term</option>
          </select>
        </div>

        <button type="submit" className="check-btn" disabled={loading}>
          {loading ? "Loading..." : "Check Result"}
        </button>
      </form>

      {/* RESULT DISPLAY */}
      {result && (
        <div className="result-card">
          <h3>{result.term} Result – {result.session}</h3>
          <p><strong>Name:</strong> {result.studentName}</p>
          <p><strong>Class:</strong> {result.class}</p>

          <table className="result-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>CA (30%)</th>
                <th>Exam (70%)</th>
                <th>Total</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {result.subjects.map((sub, index) => (
                <tr key={index}>
                  <td>{sub.name}</td>
                  <td>{sub.ca}</td>
                  <td>{sub.exam}</td>
                  <td>{sub.total}</td>
                  <td>{sub.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="summary">
            <p><strong>Average Score:</strong> {result.average}%</p>
            <p><strong>Position in Class:</strong> {result.position}</p>
          </div>
        </div>
      )}
    </div>
  );
};




export default Result;
