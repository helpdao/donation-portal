export const requestApi = ({ url, method = "GET", headers = null, body = null }) => {
  const requestObject = {
    method,
    body,
    headers: {
      "Content-Type": "application/json",
      ...headers
    }
  };

  if (requestObject.headers["Content-Type"] === "application/json") {
    requestObject.body = JSON.stringify(body);
  }

  const api = process.env.API_URL || "http://localhost:3001/";

  if (!body) {
    delete requestObject["body"];
    delete requestObject["headers"]["Content-Type"];
  }

  const fetchRequest = async (resolve, reject) => {
    try {
      const response = await fetch(api.concat(url), requestObject);
      const result = await response.json();
      resolve(result);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  };

  return new Promise(fetchRequest);
};
