
import { createContext, useState } from 'react'

interface UserContext{
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>>
}
interface User{
  token:string,
  name:string,
  isAdmin:boolean,
  loggedIn:boolean
}

export const AuthContext = createContext<UserContext>({} as UserContext)

export default function AuthProvider({ children }:{ children: JSX.Element | JSX.Element[]}){

  const [user, setUser] = useState<User>({token:'',name:'',isAdmin:false, loggedIn:false})  
  const value = {
    user,
    setUser
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}