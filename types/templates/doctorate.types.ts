export interface IDoctorateFieldsForUser {
  id: string;
  name: string;
  code: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface IDoctorateCount {
  id: number;
  doctorate_dsc: number;
  doctorate_phd: number;
  researcher_dsc: number;
  researcher_phd: number;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface doctorateProps {
  allDDoctorateField: IDoctorateFieldsForUser[];
  allDoctorateCount: IDoctorateCount;
}
