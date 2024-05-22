import { useState, useEffect } from 'react';
import Data from './data1.csv';
import Papa from 'papaparse';
import './App.css';

function App() {

  const [data, setData] = useState([]);

  // parse CSV data & store it in the component state

  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0];
  //   Papa.parse(file, {
  //     header: true,
  //     complete: (results) => {
  //       setData(results.data);
  //     },
  //   });
  // };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(Data);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csvData = decoder.decode(result.value);
      const parsedData = Papa.parse(csvData, { 
        header: true, 
        skipEmptyLines: true 
      }).data;
      setData(parsedData);
    };
    fetchData();
  }, []);

  return (
    <div className="App">

      {/* <input type="file" accept=".csv" onChange={handleFileUpload} /> */}

      {data.length ? (
        <table className="table">
          <thead>
          <tr>
            <th>work_year</th>
            <th>experience_level</th>
            <th>employment_type</th>
            <th>job_title</th>
            <th>salary</th>
            <th>salary_currency</th>
            <th>salary_in_usd</th>
            <th>employee_residence</th>
            <th>remote_ratio</th>
            <th>company_location</th>
            <th>company_size</th>
          </tr>
          </thead>
          <tbody>
          {data.map((row, index) => (
              <tr key={index}>
                <td>{row.work_year}</td>
                <td>{row.experience_level}</td>
                <td>{row.employment_type}</td>
                <td>{row.job_title}</td>
                <td>{row.salary}</td>
                <td>{row.salary_currency}</td>
                <td>{row.salary_in_usd}</td>
                <td>{row.employee_residence}</td>
                <td>{row.remote_ratio}</td>
                <td>{row.company_location}</td>
                <td>{row.company_size}</td>

              </tr>
          ))}
          </tbody>
        </table>
      ) : null}

      <br/><br />
      ~ webstylepress ~

    </div>
  );
}

export default App;