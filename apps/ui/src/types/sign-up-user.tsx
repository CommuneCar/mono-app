export type SignUpUser = {
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
    gander: Gander;
};

export type Gander = 'Female' | 'Male' | 'Other';