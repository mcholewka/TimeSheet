import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import {EntriesService} from '../../../../../_services/entries/entries.service';
import {UserEntry} from '../../../../../_models/entries/userEntry.model';

@Component({
  selector: 'app-edit-entry-modal',
  templateUrl: './edit-entry-modal.component.html',
  styleUrls: ['./edit-entry-modal.component.css']
})
export class EditEntryModalComponent implements OnInit {

  currentEntry: UserEntry;

  constructor(public dialogRef: MatDialogRef<EditEntryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public entriesService: EntriesService) { }

  ngOnInit(): void {
    this.getEntry();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getEntry() {
    this.entriesService.getSingleEntry<UserEntry>(this.data.entryId).subscribe(responseData => {
      this.currentEntry = responseData;
    })
  }

  editEntry() {
    this.entriesService.editEntry(this.data.entryId, this.currentEntry).subscribe(responseData => {

    });
  }

}
