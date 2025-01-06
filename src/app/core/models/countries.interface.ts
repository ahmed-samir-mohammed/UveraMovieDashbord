export interface Countries {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}

export interface CountriesState {
  countries: Countries[];
  loading: boolean;
  error: string | null;
}
