import "./App.css";
import React, { useState } from "react";
import NavBar from "./NavBar";
import { Route, Redirect, Switch } from "react-router-dom";
import EmpList from "./EmpList";
import Home from "./Home";
import AddEmp from "./AddEmp";
import NotFound from "./NotFound";
import EditEmp from "./EditEmp";

function App() {
  const [empArray, setEmpArray] = useState([
    { id: 1, name: "DEMOEMP", bdate: "1995-01-01", dept: "FSD", xp: "4" },
  ]);

  const [idProvider, setIdProvider] = useState(2);

  function handleAdd(emp) {
    emp.id = idProvider;
    console.log(emp);
    const tempEmp = [...empArray];
    tempEmp.push(emp);
    console.log(tempEmp);
    setEmpArray(tempEmp);
    console.log(empArray);
    setIdProvider(idProvider + 1);
    return true;
  }

  function handleEdit(Emp) {
    let tempArray = [...empArray];
    for (let tempEmp of tempArray) {
      if (tempEmp.id === Emp.id) {
        tempEmp.name = Emp.name;
        tempEmp.bdate = Emp.bdate;
        tempEmp.dept = Emp.dept;
        tempEmp.xp = Emp.xp;
        break;
      }
    }
    setEmpArray(tempArray);
  }

  function handleDelete(emp) {
    let tempArray = [...empArray];
    tempArray = empArray.filter((e) => e.id !== emp.id);
    setEmpArray(tempArray);
  }

  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route
            path="/list"
            render={(props) => (
              <EmpList
                addEmp={handleAdd}
                arr={empArray}
                deleteEmp={handleDelete}
                {...props}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddEmp addEmp={handleAdd} arr={empArray} {...props} />
            )}
          />
          <Route
            path="/edit/:id"
            render={(props) => (
              <EditEmp
                addEmp={handleAdd}
                editEmp={handleEdit}
                arr={empArray}
                {...props}
              />
            )}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
