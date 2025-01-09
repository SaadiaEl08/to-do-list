import About from "./About";
import FAQ from "./FAQ";
import PopOver from "./PopOver";
import Help from "./Help";
import Support from "./Support";

const AppInfo = ({ appInfos, setAppInfos }) => {
  return (
    <PopOver isOpen={true} toggle={() => setAppInfos(null)}>
      <div className=" flex flex-col items-center gap-4  w-[80vw]">
        {appInfos === "about" && <About close={() => setAppInfos(null)} />}
        {appInfos === "faq" && <FAQ close={() => setAppInfos(null)} />}
        {appInfos === "help" && <Help close={() => setAppInfos(null)} />}
        {appInfos === "support" && <Support close={() => setAppInfos(null)} />}
      </div>
    </PopOver>
  );
};

export default AppInfo;
