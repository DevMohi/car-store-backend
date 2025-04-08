export type TUser = {
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'admin';
  image?: string;
  phone: string;
  address: string;
  city: string;
  status: 'active' | 'deactive'; //will be handled by admin
};

//need to add things over here
