import { Component, EventEmitter, Input, Output } from "@angular/core";


@Component({
    selector: "list-note-component",
    templateUrl: "./list-note.component.html",
    styleUrls: [ "./list-note.component.css" ]
})
export class ListNoteComponent {
    
    @Input() noteList: any;
    @Output() deleteNoteEmitter = new EventEmitter<any>()
    noteChecked: boolean = false;

    checkNote(note: any) {
        note.completed = !note.completed
        this.noteChecked = !this.noteChecked;
    }

    deleteNote(note: any) {
        this.deleteNoteEmitter.emit(note);
    }

}