import { FC } from "react";
import UserInfo from "./components/UserInfo";
import Header from "./components/Header";
import Charts from "./components/Charts";
import Psychology from "./components/Psychology";
import Features from "./components/Features";
import BarChart from "./components/BarChart";
// import { BarChart } from "recharts";

const App: FC = () => {
  return (
    <div>
        <Header></Header>
        <UserInfo></UserInfo>
        <Charts></Charts>
        <Psychology></Psychology>
        <BarChart></BarChart>
        <Features></Features>
    </div>
  )

}

export default App