export type SignUpUser = {
  firstName: string;
  LastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  gander: Gander;
  age?: number;
  //TODO: profileImage
};

export type Gander = 'Female' | 'Male' | 'Other';
