import React, { useState } from "react";
import { FaSave, FaUser, FaLock, FaCamera, FaEnvelope, FaPhone, FaArrowLeft } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";

const AdminProfile = () => {
  const { id } = useParams();
  
  // ধরা যাক লগইন করা ইউজারের আইডি ১
  const loggedInUserId = 1; 
  const isOwnProfile = !id || parseInt(id) === loggedInUserId;

  const [formData, setFormData] = useState({
    name: "Md. Saiful Islam",
    email: "saiful01741899@gmail.com",
    phone: "+880 1741-899XXX",
    bio: "Professional MERN Stack Developer with 5 years of experience.",
    image: "https://ui-avatars.com/api/?name=Saiful+Islam&background=0D9488&color=fff",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", formData);
    alert("Profile updated successfully!");
  };

  return (
    <div className="animate__animated animate__fadeIn pb-5">
      <div className="d-flex align-items-center gap-3 mb-4">
        <Link to="/admin/users" className="btn btn-light rounded-circle shadow-sm"><FaArrowLeft /></Link>
        <h3 className="fw-bold mb-0" style={{ color: "var(--primary-teal)" }}>
          {isOwnProfile ? "My Profile" : `${formData.name}'s Profile`}
        </h3>
      </div>

      <div className="row g-4">
        {/* Profile Card */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 text-center">
            <div className="position-relative d-inline-block mx-auto mb-3">
              <img src={formData.image} className="rounded-circle border border-4 border-light shadow" width="150" height="150" alt="Profile" />
              {isOwnProfile && (
                <label className="position-absolute bottom-0 end-0 bg-teal text-white p-2 rounded-circle shadow cursor-pointer" style={{backgroundColor: 'var(--primary-teal)', cursor: 'pointer'}}>
                  <FaCamera size={14} />
                  <input type="file" hidden />
                </label>
              )}
            </div>
            <h5 className="fw-bold mb-1">{formData.name}</h5>
            <span className="badge bg-light text-teal border rounded-pill px-3 py-2" style={{color: 'var(--primary-teal)'}}>Super Admin</span>
            <p className="text-muted small mt-3">{formData.bio}</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="small fw-bold mb-1">Full Name</label>
                  <input 
                    type="text" className="form-control bg-light border-0 py-2" 
                    value={formData.name} disabled={!isOwnProfile}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="col-md-6">
                  <label className="small fw-bold mb-1">Email Address</label>
                  <input 
                    type="email" className="form-control bg-light border-0 py-2" 
                    value={formData.email} disabled={!isOwnProfile}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="col-md-6">
                  <label className="small fw-bold mb-1">Phone Number</label>
                  <input 
                    type="text" className="form-control bg-light border-0 py-2" 
                    value={formData.phone} disabled={!isOwnProfile}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
               
                <div className="col-12">
                  <label className="small fw-bold mb-1">Short Biography</label>
                  <textarea 
                    className="form-control bg-light border-0" rows="4" 
                    value={formData.bio} disabled={!isOwnProfile}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  ></textarea>
                </div>
                
                {isOwnProfile && (
                  <div className="col-12 mt-4">
                    <button type="submit" className="btn text-white px-5 py-2 rounded-pill shadow-sm" style={{backgroundColor: 'var(--secondary-coral)'}}>
                      <FaSave className="me-2" /> Update Profile
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;