import "./styles.css";
import FileFolderComp from "../src/components/FileFolderComp/index";
import Header from "../src/components/Header";
export default function App() {
  return (
    <div className="App">
      <Header />
      <FileFolderComp />
    </div>
  );
}
