import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { ChevronLeft, User } from "lucide-react";

const Intro = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [introPageIndex, setIntroPageIndex] = useState(1);
  const listOfIntroPagesData = [
    {
      id: 1,
      Image: "/intro1.svg",
      title: "Manage your tasks",
      text: "You can easily manage all of your daily tasks in DoMe for free",
    },
    {
      id: 2,
      Image: "/intro2.svg",
      title: "Create daily routine",
      text: "In Uptodo  you can create your personalized routine to stay productive",
    },
    {
      id: 3,
      Image: "/intro3.svg",
      title: "Orgonaize your tasks",
      text: "You can organize your daily tasks by adding your tasks into separate categories",
    },
  ];
  const handleNextClick = () => {
    introPageIndex < listOfIntroPagesData.length
      ? setIntroPageIndex(introPageIndex + 1)
      : setShowWelcome(true);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showLoading ? (
        <Loading />
      ) : (
        <main>
          {!showWelcome &&
            listOfIntroPagesData.map(
              (page, index) =>
                page.id === introPageIndex && (
                  <div
                    key={index}
                    className="w-full h-screen flex flex-col justify-between items-center bg-background text-foreground p-4 pb-10"
                  >
                    <div className="w-full">
                      <span
                        className="text-muted-foreground"
                        onClick={() => setShowWelcome(true)}
                      >
                        Skip
                      </span>
                    </div>
                    <div className="w-full h-[50%] flex justify-center items-center">
                      <img src={page.Image} />
                    </div>
                    <div className="step flex justify-evenly items-center w-[50%] mx-auto gap-4 ">
                      {Array.from({ length: listOfIntroPagesData.length }).map(
                        (_, index) => (
                          <div
                            key={index}
                            className={`w-full border-2 ${
                              index + 1 === page.id
                                ? "border-foreground"
                                : "border-muted-foreground "
                            }`}
                          ></div>
                        )
                      )}
                    </div>
                    <h1 className="title text-3xl font-bold">{page.title}</h1>
                    <p className="text w-full text-center text-foreground opacity-80">
                      {page.text}
                    </p>
                    <div className="w-full flex justify-between items-center gap-4">
                      <button
                        className="text-muted-foreground disabled:cursor-not-allowed"
                        disabled={introPageIndex === 1}
                        onClick={() => setIntroPageIndex(introPageIndex - 1)}
                      >
                        BACK
                      </button>
                      <button
                        className="bg-primary px-6 py-3 rounded "
                        onClick={handleNextClick}
                      >
                        {" "}
                        {introPageIndex === listOfIntroPagesData.length
                          ? "Get Started"
                          : "Next"}
                      </button>
                    </div>
                  </div>
                )
            )}
          {showWelcome && (
            <div className="w-full h-screen flex flex-col justify-start items-center bg-background text-foreground p-4 pb-10">
              <div className="w-full">
                <ChevronLeft  onClick={() => setShowWelcome(false)}/>
              </div>
              <div className="w-full h-full flex flex-col justify-between items-center">
                <div className="w-full h-[50%] flex flex-col justify-center items-center gap-6">
                  <h1 className="title text-3xl font-bold">
                    Welcome to UpTodo
                  </h1>
                  <p className="text w-full text-center text-foreground opacity-80">
                    Please login to your account or create new account to
                    continue
                  </p>
                </div>
                <div className="w-full  flex flex-col justify-between items-center gap-4">
                  <button className="w-full h-12 bg-primary px-6 py-3 rounded ">
                    LOGIN
                  </button>
                  <button className="w-full h-12 border-2 border-primary text-foreground">
                    Create account
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      )}
    </div>
  );
};

export default Intro;
