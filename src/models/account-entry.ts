// Account Entry Class for the different Accounts
export class AccountEntry {
  key: string;
  name: string;
  description: string;

  constructor (
    key: string,
    name: string,
    description: string
  ) {
    this.key = key;
    this.name = name;
    this.description = description;
  };
}
