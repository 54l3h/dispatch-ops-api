export class CreateServiceDto {
  name: string; // service name

  description: string; // service description

  basePrice: number;

  isActive: boolean;

  // get the company id?
  companyId: string;
}
