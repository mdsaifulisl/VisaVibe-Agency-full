import React, { useState, useEffect } from "react";
import { FaSave, FaArrowLeft, FaCamera } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import { useUsers } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";

const AdminProfile = () => {
  const { id } = useParams();
  const { users, handleUpdateUser } = useUsers();
  const { user: loggedInUser } = useAuth();

  const targetUserId = id ? parseInt(id) : loggedInUser?.id;
  const isOwnProfile = !id || parseInt(id) === loggedInUser?.id;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    image: "",
    role: ""
  });

  // নতুন ছবি সিলেক্ট করার জন্য আলাদা স্টেট
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const targetUser = users.find((u) => u.id === targetUserId);
    if (targetUser) {
      const userData = {
        name: targetUser.name || "",
        email: targetUser.email || "",
        phone: targetUser.phone || "",
        bio: targetUser.bio || "No bio available.",
        image: targetUser.image || "",
        role: targetUser.role || "User"
      };
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(userData);
      
      // প্রোফাইল ছবির প্রিভিউ সেট করা
      const initialImage = targetUser.image 
        ? (targetUser.image.startsWith('http') ? targetUser.image : `http://localhost:5000/${targetUser.image}`)
        : `https://ui-avatars.com/api/?name=${targetUser.name}&background=0D9488&color=fff`;
      setPreview(initialImage);
    }
  }, [targetUserId, users]);

  // ছবি পরিবর্তন হ্যান্ডলার
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // তাৎক্ষণিক প্রিভিউ দেখার জন্য
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ছবি পাঠানোর জন্য FormData ব্যবহার করতে হবে
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("bio", formData.bio);
    
    if (selectedFile) {
      data.append("image", selectedFile);
    }

    const result = await handleUpdateUser(targetUserId, data);
    if (result.success) {
      alert("Profile updated successfully!");
    } else {
      alert("Update failed: " + result.message);
    }
  };

  return (
    <div className="animate__animated animate__fadeIn pb-5">
      <div className="d-flex align-items-center gap-3 mb-4">
        <Link to="/admin/users" className="btn btn-light rounded-circle shadow-sm">
          <FaArrowLeft />
        </Link>
        <h3 className="fw-bold mb-0" style={{ color: "var(--primary-teal)" }}>
          {isOwnProfile ? "My Profile" : `${formData.name}'s Profile`}
        </h3>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 text-center">
            <div className="position-relative d-inline-block mx-auto mb-3">
              <img 
                src={preview} 
                className="rounded-circle border border-4 border-light shadow" 
                width="150" height="150" alt="Profile" 
                style={{ objectFit: 'cover' }}
              />
              {isOwnProfile && (
                <label 
                  className="position-absolute bottom-0 end-0 text-white p-2 rounded-circle shadow" 
                  style={{ backgroundColor: 'var(--primary-teal)', cursor: 'pointer' }}
                >
                  <FaCamera size={14} />
                  {/* এখানে input ফিল্ডে handleFileChange যোগ করা হয়েছে */}
                  <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                </label>
              )}
            </div>
            <h5 className="fw-bold mb-1">{formData.name}</h5>
            <span className="badge bg-light border rounded-pill px-3 py-2 text-capitalize" style={{ color: 'var(--primary-teal)' }}>
              {formData.role}
            </span>
            <p className="text-muted small mt-3">{formData.bio}</p>
          </div>
        </div>

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
                    <button type="submit" className="btn text-white px-5 py-2 rounded-pill shadow-sm" style={{ backgroundColor: 'var(--secondary-coral)' }}>
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