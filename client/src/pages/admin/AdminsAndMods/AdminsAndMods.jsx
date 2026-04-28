import React, { useState } from "react";

import {
  FaUserPlus,
  FaUserShield,
  FaEllipsisV,
  FaTrash,
  FaEdit,
  FaSearch,
  FaCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUsers } from "../../../hooks/useUsers";

const AdminsAndMods = () => {
  
  const { users } = useUsers();

  // eslint-disable-next-line no-unused-vars
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="animate__animated animate__fadeIn pb-5">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1" style={{ color: "var(--primary-teal)" }}>
            Admins & Moderators
          </h3>
          <p className="text-muted small">
            Manage system access levels and team members
          </p>
        </div>
        <Link
          to="/admin/add-admin-and-moderator"
          className="btn text-white px-4 py-2 rounded-pill shadow-sm d-flex align-items-center gap-2"
          style={{ backgroundColor: "var(--primary-teal)" }}
        >
          <FaUserPlus /> Add Team Member
        </Link>
      </div>

      <div className="row g-4">
        {/* Statistics Cards */}
        <div className="col-md-4">
          <div
            className="card border-0 shadow-sm rounded-4 p-3 bg-teal text-white"
            style={{ backgroundColor: "var(--primary-teal)" }}
          >
            <div className="d-flex align-items-center gap-3">
              <div className="bg-white bg-opacity-25 p-3 rounded-circle">
                <FaUserShield size={24} />
              </div>
              <div>
                <h4 className="fw-bold mb-0 text-white">{users.length}</h4>
                <span className="small opacity-75">Total Members</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="col-12">
          <div className="card border-0 shadow-sm rounded-4 p-3">
            <div className="input-group bg-light rounded-3 px-3 align-items-center">
              <FaSearch className="text-muted" />
              <input
                type="text"
                className="form-control bg-transparent border-0 shadow-none py-2"
                placeholder="Search by name or email..."
              />
            </div>
          </div>
        </div>

        {/* User Table */}
        <div className="col-12">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="px-4 py-3 border-0 small fw-bold text-muted">
                      MEMBER
                    </th>
                    <th className="py-3 border-0 small fw-bold text-muted">
                      ROLE
                    </th>
                    <th className="py-3 border-0 small fw-bold text-muted">
                      STATUS
                    </th>
                    <th className="py-3 border-0 small fw-bold text-muted">
                      LAST LOGIN
                    </th>
                    <th className="px-4 py-3 border-0 small fw-bold text-muted text-end">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-4 py-3 border-0">
                        <Link
                          to={`/admin/view-profile/${user.id}`}
                          className="text-decoration-none d-flex align-items-center gap-3"
                        >
                          <img
                            src={user.image || "https://th.bing.com/th/id/OIP.HLr-mtey4aSOYoENjUpVYQHaHa?w=214&h=214&c=7&r=0&o=7&pid=1.7&rm=3"}
                            alt=""
                            className="rounded-circle shadow-sm"
                            width="40"
                            height="40"
                          />
                          <div>
                            <div className="fw-bold small text-dark">
                              {user.name}
                            </div>
                            <div
                              className="text-muted"
                              style={{ fontSize: "11px" }}
                            >
                              {user.email}
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td className="border-0">
                        <span
                          className="badge bg-light text-dark border fw-semibold py-2 px-3 rounded-pill"
                          style={{ fontSize: "10px" }}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="border-0">
                        <span
                          className={`d-flex align-items-center gap-1 small fw-bold ${user.status === "Active" ? "text-success" : "text-danger"}`}
                        >
                          <FaCircle size={8} /> {user.status}
                        </span>
                      </td>
                      <td className="border-0 text-muted small">
                        {user.lastLogin}
                      </td>
                      <td className="px-4 py-3 border-0 text-end">
                        <Link
                          to={`/admin/edit-admin-and-moderator/${user.id}`}
                          className="btn btn-sm btn-light border shadow-sm me-2 rounded-circle"
                        >
                          <FaEdit style={{color: "var(--primary-teal)"}} />
                        </Link>
                        <button className="btn btn-sm btn-light border shadow-sm rounded-circle">
                          <FaTrash className="text-danger" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminsAndMods;
