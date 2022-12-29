import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit{
  form!: FormGroup;
  isAdd = false;
  userList: any;
  closeResult: string = '';

constructor(private service: UserService, private modalService: NgbModal){}

ngOnInit(): void {
  this.service.getAll().subscribe((res) => {
    this.userList = res;
    console.log(this.userList);
  })
  this.form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    mob: new FormControl('', [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]),
    address: new FormControl('', [Validators.required]),
    avatar: new FormControl(''),
  });
}

get f(){
  return this.form.controls;
}

createUser(content:any){
  this.form.reset();
  this.isAdd = true;
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}
submit(){
  this.service.create(this.form.value).subscribe(res => {
    console.log('User created successfully!');
})
}

editUser(data: any, content: any){
  this.isAdd = false;
  this.form.setValue({
    "email": data.email,
    "username": data.userName,
    "mob": data.mobNo,
    "address": data.address,
    "avatar": ""
  })
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    console.log(result);

    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

deleteUser(id:number){
  console.log('id', id)
  this.service.delete(id).subscribe(res => {
      this.userList = this.userList.filter((item: any) => item.id !== id);
       console.log('Post deleted successfully!');
  })
}

}

