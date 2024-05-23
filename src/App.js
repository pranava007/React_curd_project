import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Button, EditableText, InputGroup, Toaster } from "@blueprintjs/core";
const AppToaster = Toaster.create({
  position: "top",
});
function App() {
  const [users, setusers] = useState([]);

  let [newname, newsetname] = useState("");
  let [newemail, newsetemail] = useState("");
  let [newwebsite, newsetwebsite] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((responce) => responce.json())
      .then((data) => setusers(data));
  }, []);

  function adduser() {
    const name = newname.trim();
    const email = newemail.trim();
    const website = newwebsite.trim();

    if (name && email && website) {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          website,
        }),
        headers: {
          "content-Type": "application/json; charset=UTF-8",
        },
      })
        .then((responce) => responce.json())
        .then((dataj) => {
          setusers([...users, dataj]);
          AppToaster.show({
            message: "user added successfully ",
            intent: "success",
            timeout: 3000,
          });
          newsetname("");
          newsetemail("");
          newsetwebsite("");
        });
    }
  }

  function onchangehandler(id, key, value) {
    setusers((users) => {
      return users.map((user) => {
        return user.id === id ? { ...user, [key]: value } : user;
      });
    });
  }

  function updatauser(id) {
    const user = users.find((user) => user.id === id);

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        user,
      }),
      headers: {
        "content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((responce) => responce.json())
      .then((dataj) => {
        AppToaster.show({
          message: "user Updated successfully ",
          intent: "success",
          timeout: 3000,
        });
      });
  }

  function deleuser(id) {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then((responce) => responce.json())
      .then((dataj) => {
        setusers((users) => {
          return users.filter((user) => user.id !== id);
        });
        AppToaster.show({
          message: "user Deleted successfully ",
          intent: "success",
          timeout: 3000,
        });
      });
  }

  return (
    <div className="App">
      <table className="bp4-html-table modifier">
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>website</th>
          <th>Action</th>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                <EditableText
                  onChange={(value) => onchangehandler(user.id, "email", value)}
                  value={user.email}
                />
              </td>
              <td>
                <EditableText
                  onChange={(value) =>
                    onchangehandler(user.id, "website", value)
                  }
                  value={user.website}
                />
              </td>
              <td>
                <Button intent="primary" onClick={() => updatauser(user.id)}>
                  Update
                </Button>

                <Button onClick={() => deleuser(user.id)} intent="danger">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>
              {" "}
              <InputGroup
                value={newname}
                onChange={(e) => {
                  newsetname(e.target.value);
                }}
                placeholder="Enter Name..."
              />{" "}
            </td>
            <td>
              {" "}
              <InputGroup
                value={newemail}
                onChange={(e) => {
                  newsetemail(e.target.value);
                }}
                placeholder="Enter Email..."
              />{" "}
            </td>
            <td>
              {" "}
              <InputGroup
                value={newwebsite}
                onChange={(e) => {
                  newsetwebsite(e.target.value);
                }}
                placeholder="Enter Website..."
              />{" "}
            </td>
            <td>
              <Button intent="success" onClick={adduser}>
                Add user
              </Button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default App;
