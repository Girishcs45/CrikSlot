import { useEffect, useState, React } from 'react';
import { EditUser, FetchUser } from '../../services/user.services';
import { HiUser, HiMail, HiPhone, HiCalendar, HiLocationMarker, HiPencil } from 'react-icons/hi';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ProfileInfo() {
    const id = JSON.parse(localStorage.getItem("User"));

    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        userid: id,
        fullName: '',
        address: '',
        phone: '',
        favoriteSport: '',
        dob: null,
    });

    const getUser = async (id) => {
        try {
            const res = await FetchUser(id);
            setUser(res?.user);
        } catch (err) {
            console.log(err.response?.data?.message);
        }
    };

    useEffect(() => {
        getUser(id);
    }, [id]);

    const handleEditClick = () => {
        setFormData({
            userid: id,
            fullName: user?.fullName || '',
            address: user?.address || '',
            phone: user?.phone || '',
            favoriteSport: user?.favoriteSport || '',
            dob: user?.dob ? new Date(user.dob) : null,
        });
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            await EditUser(formData);
            setIsEditing(false);
            getUser(id); // refresh updated data
        } catch (error) {
            console.log("Error :", error);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-semibold" style={{ color: '#0A5C36' }}>
                    Profile Details
                </h2>

                {isEditing ? (
                    <button
                        className="flex items-center px-4 py-2 rounded-lg font-medium text-white bg-blue-500 hover:opacity-90 transition"
                        onClick={handleSave}
                    >
                        <HiPencil className="mr-2" />
                        Save
                    </button>
                ) : (
                    <button
                        className="flex items-center px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition"
                        style={{ backgroundColor: '#1DB954' }}
                        onClick={handleEditClick}
                    >
                        <HiPencil className="mr-2" />
                        Edit Profile
                    </button>
                )}
            </div>

            <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Personal Info */}
                    <div>
                        <h3
                            className="text-lg font-semibold mb-6 pb-2 border-b"
                            style={{ borderBottomColor: '#ECF9E3', color: '#0A5C36' }}
                        >
                            Personal Information
                        </h3>

                        <div className="space-y-6">
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-800">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    {isEditing ? (
                                        <input
                                            value={formData.fullName}
                                            onChange={(e) =>
                                                setFormData({ ...formData, fullName: e.target.value })
                                            }
                                            className="pl-12 pr-4 py-3.5 rounded-lg w-full outline-none bg-[#ECF9E3]"
                                        />
                                    ) : (
                                        <div className="pl-12 pr-4 py-3.5 rounded-lg bg-[#ECF9E3]">
                                            {user?.fullName || "—"}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-800">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <div className="pl-12 pr-4 py-3.5 rounded-lg bg-[#ECF9E3]">
                                        {user?.email}
                                    </div>
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-800">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <HiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    {isEditing ? (
                                        <input
                                            value={formData.phone}
                                            onChange={(e) =>
                                                setFormData({ ...formData, phone: e.target.value })
                                            }
                                            className="pl-12 pr-4 py-3.5 rounded-lg w-full outline-none bg-[#ECF9E3]"
                                        />
                                    ) : (
                                        <div className="pl-12 pr-4 py-3.5 rounded-lg bg-[#ECF9E3]">
                                            +91{user?.phone || "—"}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* DOB */}
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-800">
                                    Date of Birth
                                </label>
                                <div className="relative">
                                    <HiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    {isEditing ? (
                                        <DatePicker
                                            selected={formData.dob}
                                            onChange={(date) =>
                                                setFormData({ ...formData, dob: date })
                                            }
                                            dateFormat="MMMM d, yyyy"
                                            maxDate={new Date()}
                                            showYearDropdown
                                            scrollableYearDropdown
                                            yearDropdownItemNumber={80}
                                            className="pl-12 pr-4 py-3.5 rounded-lg w-full outline-none bg-[#ECF9E3]"
                                        />
                                    ) : (
                                        <div className="pl-12 pr-4 py-3.5 rounded-lg bg-[#ECF9E3]">
                                            {user?.dob
                                                ? new Date(user.dob).toLocaleDateString("en-US", {
                                                      year: "numeric",
                                                      month: "long",
                                                      day: "numeric",
                                                  })
                                                : "—"}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="space-y-6 mt-12">
                        {/* Favorite Sport */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-800">
                                Favorite Sport
                            </label>
                            {isEditing ? (
                                <select
                                    value={formData.favoriteSport}
                                    onChange={(e) =>
                                        setFormData({ ...formData, favoriteSport: e.target.value })
                                    }
                                    className="px-4 py-3.5 rounded-lg w-full outline-none bg-[#ECF9E3]"
                                >
                                    <option value="">Select sport</option>
                                    <option value="Cricket">Cricket</option>
                                    <option value="Football">Football</option>
                                    <option value="Badminton">Badminton</option>
                                    <option value="Tennis">Tennis</option>
                                    <option value="Basketball">Basketball</option>
                                </select>
                            ) : (
                                <div className="px-4 py-3.5 rounded-lg bg-[#ECF9E3]">
                                    {user?.favoriteSport || "—"}
                                </div>
                            )}
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-800">
                                Address
                            </label>
                            <div className="relative">
                                <HiLocationMarker className="absolute left-4 top-4 text-gray-400" />
                                {isEditing ? (
                                    <textarea
                                        value={formData.address}
                                        onChange={(e) =>
                                            setFormData({ ...formData, address: e.target.value })
                                        }
                                        rows={3}
                                        className="pl-12 pr-4 py-3.5 rounded-lg w-full outline-none resize-none bg-[#ECF9E3]"
                                    />
                                ) : (
                                    <div className="pl-12 pr-4 py-3.5 rounded-lg bg-[#ECF9E3]">
                                        {user?.address || "—"}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
