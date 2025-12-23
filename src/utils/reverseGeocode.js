import axios from "axios";

const OPENCAGE_KEY = "550c51a876a140cfb4a49fb6b08bac99";

export const reverseGeocode = async (lat, lng) => {
  try {
    const res = await axios.get(
      "https://api.opencagedata.com/geocode/v1/json",
      {
        params: {
          q: `${lat},${lng}`,
          key: OPENCAGE_KEY,
          language: "en",
          pretty: 1,
        },
      }
    );

    if (res.data.results.length === 0) {
      throw new Error("No address found");
    }

    return res.data.results[0].formatted;
  } catch (err) {
    console.log(" OpenCage error:", err.message);
    throw err;
  }
};
