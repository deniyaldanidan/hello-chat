import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './container/Layout';
import Login from './pages/Login';
import Register from './pages/register';
import { cn } from './libs/utils';
import { centerPageClasses } from './classes';
import AuthGate from './container/AuthGate';
import AuthInit from './container/AuthInit';


function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Only Authenticated users allowed */}
        <Route element={<AuthGate isAuth redirectLink='/login' />}>
          {/* Wrapper to initialize a initial socket connection to all authenticated routes */}
          <Route element={<AuthInit />}>
            <Route index element={<Home />} />
          </Route>
        </Route>

        {/* Only Un-Authenticated users allowed */}
        <Route element={<AuthGate isAuth={false} redirectLink='/' />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>


        {/* 404 Page */}
        <Route path='*' element={<div className={cn(centerPageClasses, "text-3xl text-center text-red-600 font-playfair")}>404, Not Found Error</div>} />
      </Route>
    </Routes>
  )
}

export default App



// const btnClasses = "py-1.5 px-10 text-lg rounded-xl cursor-pointer bg-primary text-background font-medium disabled:bg-gray-600 disabled:cursor-not-allowed";