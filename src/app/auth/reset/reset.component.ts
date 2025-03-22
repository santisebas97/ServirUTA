import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { confirmPasswordValidator } from 'src/app/helpers/confirm-password.validator';
import { resetPassword } from 'src/app/models/reset-password.model';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  resetPasswordForm!:FormGroup;
  emailToReset!:string;
  emailToken!:string;
  resetPasswordObj=new resetPassword();

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private resetService: ResetPasswordService, private toast: NgToastService, private router: Router){

  }

  ngOnInit(): void {
    this.resetPasswordForm=this.fb.group({
      password:[null,Validators.required],
      confirmPassword:[null,Validators.required]
    },{
      validator: confirmPasswordValidator("password","confirmPassword")
    });

    this.activatedRoute.queryParams.subscribe(val=>{
      this.emailToReset=val['email'];
      let uriToken=val['code'];
      this.emailToken=uriToken.replace(/ /g,'+'); // si el token de email tiene algun espacio se le agregara una + en el espacio
      //console.log(this.emailToken);
      //console.log(this.emailToReset);
    })
  }

  reset(){
    if(this.resetPasswordForm.valid){
      this.resetPasswordObj.email=this.emailToReset;
      this.resetPasswordObj.newPassword=this.resetPasswordForm.value.password;
      this.resetPasswordObj.confirmPassword=this.resetPasswordForm.value.confirmPassword;
      this.resetPasswordObj.emailToken=this.emailToken;

      this.resetService.resetPassword(this.resetPasswordObj)
      .subscribe({
        next:(res)=>{
          //alert(res.message);
          this.toast.success({detail:"Bien!",summary:"contraseña cambiado con éxito!", duration:5000});
          this.router.navigate(['/'])
        },
        error:(err)=>{
          //alert(err.error.message)
          this.toast.error({detail:"ERROR",summary:"algo ha ido mal...", duration:5000});
        }
      })
    }else{
      this.validateAllFormFields(this.resetPasswordForm);
    }
  }

  private validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control?.markAsDirty({onlySelf:true});
      } else if(control instanceof FormGroup){
        this.validateAllFormFields(control);
      }
    })
  }

}
