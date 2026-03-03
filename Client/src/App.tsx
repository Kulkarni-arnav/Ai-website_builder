import Home from './pages/Home'
import View from './pages/View'
import { Route, Routes, useLocation } from 'react-router-dom'
import Preview from './pages/Preview'
import Pricing from './pages/Pricing'
import Projects from './pages/Projects'
import Community from './pages/Community'
import MyProjects from './pages/MyProjects'
import Navbar from './components/Navbar'
import {Toaster} from 'sonner'
import AuthPage from './pages/auth/AuthPages'
import Setting from './pages/Setting'

const App = () => {

  const {pathname} = useLocation();

  const hideNavbar = pathname.startsWith('/projects/') && pathname != '/projects' || pathname.startsWith('/view/') || pathname.startsWith('/preview/');
  return (
    <div>
      <Toaster />
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path ='/' element={<Home />} />
        <Route path ='/preview/:projectId' element={<Preview />} />
        <Route path ='/preview/:projectId/:versionId' element={<Preview />} />
        <Route path ='/pricing' element={<Pricing />} />
        <Route path ='/projects/:projectId' element={<Projects />} />
        <Route path ='/projects' element={<MyProjects />} />
        <Route path ='/view/:projectId' element={<View />} />
        <Route path ='/community' element={<Community />} />
        <Route path="/auth/:pathname" element={<AuthPage />} />
        <Route path="/account/settings" element={<Setting />} />
      </Routes>
    </div>
  )
}

export default App