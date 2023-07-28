import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormControlName,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  loginForm !:FormGroup;
  constructor( private formBuilder:FormBuilder) {
    this.loginForm=this.formBuilder.group({
      'firstname':['',[Validators.required]],
      'lastname':['',[Validators.required]],
      'email':['',[Validators.required,Validators.email]],
      'mobile':['',[Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),Validators.required,]],
    }
    );
   }

  ngOnInit(): void {
  }
  saveValue(){
    if(this.loginForm.invalid){
      console.log('true');
      return;
    }
    console.log(this.loginForm.value);
    this.loginForm.reset();
  }

  reset() {
    this.loginForm.reset();
  }

  get mobile() {
    return this.loginForm.get('mobile');
} 

  
}
