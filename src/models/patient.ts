export default class Patient {
  _id: object;
  age: number;
  gender: Gender;
  travel: boolean;
  symptoms: object[];
  conditions: object[];
}

enum Gender {
  male = 1,
  female = 2,
  other = 3
}
