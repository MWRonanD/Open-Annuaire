export class Filters {
  depet?: Filter;
  sigle?: Filter;
  codpos?: Filter;
  siret?: Filter;
  apet700?: Filter;
  categorie?: Filter;
  address?: Filter;
  libcom?: Filter;
  dcret?: Filter;
  libtefen?: Filter;
  libreg_new?: Filter;
}

export class Filter {
  data?: string;
  nhits?: number;
  isLoaging? = true;
}




