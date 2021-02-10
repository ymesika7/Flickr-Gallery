import { ChangeEvent, FormEvent } from 'react';
import { useQuery } from '../../utils/Context';

const Search = () => {
    const {query, setQuery} = useQuery();
    let t_query = "";

    const onChange = (e:ChangeEvent<HTMLInputElement>) => {
        t_query = e.target.value; 
    };

    const handleSubmit = (e:FormEvent) =>{
        e.preventDefault();
        if(query.query.localeCompare(t_query) !== 0) {
            setQuery({query: t_query, isChanged : true}); 
        }
    }; 

    return (
        <nav className="navbar bg-dark"> 
            <h1> 
                <i className="fas fa-futbol"> GeniuScout</i>
            </h1>
            <ul>
                <li>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Search"
                                name="search"
                                onChange={onChange}
                                required />
                                <button type="submit" className="btn btn-primary"> Search </button>
                        </div>
                    </form>
                </li>
            </ul>
        </nav>
    );
};

export default Search;