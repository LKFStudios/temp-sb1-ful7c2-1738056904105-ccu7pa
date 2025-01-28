import html2canvas from 'html2canvas';

export async function captureElement(elementId: string): Promise<string> {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    // Add temporary styles for better capture
    const originalStyles = element.style.cssText;
    element.style.cssText = `
      ${originalStyles}
      background-color: white !important;
      padding: 20px !important;
      border-radius: 0 !important;
    `;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: element.offsetWidth,
      height: element.offsetHeight,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          clonedElement.style.transform = 'none';
          clonedElement.style.borderRadius = '0';
        }
      }
    });

    // Restore original styles
    element.style.cssText = originalStyles;

    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Failed to capture element:', error);
    throw new Error('画像の生成に失敗しました');
  }
}

export async function shareResult(platform: string, text: string, url: string, imageData?: string): Promise<void> {
  try {
    switch (platform) {
      case 'instagram': {
        if (!imageData) {
          throw new Error('画像データがありません');
        }

        // For Instagram, we need to save the image first
        const blob = await (await fetch(imageData)).blob();
        const file = new File([blob], 'bijumax-result.png', { type: 'image/png' });

        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
          // Use Web Share API if available and can share files
          await navigator.share({
            files: [file],
            title: 'ビジュマックス分析結果',
            text: text
          });
        } else {
          // Fallback to manual download
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'bijumax-result.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(link.href);
          
          // Show instructions for Instagram sharing
          alert('画像を保存しました。Instagramストーリーズで共有してください。\n\n1. Instagramアプリを開く\n2. ストーリーズを選択\n3. 保存した画像を選択\n4. シェアを押す');
        }
        break;
      }

      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;

      case 'line':
        window.open(
          `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
          '_blank'
        );
        break;

      case 'native':
        if (navigator.share && imageData) {
          const blob = await (await fetch(imageData)).blob();
          const file = new File([blob], 'bijumax-result.png', { type: 'image/png' });
          
          await navigator.share({
            title: 'ビジュマックス分析結果',
            text,
            url,
            files: [file]
          });
        } else if (navigator.share) {
          await navigator.share({
            title: 'ビジュマックス分析結果',
            text,
            url
          });
        }
        break;

      default:
        throw new Error('未対応のシェア方法です');
    }
  } catch (error) {
    console.error('Share failed:', error);
    throw error;
  }
}