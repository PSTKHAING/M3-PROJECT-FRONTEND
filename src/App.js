import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Categories from './pages/Categories'
import Products from './pages/Products'
import { ToastContainer } from 'react-toastify'
import CategoryCreate from './pages/CategoryCreate'
import logo from './logo.png';
import CategoryUpdate from './pages/CategoryUpdate'

const App = () => {
  return (
    <BrowserRouter>
      <div className='bg-red-100 min-h-screen w-screen'>
        <div className='flex flex-col gap-4'>
          <div className='w-full h-[20rem]'>
            <img src={logo} alt='logo' className='w-full h-full object-contain' />
          </div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/products' element={<Products />} />
            <Route path='/category-create' element={<CategoryCreate />} />
            <Route path='/category-update/:id' element={<CategoryUpdate />} />
          </Routes>
        </div>
      </div>
      <ToastContainer theme='dark' />
    </BrowserRouter>
  )
}

export default App