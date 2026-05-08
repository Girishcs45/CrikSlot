import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signin from "../pages/Signin"
import Signup from "../pages/SignUp"
import Forgetpsw from '../pages/ForgetPassword'
import BookSlot from '../pages/BookSlot';
import TurfView from '../pages/TurfView'
import Payment from '../pages/Payment'
import Tournamentall from '../pages/tournaments/Tournaments'
import TournRegestration from '../pages/tournaments/TournRegestration';
import UserProfile from '../pages/profiles/UserProfile'
import UserLanding from '../pages/UserLanding'
import Landing from '../Landing'
import OwnerSignUp from '../ownerpages/OwnerSignUp'
import CommonLogin from '../components/landing/CommonLogin'
import TurfRegistration from '../ownerpages/TurfRegistration'
import OwnerDashboard from '../ownerpages/OwnerDashboard'
import TurfProvider from '../context/TurfProvider'
import BookingSuccessModal from '../pages/BookingSuccessModal'
import MyBookings from '../pages/MyBookings'

export default function Routers() {
  return (
    <Routes>
      {/* User routes */}
      <Route path='/' element={<Landing />} />
      <Route path='/userhome' element={<UserLanding />} />
      <Route path='/Signup' element={<Signup />} />
      <Route path='/Signin' element={<Signin />} />
      <Route path='/forgot-password' element={<Forgetpsw />} />
      <Route path='/bookslot' element={<BookSlot />} />
      <Route path='/turfview/:id' element={<TurfView />} />
      <Route path='/turfview/:id/payment' element={<Payment />} />
      <Route path='/tournaments' element={<Tournamentall />} />
      <Route path='/tournamentsregistration/:tournamentId' element={<TournRegestration />} />
      <Route path='/userprofile' element={<UserProfile />} />
      <Route path="/booking-success/:bookingId" element={<BookingSuccessModal />} />
      <Route path="/my-bookings" element={<MyBookings />} />



      {/* Owner routes */}
      <Route path='/ownersignup' element={<TurfProvider><OwnerSignUp /></TurfProvider>} />
      <Route path='/login' element={<CommonLogin />} />
      <Route path='/turfregistration' element={<TurfRegistration />} />
      <Route path='/ownerhome' element={<TurfProvider><OwnerDashboard /></TurfProvider>} />




    </Routes>
  )
}
