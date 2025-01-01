import { useState } from "react";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  return (
    <div className="relative">
      {tasks.length === 0 ? (
        <div className="w-full h-5/6  text-foreground flex flex-col justify-center items-center">
          <img src="/homePic.svg" alt="home picture" />
          <h1 className="text-2xl opacity-80">What do you want to do today?</h1>
          <p className="opacity-80">Tap + to add your tasks</p>
        </div>
      ) : (
        <p>tasks</p>
      )}

    </div>
  );
};

export default Home;
