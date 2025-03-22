import { Component, OnInit } from '@angular/core';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { UserHomeService } from 'src/app/services/user-home.service';

@Component({
  selector: 'app-reserva-estudiantes',
  templateUrl: './reserva-estudiantes.component.html',
  styleUrls: ['./reserva-estudiantes.component.css']
})
export class ReservaEstudiantesComponent implements OnInit {


  public reservas: any=[];
  public idUser!:number;

  public idreservaEliminada!:number;
  constructor(private reservaService: ReservaService, private toast: NgToastService,private userHome: UserHomeService,private auth: AuthService){
    this.userHome.getIdFromStore().subscribe(val=>{
      const idFromToken = this.auth.getIdFromToken();
      this.idUser=val||idFromToken;
    })
  }
  ngOnInit(): void {
    this.reservaService.ListarBusetasUsuario(this.idUser).subscribe(res=>{
      //console.log(res);
      //parseInt(res.Telefono);
      this.reservas=res;
      parseInt(this.reservas.telefonoEst)
    })
  }

  capturarID(id: number){//este metodo captura el id de la buseta que se va a borrar del html
    this.idreservaEliminada=id
    //console.log(this.idBusetaEliminada)
  }

  eliminarReserva(){
    this.capturarID(this.idreservaEliminada)
    this.reservaService.eliminarReservaUsuario(this.idreservaEliminada).subscribe({
      next:(res)=>{
        this.toast.success({detail:"Borrado!",summary: "Se borró la reserva", duration: 5000});
        this.reservaService.ListarBusetasUsuario(this.idUser).subscribe(res=>{
          this.reservas=res;
        })
        const buttonRef=document.getElementById("closeBtn");
      buttonRef?.click();
      
      },
      error:(err)=>{
        this.toast.error({detail:"Ups!",summary: "Algo pasó", duration: 5000}); 
      }
    })
  }

}
