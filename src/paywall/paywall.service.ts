import { Injectable } from '@nestjs/common';

@Injectable()
export class PaywallService {
  defaultBody({ eventType, properties, source, target }) {
    return {
      source,
      events: [
        {
          eventType,
          scope: source?.scope,
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
          scope: source?.scope,
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

  async sendEvent({ requestOptions }) {
    return fetch(
      `${process.env.CDP_ENDPOINT}/context.json?sessionId=1234`,
      requestOptions,
    )
      .then((result) => {
        const response = result.json();
        return response;
      })
      .catch((error) => {
        console.log('❌ Error sending event ❌');
        console.error(error);
      });
  }

  async Login({ properties, source, target }) {
    const requestOptions = {
      method: 'POST',
      headers: this.configuredHeadersCDP(),
      body: JSON.stringify(
        this.defaultBody({
          eventType: 'login',
          properties: {
            email: properties?.email || '',
            firstName: properties?.given_name || '',
            lastName: properties?.family_name || '',
            identificacion: properties?.documentNumber || '',
            celular: properties?.phone_number || '',
          },
          source,
          target,
        }),
      ),
    };
    console.log('---> login request <---', JSON.stringify(requestOptions));
    return this.sendEvent({ requestOptions });
  }

  async RedemptionOfPoints({ properties, source, target }) {
    const requestOptions = {
      method: 'POST',
      headers: this.configuredHeadersCDP(),
      body: JSON.stringify(
        this.payloadEventMapper({
          eventType: 'LWPuntos',
          properties,
          source,
          target,
        }),
      ),
    };
    return this.sendEvent({ requestOptions });
  }

  async PlanBuy({ properties, source, target }) {
    const requestOptions = {
      method: 'POST',
      headers: this.configuredHeadersCDP(),
      body: JSON.stringify(
        this.payloadEventMapper({
          eventType: 'LWPlan',
          properties,
          source,
          target,
        }),
      ),
    };
    const CDPResponse = await this.sendEvent({ requestOptions });
    console.log(
      '🚀 ~ PaywallService ~ PlanBuy ~ requestOptions:',
      JSON.stringify(requestOptions),
    );
    return CDPResponse;
  }

  async SocialMedia({ properties, source, target }) {
    const requestOptions = {
      method: 'POST',
      headers: this.configuredHeadersCDP(),
      body: JSON.stringify(
        this.defaultBody({
          eventType: 'LWRedesSociales',
          properties,
          source,
          target,
        }),
      ),
    };
    return this.sendEvent({ requestOptions });
  }

  async MarketplaceBuy({ properties, source, target }) {
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
    const CDPResponse = await this.sendEvent({ requestOptions });
    return CDPResponse;
  }

  async GamificationLevel({ properties, source, target }) {
    const requestOptions = {
      method: 'POST',
      headers: this.configuredHeadersCDP(),
      body: JSON.stringify(
        this.defaultBody({
          eventType: 'LWGamificacion',
          properties,
          source,
          target,
        }),
      ),
    };
    return this.sendEvent({ requestOptions });
  }
}
