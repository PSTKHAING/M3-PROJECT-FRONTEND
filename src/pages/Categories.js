import { Link } from 'react-router-dom'
import { faArrowLeft, faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { deleteCategory, fetchAllCategories, resetCategorySlice } from '../store/slices/categorySlice'
import { toast } from 'react-toastify'

const Categories = () => {
    const dispatch = useDispatch();
    const {error, message, categories } = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(fetchAllCategories())
    }, [message, dispatch])

    const handleCategoryDelete = (id) => {
        dispatch(deleteCategory(id))
        dispatch(resetCategorySlice())
    }

    useEffect(() =>{
        if(message){
            toast.success(message)
        }
        if (error) {
            toast.error(error)
        }
    },[error,message])

    return (
        <>
            <div className='container mx-auto py-10'>
                <div className='flex justify-between items-center'>
                    <Link to='/' className='px-6 py-4 text-sm bg-red-500 text-white rounded-md uppercase font-semibold border-2 border-solid border-red-500 hover:bg-transparent hover:text-red-500 transition-all duration-300 ease-in-out'><FontAwesomeIcon icon={faArrowLeft} className='text-xl' /></Link>
                    <Link to='/category-create' className='px-6 py-4 text-sm bg-red-500 text-white rounded-md uppercase font-semibold border-2 border-solid border-red-500 hover:bg-transparent hover:text-red-500 transition-all duration-300 ease-in-out flex items-center gap-2'><FontAwesomeIcon icon={faPlus} /> add new category</Link>
                </div>
                <table className='mt-10 w-full border border-solid border-black'>
                    <thead className='p-4'>
                        <tr className='uppercase p-4'>
                            <th className='p-4 border border-solid border-black'>no</th>
                            <th className='p-4 border border-solid border-black'>name</th>
                            <th className='p-4 border border-solid border-black'>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => {
                            return (
                                <tr className='p-4' key={category.id}>
                                    <td className='p-4 text-center border border-solid border-black'>{index + 1}</td>
                                    <td className='p-4 text-center border border-solid border-black'>{category.name}</td>
                                    <td className='p-4 text-center border border-solid border-black'>
                                        <Link to={`/category-update/${category.id}`} className='px-4 py-2 bg-green-700 text-xs text-white rounded-md uppercase font-semibold border-2 border-solid border-green-700 hover:bg-transparent hover:text-green-700 transition-all duration-300 ease-in-out'><FontAwesomeIcon icon={faEdit} className='mr-2' />update</Link>
                                        <button onClick={() => handleCategoryDelete(category.id)} className='px-4 py-2 bg-red-500 text-xs ml-4 text-white rounded-md uppercase font-semibold border-2 border-solid border-red-500 hover:bg-transparent hover:text-red-500 transition-all duration-300 ease-in-out'><FontAwesomeIcon icon={faTrash} className='mr-2' />delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Categories