import { Outlet } from 'react-router';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"


const App = () => {
    return (
        <SidebarProvider>
            <div>
                <AppSidebar />
                <main>
                    <SidebarTrigger />
                    <main>
                        <Outlet />
                    </main>
                </main>
            </div>
        </SidebarProvider>


    );
};

export default App;