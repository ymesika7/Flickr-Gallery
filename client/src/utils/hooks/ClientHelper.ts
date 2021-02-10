import {useState,useEffect,} from 'react';
import axios from 'axios';

// import useAPIError from './useAPIError';

const useClientHelper = (endpoint: any) => {
  const [response, setResponse] = useState(null);
  const [isLoading, setLoading] = useState(false);
  // const { addError } = useAPIError();
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // const response = await endpoint;
        const response = await axios.get(`/api/gallery/info/${endpoint}`)
        .then(response => {
            return(response); 
          });
        setResponse(response.data);
        setLoading(false);
        return response
      } catch (error) {
        console.error(error);
      }
      // if (!response) addError(errorMessage)
    }
    fetchData();
  }, [endpoint])

  return { response, isLoading };
}

export default useClientHelper;