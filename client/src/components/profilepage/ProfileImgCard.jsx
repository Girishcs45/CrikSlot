import React, { useEffect, useState } from 'react';
import { FetchUser } from '../../services/user.services';
import {
    HiUser,
    HiMail,
    HiPhone,
    HiStar,
    HiTicket,
    HiCamera
} from 'react-icons/hi';

export default function ProfileImgCard() {
    const id = JSON.parse(localStorage.getItem("User"));
    const [user, setUser] = useState();

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

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 border border-gray-100">
            <div className="p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0">
                    
                    {/* Profile Image Section */}
                    <div className="relative">
                        <div
                            className="w-36 h-36 rounded-full overflow-hidden border-4"
                            style={{ borderColor: '#ECF9E3' }}
                        >
                            <div
                                className="w-full h-full flex items-center justify-center"
                                style={{ backgroundColor: '#ECF9E3' }}
                            >
                                <HiUser className="w-20 h-20" style={{ color: '#0A5C36' }} />
                            </div>
                        </div>

                        <button className="absolute bottom-2 right-2 bg-white p-2.5 rounded-full shadow-lg hover:shadow-xl transition-shadow">
                            <HiCamera className="w-5 h-5" style={{ color: '#1DB954' }} />
                        </button>
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1 md:ml-8 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {user?.name}
                                </h1>

                                <div className="flex items-center justify-center md:justify-start mt-2 space-x-4">
                                    <div className="flex items-center">
                                        <HiMail className="w-5 h-5 mr-2" style={{ color: '#4B5563' }} />
                                        <span className="text-gray-600">{user?.email}</span>
                                    </div>

                                    <div className="flex items-center">
                                        <HiPhone className="w-5 h-5 mr-2" style={{ color: '#4B5563' }} />
                                        <span className="text-gray-600">
                                            +91{user?.phone}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            
                            <div
                                className="text-center p-6 rounded-xl transform hover:scale-105 transition-transform duration-200"
                                style={{ backgroundColor: '#ECF9E3' }}
                            >
                                <HiTicket className="w-10 h-10 mx-auto mb-3" style={{ color: '#0A5C36' }} />
                                <div className="text-3xl font-bold" style={{ color: '#0A5C36' }}>
                                    {user?.totalBookings}
                                </div>
                                <div className="text-sm font-medium mt-1" style={{ color: '#4B5563' }}>
                                    Total Bookings
                                </div>
                            </div>

                            <div
                                className="text-center p-6 rounded-xl transform hover:scale-105 transition-transform duration-200"
                                style={{ backgroundColor: '#ECF9E3' }}
                            >
                                <HiStar className="w-10 h-10 mx-auto mb-3" style={{ color: '#FBBF24' }} />
                                <div className="text-3xl font-bold" style={{ color: '#0A5C36' }}>
                                    {user?.loyaltyPoints}
                                </div>
                                <div className="text-sm font-medium mt-1" style={{ color: '#4B5563' }}>
                                    Loyalty Points
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
