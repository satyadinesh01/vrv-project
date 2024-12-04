import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import Logo from "../images/logo.png";
import { IoMdAdd } from "react-icons/io";
import OwnerPic from "../images/admin.png";
import { FaArrowDownLong } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import Profile1 from "../images/profile1.png";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { RiEdit2Line } from "react-icons/ri";
import { IoKeyOutline } from "react-icons/io5";
import { IoCloudDownloadOutline } from "react-icons/io5";
import axios from 'axios';
import moment from "moment";






function Admin() {
  const [activeRowIndex, setActiveRowIndex] = useState(null);
  const [newMember, setNewMember] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [add, setAdd] = useState(true);
  const [roles, setRoles] = useState('');
  const [deleteMultiple, setDeleteMultiple] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchClear, setSearchClear] = useState(false);
  const [filterList, setFilterList] = useState([]);

  const toggleTempComponent = (index) => {
    setActiveRowIndex(activeRowIndex === index ? null : index);
  };

  const handleInputFields = (event) => {
    event.preventDefault();
    let fieldName = event.target.name;
    switch (fieldName) {
      case 'userName': {
        let employeeName = event.target.value;
        setEmployeeName(employeeName);
        break;
      }
      case 'userEmail': {
        let employeeEmail = event.target.value;
        setEmployeeEmail(employeeEmail);
        break;
      }
      case 'userRoles': {
        let roles = event.target.value;
        setRoles(roles)
        break;
      }
      default: {
        return;
      }
    }
  }

  const handleAction = (action) => {
    alert(`You clicked: ${action}`);
    setActiveRowIndex(null);
  };

  const handleDelete = async (item) => {
    let resp = await axios.delete(`https://vrv-server-zca0.onrender.com/api/v1/employees/${item._id}`)
    let id = resp.data._id;
    setEmployees(employees.filter(employee => employee._id !== id));
    setActiveRowIndex(null);
  };

  const addNewMember = () => {
    setNewMember(newMember === null ? 1 : null);
  };

  const createEmployee = (event) => {
    event.preventDefault();
    let payload = {
      employeeName: employeeName,
      employeeEmail: employeeEmail,
      roles: roles
    }
    axios.post(`https://vrv-server-zca0.onrender.com/api/v1/employees`, payload)
      .then((resp) => {
        if (resp) {
          setEmployees(prevEmpolyee => [...prevEmpolyee, resp.data]);
          setNewMember(null);
          setFilterList(prevList =>[...prevList,resp.data]);
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  const handleCheckboxChange = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((row) => row !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const handleDeleteSelected = () => {
    setDeleteMultiple(deleteMultiple === null ? 1 : null);

  };

  const filterEmployees = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value == "") {
     setSearchClear (false);
    }
    else {
      setSearchClear(true);
    }
    let newList = filterList;
    let employees = newList.map(x => {
      //et purohitsServices = (x.purohithservices.map(a => { return a['servicename'] })).toString();
      if (x.employeeName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        x.employeeEmail.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
        return x;
      }
    }).filter(x => x);
    if (event.target.value === "") {
      setEmployees(newList)
    }
    else {
      setEmployees(employees);
    }
  }

  useEffect(() => {
    if (add) {
      axios.get(`https://vrv-server-zca0.onrender.com/api/v1/employees`)
        .then((resp) => {
          if (resp) {
            setEmployees(resp.data);
            setFilterList(resp.data);
            setAdd(false);
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  }, [add]);
  const pages = Array(6).fill(null);

  return (
    <>
      <div className="pageNav">
        <div className="pageNav-one">
          <img src={Logo} alt="Logo" />
          <IoIosArrowForward className="pageNav-icon" />
          <h1>VRV Security’s</h1>
          <IoIosArrowForward className="pageNav-icon" />
          <h3>User Management</h3>
        </div>
        <div className="pageNav-two">
          <img src={OwnerPic} alt="Owner" />
          <h2>Kulasekhar</h2>
        </div>
      </div>

      <div className="Heading">
        <h1>User Management</h1>
        <h2>Manage your team members and their account permissions here.</h2>
      </div>

      <div className="functions">
        <div className="functions-users">
          <h1>All Users</h1>
          <h2>46</h2>
        </div>
        <div className="functions-tools">
          <input type="text" placeholder="Search" onChange={(event) => { filterEmployees(event) }}/>
          <button className="filter">
            <IoFilterSharp className="icon" />
          </button>
          <div>
            <button className="add" onClick={addNewMember}>
              <IoMdAdd className="icon" />
              <h1>Add Members</h1>
            </button>



            {deleteMultiple === 1 && (
              <div className='delete-component'>
                <h1>Delete Users</h1>
                <div className='delete-message'>
                  <h2>Are you sure you want to delete the users</h2>
                  <h3>This action cannot be undone</h3>
                </div>
                <div className="delete-confirm">
                  <button className="cancel-button" onClick={() => {
                    setDeleteMultiple(deleteMultiple === null ? 1 : null);
                  }}>
                    Cancel
                  </button>
                  <button className="add-button">
                    Delete
                  </button>
                </div>
              </div>
            )
            }



            {newMember === 1 && (
              <div className="addMember">
                <h1>Add member</h1>
                <form onSubmit={createEmployee}>
                  <div className="set">
                    <label htmlFor="userName">Candidate name</label>
                    <input type="text" name="userName" required placeholder="Enter candidate name" onChange={handleInputFields} />
                    <br />
                  </div>
                  <div className="set">
                    <label htmlFor="userEmail">Candidate mail id</label>
                    <input type="email" name="userEmail" required placeholder="Enter candidate mail id" onChange={handleInputFields} />
                    <br />
                  </div>
                  <div className="set">
                    <label htmlFor="userRoles">Enter roles</label>
                    <input type="text" name="userRoles" required placeholder="Add roles" onChange={handleInputFields} />
                    <br />
                  </div>
                  <div className="addMember-button">
                    <button className="cancel-button" onClick={addNewMember}>
                      Cancel
                    </button>
                    <button className="add-button" type="submit">
                      Add Member
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
          {selectedRows.length > 0 && (
            <button className="delete" onClick={handleDeleteSelected}>
              <RiDeleteBin6Line className="icon" />
              <h1>Delete</h1>
            </button>
          )}
        </div>
      </div>

      <div className="table">
        <table className="styled-table">
          <colgroup>
            <col style={{ width: "1%" }} />
            <col style={{ width: "30%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "1%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>User Name</th>
              <th>Access</th>
              <th className="th-arrow">
                Last Active <FaArrowDownLong />
              </th>
              <th>Date Added</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {employees && employees.length > 0 ? employees.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={selectedRows.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
                <td className="one">
                  <img src={Profile1} alt="Profile" />
                  <div className="user-name">
                    <h1>{item.employeeName}</h1>
                    <h2>{item.employeeEmail}</h2>
                  </div>
                </td>
                <td>
                  <div className="two">
                    <h3 className="role other">{item.roles}</h3>
                  </div>
                </td>
                <td>
                  <h4>Jan 18, 2025</h4>
                </td>
                <td>
                  <h4>{moment(item.updatedAt).format('DD MMM YYYY')}</h4>
                </td>
                <td className="action-cell">
                  <button
                    className="dots"
                    onClick={() => toggleTempComponent(index)}
                  >
                    <HiDotsVertical />
                  </button>
                  {activeRowIndex === index && (
                    <div className="temp-component">
                      <button onClick={() => handleAction("View Profile")}>
                        <FaRegUser />
                        <h3>View Profile</h3>
                      </button>
                      <button onClick={() => handleAction("Edit Profile")}>
                        <RiEdit2Line />
                        <h3>Edit Profile</h3>
                      </button>
                      <button onClick={() => handleAction("Change Password")}>
                        <IoKeyOutline />
                        <h3>Change Password</h3>
                      </button>
                      <button onClick={() => handleAction("Export Details")}>
                        <IoCloudDownloadOutline />
                        <h3>Export Details</h3>
                      </button>
                      <button onClick={() => handleDelete(item)}>
                        <RiDeleteBin6Line />
                        <h3>Delete User</h3>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            )) : ""}
          </tbody>
        </table>
      </div>
      <center className="pages">
        {pages.map((_, index) => (
          <div key={index} className="pageNum">
            <h1>{index + 1}</h1>
          </div>
        ))}
      </center>
    </>
  );
}

export default Admin;
