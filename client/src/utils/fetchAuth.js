const fetchWithAuth = async (url, method = "GET", options = {}) => {
  const { isFormData = false } = options;

  try {
    const headers = { ...options.headers };

    if ((method === "PUT" || method === "POST") && !isFormData) {
      headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(options.body);
    }

    const res = await fetch(url, {
      method,
      ...options,
      headers,
      credentials: "include",
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
        const retryHeaders = { ...headers };
        let retryBody = options.body;

        if (!isFormData && typeof retryBody === "string") {
          retryBody = JSON.parse(retryBody); // convert back before re-JSONing
          retryBody = JSON.stringify(retryBody);
        }

        const retryRes = await fetch(url, {
          method,
          ...options,
          headers: retryHeaders,
          credentials: "include",
          body: retryBody,
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
