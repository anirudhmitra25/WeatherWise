import axios from "axios";

const fetchWeatherData = async ({ query }: any) => {
  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
    params: {
      q: query,
      days: "10",
    },
    headers: {
      "X-RapidAPI-Key": "b0ac5ad231msh97507dca8b25241p119678jsned534a7765b1",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default fetchWeatherData;
