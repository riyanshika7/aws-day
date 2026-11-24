import QRCode from 'qrcode';

export async function generateQrDataUrl(
  text: string, 
  darkColor = '#232f3e', 
  lightColor = '#ffffff'
): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      width: 512,
      margin: 1,
      color: {
        dark: darkColor,
        light: lightColor
      },
      errorCorrectionLevel: 'H' // High error correction so logo pill or weather degradation won't break it
    });
  } catch (err) {
    console.error('Failed to generate QR Data URL:', err);
    return '';
  }
}

export async function generateQrSvgString(
  text: string,
  darkColor = '#232f3e',
  lightColor = '#ffffff'
): Promise<string> {
  try {
    return await QRCode.toString(text, {
      type: 'svg',
      margin: 1,
      color: {
        dark: darkColor,
        light: lightColor
      },
      errorCorrectionLevel: 'H'
    });
  } catch (err) {
    console.error('Failed to generate QR SVG:', err);
    return '';
  }
}
