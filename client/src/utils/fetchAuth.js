

const fetchWithAuth = async (url, method = "GET", options = {}) => {
  const { isFormData = false, body } = options;

  try {
    const headers = { ...options.headers };

    // Automatically set Content-Type if needed
    if (
      ["POST", "PUT", "PATCH", "DELETE"].includes(method) &&
      !isFormData
    ) {
      headers["Content-Type"] = "application/json";
    }

    const reqBody = !isFormData && body ? JSON.stringify(body) : body;

    let res = await fetch(url, {
      method,
      headers,
      credentials: "include",
      body: reqBody,
    });

    let data = await res.json();

    // If token expired
    if (res.status === 401 && data.message === "Invalid! Access Token") {
      const refreshRes = await fetch("http://localhost:8080/api/user/update-access-token", {
        method: "POST",
        credentials: "include",
      });

      const refreshData = await refreshRes.json();

      if (refreshData.success) {
        const retryHeaders = { ...headers };
        const retryBody = reqBody;

        res = await fetch(url, {
          method,
          headers: retryHeaders,
          credentials: "include",
          body: retryBody,
        });

        return await res.json();
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
