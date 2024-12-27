'use client'

import { getSignedInUser } from '@/lib/appwrite/server/user.actions'
import { User } from '@/types/index.types'
import React from 'react'
import { useEffect, useState } from 'react'

const ProfilePage = () => {

  const [signedInUser, setSignedInUser] = useState<User>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const signedInUser = await getSignedInUser();
      setSignedInUser(signedInUser)
    };

    fetchUser();
    
  }, [])

  return (
    <main className='container-x-padding space-y-3'>
      {signedInUser?.firstName}
    </main>
  )
}

export default ProfilePage