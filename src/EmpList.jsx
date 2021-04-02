import React from "react";
import { Link, NavLink } from "react-router-dom";

const EmpList = (props) => {
  if (props.arr.length === 0) {
    return (
      <div className="p-2 m-2">
        <h2>
          Current React State Has No Details Regarding Employees. <br />
          Please Add Employee Details.
        </h2>
      </div>
    );
  }
  return (
    <div className="w-100 mx-auto shadow p-2 m-2">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Emp_ID</th>
            <th scope="col">Name</th>
            <th scope="col">Birth Date (YYYY-MM-DD)</th>
            <th scope="col">Department</th>
            <th scope="col">Exprience (in Yrs)</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {props.arr.map((emp, index) => (
            <tr key={index}>
              <th scope="row">{emp.id}</th>
              <td>{emp.name}</td>
              <td>{emp.bdate}</td>
              <td>{emp.dept}</td>
              <td>{emp.xp}</td>
              <td>
                <Link
                  className="btn btn-outline-primary mr-2"
                  to={`/edit/${emp.id}`}
                >
                  Edit
                </Link>
                <button
                  onClick={() => props.deleteEmp(emp)}
                  className="btn btn-danger mr-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmpList;
