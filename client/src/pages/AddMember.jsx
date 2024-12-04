import React from "react";

function AddMember({ onClose }) {
  return (
    <div className="addMember">
      <h1>Add member</h1>
      <form action="">
        <div className="set">
          <label htmlFor="userName">Candidate name</label>
          <input type="text" name="userName" placeholder="Enter candidate name"/><br />
        </div>

        <div className="set">
          <label htmlFor="userEmail">Candidate mail id</label>
          <input type="text" name="userEmail" placeholder="Enter candidate mail id"/><br />
        </div>

        <div className="set">
          <label htmlFor="userRiles">Enter roles</label>
          <input type="text" name="userRiles" placeholder="Add roles"/><br />
        </div>

        <div className="set">
          <label htmlFor="status">Activity</label>
          <input type="text" /><br />
        </div>

        <div className="addMember-button">
          <button className="cancel-button">Cancel</button>
          <button className="add-button">Add Member</button>
        </div>
      </form>
    </div>
  );
}

export default AddMember;
