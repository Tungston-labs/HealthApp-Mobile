import { Linking, Platform } from 'react-native';

export const openMapByAddress = async address => {
  if (!address) return;

  const encodedAddress = encodeURIComponent(address);

  try {
    if (Platform.OS === 'ios') {
      // Apple Maps
      await Linking.openURL(`http://maps.apple.com/?q=${encodedAddress}`);
    } else {
      // Google Maps app 
      const googleMapsUrl = `comgooglemaps://?q=${encodedAddress}`;
      const webFallback = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

      const supported = await Linking.canOpenURL(googleMapsUrl);

      await Linking.openURL(supported ? googleMapsUrl : webFallback);
    }
  } catch (err) {
    // fallback (browser)
    await Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
    );
  }
};
