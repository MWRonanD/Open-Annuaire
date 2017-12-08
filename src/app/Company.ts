export class Company {
  id: number;
  siren: string;
  names?: {
    best: string;
    denomination: string;
    commercial_name: string;
    sigle: string;
    first_name: string;
    last_name: string
  };
  legal_form?: string;
  address?: string;
  postal_code?: string;
  city?: string;
  vat_number?: string;
  capital?: number;
  administration?: string;
  activity?: string;
  radie?: boolean;
  last_legal_update?: Date;
  established_on?: Date;
}
