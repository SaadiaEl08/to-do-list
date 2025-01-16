import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Intro = () => {
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(true);
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
    introPageIndex < listOfIntroPagesData.length ?
      setIntroPageIndex(introPageIndex + 1)
      : navigate("/welcome");
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showLoading ? (
        <Loading />
      ) : (
        <main className="bg-background">
          {listOfIntroPagesData.map(
            (page, index) =>
              page.id === introPageIndex && (
                <div
                  key={index}
                  className="w-full min-h-screen h-screen flex flex-col justify-between items-center bg-background text-foreground p-4 pb-10 md:w-1/2 m-auto"
                >
                  <div className="w-full">
                    <span
                      className="text-muted-foreground"
                      onClick={() => navigate("/welcome")}
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
        </main>
      )}
    </div>
  );
};

export default Intro;
