const fetchWithAuth = async (url, method = "GET", options = {}) => {
  try {
    
    if (method === "PUT" || method === "POST") {
      options.headers = {
        ...options.headers,
        "Content-Type": "application/json",
      };
      options.body = JSON.stringify(options.body);
    }

    const res = await fetch(url, {
      method,
      ...options,
      credentials: "include", // sends cookies (for authentication)
    });

    const data = await res.json();

    // If token expired
    if (res.status === 401 && data.message === "Invalid! Access Token") {
      const refreshRes = await fetch("http://localhost:8080/api/user/update-access-token", {
        method: "POST",
        credentials: "include",
      });

      const refreshData = await refreshRes.json();

      if (refreshData.success) {
        const retryRes = await fetch(url, {
          method,
          ...options,
          credentials: "include",
        });
        return await retryRes.json();
      } else {
        throw new Error("Session expired. Please login again.");
      }
    }

    return data;

  } catch (error) {
    console.error("Error in fetchWithAuth:", error);
    throw error;
  }
};

export default fetchWithAuth;
