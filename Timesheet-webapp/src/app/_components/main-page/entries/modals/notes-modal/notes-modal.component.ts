import { Component, OnInit, Inject} from '@angular/core';
import {EntriesService} from "../../../../../_services/entries/entries.service"
import {UserEntry} from "../../../../../_models/entries/userEntry.model";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-notes-modal',
  templateUrl: './notes-modal.component.html',
  styleUrls: ['./notes-modal.component.css']
})
export class NotesModalComponent implements OnInit {

  currentEntry: UserEntry;

  constructor(public entriesService: EntriesService, public dialogRef: MatDialogRef<NotesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getEntry();
  }

  getEntry() {
    this.entriesService.getSingleEntry<UserEntry>(this.data.entryId).subscribe(responseData => {
      this.currentEntry = responseData;
    })
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
