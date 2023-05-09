import { Component } from "@angular/core";
import { ModalService } from "src/app/services/modal-msg.service";


@Component({
    selector: "modal-component",
    templateUrl: "./modal.component.html",
    styleUrls: [ "./modal.component.css" ]
})

export class ModalComponent {

    constructor(private modal: ModalService) { }

    cancelButton() {
        this.modal.closeModal()
    }

    actionButton() {
        this.modal.delete()
    }


}