import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Note } from "src/app/models/note.model";
import { ModalService } from "src/app/services/modal-msg.service";
import { NoteService } from "src/app/services/notes.service";
import { SessionService } from "src/app/services/session.service";
import { unsubscribeMany } from "src/utils/subscription-management";


@Component({
    selector:"notes-component",
    templateUrl:'./notes.component.html',
    styleUrls:["./notes.component.css"]
})

export class NotesComponent implements OnInit, OnDestroy{
    noteList: Note[] = [];
    subs: Subscription[] = [];

    isCreateNoteOpen: boolean = false;

    constructor(private noteService: NoteService, private sessionService: SessionService, private modal: ModalService){}

    ngOnInit(): void {
        if(this.sessionService.token){
            this.subs.push(this.noteService.getAllUserNotes(this.sessionService.getUserInfo()?.id!).subscribe(res => this.noteList = res.data.notes ))
        }
    }

    ngOnDestroy(): void {
        unsubscribeMany(this.subs);
    }

    newNoteCreated(newNote: Note): void{
        this.noteList.push(newNote)    

    }

    deleteNote(note: any) {

        this.modal.openModal()
        this.modal.actionButton(() => this.noteService.deleteNote(note).subscribe(res => 

            this.noteList = this.noteList.filter(n => n.id !== note.id)
        ))

        
    }

    openCreateNote(): void {
        this.isCreateNoteOpen = true;
    }
    closeCreateNote():void {
        this.isCreateNoteOpen = false;
    }
}