import "./invoice.css";
import { useState,useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import Carousel from "./slider";
import { useParams } from "react-router-dom";


const AddNewInvoice = () => {

    const [productName, setProductName] = useState("");
    const [datas, setDatas] = useState("");
    const [categories,setCategories] = useState(null);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const searchValue = params.get('search');
    const navigate = useNavigate();
    const {code : item} = useParams();

    const searchHandler = () => {
        navigate('/invoice/add?search=' + productName);
      };

      const fetchData = async (url, updateData) => {
        try {
            const { data } = await axios.get(url);
            updateData(data);
            // toast.success(successMessage);
        }
        catch (error) {
            console.error(error);
            // toast.error(failureMessage);
        }
    };

    useEffect(() => {
        let url = 'http://localhost:3000/products';
        const queryParams = [];
    
        if (searchValue) {
            queryParams.push(searchValue);
        }
    
        if (item) {
            queryParams.push(item);
        }

        if (queryParams.length > 0) {
            url += `?q=${queryParams.join('&')}`;
        }

        fetchData(url, setDatas);
    
    }, [searchValue, item]);

    
    
    // useEffect(() => {
    //     const url = `http://localhost:3000/products${searchValue ? `?q=${searchValue}` : ''}`;
    //     fetchData(url, setDatas, 
    //     // "Products fetched successfully!", "Failed to fetch products!"
    //     );
    // }, [searchValue]);

    // useEffect(() => {
    //     const url = `http://localhost:3000/products${selectedCategory ? `?q=${selectedCategory}` : ''}`;
    //     fetchData(url, setDatas, 
    //     // "Products fetched successfully!", "Failed to fetch products!"
    //     );
    // }, [selectedCategory]);
    
    useEffect(() => {
        const url = 'http://localhost:3000/productCategories';
        fetchData(url, setCategories, 
        // "Product categories fetched successfully!", "Failed to fetch product categories!"
        );
    }, []);
    
    return (
       <div className="absolute h-full w-[80%] right-2 top-[70px]">
        <section className=" InvoiceSection flex gap-3 overflow-hidden rounded-md bg-gray-100 h-[100vh] p-5">
            <div className="rounded-md p-4 w-[75%] h-fit">    
                <ul className='flex justify-between items-center mx-auto'>
                    <li className='w-full'>
                        <form className='flex items-center max-w-lg'>
                            <div className='relative w-full'>
                                <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'></div>
                                <input
                                type='text'
                                id='simple-search'
                                className='bg-white border border-gray-300 text-gray-900 text-sm
                                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-3
                                p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                placeholder='Search all product here'
                                required
                                value={productName} 
                                onChange={(e) => setProductName(e.target.value)}
                                />
                                {productName && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 absolute top-[13px] right-3 cursor-pointer" onClick={()=>setProductName('')}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                                )}
                            </div>
                            <button
                                type='button'
                                className='p-2.5 ms-2 text-sm font-medium text-blue-500 bg-white rounded-lg border border-blue-700 hover:bg-gray-50 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                                onClick={searchHandler}
                            >
                                <svg
                                className='w-4 h-4'
                                aria-hidden='true'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 20 20'
                                >
                                <path
                                    stroke='currentColor'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                                /> 
                                </svg>  
                                <span className='sr-only'>Search</span>     
                            </button>
                        </form>
                    </li>
                </ul>
                <Carousel categories={categories} item={item}/>
                <div className="flex items-center gap-2 flex-wrap">
                    {datas && datas.map((data)=>(
                        <div key={data.id} className="w-[262px] p-2 bg-white space-y-3 rounded">
                            <div className="font-semibold">{data.productName}</div>
                            <div className="px-2 py-1 max-w-fit bg-teal-100 text-gray-700 text-xs rounded-sm">        
                                {data.productCategoryCode}
                            </div>
                            <div className="text-blue-400 font-semibold text-sm">${data.price}</div>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer
            position='top-center'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
            className='w-[350px]'
            />

            <div className="InvoiceCard  flex rounded-md p-4 w-[25%] h-[200px] ">
                Button Group
            </div>
        </section>
       </div>
    );
};

export default AddNewInvoice;