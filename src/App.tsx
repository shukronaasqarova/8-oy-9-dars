import { FC } from "react";
import UserInfo from "./components/UserInfo";
import Header from "./components/Header";
import Charts from "./components/Charts";
import Psychology from "./components/psychology";
import Features from "./components/Features";

const App: FC = () => {
  return (
    <div>
        <Header></Header>
        <UserInfo></UserInfo>
        <Charts></Charts>
        <Features></Features>
        <Psychology></Psychology>
    </div>
  )

}

export default App