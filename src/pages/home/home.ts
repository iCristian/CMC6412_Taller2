import { FirebaseService } from './../../providers/firebase-service/firebase-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  shoppingLists: Observable<any[]>;
  editMode = false;

  constructor(public navCtrl: NavController, public firebaseService: FirebaseService, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.firebaseService.authState.subscribe(user => {
      if (user) {
        this.shoppingLists = this.firebaseService.getUserLists();
      } else {
        this.shoppingLists = null;
      }
    })
  }

  logOut() {
    this.firebaseService.logoutUser().then(() => {
      this.navCtrl.setRoot('LoginPage');
    });
  }

  newList() {
    let prompt = this.alertCtrl.create({
      title: 'Create new Shopping List',
      message: 'Enter a name for your new list',
      inputs: [
        {
          name: 'name',
          placeholder: 'Groceries'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Create List',
          handler: data => {
            this.firebaseService.createNewList(data.name).then(data => {
              this.presentToast('New list created!');
            });
          }
        }
      ]
    });
    prompt.present();
  }

  removeList(id) {
    this.firebaseService.removeList(id);
  }

  addItemToList(listId, listName) {
    let prompt = this.alertCtrl.create({
      title: 'New item for "' + listName + '"',
      message: 'Enter a name for your new item',
      inputs: [
        {
          name: 'name',
          placeholder: 'Milk'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Add Item',
          handler: data => {
            this.firebaseService.addListItem(listId, data.name).then(data => {
              this.presentToast('New item added!');
            });
          }
        }
      ]
    });
    prompt.present();
  }

  removeItem(itemId, listId) {
    this.firebaseService.removeShoppingItem(listId, itemId);
  }

  shareList(listId, listName) {
    let prompt = this.alertCtrl.create({
      title: 'Share your list "' + listName + '"',
      message: 'Enter the Email of the person you want to share your list with',
      inputs: [
        {
          name: 'email',
          placeholder: 'john@doe.com'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Share List',
          handler: data => {
            this.firebaseService.shareList(listId, listName, data.email).then(res => {
              this.presentToast('Invitation sent to ' + data.email);
            });
          }
        }
      ]
    });
    prompt.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
