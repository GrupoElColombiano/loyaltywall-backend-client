import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GeographyService {
  private readonly apiUrl = 'https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.json';

  async getAllDepartments() {
    const response = await axios.get(this.apiUrl);
    return response.data.map(dept => ({
      id: dept.id,
      departamento: dept.departamento
    }));
  }

  async getCitiesByDepartmentId(id: number) {
    const response = await axios.get(this.apiUrl);
    const department = response.data.find(dept => dept.id === id);
    return department ? department.ciudades : [];
  }
}
