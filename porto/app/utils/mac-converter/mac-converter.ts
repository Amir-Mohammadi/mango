export const convertApSSIDtoStationBSSID = (bssid: string): string => {
  const bssid2 = bssid.split(':').join('');
  const apMacFirstTwoLetterString = bssid2.slice(0, 2);
  const apMacFirstTwoLetter = parseInt(apMacFirstTwoLetterString, 16);

  let apMacTemp = apMacFirstTwoLetter & 0x7;
  if (apMacTemp === 0) {
    apMacTemp = 0x2;
  } else if (apMacTemp === 2) {
    apMacTemp = 0x6;
  } else if (apMacTemp === 4) {
    apMacTemp = 0x6;
  } else {
    apMacTemp = 0x2;
  }

  const stationMacFirstTwoLetter = (
    (apMacFirstTwoLetter & 0xf8) |
    apMacTemp
  ).toString(16);

  const result = stationMacFirstTwoLetter + bssid2.slice(2);

  return formatMacAddress(result);
};

export const formatMacAddress = (macAddress: string): string => {
  const divisionChar = ':';
  return macAddress
    .replace(/(.{2})/g, '$1' + divisionChar)
    .substring(0, 17)
    .toUpperCase();
};
