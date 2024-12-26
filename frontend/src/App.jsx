import { Outlet } from 'react-router';
import Intro from './pages/Intro';


const App = () => {

    return (
        <div>
            <Intro />
            {/* <main className="h-full bg-[#1A202C]">
                <Outlet />
            </main> */}

        </div>
    );
};

export default App;