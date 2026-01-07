import { Linking, Platform } from 'react-native';

export const openMapByAddress = address => {
  if (!address) return;

  const encodedAddress = encodeURIComponent(address);

  const primaryUrl =
    Platform.OS === 'ios'
      ? `http://maps.apple.com/?q=${encodedAddress}`
      : `geo:0,0?q=${encodedAddress}`;

  Linking.openURL(primaryUrl).catch(() => {
    // Fallback (especially for Android)
    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
    );
  });
};
