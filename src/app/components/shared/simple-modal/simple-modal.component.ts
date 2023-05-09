import { Component, Input, OnInit } from "@angular/core";
import { SimpleModalData } from "src/app/models/modal.interface";
import { ModalService } from "src/app/services/modal-msg.service";

@Component({
    selector:'simple-modal-component',
    templateUrl:"./simple-modal.component.html",
    styleUrls:["./simple-modal.component.css"]
})

export class SimpleModalComponent implements OnInit{

    modalData: SimpleModalData | null = null;

    constructor(private modal: ModalService){}

   ngOnInit(): void {
       this.modal._simpleModalData.subscribe(res => this.modalData = res)
   }


}