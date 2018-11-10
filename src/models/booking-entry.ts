export class BookingEntry {
  id: string;
  accountId: string;
  date: string;
  comment: string;
  amount: number;
  categories: any[];

  constructor (
    id: string,
    accountId: string,
    date: string,
    comment: string,
    amount: number,
    categories: any[]
  ) {
    this.id = id;
    this.accountId = accountId;
    this.date = date;
    this.comment = comment;
    this.amount = amount;
    this.categories = categories;
  };
}
