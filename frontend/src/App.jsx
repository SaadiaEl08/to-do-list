import { Outlet } from "react-router";
import NavigationMenu from "./components/NavigationMenu";
import TopSection from "./components/TopSection";

const App = () => {
  return (
    <div>
      <main className="w-full min-h-screen h-screen bg-background flex flex-col justify-end">
        <div className="h-full">
          <TopSection />
          <Outlet />
        </div>
        <NavigationMenu />
      </main>
    </div>
  );
};

export default App;
