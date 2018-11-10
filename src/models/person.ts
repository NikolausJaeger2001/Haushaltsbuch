export class Person {
  id: string;
  name: string;
  birthday: string;
  amount: number;
  pictureUrl: string;

  constructor (
    id: string,
    name: string,
    birthday: string,
    amount: number,
    pictureUrl: string
  ) {
    this.id = id;
    this.name = name;
    this.birthday = birthday;
    this.amount = amount;
    this.pictureUrl = pictureUrl;
  };
}
