import React, { useEffect, useState } from "react";
import SideNavbar from "./components/SideNavbar";
import Navbar from "./components/Navbar";
import { useRecoilState, useRecoilValue } from "recoil";
import { accountNameState, sideNavCounter, sideNavState } from "./utils/State";
import Barchart from "./components/BarChart";
import Card from "./components/Card";
import axios from "axios";

function formatNumber(number) {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(2) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(2) + "k";
  } else {
    return number.toString();
  }
}

function App() {
  const [active, setActive] = useRecoilState(sideNavCounter);
  const [isSidebarOpen, setSidebarOpen] = useRecoilState(sideNavState);
  const account = useRecoilValue(accountNameState);

  const [populationData, setPopulationData] = useState({
    population: [],
    populationYear: [],
  });
  const [bitcoinData, setBitcoinData] = useState([]);

  useEffect(() => {
    axios
      .get("https://datausa.io/api/data?drilldowns=Nation&measures=Population")
      .then((res) => {
        setPopulationData((prevState) => ({
          ...prevState,
          population: res.data?.data
            .map((country) => country.Population)
            .reverse(),
          populationYear: res.data?.data
            .map((country) => country.Year)
            .reverse(),
        }));
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((res) => {
        setBitcoinData(res.data.bpi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const lineData = {
    labels: populationData.populationYear,
    datasets: [
      {
        label: "Population",
        data: populationData.population,
        borderColor: "#3c3b6e",
        backgroundColor: "#3c3b6e ",
      },
    ],
  };

  const lineOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          callback: function (value, index, values) {
            return formatNumber(value);
          },
        },
      },
    },
  };

  return (
    <>
      <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <SideNavbar
        active={active}
        setActive={setActive}
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div
        className={`${
          isSidebarOpen ? "lg:ml-[300px]" : ""
        } duration-500 mt-[80px] h-full bg-gray-200`}
      >
        {account !== "" && (
          <p className="max-w-20 font-semibold md:text-nowrap sm:text-wrap p-2">
            Account Name: {account}
          </p>
        )}

        <h3 className="font-bold text-slate-700 text-center text-lg pt-10">
          Population of United States
        </h3>
        <Barchart data={lineData} options={lineOptions} />
        <div className="flex gap-4 justify-center flex-wrap mt-20 pb-20">
          {Object.entries(bitcoinData).map(([key, value]) => (
            <div key={key}>
              <Card
                key={key}
                code={value.code}
                desc={value.description}
                rate={value.rate}
                symbol={value.symbol}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
