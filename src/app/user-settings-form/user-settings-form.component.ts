import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserSettings } from '../data/user-settings';
import { NgForm, NgModel } from '@angular/forms';
import { DataService } from '../data/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {

  isInputError:boolean=false;
  ErrorMsg:string;
  isServerError:boolean=false;
  subscriptionTypes:Observable<string[]>;
  startDate:Date;
  originalUserSettings:UserSettings={
    name:null,
    emailOffers:null,
    interfaceStyle:null,
    subscriptionType:null,
    notes:null

  };

  userSettings:UserSettings={...this.originalUserSettings};
  constructor(private dataService:DataService) {

  }

  ngOnInit() {
    this.subscriptionTypes=this.dataService.getSubscriptionTypes();
    this.startDate=new Date();
  }

  onBlur(field:NgModel)
  {
    console.log('BLUR:',field.valid);
  }

  ErrorHandling(error:any)
  {
    console.log('error: ',error);
    this.isServerError=true;
    this.ErrorMsg=error.error.errorMessage;
  }

  onSubmit(form:NgForm) {
    console.log('in onSubmit form validity: ', form.valid,' value :',form.value);
    if (form.valid)
    {
      this.isInputError=false;
      this.isServerError=false;

    this.dataService.postUserSettingsForm(this.userSettings).subscribe(
      result=>console.log('success: ',result),
      error=>this.ErrorHandling(error)
    );
    }
    else
    {
      this.isInputError=true;
      this.ErrorMsg="please correct errors first before submit."
    }
  }

}
