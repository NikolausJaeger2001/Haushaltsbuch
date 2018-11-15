// Booking Entry Class
export class BookingEntry {
  key: string;
  accountId: string;
  date: string;
  comment: string;
  amount: number;
  categories: string[];

  constructor (
    key: string,
    accountId: string,
    date: string,
    comment: string,
    amount: number,
    categories: string[]
  ) {
    this.key = key;
    this.accountId = accountId;
    this.date = date;
    this.comment = comment;
    this.amount = amount;
    this.categories = categories;
  };

  // this function returns true if a searchString is found in any String field of a booking entry
  public containsText(searchTerm: String) {
    let lowerSearchTerm = searchTerm.toLowerCase();
    return this.comment.toLowerCase().includes(lowerSearchTerm)
      || this.accountId.toLowerCase().includes(lowerSearchTerm)
      || this.date.toLowerCase().includes(lowerSearchTerm)
      || this.categories.filter(category => category.toLowerCase().includes(lowerSearchTerm)).length > 0;
  };
}
