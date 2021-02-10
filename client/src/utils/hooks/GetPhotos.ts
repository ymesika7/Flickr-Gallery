import { useState, useEffect } from 'react';
import axios from 'axios';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useQuery } from '../Context';


const GetPhotos = () => {
	const initialState = {
    photos: [],
    isLoading: true,
    error: false,
  }

  type stateType = {
  	photos: any[],
  	isLoading: boolean,
  	error: boolean,
  }

  const [state, setState] = useState<stateType>(initialState);
  const {query, setQuery} = useQuery();
  const [page, setPage] = useState(1);

  useBottomScrollListener(async () => {
    if (!state.isLoading) return setPage(page + 1);},
    {offset:window.innerHeight - 200 , debounce:200});

  useEffect(() => {
    const fetchArticles = async () => {
      setState(state => ({ ...state, isLoading: true }));
      try {
        const {data} = await axios.get(`/api/gallery/${query.query}/20/${page}`)
        .then(response => {
          return(response); 
        });
        setState(state => ({ 
        	...state, 
        	photos: query.isChanged ?[ ...data.photos.photo ] : [ ...state.photos, ...data.photos.photo ], 
        	isLoading: false 
        }));
      } catch (error) {
        setState(state => ({ ...state, error, isLoading: false, }));
      }
    }
    fetchArticles();
    if(query.isChanged){
      setQuery({...query, isChanged : false});
    }
  },[page, query.query]);

  return state;
}

export default GetPhotos;