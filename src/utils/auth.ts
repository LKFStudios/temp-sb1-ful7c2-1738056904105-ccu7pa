export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
  return password.length >= 6;
}

export function getErrorMessage(error: any): string {
  if (error?.message) {
    switch (error.message) {
      case 'Email already in use':
        return 'このメールアドレスは既に使用されています';
      case 'Invalid email':
        return '無効なメールアドレスです';
      case 'Weak password':
        return 'パスワードは6文字以上にしてください';
      case 'User not found':
      case 'Invalid password':
        return 'メールアドレスまたはパスワードが間違っています';
      case 'Popup blocked':
        return 'ポップアップがブロックされました。ポップアップを許可してください。';
      case 'User disabled':
        return 'このアカウントは無効化されています';
      default:
        return error.message;
    }
  }
  return '予期せぬエラーが発生しました';
}