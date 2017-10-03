import { Component, OnInit } from '@angular/core';
import { apiService } from '../app.service';

@Component({
  selector: 'app-unlock',
  templateUrl: './unlock.component.html',
  styleUrls: ['./unlock.component.scss'],
  providers: [apiService]
})
export class UnlockComponent implements OnInit {
  constructor(private _apiService: apiService) { }
  // Name the Page
  title: string = 'Unlock Resources';

  // for styling changes on checkbox click
  lockactive: string = '';
  isModal: string = 'modal-popup-false';

  // API DATA ARRAY
  locked: Array<any> = [];
  initial: Array<any> = [];

  // Sorting
  column: string = 'category'
  isUserSorted: boolean = false;
  isAuthSorted: boolean = false;
  isFormSorted: boolean = false;
  isWinSorted: boolean = false;
  userSorted: string = 'glyphicon-menu-up';
  authSorted: string = 'glyphicon-menu-up';
  formSorted: string = 'glyphicon-menu-up';
  winSorted: string = 'glyphicon-menu-up';

  // Array for pushing to then be unlocked
  unlocked: Array<any> = [];

  // filter search
  query = '';
  initialQuery = '';
  filteredList = [];
  lockedName: Array <any> = [];
  lockedAuth: Array <any> = [];
  lockedForm: Array <any> = [];
  lockedWin: Array <any> = [];

// Search Filter for Search Box
  filter() {
    let text = (<HTMLInputElement>document.getElementById('listSearch')).value;
    this.query = text;
    this.filterName(text);
    this.filterAuth(text);
    this.filterForm(text);
    this.filterWin(text);
  }

// Search filter by Name
filterName(text) {
  this.lockedName = this.locked.filter((lock) => {
    return lock.User.toLowerCase().match(text);
  });
  if(!text || text === '') {
    this.locked = this.initial;
  } else if (!this.lockedName.length) {
    this.locked = this.initial;
  } else if (Array.isArray(this.lockedName) && this.lockedName.length) {
    this.filteredList = this.lockedName;
    this.updateList();
  }
}

// Search filter by Auth
filterAuth(text) {
  this.lockedAuth = this.locked.filter((lock) => {
    return lock.AuthID.toLowerCase().match(text);
  });
  if(!text || text === '') {
    this.locked = this.initial;
  } else if (!this.lockedAuth.length) {
    this.locked = this.initial;
  } else if (Array.isArray(this.lockedAuth) && this.lockedAuth.length) {
    this.filteredList = this.lockedAuth;
    this.updateList();
  }
}

// Search filter by Form
filterForm(text) {
  this.lockedForm = this.locked.filter((lock) => {
    return lock.FormName.toLowerCase().match(text);
  });
  if(!text || text === '') {
    this.locked = this.initial;
  } else if (!this.lockedForm.length) {
    this.locked = this.initial;
  } else if (Array.isArray(this.lockedForm) && this.lockedForm.length) {
    this.filteredList = this.lockedForm;
    this.updateList();
  }
}

// Search filter by WIN
filterWin(text) {
  this.lockedWin = this.locked.filter((lock) => {
    return lock.WinHandle.toLowerCase().match(text);
  });
  if(!text || text === '') {
    this.locked = this.initial;
  } else if (!this.lockedWin.length) {
    this.locked = this.initial;
  } else if (Array.isArray(this.lockedWin) && this.lockedWin.length) {
    this.filteredList = this.lockedWin;
    this.updateList();
  }
}

// Update locked array to matching filtered list if search filter found
updateList() {
  if(this.query !== '' && this.filteredList.length !== 0) {
    this.locked = this.filteredList;
  }
}

//Sort list on click of table filters
userSort() {
  this.isUserSorted = !this.isUserSorted;
  if(this.isUserSorted === true) {
    this.locked.reverse();
    this.userSorted = 'glyphicon-menu-down';
  }
  else {
    this.locked.reverse();
    this.userSorted = 'glyphicon-menu-up';
  }
}

authSort() {
  this.isAuthSorted = !this.isAuthSorted;
  if (this.isAuthSorted === true) {
    this.locked.reverse();
    this.authSorted = 'glyphicon-menu-down';
  }
  else {
    this.locked.reverse();
    this.authSorted = 'glyphicon-menu-up';
  }
}

formSort() {
  this.isFormSorted = !this.isFormSorted;
  if (this.isFormSorted === true) {
    this.locked.reverse();
    this.formSorted = 'glyphicon-menu-down';
  }
  else {
    this.formSorted = 'glyphicon-menu-up';
    this.locked.reverse();
  }
}

winSort() {
  this.isWinSorted = !this.isWinSorted;
  if (this.isWinSorted === true) {
    this.locked.reverse();
    this.winSorted = 'glyphicon-menu-down';
  }
  else {
    this.locked.reverse();
    this.winSorted = 'glyphicon-menu-up';
  }
}

// Open Modal
  openModal(e, lock) {
    // set modal to visible
    this.isModal = 'modal-popup';
    this.lockactive = 'panel-active';

    // the object to be pushed for unlock
    let lockObj = {
      ID: lock.ID,
      AuthID: lock.AuthID,
      FormName: lock.FormName,
      WinHandle: lock.WinHandle,
      Active: false,
      User: lock.User
    };

    // Adding and removing object from array
    // if checkbox is turned to true
    if (e.target.checked === true) {
      this.unlocked.push(lockObj);
    }
    // if the checkbox is turned false
    else if (e.target.checked === false) {
      // find element to remove from array
      let index = undefined;
      this.unlocked.forEach((lockObj, current) => {
        // if object found matches the ID then set index to remove at current
        if(lockObj.id === lock.ID) {
          index = current;
        }
      });
      // Remove object at index
      if(index !== undefined && this.unlocked.length !== 0) {
        this.unlocked.splice(index, 1);
        this.lockactive = '';
      } // if array is now empty close modal
      else if (index === undefined) {
        this.unlocked = [];
        this.isModal = 'modal-popup-false';
        this.lockactive = '';
      }
    }
  }

  // Resetting Checkboxes on Modal Cancel
  reset() {
    let checkboxes = document.getElementsByTagName('input');
    for (let i = 0; i < checkboxes.length; i ++) {
      if(checkboxes[i].type === 'checkbox' && checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
  }

  // Cancel modal
  cancel() {
    // Uncheck all checkboxes
    this.reset();
    // Clear unlocked array
    this.unlocked = [];
    // Close modal
    this.isModal = 'modal-popup-false';
    this.lockactive = '';
  }

  // Unlock
  unlock() {
    let observer = {
      next(data) {
        data => console.log(data)
      },
      error(error) {
        return new Error('Post Error');
      },
      complete() {
        console.log("Completed");
        // window.location.reload();
      }
    };
    // On unlock send lock data to Service for POST
    this._apiService.postUnlock(this.unlocked).subscribe(observer);
  }

  ngOnInit() {
    // GET list of data from api
    const subscription = this._apiService.getLocked().subscribe(data => {
      this.locked = data;
      this.initial = data;
    });
  }

}
