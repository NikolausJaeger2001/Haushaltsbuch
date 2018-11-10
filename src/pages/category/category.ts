import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MyApp} from "../../app/app.component";
import {CategoryProvider} from "../../providers/category/category";
import {CategoryEntry} from "../../models/category-entry";
import {CategoryDetailPage} from "../category-detail/category-detail";

@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {

  public categoryForm: FormGroup;
  public categoryList: CategoryEntry[];
  searchTerm : any ="";

  constructor(
    public navCtrl: NavController,
    public categoryProvider: CategoryProvider,
    formBuilder: FormBuilder){

    this.categoryForm = formBuilder.group({
      categoryName: [
        '',
        Validators.compose([Validators.required])
      ]
    });
    MyApp
  }

  //open details page of selected category
  goToCategoryDetails(category: CategoryEntry) {
    this.navCtrl.push(CategoryDetailPage, category);
  }

  //apply filter to list
  setFilteredItems() {
    if(this.searchTerm.length > 0)
    {
      this.categoryList = this.categoryList.filter(item =>item.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
      console.log(this.categoryList);
    }
    else
    {
      //Reload data
      this.ionViewDidLoad();
    }
  }

  ionViewDidLoad() {
    this.categoryProvider.getCategoryList().on("value", categoryListSnapshot => {
      this.categoryList = [];
      categoryListSnapshot.forEach(cs => {
        this.categoryList.push(
          new CategoryEntry(
            cs.key,
            cs.val().name)
        );
      });
      this.categoryList = this.categoryList.sort(
        function (a, b) {
          if (a.name < b.name) return 1;
          if (a.name > b.name) return -1;
          return 0;
        }
      );
    });
  }

  createNewEntry() {
    if (!this.categoryForm.valid) {
      console.log(
        `Form is not valid yet, current value: ${this.categoryForm.value}`
      );
    } else {
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
