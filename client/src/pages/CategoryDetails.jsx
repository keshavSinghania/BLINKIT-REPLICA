import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingPage from '../components/loadingPage.jsx';
import { fetchSubCategoryData } from '../utils/fetchSubCategoryData';
import { fetchProductsBySubCategoryId } from '../utils/fetchProductsBySubCatId.js';

const CategoryDetails = () => {
    const subCategories = useSelector((state) => state.subCategory);
    const [loading, setLoading] = useState(false);
    const [matchedSubCat, setMatchedSubCat] = useState([]);
    const [productsToDisplay, setProductsToDisplay] = useState([]);
    const [productNameToDisplay, setProductNameToDisplay] = useState('');
    const dispatch = useDispatch();
    const param = useParams();
    const catgory_id = param._id;
    const navigate = useNavigate()

    const filteringSubCategoryUsingCategory = async () => {
        setLoading(true);
        const matched = subCategories.filter((subCat) => subCat.categoryId[0]._id === catgory_id);
        if (matched.length > 0) {
            setProductNameToDisplay(matched[0].name);
            const products = await fetchProductsBySubCategoryId(matched[0]._id);
            setProductsToDisplay(products.data);
            setMatchedSubCat(matched);
        }
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        fetchSubCategoryData(dispatch);
    }, [dispatch]);

    useEffect(() => {
        if (subCategories.length > 0) {
            filteringSubCategoryUsingCategory();
        }
    }, [subCategories]);

    const displayProductHandler = async (_id, name) => {
        setLoading(true);
        const products = await fetchProductsBySubCategoryId(_id);
        setProductsToDisplay(products.data);
        setProductNameToDisplay(name);
        setLoading(false);
    };

    return (
        <main className="flex flex-row w-screen overflow-x-auto bg-[#EFF6FF]">
            {/* Left Sidebar */}
            <section className="min-h-[80vh] bg-white shadow-md lg:w-[360px] ">
                {loading ? (
                    <LoadingPage />
                ) : (
                    <div className="p-2 ">
                        {matchedSubCat?.map((subCat) => (
                            <div
                                key={subCat._id}
                                className="flex items-center gap-2 hover:bg-green-100 cursor-pointer p-2 border-b flex-col md:flex-row lg:flex-row"
                                onClick={() => displayProductHandler(subCat._id, subCat.name)}
                            >
                                <div>
                                <img
                                    src={subCat.image}
                                    alt={subCat.name}
                                    className="h-10 w-10 object-cover rounded"
                                />
                                </div>
                                <div className="text-sm text-gray-700 font-medium">{subCat.name}</div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Right Product Section */}
            <section className="w-[calc(100vw-100px)] md:w-[calc(100vw-300px)] lg:w-[calc(100vw-360px)] shrink-0">
                {/* Header */}
                <nav className="h-[7vh] shadow-lg flex items-center justify-between px-5 text-xl font-semibold bg-white">
                    {productNameToDisplay}
                </nav>

                {loading ? (
                    <LoadingPage />
                ) : (
                    <div className="flex flex-wrap gap-5 p-4">
                        {productsToDisplay?.map((pro) => (
                            <div
                                onClick={()=>navigate(`/product/${encodeURIComponent(pro?.name)}/${pro?._id}`)}
                                key={pro._id}
                                className="w-[220px] h-[300px] rounded-lg border border-gray-300 shadow-md p-3 flex flex-col justify-between bg-white hover:shadow-xl transition-shadow"
                            >
                                {/* Image */}
                                <div className="h-[40%] flex items-center justify-center mb-2">
                                    <img
                                        src={pro.image[0]}
                                        alt={pro.name}
                                        className="object-contain h-[90%] w-[90%]"
                                    />
                                </div>

                                {/* Discount and time */}
                                <div className="flex gap-2 mb-2">
                                    <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">
                                        10 min
                                    </span>
                                    <span className="bg-green-200 text-green-700 text-xs px-2 py-1 rounded">
                                        {pro.discount}% off
                                    </span>
                                </div>

                                {/* Product name */}
                                <div className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">
                                    {pro.name}
                                </div>

                                {/* Unit */}
                                <div className="text-sm text-gray-600 mb-2">{pro.unit} unit</div>

                                {/* Price and Add */}
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-black font-semibold">
                                        ₹{(pro.price - (pro.price * pro.discount) / 100).toFixed(2)}
                                    </span>
                                    <button onClick={(e)=>{e.stopPropagation()}} className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded">
                                        Add
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
};

export default CategoryDetails;
