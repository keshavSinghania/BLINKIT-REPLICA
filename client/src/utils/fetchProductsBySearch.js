export const fetchProductsBySearch = async (search, page, limit) => {
    try {
        const url = `${import.meta.env.VITE_FETCH_BASE_URL}product/search-products`;
        console.log(page)
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                search: search || null,
                page: page,
                limit: limit
            })
        })
        // console.log(response.data,"res")
        const finalData = await response.json();
        return finalData;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}