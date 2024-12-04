import React from 'react'

function Delete() {
  return (
    <div className='delete-component'>
        <h1>Delete Users</h1>
        <div className='delete-message'>
            <h2>Are you sure you want to delete the users</h2>
            <h3>This action cannot be undone</h3>
        </div>
        <div className="delete-confirm">
            <button className="cancel-button">
                Cancel
            </button>
            <button className="add-button">
                Delete
            </button>
        </div>
    </div>
  )
}

export default Delete