import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Recorrido } from 'src/app/models/recorrido.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { RecorridodetalleService } from 'src/app/services/recorridodetalle.service';
import { RecorridosService } from 'src/app/services/recorridos.service';
import { UserHomeService } from 'src/app/services/user-home.service';

@Component({
  selector: 'app-misrutas',
  templateUrl: './misrutas.component.html',
  styleUrls: ['./misrutas.component.css']
})
export class MisrutasComponent implements OnInit {

  public usuario!:Usuario;
  public recorrido:any=[];
  public idRecorridoEliminado!:number;

  constructor(private userHome: UserHomeService, private auth: AuthService, private recorridosService:RecorridosService,private recorridoDetalleService:RecorridodetalleService, private toast: NgToastService) {
    this.usuario=new Usuario();
    
    this.userHome.getIdFromStore().subscribe(val=>{
      const idFromToken = this.auth.getIdFromToken();
      this.usuario.iduser=val||idFromToken;
    })
  }

  ngOnInit(): void {
    this.recorridosService.obtenerRecorridosUsuario(this.usuario.iduser).subscribe(res=>{
      this.recorrido=res;
    })
  }

  capturarIdRec(id:number){
    this.idRecorridoEliminado=id
  }

  eliminarRecorrido(){
    this.capturarIdRec(this.idRecorridoEliminado);
    /*
    this.recorridoDetalleService.eliminarRecorridoDetalle(this.idRecorridoEliminado).subscribe({
      next:(res)=>{
        this.toast.success({detail:"Borrado!",summary: "Se borró el recorrido", duration: 5000});
      },
      error:(err)=>{
        this.toast.error({detail:"Ups!",summary: "Algo pasó", duration: 5000}); 
      }
    });
*/
    this.recorridosService.eliminarRecorrido(this.idRecorridoEliminado).subscribe({
      next:(res)=>{
        this.toast.success({detail:"Borrado!",summary: "Se borró el recorrido", duration: 5000});
        this.recorridosService.obtenerRecorridosUsuario(this.usuario.iduser).subscribe(res=>{
          this.recorrido=res;
          const buttonRef=document.getElementById("closeBtn");
          buttonRef?.click();
        })
      },
      error:(err)=>{
        this.toast.error({detail:"Ups!",summary: "Algo pasó", duration: 5000}); 
      }
    });
  }
 


}
