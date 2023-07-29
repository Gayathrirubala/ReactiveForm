import { Component, OnInit,ViewChild,AfterViewInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { FormBuilder,FormControl,FormControlName,FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
interface User{
  id:number;
  firstname:string;
  lastname:string;
  email:string;
  mobile:string;
}

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit,AfterViewInit {

  loginForm !:FormGroup;
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'mobile','action'];
  users:User[]= [];
  showForm:boolean=false;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  dataSource=new MatTableDataSource<any>([]);
  formAction:string='create';

  constructor( private formBuilder:FormBuilder,private _snackBar: MatSnackBar) {
  
   }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      'id':null,
      'firstname':['',[Validators.required]],
      'lastname':['',[Validators.required]],
      'email':['',[Validators.required,Validators.email]],
      'mobile':['',[Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),Validators.required,]],
    }
    );
    this.moveToNext('firstname');
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator=this.paginator;
  }

  addUser(){
    this.moveToNext('firstname');
    this.showForm=!this.showForm;
    if(!this.showForm){
      this.formAction='create';
    }
  }
  saveValue(){
    if(this.loginForm.invalid){
      return;
    }
    const user=this.loginForm.value;
    if(user && !user.id){
      let id= this.users.length+1;
      this.loginForm.patchValue({'id':id});
      this.users.push(this.loginForm.value);
    }else if(user.id){
      let index= this.users.findIndex(a=>a.id==user.id);
      this.users[index]=user;
    }
    this.loginForm.reset();
    this.formAction='create';
    this.dataSource=new MatTableDataSource<any>(this.users);
    this.dataSource.paginator=this.paginator;
    this.showForm=false;
    this.showMessage('Saved Successfully');

  }

  reset(){
    this.loginForm.reset();
  }

  get mobile() {
    return this.loginForm.get('mobile');
  } 

  edit(element:User){
    this.formAction='edit';
    this.loginForm.setValue(element);
    this.showForm=true;
    return;
  }

  delete(elementId:number){
    const ind=this.users.findIndex(a=>a.id==elementId);
    if(ind>=0){
      this.users.splice(ind,1);
    }
    this.dataSource=new MatTableDataSource<any>(this.users);
    this.dataSource.paginator=this.paginator;
    this.showMessage('Deleted Successfully');
    return;
  }

  moveToNext(id:string) {
    const next=document.getElementById(`${id}`);
    next?.focus();
    return;
  }

  showMessage(message:string){
    this._snackBar.open(message,'', {
      horizontalPosition:'center',
      verticalPosition:'top',
      duration: 1000,
      panelClass: ['msg-snackbar']
    });
  }

  
}
