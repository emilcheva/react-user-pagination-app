type Street = {
  number: number;
  name: string;
};

type Location = {
  street: Street;
  city: string;
  state: string;
  country: string;
};

type Name = {
  first: string;
  last: string;
};

type Picture = {
  large: string;
};

type Login = {
  uuid: string;
};

export type User = {
  login: Login;
  name: Name;
  picture: Picture;
  email: string;
  phone: string;
  location: Location;
};
