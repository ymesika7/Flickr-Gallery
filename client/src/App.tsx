import React, { useState } from 'react';
import Search from '../src/components/Search/Search'
import  { QueryContext } from './utils/Context'
import Gallery from './components/Gallery/Gallery' 
function App() {

  const [query, setQuery] = useState({query : "nature", isChanged :false});  

  return (
    <React.Fragment>
        <QueryContext.Provider value={{query, setQuery}}>
            <Search />
            <Gallery />
          </QueryContext.Provider>
    </React.Fragment>
  );
}

export default App;
