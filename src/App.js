import './App.css'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Cart, Login, Shop, ShopId} from './pages'
import ProtectedRoutes from './components/ProtectedRoutes'
import { useSelector } from 'react-redux'
import Loading from './components/Loading'
import MainLayout from './components/MainLayout'


function App() {   

  const isLoading = useSelector(state => state.isLoading)

  return (
    <div className="app">
      <HashRouter>

          { isLoading && <Loading /> }          
                 
        <Routes>

        <Route  path='/login' element={<Login />}/>
          <Route path="/" element={<Navigate to="/login" />} />        

          <Route element={<ProtectedRoutes />}>
            <Route element={<MainLayout />}>
              <Route path='/cart' element={<Cart />} />
              <Route path='/shop' element={<Shop />} />
              <Route path='/shop/:id' element={<ShopId />} />              
            </Route>
          </Route>                   
        </Routes>        
      </HashRouter>
      

    </div>
  );
}

export default App;
