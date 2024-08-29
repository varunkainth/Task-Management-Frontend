import useUser from '@/hooks/useUser'
import React, { ReactNode } from 'react'
import { UserData } from '@/types/auth'

const Dashboard = ():ReactNode => {
  const {getAllUsersData,users,loading} = useUser()
  const [user, setUsers] = React.useState<UserData[]>([])
  const [loadings, setLoading] = React.useState(false)
 

  const  handleGetAllUsers = async () => {
    setLoading(loading)
    try {
       getAllUsersData()
      setUsers(users)
      } finally {
          setLoading(loading)
          }
          }

  return (
    <>
    <button disabled={loadings} onClick={handleGetAllUsers}>GetAllUser</button>
    {user.map((user,index)=>{
      return (
        <div key={index}>
          <h1>{user.name}</h1>
          <h1>{user.email}</h1>
          
        </div>
        )
    })}
    </>
  )
}

export default Dashboard