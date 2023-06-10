import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response1, response2, response3] = await Promise.all([
          axios.get('https://apitrainees.herokuapp.com/carros'),
          axios.get('https://apitrainees.herokuapp.com/casas'),
          axios.get('https://apitrainees.herokuapp.com/celulares')
        ]);

        setData1(response1.data);
        setData2(response2.data);
        setData3(response3.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Data from API 1:</h1>
      <ul>
        {data1.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

      <h1>Data from API 2:</h1>
      <ul>
        {data2.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

      <h1>Data from API 3:</h1>
      <ul>
        {data3.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;
