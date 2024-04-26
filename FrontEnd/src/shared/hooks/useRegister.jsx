import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerRequest } from '../../services'
import toast from "react-hot-toast";

export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const register = async(email, password, username) =>{
        setIsLoading(true)

        const response = await registerRequest({
            email,
            password,
            username
        })
        setIsLoading(false)
        
        if(response.error){
            console.log(response.error)
            return toast.error(response.e?.response?.data || 'Ocurrió un error al registrarse, intenta de nuevo')
        }

        const { userDetails } = response.data

        localStorage.setItem('user', JSON.stringify(userDetails))

        navigate('/')
    }
    return{
        register,
        isLoading
    }
}