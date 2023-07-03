
import { createContext, useState } from 'react'

interface UserContext{
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>>
}
interface User{
  token:string,
  name:string,
  isAdmin:boolean,
  loggedIn:boolean,
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




interface AdminStuffContext{
  stuff_id: Stuff_id,
  setStuff_id: React.Dispatch<React.SetStateAction<Stuff_id>>
}

interface Stuff_id{
  stuff_id:string,
}

export const Stuff_idContext = createContext<AdminStuffContext>({} as AdminStuffContext)
export function Stuff_idProvider({ children }:{ children: JSX.Element | JSX.Element[]}){
  const [stuff_id, setStuff_id] = useState<Stuff_id>({stuff_id:''})
  const value = {
    stuff_id,
    setStuff_id
  }
  return <Stuff_idContext.Provider value={value}>{children}</Stuff_idContext.Provider>
}