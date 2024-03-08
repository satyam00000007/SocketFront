import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front';
  data:any = {};
  Product:any = {
    sale: 0,
    revenue:0,
    customer:0
  }
  
  constructor(private socket: Socket){
    
  }

  ngOnInit(): void {
    this.data = this.Product
    this.socket.fromEvent('new-email').subscribe((email:any) => {
      console.log(email)
    })

    this.socket.fromEvent('server-resp').subscribe((resp:any) => {
      console.log(resp)
      this.data = resp.clientData;
    })
  }

  sendMessage(){
    console.log("clicked")
    let clientData = {sender :"client", clientData : this.Product};
    this.socket.emit("client-event", clientData);
  }
}
