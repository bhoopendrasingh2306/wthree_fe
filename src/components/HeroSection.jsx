import React, { useState, useEffect } from "react";
import axios from "axios";
import img from "../assets/user.png";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const navigate = useNavigate();
  const [referrals, setReferrals] = useState([]);
  const [activeTab, setActiveTab] = useState("Self");
  const [isOpen, setIsOpen] = useState(false);

  var myData = JSON.parse(localStorage.getItem('user'));
  console.log("local storage",myData);
  console.log("hal aas", myData.amount);


  useEffect(() => {
    
    axios.get('https://wthree-be.vercel.app/user/referral').then(response => {
      console.log("api result", response.data.result);
      setReferrals(response.data.result);
    });
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Self":
        return <div>Self Earnings Content</div>;
      case "Referral":
        return (
          <section className="mb-20">
            {referrals.map((ref, index) => (
              <div className="p-0 m-0">
                <div
                key={index}
                className="bg-white w-full p-3 my-2 rounded-lg shadow-lg flex justify-between items-center"
                onClick={toggleDropdown}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4">
                    {/* Placeholder for image */}
                    <img src={img} alt="image" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">{ref.name}</p>
                    <button className="text-sm text-white bg-orange-600 py-1 px-4 rounded-md">Referral</button>
                  </div>
                </div>
                <div className="flex flex-row">
                <div className="text-right">
                <p className="text-lg font-semibold ">{ref.details}</p>
                  <p className="font-semibold text-lg">₹{ref.amount}</p>
                  <p className="text-sm text-gray-500">{ref.time}{ref.date}</p>
                </div>

                <svg
                  className="-mr-1 ml-2 h-5 w-5 mt-8"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.707a1 1 0 011.414 0L10 11.414l3.293-3.707a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                </div>
              </div>

              <button className="w-full">
              {isOpen && (
              <div className="bg-white shadow-lg rounded-lg p-4 mx-4">
              {/* Top Section: Icon and Amount */}
              <div className="flex justify-center items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex justify-center items-center">
                  {/* Placeholder for image */}
                  <img src={img} alt="referral" className="w-10 h-10" />
                </div>
                <div className="ml-4 text-center">
                  <p className="text-lg font-semibold">₹{ref.amount}</p>
                  <p className="text-sm text-gray-500">{ref.details}</p>
                </div>
              </div>
        
              {/* Divider Line */}
              <hr className="border-dashed border-gray-300 mb-4" />
        
              {/* Referral Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="font-medium text-gray-600">Sr. No</div>
                <div>{ref.srno}</div>
                
        
                <div className="font-medium text-gray-600">Full Name</div>
                <div>{ref.name}</div>
        
                <div className="font-medium text-gray-600">User Status</div>
                <div className="text-green-500 font-semibold">{ref.userStatus}</div>
        
                <div className="font-medium text-gray-600">Details</div>
                <div>{ref.details}</div>
        
                <div className="font-medium text-gray-600">Amount</div>
                <div>₹{ref.amount}</div>
              </div>
            </div>
            )}
              </button>
              </div>
               
            ))}
          </section>
        );
      case "Reward":
        return <div>Reward Content</div>;
      default:
        return null;
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const logout = ()=>{
    localStorage.clear();
    navigate("/");
    
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <div className="text-xl font-semibold">My Earnings</div>
        <div className="flex space-x-4">
          <div className="text-red-500 font-bold">🔥 3982</div>
          <div className="text-green-500 font-bold">₹{myData.amount}</div>
          <div className="text-blue-500 font-bold">🏅Task Phone</div>
          <button className="text-white font-bold bg-red-600 p-1 rounded-lg" onClick={logout}>LogOut</button>
        </div>
      </header>

      {/* Earnings Statistics */}
      <section className="bg-white p-4 mt-4 mx-4 rounded-lg shadow ">
        <div className="flex justify-center">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">Earnings Statistics</h2>
            <p className="text-md ">Total Earnings:</p>
            <p className="text-md "> ₹{myData.amount}</p>
          </div>
        </div>
        <div className="text-sm mt-2 w-auto mx-8 ">
          <div className="flex flex-row justify-between">
          <p>Self Earnings: </p>
          <p>₹{myData.selfEarning}</p>
          </div>
          <div className="flex flex-row justify-between">
          <p>Referral Earnings: </p>
          <p>₹{myData.referralEarning}</p>
          </div>
          <div className="flex flex-row justify-between">
          <p>Reward Earnings: </p>
          <p> ₹{myData.rewardEarning}</p>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <div className="flex justify-evenly mt-6 mx-4 border-orange-400 rounded-3xl border-2 p-2">
        <button
          onClick={() => setActiveTab("Self")}
          className={`py-2 px-6 rounded-lg  ${activeTab === "Self" ? "bg-orange-500 text-white rounded-3xl w-36  " : ""}`}
        >
          Self
        </button>
        <button
          onClick={() => setActiveTab("Referral")}
          className={`py-2 px-6 rounded-lg ${activeTab === "Referral" ? "bg-orange-500 text-white rounded-3xl w-36 " : ""}`}
        >
          Referral
        </button>
        <button
          onClick={() => setActiveTab("Reward")}
          className={`py-2 px-6 rounded-lg ${activeTab === "Reward" ? "bg-orange-500 text-white rounded-3xl w-36 " : ""}`}
        >
          Reward
        </button>
      </div>

      {/* Dynamic Content */}
      <section className="mx-4 mt-4">
        {renderTabContent()}
      </section>

      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 w-full bg-blue-600 text-white flex justify-around py-2">
        <div className="text-center">
          <div>🏠</div>
          <p>Home</p>
        </div>
        <div className="text-center">
          <div>➕</div>
          <p>Add</p>
        </div>
        <div className="text-center">
          <div>⚙️</div>
          <p>Settings</p>
        </div>
      </footer>
    </div>
  );
};

export default HeroSection;

