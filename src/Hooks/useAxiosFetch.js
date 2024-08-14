import { useEffect, useState } from "react"
import axios from "axios"

const useAxiosFetch = (dataURL) => {
  const [data , setData] = useState([])
  const [fetchErrors , setFetchErrors] = useState(null)
  const [isLoading , setIsLoading] = useState(false)

  useEffect(()=>{
    let isMounted = true;
    const source = axios.CancelToken.source()

    const fetchData = async(url) =>{
        setIsLoading(true)
        try{
            const response = await axios.get(url , {
                cancelToken: source.token
            });
            if(isMounted){
                setData(response.data)
                setFetchErrors(null)
            }
        }catch(err){
            if(isMounted){
                setFetchErrors(err.message)
                setData([])
            }
        }finally{
            isMounted && setTimeout(()=> setIsLoading(false) , 2000);
        }
    }
    fetchData(dataURL)
    

    const cleanUp= () =>{
        isMounted = false
        source.cancel();
    }
    return cleanUp;
  } , [dataURL]);

  return{data , fetchErrors , isLoading};
}

export default useAxiosFetch