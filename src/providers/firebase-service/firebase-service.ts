import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';

@Injectable()
export class FirebaseService {
  user: firebase.User;
  authState: Observable<firebase.User>;
  
  constructor(private afAuth: AngularFireAuth, public afd: AngularFireDatabase) {
    this.authState = afAuth.authState;

    this.authState.subscribe(user => {
      this.user = user;
    });
  }

}