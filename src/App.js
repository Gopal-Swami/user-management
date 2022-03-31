import React, { useEffect, useState } from 'react';
import { ToastContainer, toast, Zoom, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import db from './firebase';
import Loader from './Loader';
function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [updateId, setUpdateId] = useState('');
  const createNewUser = async (e) => {
    e.preventDefault();

    await db.collection('users').add({
      name,
      email,
      phone,
      address,
      createdAt: new Date(),
    });
    document.getElementById('close').click();
    toast.success('User Added');
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
  };

  const setEditFields = (doc) => {
    setUpdateId(doc.id);
    setName(doc.data.name);
    setEmail(doc.data.email);
    setAddress(doc.data.address);
    setPhone(doc.data.phone);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    await db.collection('users').doc(updateId).update({
      name,
      email,
      phone,
      address,
      createdAt: new Date(),
    });
    document.getElementById('closeUpdate').click();
    toast.success('User Updated');
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
  };

  const deleteUser = async (e) => {
    e.preventDefault();
    if (updateId) {
      await db.collection('users').doc(updateId).delete();
      toast.error('User Deleted');
    } else {
      await db.collection('users');
      toast.error('User Deleted');
    }

    document.getElementById('closeDelete').click();
  };

  useEffect(() => {
    const listUsers = async () => {
      await db.collection('users').onSnapshot((snapshot) => {
        setUsers(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    };
    listUsers();
  }, []);
  return (
    <>
      <ToastContainer autoClose={300} />
      {users.length === 0 ? (
        <Loader />
      ) : (
        <>
          <div className="container-xl">
            <div className="table-responsive">
              <div className="table-wrapper">
                <div className="table-title">
                  <div className="row">
                    <div className="col-sm-6">
                      <h2>
                        Manage <b>Users</b>
                      </h2>
                    </div>
                    <div className="col-sm-6">
                      <a
                        href="#addEmployeeModal"
                        className="btn btn-success"
                        data-toggle="modal"
                      >
                        <i className="material-icons">&#xE147;</i>
                        <span>Create New User</span>
                      </a>
                      {/* <a
                        href="#deleteEmployeeModal"
                        className="btn btn-danger"
                        data-toggle="modal"
                      >
                        <i className="material-icons">&#xE15C;</i>{' '}
                        <span>Delete</span>
                      </a> */}
                    </div>
                  </div>
                </div>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Phone</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length !== 0 &&
                      users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.data.name}</td>
                          <td>{user.data.email}</td>
                          <td>{user.data.address}</td>
                          <td>{user.data.phone}</td>
                          <td>
                            <a
                              href="#editEmployeeModal"
                              className="edit"
                              data-toggle="modal"
                            >
                              <i
                                onClick={(e) => setEditFields(user)}
                                className="material-icons"
                                data-toggle="tooltip"
                                title="Edit"
                              >
                                &#xE254;
                              </i>
                            </a>
                            <a
                              href="#deleteEmployeeModal"
                              className="delete"
                              data-toggle="modal"
                            >
                              <i
                                onClick={(e) => setUpdateId(user.id)}
                                className="material-icons"
                                data-toggle="tooltip"
                                title="Delete"
                              >
                                &#xE872;
                              </i>
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div id="addEmployeeModal" className="modal fade">
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={createNewUser}>
                  <div className="modal-header">
                    <h4 className="modal-title">Add User</h4>
                    <button
                      type="button"
                      className="close"
                      id="close"
                      data-dismiss="modal"
                      aria-hidden="true"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Address</label>
                      <textarea
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <input
                      type="button"
                      className="btn btn-default"
                      data-dismiss="modal"
                      value="Cancel"
                    />
                    <input
                      type="submit"
                      className="btn btn-success"
                      value="Add"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div id="editEmployeeModal" className="modal fade">
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={updateUser}>
                  <div className="modal-header">
                    <h4 className="modal-title">Edit User</h4>
                    <button
                      type="button"
                      className="close"
                      id="closeUpdate"
                      data-dismiss="modal"
                      aria-hidden="true"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Address</label>
                      <textarea
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <input
                      type="button"
                      className="btn btn-default"
                      data-dismiss="modal"
                      value="Cancel"
                    />
                    <input
                      type="submit"
                      className="btn btn-info"
                      value="Save"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div id="deleteEmployeeModal" className="modal fade">
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={deleteUser}>
                  <div className="modal-header">
                    <h4 className="modal-title">Delete User</h4>
                    <button
                      type="button"
                      className="close"
                      id="closeDelete"
                      data-dismiss="modal"
                      aria-hidden="true"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>Are you sure you want to delete these Records?</p>
                    <p className="text-warning">
                      <small>This action cannot be undone.</small>
                    </p>
                  </div>
                  <div className="modal-footer">
                    <input
                      type="button"
                      className="btn btn-default"
                      data-dismiss="modal"
                      value="Cancel"
                    />
                    <input
                      type="submit"
                      className="btn btn-danger"
                      value="Delete"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
