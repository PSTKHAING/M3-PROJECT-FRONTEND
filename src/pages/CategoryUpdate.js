import React, { useEffect, useState } from 'react'
import placeHolder from "../assets/placeholder.jpg";
import closeIcon from "../assets/close-square.png";
import keyIcon from "../assets/key.png";
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, fetchCategoryById, resetCategorySlice, updateCategory } from '../store/slices/categorySlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const CategoryUpdate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState("");

    const { error, loading, message, category } = useSelector((state) => state.category);

    const handleUpdateCategory = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        dispatch(updateCategory(formData, id));
    };

    useEffect(() => {
        dispatch(fetchCategoryById(id))
    }, [id, dispatch])

    useEffect(() => {
        if (category) {
            setName(category.name || "");
        }
    }, [category]);

    useEffect(() => {
        if (message) {
            toast.success(message)
            dispatch(resetCategorySlice());
            navigate('/categories')
        }
        if (error) {
            toast.error(error)
            dispatch(resetCategorySlice());
        }
    }, [dispatch, message, error])

    return (
        <div className='container mx-auto py-10'>
            <div className='w-full mx-auto md:w-1/2 mb-10'>
                <Link to='/categories' className='px-6 py-4 text-sm bg-red-500 text-white rounded-md uppercase font-semibold border-2 border-solid border-red-500 hover:bg-transparent hover:text-red-500 transition-all duration-300 ease-in-out'><FontAwesomeIcon icon={faArrowLeft} className='text-xl' /></Link>
            </div>
            <div className="w-full bg-white mx-auto rounded-lg shadow-lg md:w-1/2">
                <div className="p-6">
                    <header className="flex justify-between items-center mb-7 pb-5 border-b-[1px] border-black">
                        <div className="flex items-center gap-3">
                            <img
                                src={keyIcon}
                                alt="key-icon"
                                className="bg-gray-300 p-5 rounded-lg"
                            />
                            <h3 className="text-xl font-bold">Update Category</h3>
                        </div>
                    </header>

                    <form onSubmit={handleUpdateCategory}>
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-gray-900 font-medium mb-2 cursor-pointer"
                            >
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Category's Name"
                                className="w-full px-4 py-2 border border-solid border-gray-300 rounded-md focus:border-gray-900"
                            />
                        </div>

                        <div className="flex justify-end space-x-4">

                            <button
                                type="submit"
                                // disabled={loading ? true : false}
                                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                            >
                                UPDATE
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CategoryUpdate