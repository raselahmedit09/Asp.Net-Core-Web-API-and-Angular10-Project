import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient ,HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  readonly BaseURI = 'http://localhost:59518/api';
 
  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', [Validators.required]]
    }, { validator: this.camparePassword })


  });

  camparePassword(fb: FormGroup) {
    let confrimPassword = fb.get('ConfirmPassword');
    if (confrimPassword.errors == null || 'passwordMismatch' in confrimPassword.errors) {
      if (fb.get('Password').value != confrimPassword.value)
        confrimPassword.setErrors({ passwordMismatch: true });
      else
        confrimPassword.setErrors(null);
    }
  }

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    }
    
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return this.http.post(this.BaseURI+'/ApplicationUser/Register',  body,{headers: headers});

  };

}
