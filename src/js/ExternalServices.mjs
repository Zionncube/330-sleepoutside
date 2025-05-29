// Converts the response to JSON and handles errors
async function convertToJson(res) {
    const jsonResponse = await res.json(); // Parse the response body as JSON
    if (res.ok) {
      return jsonResponse; // If response is OK, return the parsed JSON
    } else {
      // If response is not OK, throw an error with detailed message
      throw { name: 'servicesError', message: jsonResponse };
    }
  }
  
const jsonResponse = await response.json();
throw { name: 'servicesError', message: jsonResponse };
  