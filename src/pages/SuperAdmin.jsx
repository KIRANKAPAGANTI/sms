import { useState } from "react";
import API from "../services/api";
import "../styles/superadmin.css";

import {
  LayoutDashboard,
  UserPlus,
  Users,
  Settings,
  LogOut,
  GraduationCap,
  School,
  UserCheck,
  Clock3,
  Mail,
  Search,
  Bell,
} from "lucide-react";

export default function SuperAdmin() {
  const [formData, setFormData] = useState({
    principalName: "",
    userName: "",
    email: "",
    mobileNumber: "",
    schoolName: "",
    schoolCode: "",
  });

  const [principals] = useState([
    {
      id: 1,
      name: "Dr. Ramesh Kumar",
      school: "Vidya High School",
      email: "ramesh@gmail.com",
      status: "Active",
    },
    {
      id: 2,
      name: "Suresh Reddy",
      school: "Oxford Public School",
      email: "suresh@gmail.com",
      status: "Pending",
    },
    {
      id: 3,
      name: "Priya Sharma",
      school: "Delhi Public School",
      email: "priya@gmail.com",
      status: "Active",
    },
  ]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/superadmin/create-principal",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Principal Invitation Sent Successfully");

      setFormData({
        principalName: "",
        userName: "",
        email: "",
        mobileNumber: "",
        schoolName: "",
        schoolCode: "",
      });
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="superadmin-container">
      {/* SIDEBAR */}

      <aside className="sidebar">
        <div className="logo-section">
          <div className="logo-box">
            <GraduationCap size={24} />
          </div>

          <div>
            <h2>Vidyalaya</h2>
            <p>Super Admin</p>
          </div>
        </div>

        <div className="menu-section">
          <p className="menu-title">MAIN MENU</p>

          <div className="menu-item active">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </div>

          <div className="menu-item">
            <UserPlus size={20} />
            <span>Create Principal</span>
          </div>

          <div className="menu-item">
            <Users size={20} />
            <span>All Principals</span>
          </div>

          <div className="menu-item">
            <School size={20} />
            <span>Schools</span>
          </div>

          <p className="menu-title system-title">
            SYSTEM
          </p>

          <div className="menu-item">
            <Settings size={20} />
            <span>Settings</span>
          </div>

          <div className="menu-item logout">
            <LogOut size={20} />
            <span>Logout</span>
          </div>
        </div>
      </aside>

      {/* MAIN */}

      <main className="main-content">
        {/* TOPBAR */}

        <header className="topbar">
          <div>
            <h1>Super Admin Dashboard</h1>
            <p>
              Manage schools, principals and system
            </p>
          </div>

          <div className="topbar-right">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search..."
              />
            </div>

            <Bell size={22} />

            <div className="avatar">
              SA
            </div>
          </div>
        </header>

        {/* STATS */}

        <div className="stats-grid">
          <div className="stat-card">
            <School size={30} />
            <h4>Total Schools</h4>
            <h2>45</h2>
          </div>

          <div className="stat-card">
            <Users size={30} />
            <h4>Total Principals</h4>
            <h2>45</h2>
          </div>

          <div className="stat-card">
            <UserCheck size={30} />
            <h4>Active Principals</h4>
            <h2>39</h2>
          </div>

          <div className="stat-card">
            <Clock3 size={30} />
            <h4>Pending Invites</h4>
            <h2>6</h2>
          </div>
        </div>

        {/* FORM */}

        <section className="form-wrapper">
          <div className="section-header">
            <h2>Create Principal</h2>
            <p>
              Invite a new principal to join
            </p>
          </div>

          <form
            className="form-card"
            onSubmit={handleSubmit}
          >
            <div className="form-grid">
              <input
                type="text"
                name="principalName"
                placeholder="Principal Name"
                value={formData.principalName}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="userName"
                placeholder="Username"
                value={formData.userName}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="mobileNumber"
                placeholder="Mobile Number"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="schoolName"
                placeholder="School Name"
                value={formData.schoolName}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="schoolCode"
                placeholder="School Code"
                value={formData.schoolCode}
                onChange={handleChange}
                required
              />
            </div>

            <div className="bottom-section">
              <div className="expire-text">
                <Mail size={18} />
                Invitation expires in 48 hours
              </div>

              <button
                className="send-btn"
                type="submit"
              >
                Send Invitation
              </button>
            </div>
          </form>
        </section>

        {/* TABLE */}

        <section className="table-section">
          <div className="section-header">
            <h2>Recent Principals</h2>
          </div>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>School</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {principals.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.school}</td>
                  <td>{item.email}</td>
                  <td>
                    <span
                      className={
                        item.status === "Active"
                          ? "status active"
                          : "status pending"
                      }
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
