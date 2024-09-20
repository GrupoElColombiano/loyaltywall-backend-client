"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.PaywallService = void 0;
const common_1 = require("@nestjs/common");
let PaywallService = exports.PaywallService = class PaywallService {
    defaultBody({ eventType, properties, source, target }) {
        return {
            source,
            events: [
                {
                    eventType,
                    scope: source === null || source === void 0 ? void 0 : source.scope,
                    source,
                    target,
                    properties,
                },
            ],
        };
    }
    payloadEventMapper({ eventType, properties, source, target }) {
        return {
            source,
            events: [
                {
                    eventType,
                    scope: source === null || source === void 0 ? void 0 : source.scope,
                    source,
                    target,
                    properties,
                },
            ],
        };
    }
    configuredHeadersCDP() {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('X-Unomi-Peer', process.env.CDP_UNOMI_PEER);
        return myHeaders;
    }
    sendEvent({ requestOptions }) {
        return __awaiter(this, void 0, void 0, function* () {
            return fetch(`${process.env.CDP_ENDPOINT}/context.json?sessionId=1234`, requestOptions)
                .then((result) => {
                const response = result.json();
                return response;
            })
                .catch((error) => {
                console.log('❌ Error sending event ❌');
                console.error(error);
            });
        });
    }
    Login({ properties, source, target }) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestOptions = {
                method: 'POST',
                headers: this.configuredHeadersCDP(),
                body: JSON.stringify(this.defaultBody({
                    eventType: 'login',
                    properties: {
                        email: (properties === null || properties === void 0 ? void 0 : properties.email) || '',
                        firstName: (properties === null || properties === void 0 ? void 0 : properties.given_name) || '',
                        lastName: (properties === null || properties === void 0 ? void 0 : properties.family_name) || '',
                        identificacion: (properties === null || properties === void 0 ? void 0 : properties.documentNumber) || '',
                        celular: (properties === null || properties === void 0 ? void 0 : properties.phone_number) || '',
                    },
                    source,
                    target,
                })),
            };
            console.log('---> login request <---', JSON.stringify(requestOptions));
            return this.sendEvent({ requestOptions });
        });
    }
    RedemptionOfPoints({ properties, source, target }) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestOptions = {
                method: 'POST',
                headers: this.configuredHeadersCDP(),
                body: JSON.stringify(this.payloadEventMapper({
                    eventType: 'LWPuntos',
                    properties,
                    source,
                    target,
                })),
            };
            return this.sendEvent({ requestOptions });
        });
    }
    PlanBuy({ properties, source, target }) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestOptions = {
                method: 'POST',
                headers: this.configuredHeadersCDP(),
                body: JSON.stringify(this.payloadEventMapper({
                    eventType: 'LWPlan',
                    properties,
                    source,
                    target,
                })),
            };
            const CDPResponse = yield this.sendEvent({ requestOptions });
            console.log('🚀 ~ PaywallService ~ PlanBuy ~ requestOptions:', JSON.stringify(requestOptions));
            return CDPResponse;
        });
    }
    SocialMedia({ properties, source, target }) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestOptions = {
                method: 'POST',
                headers: this.configuredHeadersCDP(),
                body: JSON.stringify(this.defaultBody({
                    eventType: 'LWRedesSociales',
                    properties,
                    source,
                    target,
                })),
            };
            return this.sendEvent({ requestOptions });
        });
    }
    MarketplaceBuy({ properties, source, target }) {
        return __awaiter(this, void 0, void 0, function* () {
            const bodyBuildered = this.payloadEventMapper({
                eventType: 'LWMarketPlace',
                properties,
                source,
                target,
            });
            const requestOptions = {
                method: 'POST',
                headers: this.configuredHeadersCDP(),
                body: JSON.stringify(bodyBuildered),
            };
            const CDPResponse = yield this.sendEvent({ requestOptions });
            return CDPResponse;
        });
    }
    GamificationLevel({ properties, source, target }) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestOptions = {
                method: 'POST',
                headers: this.configuredHeadersCDP(),
                body: JSON.stringify(this.defaultBody({
                    eventType: 'LWGamificacion',
                    properties,
                    source,
                    target,
                })),
            };
            return this.sendEvent({ requestOptions });
        });
    }
};
exports.PaywallService = PaywallService = __decorate([
    (0, common_1.Injectable)()
], PaywallService);
//# sourceMappingURL=paywall.service.js.map