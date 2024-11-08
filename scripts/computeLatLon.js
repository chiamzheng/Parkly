export default function computeLatLon(N, E) {
  // WGS84 Datum
  const a = 6378137;
  const f = 1 / 298.257223563;

  // SVY21 Projection origin
  const oLat = 1.366666;  // origin's lat in degrees
  const oLon = 103.833333; // origin's lon in degrees
  const oN = 38744.572;  // false Northing
  const oE = 28001.642;  // false Easting
  const k = 1;  // scale factor

  const b = a * (1 - f);
  const e2 = (2 * f) - (f * f);
  const e4 = e2 * e2;
  const e6 = e4 * e2;
  const A0 = 1 - (e2 / 4) - (3 * e4 / 64) - (5 * e6 / 256);
  const A2 = (3. / 8.) * (e2 + (e4 / 4) + (15 * e6 / 128));
  const A4 = (15. / 256.) * (e4 + (3 * e6 / 4));
  const A6 = 35 * e6 / 3072;

  const calcM = (lat) => {
      const latR = lat * Math.PI / 180;
      return a * ((A0 * latR) - (A2 * Math.sin(2 * latR)) + (A4 * Math.sin(4 * latR)) - (A6 * Math.sin(6 * latR)));
  };

  const calcRho = (sin2Lat) => {
      const num = a * (1 - e2);
      const denom = Math.pow(1 - e2 * sin2Lat, 3. / 2.);
      return num / denom;
  };

  const calcV = (sin2Lat) => {
      const poly = 1 - e2 * sin2Lat;
      return a / Math.sqrt(poly);
  };

  const Nprime = N - oN;
  const Mo = calcM(oLat);
  const Mprime = Mo + (Nprime / k);

  const n = (a - b) / (a + b);
  const n2 = n * n;
  const n3 = n2 * n;
  const n4 = n2 * n2;

  const G = a * (1 - n) * (1 - n2) * (1 + (9 * n2 / 4) + (225 * n4 / 64)) * (Math.PI / 180);
  const sigma = (Mprime * Math.PI) / (180. * G);

  let latPrime = sigma + ((3 * n / 2) - (27 * n3 / 32)) * Math.sin(2 * sigma) +
      ((21 * n2 / 16) - (55 * n4 / 32)) * Math.sin(4 * sigma) +
      (151 * n3 / 96) * Math.sin(6 * sigma) +
      (1097 * n4 / 512) * Math.sin(8 * sigma);

  const sinLatPrime = Math.sin(latPrime);
  const sin2LatPrime = sinLatPrime * sinLatPrime;

  const rhoPrime = calcRho(sin2LatPrime);
  const vPrime = calcV(sin2LatPrime);
  const psiPrime = vPrime / rhoPrime;
  const tPrime = Math.tan(latPrime);

  const Eprime = E - oE;
  const x = Eprime / (k * vPrime);
  const x2 = x * x;
  const x3 = x2 * x;
  const x5 = x3 * x2;
  const x7 = x5 * x2;

  const latFactor = tPrime / (k * rhoPrime);
  const latTerm1 = latFactor * ((Eprime * x) / 2);
  const latTerm2 = latFactor * ((Eprime * x3) / 24) * ((-4 * psiPrime * psiPrime) + (9 * psiPrime) * (1 - tPrime * tPrime) + (12 * tPrime * tPrime));
  const latTerm3 = latFactor * ((Eprime * x5) / 720) * ((8 * psiPrime * psiPrime * psiPrime * psiPrime) * (11 - 24 * tPrime * tPrime) -
      (12 * psiPrime * psiPrime * psiPrime) * (21 - 71 * tPrime * tPrime) +
      (15 * psiPrime * psiPrime) * (15 - 98 * tPrime * tPrime + 15 * tPrime * tPrime * tPrime) +
      (180 * psiPrime) * (5 * tPrime * tPrime - 3 * tPrime * tPrime * tPrime) +
      360 * tPrime * tPrime);
  const latTerm4 = latFactor * ((Eprime * x7) / 40320) * (1385 - 3633 * tPrime * tPrime + 4095 * tPrime * tPrime * tPrime + 1575 * tPrime * tPrime * tPrime * tPrime);

  latPrime = latPrime - latTerm1 + latTerm2 - latTerm3 + latTerm4;

  let lonTerm1 = x * (1 / Math.cos(latPrime));
  let lonTerm2 = (x3 / 6) * (1 / Math.cos(latPrime)) * (psiPrime + 2 * tPrime * tPrime);
  let lonTerm3 = (x5 / 120) * (1 / Math.cos(latPrime)) * ((-4 * psiPrime * psiPrime * psiPrime) * (1 - 6 * tPrime * tPrime) +
      psiPrime * psiPrime * (9 - 68 * tPrime * tPrime) + 72 * psiPrime * tPrime * tPrime + 24 * tPrime * tPrime * tPrime);
  let lonTerm4 = (x7 / 5040) * (1 / Math.cos(latPrime)) * (61 + 662 * tPrime * tPrime + 1320 * tPrime * tPrime * tPrime + 720 * tPrime * tPrime * tPrime * tPrime);

  const lonPrime = (oLon * Math.PI / 180) + lonTerm1 - lonTerm2 + lonTerm3 - lonTerm4;

  return { lat: latPrime / (Math.PI / 180), lon: lonPrime / (Math.PI / 180) };
}
