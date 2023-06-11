
import axios from 'axios'
import { useEffect,useState } from 'react'

const CategoriesHook = () => {

    const [categories,setCategories] = useState([])

    const getAllCategories = async()=>{
        await axios.get(`${process.env.REACT_APP_API}All-Categories`).then((response)=>{
            if(response.data.success){
                console.log(response.data.categories)
                setCategories(response.data.categories)
            }
        }).catch((error)=>{
            console.log(`Unable to get all categories ${error.message}`)
        })
    }

    useEffect(()=>{
        getAllCategories()
    },[])

  return categories
  
}

export default CategoriesHook