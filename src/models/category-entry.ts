// Category Entry Class for the Categories of a Booking
export class CategoryEntry {
  key: string;
  name: string;

  constructor (
    key: string,
    name: string
  ) {
    this.key = key;
    this.name = name;
  };
}
