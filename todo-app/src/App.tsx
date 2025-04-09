import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import Signin from "@/pages/Signin.tsx"
import Home from "@/pages/Home.tsx"
import {isAuthenticated} from "@/actions/handleAuthentication.tsx"

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />;
  }
  return <>{children}</>;
};

function App() {
    return (
       <section>
           <BrowserRouter>
               <Routes>
                    <Route path="/signin" element={<Signin />} />
                   <Route path="/home" element={
                     <ProtectedRoute>
                       <Home />
                     </ProtectedRoute>
                   } />
                   <Route path="*" element={<Navigate to="/signin" replace />} />
               </Routes>
           </BrowserRouter>
       </section>
    )
}


export default App
