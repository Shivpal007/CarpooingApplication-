import { Link, Route, Routes } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import VerifyDriver from "./VerifyDriver";
import GetDriver from "./GetDriver";
import '../Css/AdminHome.css'
import GetUser from "./GetUser";
import GetRides from "./GetRides";

const AdminHome = () => {
    return (
        <div
            
            className="admin-home"
        >
            <Navbar />

            <div
                className="container border rounded p-2 shadow"
                style={{backgroundColor: "rgb(158, 210, 231)"}}
            >
                <table style={{ width: "100%", textAlign: "center", display: "flex", justifyContent: "center" }}>
                    <tbody
                        style={{
                            backgroundColor: "rgb(212, 235, 248)",
                            borderCollapse: "collapse",
                        }}
                    >
                        <tr>
                            <td>
                                <Link to="/admin/verify" style={{ color: "black" }}>
                                    Verify Requests
                                </Link>
                            </td>

                            <td style={{ backgroundColor: "rgb(217, 234, 253)" }}>
                                <Link to="/admin/drivers" style={{ color: "black" }}>
                                    Get Total Drivers
                                </Link>
                            </td>

                            <td>
                                <Link to="/admin/Users" style={{ color: "black" }}>
                                    Get Users
                                </Link>
                            </td>

                            <td style={{ backgroundColor: "rgb(217, 234, 253)" }}>
                                <Link to="/admin/Rides" style={{ color: "black" }}>
                                    Rides
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div
                className="container border rounded shadow"
                style={{ width: "100%", backgroundColor: "rgb(158, 210, 231)" }}
            >
                <h1 className="text-center mb-4">Admin Home</h1>
                <Routes>
                    <Route path="/verify" element={<VerifyDriver />} />
                    <Route path="/drivers" element={<GetDriver />} />
                    <Route path="/Users" element={<GetUser />} />
                    <Route path="/Rides" element={<GetRides />} />
                </Routes>
            </div>
        </div>

    );
};

export default AdminHome;
