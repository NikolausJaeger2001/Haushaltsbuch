import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryProvider} from "../../providers/category/category";
import {CategoryEntry} from "../../models/category-entry";
import {CategoryDetailPage} from "../category-detail/category-detail";

@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})

// Category List and Insert Page Class
export class CategoryPage {
  public categoryForm: FormGroup;
  public categoryListFull: CategoryEntry[];
  public categoryList: CategoryEntry[];
  searchTerm : any ="";

  constructor(
    public navCtrl: NavController,
    public categoryProvider: CategoryProvider,
    formBuilder: FormBuilder
  ) {
    //declare Input Form and Validators
    this.categoryForm = formBuilder.group({
      categoryName: [
        '',
        Validators.compose([Validators.required])
      ]
    });
  }

  // Call read Data from Database after Inoic is ready
  ionViewDidLoad() {
    this.getCategoryList();
  }

  //open details page of selected category
  goToCategoryDetails(category: CategoryEntry) {
    this.navCtrl.push(CategoryDetailPage, category);
  }

  //apply filter to list
  setFilteredItems() {
    if(this.searchTerm.length > 0) {
      this.categoryList = this.categoryListFull
        .filter(item =>item.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    } else {
      this.categoryList = this.categoryListFull;
    }
  }

  // get Category List from Database Provider
  getCategoryList() {
    this.categoryProvider.getCategoryList().on("value", categoryListSnapshot => {
      this.categoryListFull = [];
      categoryListSnapshot.forEach(cs => {
        this.categoryListFull.push(
          new CategoryEntry(
            cs.key,
            cs.val().name)
        );
      });
      this.categoryListFull = this.categoryListFull.sort(
        function (a, b) {
          if (a.name < b.name) return 1;
          if (a.name > b.name) return -1;
          return 0;
        }
      );
    });
    this.categoryList = this.categoryListFull;
  }

  // inserts a new Category to List and Database
  createNewEntry() {
    if (this.categoryForm.valid) {
      this.categoryProvider
        .addCategoryEntry(
          new CategoryEntry(
            '',
            this.categoryForm.value.categoryName
           ))
        .then((newBooking) => {
          this.categoryForm.reset();
        });
    }
  }
}
