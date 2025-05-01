export const fetchProducts = async (page, limit, search) => {
    try {
        const url = `${import.meta.env.VITE_FETCH_BASE_URL}product/get-products`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                page: page,
                limit: limit || 12,
                search: search || ""
            })
        });

        const finalData = await response.json();

        // console.log("finalData", finalData);
        return finalData
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

