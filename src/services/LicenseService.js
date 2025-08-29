class LicenseService {
  constructor() {
    this.apiKey = null;
  }

  async validateLicense(apiKey) {
    // Заглушка - всегда возвращает успех
    return {
      plan: 'starter',
      features: ['basic_chat'],
      is_active: true
    };
  }

  setApiKey(key) {
    this.apiKey = key;
  }

  getCurrentPlan() {
    return this.apiKey;
  }
}

export default new LicenseService();