export class TranslationUtil {
  static getDefaultLanguage() {
    return localStorage.getItem('language') || 'en';
  }
}
