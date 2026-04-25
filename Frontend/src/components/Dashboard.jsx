import React, { useState,useEffect,useCallback } from "react";
import API from "../api/axios";

import Summary from "./sections/Summary";
import Expense from "./sections/Expense";

const Dashboard = () => {
  const user= API.get("/user/me",{withCredentials: true});
  const [username, setusername] = useState("Guest")
  const [data, setData] = useState([]);

   const handleData = useCallback((data) => {
    console.log("Data received from child:", data);
  setData(data);
}, []);


  useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await user;
      setusername((res.data.username));
     
      // console.log(res.data.username); // username here
    } catch (err) {
      console.error(err);
    }
  };

  fetchUser();
}, []);

  const [section, setsection] = useState(() => {
  const saved = localStorage.getItem("section");
  return saved ? Number(saved) : 0;
});

  

useEffect(() => {
  localStorage.setItem("section", section);
}, [section]);
  

  return (
    <main className="flex h-screen p-3 gap-3 bg-gray-900">
      
      {/* Sidebar */}
      <aside className="w-1/5 bg-neutral-800 text-white p-4 rounded-xl flex flex-col gap-4">

  <button
    onClick={() => setsection(0)}
    className={`text-xl border border-white rounded-lg p-2 
    ${section === 0 ? "bg-gray-600" : "hover:bg-gray-600"}`}
  >
    Dashboard
  </button>

  <button
    onClick={() => setsection(1)}
    className={`text-xl border border-white rounded-lg p-2 
    ${section === 1 ? "bg-gray-600" : "hover:bg-gray-600"}`}
  >
    Expenses
  </button>

  <button
    onClick={() => setsection(1)}
    className={`text-xl border border-white rounded-lg p-2 
    ${section === 2 ? "bg-gray-600" : "hover:bg-gray-600"}`} 
  >
    <a className="w-full h-full block"
    href='https://cleartax.in/s/simple-compound-interest-calculator' target="_blank" rel="noopener noreferrer">
        Interests
        </a>
  </button>

</aside>

      {/* Main */}
      <section className="w-4/5 bg-neutral-800 text-white p-5 rounded-xl overflow-y-auto">
        
        {/* Header */}
        <h1 className="text-3xl mb-6">Hi, {username.charAt(0).toUpperCase() + username.slice(1)} </h1>

        {/* Activity Section */}
        {/* {section === 0 ? <Summary Data={data}/> : <Expense sendData={handleData}/>} */}
        <div className={section === 0 ? "block" : "hidden"}>
  <Summary Data={data} />
</div>

<div className={section === 1 ? "block" : "hidden"}>
  <Expense sendData={handleData} />
</div>
            
      </section>
    </main>
  );
};

export default Dashboard;