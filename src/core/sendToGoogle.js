import { FileSystem } from 'expo';
import { get } from 'lodash';

const GOOGLE_VISION_API = '';

export const submitToGoogle = async photo => {
  try {
    const base64 = await FileSystem.readAsStringAsync(photo.uri, { encoding: 'base64' });
    const response = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API}`,
      {
        method: 'POST',
        body: JSON.stringify({
          requests: [
            {
              image: { content: base64 },
              features: [{ type: 'LABEL_DETECTION', maxResults: 10 }],
            },
          ],
        }),
      }
    );
    const responseJson = await response.json();
    console.log('responseJson', responseJson);

    return get(responseJson, 'responses[0].labelAnnotations', []).map(({ description }) => description);
  } catch (error) {
    console.error(error);
    return [];
  }
};
