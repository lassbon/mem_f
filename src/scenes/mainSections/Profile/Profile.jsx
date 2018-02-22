import React from 'react'
import UserProfile from 'UserProfile'

const Profile = () => (
  <section className="lg:h-full flex">
    <div className="lg:w-2/3 lg:px-16 py-8">
      <section className="lg:w-3/5 p-4 bg-grey-lightest">profile</section>
    </div>
    <aside className="lg:w-1/3 lg:h-full bg-grey-lightest">
      <UserProfile />
    </aside>
  </section>
)

export default Profile
