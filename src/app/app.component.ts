import { Component, OnInit } from '@angular/core';
import { ModalService } from './services/modal-msg.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showModal: boolean = false;
  showSimpleModal: boolean = false;
  constructor(private modal: ModalService){}
  ngOnInit(): void {
    
    this.modal._showModal.subscribe(res => this.showModal = res);
    this.modal._showSimpleModal.subscribe(res => this.showSimpleModal = res);

  }
}
