export interface UserInterface {
  id: string;
  name: string;
  role: string;
  login: string;
  adverts: [{
    id: string,
    name: string,
    location: string,
    createdAt: string,
    isActive: true,
    imagesIds: [],
    cost: number
  }];
  registeredTime: string
}
