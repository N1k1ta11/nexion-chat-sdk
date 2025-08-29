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
exports.createStripeCustomer = void 0;
// Простая функция без импортов
const createStripeCustomer = (email, apiKey, plan) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Эта функция будет вызываться с сервера, поэтому Stripe не нужен здесь
        // Для клиентской библиотеки мы просто оставляем заглушку
        console.log('Creating customer for:', email, plan);
        return 'cus_' + Math.random().toString(36).substr(2, 9);
    }
    catch (error) {
        console.error('Error creating Stripe customer:', error);
        throw error;
    }
});
exports.createStripeCustomer = createStripeCustomer;
