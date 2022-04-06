import react from "react";
import {useState} from 'react'
import useDebounce from '../useDebounce'
function SearchInput ({value,onChange}) {
    const [displayValue,setDisplayValue] = useState(value);
    const debouncedChange = useDebounce(onChange,500)
    function handleChange(event){
        setDisplayValue(event.target.value)
        debouncedChange(event.target.value);
    }
    return(
        <div className ="d-flex justify-content-center">
            <input 
            className="input-group-text"
            type = "search" 
            value={displayValue}
            onChange={handleChange}/>
        </div>
    )
}

export default SearchInput;