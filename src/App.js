import Home from "./basic/Home"
import CardItem from "./basic/CardItem"
import { GetShip } from "./api/api"
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  let data = GetShip()

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home data={data} />} />
        {
          (data == null ? "" : data.daftarPerahu.map(element => (
            <Route path={`/${element.id}`} key={element.id} Component={() => <CardItem ship={element} />} />
          )))
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App