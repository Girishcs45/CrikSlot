import ProfileImgCard from '../../components/profilepage/ProfileImgCard';
import ProfileInfo from '../../components/profilepage/ProfileInfo';
import ProfileMyBooking from '../../components/profilepage/ProfileMyBooking';
import ProfileQuickAction from '../../components/profilepage/ProfileQuickAction';
import ProfileActivities from '../../components/profilepage/ProfileActivities';


const ProfilePageStatic = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header Card */}
        <ProfileImgCard />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Details Card */}
            <ProfileInfo />
            {/* Bookings Section */}
            <ProfileMyBooking/>
          </div>
          {/* Sidebar - Right 1/3 */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <ProfileQuickAction/>
            {/* Recent Activity */}
            <ProfileActivities/>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePageStatic;