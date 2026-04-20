import axios from "axios";

const OPENCAGE_KEY = "550c51a876a140cfb4a49fb6b08bac99";

const getCityValue = components =>
  components.city ||
  components.town ||
  components.village ||
  components.county ||
  components.state_district ||
  "";

const getLandmarkValue = components =>
  components.suburb ||
  components.neighbourhood ||
  components.hamlet ||
  components.road ||
  components.quarter ||
  components.city_district ||
  "";

const getAddressLineValue = components => {
  const addressParts = [
    components.house_number,
    components.building,
    components.road,
    components.residential,
    components.suburb,
    components.neighbourhood,
  ].filter(Boolean);

  return addressParts.join(", ");
};

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

export const reverseGeocodeDetails = async (lat, lng) => {
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

    const result = res.data.results[0];
    const components = result.components || {};
    const formatted = result.formatted || "";
    const pincode = components.postcode || "";
    const city = getCityValue(components);
    const landmark = getLandmarkValue(components);
    const addressLine = getAddressLineValue(components) || formatted;

    return {
      formatted,
      pincode,
      city,
      landmark,
      addressLine,
      components,
    };
  } catch (err) {
    console.log(" OpenCage detail error:", err.message);
    throw err;
  }
};
