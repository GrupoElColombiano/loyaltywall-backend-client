import { Injectable } from '@nestjs/common';
import { RegisterlogService } from '../registerlog/registerlog.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class PaywallService {
  private readonly registerlogService: RegisterlogService;
  defaultBody({ eventType, source, target }) {
    console.log("🚀 ~ PaywallService ~ defaultBody ~ target:", target);
    return {
      source,
      events: [
        {
          eventType,
          scope: source?.scope,
          // source,
          target,
          // properties,
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

  async sendEvent({ requestOptions, sessionId }) {
    console.log("🚀 ~ PaywallService ~ sendEvent ~ requestOptions:", requestOptions)
    const url = `${process.env.CDP_ENDPOINT}/context.json?sessionId=${sessionId}`;
    const fetchRequest = await fetch(url, requestOptions);
    const response = await fetchRequest.json();
    console.log("🚀 ~ PaywallService ~ sendEvent ~ response:", response)
    return response;
  }

  async Login({ properties, source, target }) {
    console.log("🚀 ~ PaywallService ~ Login ~ properties:", properties);
    const sessionId = Date.now();

    function calculateAge(birthDate) {
      const [day, month, year] = birthDate.split("/").map(Number);
  
      const birthDateObj = new Date(year, month - 1, day);

      const currentDate = new Date();
  
      let age = currentDate.getFullYear() - birthDateObj.getFullYear();
  
      const currentMonth = currentDate.getMonth();
      const currentDay = currentDate.getDate();
      if (currentMonth < month - 1 || (currentMonth === month - 1 && currentDay < day)) {
          age--;
      }
  
      return age;
  }
  
  // Example usage
  console.log(calculateAge("03/02/1997")); // Prints the age based on the birth date
    const requestOptions = {
      method: 'POST',
      headers: this.configuredHeadersCDP(),
      body: JSON.stringify(
        this.defaultBody({
          eventType: 'login',
          source: {
            ...source,
            scope: "eluniversal.com.co"
          },
          target: {
          ...target,
          itemId: sessionId,
          scope: "eluniversal.com.co",
          properties: {
            email: properties?.preferred_username || '',
            firstName: properties?.given_name || '',
            lastName: properties?.family_name || '',
            identificacion: properties?.documentNumber || '',
            celular: properties?.phone_number || '',
            sexo: properties?.gender || '',
            edad: calculateAge(properties?.birthdate) || '',
          }
        },
        }),
      ),
      
    };
    const response = await this.sendEvent({ requestOptions, sessionId });
    console.log("🚀 ~ PaywallService ~ Login ~ response:", response)
    // const registerlogDto = {
    //   id: null,
    //   userId: null, 
    //   roleId: null,
    //   activityType: "Login",
    //   description: "User logged in successfully.",
    //   affectedObject: "User",
    //   success: true,
    //   ipAddress: null,
    //   userAgent: null,
    //   timestamp: new Date()
    // };
    // console.log('---> login request <---', JSON.stringify(requestOptions));
    // this.registerlogService.create(registerlogDto);
    
    return response;
  }

  async RedemptionOfPoints({ properties, source, target }) {
    const sessionId = Date.now();
    const payload = this.payloadEventMapper({
      eventType: 'LWPuntos',
      properties,
      source,
      target,
    })

    const requestOptions = {
      method: 'POST',
      headers: this.configuredHeadersCDP(),
      body: JSON.stringify(payload)
    };
    return this.sendEvent({ requestOptions, sessionId });
  }

  async PlanBuy({ properties, source, target }) {
    const sessionId = Date.now();
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
    const CDPResponse = await this.sendEvent({ requestOptions, sessionId });
    console.log(
      '🚀 ~ PaywallService ~ PlanBuy ~ requestOptions:',
      JSON.stringify(requestOptions),
    );
    return CDPResponse;
  }

  async SocialMedia({ properties, source, target }) {
    const sessionId = Date.now();
    const requestOptions = {
      method: 'POST',
      headers: this.configuredHeadersCDP(),
      body: JSON.stringify(
        this.defaultBody({
          eventType: 'LWRedesSociales',
          // properties,
          source,
          target,
        }),
      ),
    };
    return this.sendEvent({ requestOptions, sessionId });
  }

  async MarketplaceBuy({ properties, source, target }) {
    const sessionId = Date.now();
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
    const CDPResponse = await this.sendEvent({ requestOptions, sessionId });
    return CDPResponse;
  }

  async GamificationLevel({ properties, source, target }) {
    const sessionId = Date.now();
    const requestOptions = {
      method: 'POST',
      headers: this.configuredHeadersCDP(),
      body: JSON.stringify(
        this.defaultBody({
          eventType: 'LWGamificacion',
          // properties,
          source,
          target,
        }),
      ),
    };
    return this.sendEvent({ requestOptions, sessionId });
  }
}
