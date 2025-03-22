import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UserHomeService } from 'src/app/services/user-home.service';

declare var $:any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit{
  //menuItems:any[];
  menuItemsEstudiantes?:any[];
  menuItemsTransportistas?:any[];

  public Nombre:string="";
  public role!:string;
  public id!: string;

  constructor(private sidebarService:SidebarService, private auth: AuthService, private userHome: UserHomeService){
    this.menuItemsEstudiantes=this.sidebarService.menuEstudiantes //revisar el nombre menuEstudiantes en el servicio
    this.menuItemsTransportistas=this.sidebarService.menuTransportistas //revisar el nombre menuEstudiantes en el servicio
  }

  ngOnInit(): void {
    setTimeout(()=>{
      this.initTreeView();
    });

    this.userHome.getFullnameFromStore()
    .subscribe(val=>{
      const fullNameFromToken=this.auth.getfullNameFromToken();
      this.Nombre=val || fullNameFromToken
    });
  
    this.userHome.getRoleFromStore().subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role=val||roleFromToken;
    })

   /* this.userHome.getIdFromStore().subscribe(val=>{
      const nameidFromToken = this.auth.getIdFromToken();
      this.id=val||nameidFromToken;
    })*/
    
  }

  ngAfterViewInit(): void {
    this.initTreeView();
  }
  

  private initTreeView(){
    $('[data-widget="treeview"]').Treeview();
  }


  signOut(){
    this.auth.signOut(); // sirve para salir de la app
  }

  
}
