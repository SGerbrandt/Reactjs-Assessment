import './App.css';
import { useEffect, useState } from 'react';

//Locals
import MainGrid from './MainGrid';



function App() {
  const [data, setData] = useState({});

  const getData = async () => {
    fetch('partitions.json', {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'applicaiton/json',
      }
    }).then(function(response) {
      return response.json();
    }).then(function(myJson) {
      setData(myJson)
    });
  }

  useEffect(()=>{
    getData()
  }, []);
  
  return (
    <div className="App">
      <MainGrid jsonData={data}/>
      {/* <ul>
        <li>count: {data.count}</li>
        {
          data.value?.map((record, i) => <li key={i}>{record.name} - Total Drives: {record.drives.length}</li>)
        }
      </ul> */}

    </div>
  );
};

export default App;
