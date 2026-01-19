import "./App.css";
import BlogDetail from "./components/BlogDetail";
import BlogList from "./components/BlogList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="">
        <Navbar />
        <div className="flex m-8 divide-x divide-gray-300 bg-gray-50 max-h-[calc(100vh-156px)]">
          <BlogList />
          <BlogDetail />
        </div>
      </div>
    </>
  );
}

export default App;
