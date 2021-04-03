import React, { useState, useEffect } from "react";

function EditEmp(props) {
  const [emp, setEmp] = useState({
    name: "",
    bdate: "",
    dept: "",
    xp: "",
    id: props.match.params.id,
  });

  const id = props.match.params.id;

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    console.log(e.target.value);
    setEmp({ ...emp, [e.target.name]: e.target.value });
  };

  const validation = () => {
    let reg_name = /^[A-Z]+$/;
    let reg_xp = /^[0-9]/;

    const tempErrors = {};
    if (emp.bdate.length === 0) {
      tempErrors.bdate = "Birthdate is required";
    }
    if (emp.name.length === 0) {
      tempErrors.name = "Name is Required";
    } else if (!reg_name.test(emp.name)) {
      tempErrors.name = "Name Must Contains Only UPPERCASE letters";
    }
    if (emp.dept.length === 0) {
      tempErrors.dept = "Department is required";
    }
    if (emp.xp.length === 0) {
      tempErrors.xp = "Work Experience in years required.";
    } else if (!reg_xp.test(emp.xp)) {
      tempErrors.xp = "Please enter only positive interger value.";
    }

    return Object.keys(tempErrors).length === 0 ? null : tempErrors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const tempErrors = validation();
    setErrors(tempErrors || {});
    console.log(errors);
    if (tempErrors) return;
    props.editEmp(emp);
    console.log("Submit Function");
    props.history.push("/list");
  };

  const loadEmp = () => {
    console.log(id);
    for (let emp of props.arr) {
      if (emp.id === id) {
        setEmp(emp);
      }
    }
  };

  useEffect(() => {
    setErrors({ name: "", bdate: "", dept: "", xp: "" });
    loadEmp();
  }, []);

  return (
    <div className="container">
      {console.log(props)}
      <h1>Edit Employee Details</h1>
      <h3>for Employee ID : {id}</h3>
      <div className="w-75 mx-auto shadow p-5">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              name="name"
              type="text"
              className="form-control"
              id="name"
              value={emp.name}
              onChange={(e) => handleChange(e)}
            />
            {errors.name && (
              <div className="alert alert-danger">{errors.name}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="bdate">Birth Date</label>
            <input
              name="bdate"
              type="date"
              className="form-control"
              id="bdate"
              value={emp.bdate}
              onChange={(e) => handleChange(e)}
            />
            {errors.bdate && (
              <div className="alert alert-danger">{errors.bdate}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="dept">Department</label>
            <input
              name="dept"
              type="text"
              className="form-control"
              id="dept"
              value={emp.dept}
              onChange={(e) => handleChange(e)}
            />
            {errors.dept && (
              <div className="alert alert-danger">{errors.dept}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="xp">Experience</label>
            <input
              name="xp"
              type="number"
              className="form-control"
              id="xp"
              value={emp.xp}
              onChange={(e) => handleChange(e)}
            />
            {errors.xp && <div className="alert alert-danger">{errors.xp}</div>}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditEmp;
