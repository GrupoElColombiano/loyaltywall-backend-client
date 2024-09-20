export declare class PaywallService {
    defaultBody({ eventType, properties, source, target }: {
        eventType: any;
        properties: any;
        source: any;
        target: any;
    }): {
        source: any;
        events: {
            eventType: any;
            scope: any;
            source: any;
            target: any;
            properties: any;
        }[];
    };
    payloadEventMapper({ eventType, properties, source, target }: {
        eventType: any;
        properties: any;
        source: any;
        target: any;
    }): {
        source: any;
        events: {
            eventType: any;
            scope: any;
            source: any;
            target: any;
            properties: any;
        }[];
    };
    configuredHeadersCDP(): Headers;
    sendEvent({ requestOptions }: {
        requestOptions: any;
    }): Promise<any>;
    Login({ properties, source, target }: {
        properties: any;
        source: any;
        target: any;
    }): Promise<any>;
    RedemptionOfPoints({ properties, source, target }: {
        properties: any;
        source: any;
        target: any;
    }): Promise<any>;
    PlanBuy({ properties, source, target }: {
        properties: any;
        source: any;
        target: any;
    }): Promise<any>;
    SocialMedia({ properties, source, target }: {
        properties: any;
        source: any;
        target: any;
    }): Promise<any>;
    MarketplaceBuy({ properties, source, target }: {
        properties: any;
        source: any;
        target: any;
    }): Promise<any>;
    GamificationLevel({ properties, source, target }: {
        properties: any;
        source: any;
        target: any;
    }): Promise<any>;
}
