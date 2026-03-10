export interface ManufacturerResponse {
  Count: number;
  Message: string;
  SearchCriteria: any;
  Results: Manufacturer[];
}

export interface Manufacturer {
  Country: string;
  Mfr_CommonName?: string;
  Mfr_ID: number;
  Mfr_Name: string;
  VehicleTypes: VehicleType[];
}

export interface ManufacturerDetailResponse {
  Count: number;
  Message: string;
  SearchCriteria: any;
  Results: ManufacturerDetail[];
}

export interface ManufacturerDetail {
  Address: string;
  Address2: any;
  City: string;
  ContactEmail: string;
  ContactFax: any;
  ContactPhone: string;
  Country: string;
  DBAs: string;
  EquipmentItems: any[];
  LastUpdated: string;
  ManufacturerTypes: ManufacturerType[];
  Mfr_CommonName: string;
  Mfr_ID: number;
  Mfr_Name: string;
  OtherManufacturerDetails: any;
  PostalCode: string;
  PrimaryProduct: any;
  PrincipalFirstName: string;
  PrincipalLastName: any;
  PrincipalPosition: string;
  StateProvince: string;
  SubmittedName: string;
  SubmittedOn: string;
  SubmittedPosition: string;
  VehicleTypes: VehicleType[];
}

export interface ManufacturerType {
  Name: string;
}

export interface VehicleType {
  GVWRFrom?: string;
  GVWRTo?: string;
  IsPrimary: boolean;
  Name: string;
}

export interface ModelDetailResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: ModelDetail[];
}

export interface ModelDetail {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

