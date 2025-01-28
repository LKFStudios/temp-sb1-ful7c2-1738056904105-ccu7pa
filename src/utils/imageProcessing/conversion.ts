export async function convertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('画像の読み込みに失敗しました'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('画像の読み込みに失敗しました'));
    };

    // Use readAsArrayBuffer for better memory efficiency
    reader.readAsArrayBuffer(file);
  }).then((arrayBuffer) => {
    // Convert ArrayBuffer to Base64
    const bytes = new Uint8Array(arrayBuffer as ArrayBuffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return `data:${file.type};base64,${btoa(binary)}`;
  });
}