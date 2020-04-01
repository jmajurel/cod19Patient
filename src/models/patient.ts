export default class Patient {
  _id: object;
  age: number;
  gender: Gender;
  travel: boolean;
  symptoms: string[];
  conditions: string[];

  constructor({
    age,
    gender,
    travel,
    symptoms,
    conditions
  }: {
    age: number;
    gender: Gender;
    travel: boolean;
    symptoms: string[];
    conditions: string[];
  }) {
    this.age = age;
    this.gender = gender;
    this.travel = travel;
    this.symptoms = symptoms;
    this.conditions = conditions;
  }
}

enum Gender {
  male = 1,
  female = 2,
  other = 3
}
