import { Component, OnInit } from "@angular/core";
import { Note } from "src/app/models/note.model";
import { NoteService } from "src/app/services/notes.service";
import { SessionService } from "src/app/services/session.service";


@Component({
    selector:"notes-component",
    templateUrl:'./notes.component.html',
    styleUrls:["./notes.component.css"]
})

export class NotesComponent implements OnInit{
    noteList: Note[] = [];

    isCreateNoteOpen: boolean = false;

    constructor(private noteService: NoteService, private sessionService: SessionService ){} //, private modal: ModalService

    ngOnInit(): void {
        if(this.sessionService.token){
            this.noteService.getAllUserNotes(this.sessionService.getUserInfo()?.id!).subscribe(res => this.noteList = res.data.notes )
        }
    }

    newNoteCreated(newNote: Note): void{
        this.noteList.push(newNote)    

    }
    
    openCreateNote(): void {
        this.isCreateNoteOpen = true;
    }
    closeCreateNote():void {
        this.isCreateNoteOpen = false;
    }
}