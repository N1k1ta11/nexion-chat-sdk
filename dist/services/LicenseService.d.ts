declare class LicenseService {
    private apiKey;
    validateLicense(apiKey: string): Promise<{
        plan: string;
        features: string[];
        is_active: boolean;
    }>;
    setApiKey(key: string): void;
    getCurrentPlan(): string;
}
declare const _default: LicenseService;
export default _default;
