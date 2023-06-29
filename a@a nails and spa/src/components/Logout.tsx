import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/UserProvider"
import { useNavigate } from "react-router-dom"
import Spinner from "react-bootstrap/Spinner"

export default function Logout() {

  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(()=>{
    setUser({
      loggedIn:false,
      name:'',
      token:'',
      isAdmin:false
    })
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    navigate('/login')
  })  
  return <Spinner animation="border" />
}