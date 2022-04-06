import { useEffect,useState } from 'react'
import Description from './components/Description';
import Navbar from './components/Navbar';
import SearchInput from './components/Search';


function App() {
  const base_url = 'https://kitsu.io/api/edge/'
  const[text,setText] = useState(''); 
  const [info,setInfo] = useState({});
  useEffect(()=>{
    if(text)
    {
      setInfo({})
      fetch(`${base_url}anime?filter[text]=${text}&page[limit]=12`)
      .then((response)=> response.json())
      .then((response)=>{
        setInfo(response);
        console.log(response);
      })
    }

  },[text])
 return(
   <div>
    <Navbar/>
    <div className="container-sm bg-light">
      <Description/>
      <SearchInput 
        value={text} 
        onChange={(search)=>setText(search)}
      />
      {text && !info.data &&(
        <span className="lead"> Loading...</span>
      )}
      {info.data &&(
        <ul className="list-group list-group-flush">
          {info.data.map((anime)=>(
            <li className = "list-group-item" key={anime.id}>
              <img 
                className = "rounded mx-auto d-block"
                src={anime.attributes.posterImage.small}
                alt = {anime.attributes.canonicalTitle}
              />
            <p className="lead text-center"> <b>{anime.attributes.canonicalTitle}</b></p>  
            </li>        
          ))}
        </ul>
      )}
    </div>
    
   </div>
  )
}

export default App
