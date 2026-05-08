import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

function Header({ setIsMobileMenuOpen }) {
    const navigate = useNavigate();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    // Detect mobile screen size
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLogout = () => {
        toast.success("Logged out successfully");
        localStorage.removeItem("Owner");
        navigate("/");
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-100">
            <div className="px-4 sm:px-6 md:px-8 py-3 md:py-4">
                <div className="flex justify-between items-center">
                    {/* Left Side - Logo & Hamburger */}
                    <div className="flex items-center space-x-2 md:space-x-3">
                        {/* SIMPLE WORKING HAMBURGER BUTTON */}
                        {isMobile && (
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "40px",
                                    height: "40px",
                                    border: "2px solid #326B0F",
                                    borderRadius: "8px",
                                    backgroundColor: "#f0f9f0",
                                    color: "#326B0F",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    marginRight: "12px",
                                    cursor: "pointer"
                                }}
                                aria-label="Open menu"
                            >
                                ☰
                            </button>
                        )}
                        
                        <div className="h-8 w-8 md:h-10 md:w-10 bg-[#326B0F] rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-lg md:text-xl">CS</span>
                        </div>
                        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800">
                            <span className="hidden sm:inline">CrickSlot</span>
                            <span className="sm:hidden">CS</span>
                            <span className="hidden md:inline ml-2">Dashboard</span>
                        </h1>
                    </div>

                    {/* Right Side - Keep your existing code */}
                    <div className="flex items-center space-x-3 md:space-x-6">
                        <div className="relative">
                            <i className="fas fa-bell text-gray-600 text-lg md:text-xl cursor-pointer hover:text-[#326B0F] transition-colors"></i>
                            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
                        </div>

                        <div className="relative">
                            <div 
                                className="flex items-center space-x-2 md:space-x-3 cursor-pointer"
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                            >
                                <div className="h-8 w-8 md:h-10 md:w-10 bg-gradient-to-r from-[#326B0F] to-[#4CAF50] rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-sm md:text-base">A</span>
                                </div>
                                
                                <div className="hidden md:block">
                                    <p className="text-sm font-medium text-gray-700">Admin User</p>
                                    <p className="text-xs text-gray-500">Owner</p>
                                </div>
                                
                                <i className={`fas fa-chevron-down text-gray-500 text-sm transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`}></i>
                            </div>

                            {showProfileMenu && (
                                <>
                                    <div 
                                        className="fixed inset-0 z-30"
                                        onClick={() => setShowProfileMenu(false)}
                                    ></div>
                                    
                                    <div className="absolute right-0 mt-2 w-48 md:w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-40 py-2">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="font-medium text-gray-800">Admin User</p>
                                            <p className="text-sm text-gray-500">admin@example.com</p>
                                        </div>
                                        
                                        <div className="py-1">
                                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                                                <i className="fas fa-user mr-3 text-gray-400"></i>
                                                My Profile
                                            </button>
                                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                                                <i className="fas fa-cog mr-3 text-gray-400"></i>
                                                Settings
                                            </button>
                                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                                                <i className="fas fa-question-circle mr-3 text-gray-400"></i>
                                                Help & Support
                                            </button>
                                        </div>
                                        
                                        <div className="border-t border-gray-100 pt-1">
                                            <button 
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                                            >
                                                <i className="fas fa-sign-out-alt mr-3"></i>
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;