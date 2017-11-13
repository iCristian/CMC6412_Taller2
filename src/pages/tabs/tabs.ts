import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tabs-page',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1 = "HomePage";
  tab2 = "SharedPage";
  tab3 = "ProfilePage";

  constructor(public navCtrl: NavController) { }


}
