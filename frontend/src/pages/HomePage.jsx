import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
  return (
    <div className="bg-[#0f1115] min-h-screen">
      <NavBar />
      <Hero />
      {/* Home Page only wants the 20 most recent and the "View More" button */}
      <SearchBar limit={20} showViewMore={true} />
    </div>
  );
};

export default HomePage;