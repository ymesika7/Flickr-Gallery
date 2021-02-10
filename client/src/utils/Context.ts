import { createContext, useContext } from 'react';

interface IQuery {
    query: string
    isChanged: boolean
  }

export type QueryContextType = { 
    query : IQuery, 
    setQuery : (query : IQuery) => void
}


export const QueryContext = 
    createContext<QueryContextType>
        ({ query: {query : "", isChanged :false}, setQuery: query => (console.warn(""))});
export const useQuery = () => useContext(QueryContext);
