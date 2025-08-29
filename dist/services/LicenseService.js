"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Простой класс без внешних зависимостей
class LicenseService {
    constructor() {
        this.apiKey = null;
    }
    validateLicense(apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const SUPABASE_URL = 'https://uclcwbxhyowulqymkgon.supabase.co';
            const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjbGN3YnhoeW93dWxxeW1rZ29uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0ODIzMzEsImV4cCI6MjA3MjA1ODMzMX0.5ICX7Ocv8E-PKz4d0vDhwNlBkqtSwM0TJC7ED1rzjwI';
            try {
                const response = yield fetch(`${SUPABASE_URL}/rest/v1/licenses?api_key=eq.${apiKey}&select=*`, {
                    headers: {
                        'apikey': SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
                    }
                });
                const licenseData = yield response.json();
                const data = licenseData[0];
                if (!data || !data.is_active) {
                    return { plan: 'invalid', features: [], is_active: false };
                }
                return {
                    plan: data.plan,
                    features: data.features || [],
                    is_active: data.is_active
                };
            }
            catch (error) {
                console.error('License validation error:', error);
                return { plan: 'invalid', features: [], is_active: false };
            }
        });
    }
    setApiKey(key) {
        this.apiKey = key;
    }
    getCurrentPlan() {
        return this.apiKey;
    }
}
exports.default = new LicenseService();
