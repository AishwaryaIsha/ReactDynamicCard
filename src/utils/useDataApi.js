import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

// export const useDataApi = (initialUrl, initialData) => {
//   const [url, setUrl] = useState(initialUrl);
//   const [data, setData] = useState(initialData);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       setIsError(false);
//       try {
//         const result = await axios(url);
//         setData(result.data);
//       } catch (error) {
//         console.log(error);
//         setIsError(true);
//       }
//       setIsLoading(false);
//     };
//     fetchData();
//   }, [url]);

//   return [{ data, isLoading, isError }, setUrl];
// };


export const useDataApi = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const result = await axios("https://jsonplaceholder.typicode.com/posts");
        setData(result.data);
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return [{ data, isLoading, isError }];
};