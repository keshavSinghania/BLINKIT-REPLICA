
//function to fetch data from database based on category id
export const fetchProductsBySubCategoryId = async (_id) => {
    try {
      const url = `${import.meta.env.VITE_FETCH_BASE_URL}sub-category/get-product-by-subCategoryId`;
      console.log(_id,"yeah")
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: _id
            })
        });

        const finalData = await response.json();
        return finalData
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

