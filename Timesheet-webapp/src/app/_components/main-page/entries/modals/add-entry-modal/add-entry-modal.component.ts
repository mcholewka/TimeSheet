import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import {EntriesService} from '../../../../../_services/entries/entries.service';
import {UserEntry} from '../../../../../_models/entries/userEntry.model';

@Component({
  selector: 'app-add-entry-modal',
  templateUrl: './add-entry-modal.component.html',
  styleUrls: ['./add-entry-modal.component.css']
})
export class AddEntryModalComponent implements OnInit {

  newEntryDate: Date;
  newEntryWorkedHours: number;
  newEntryProject: string;
  newEntryTask: string;
  newEntrySubtask: string;
  newEntryNotes: string;

  constructor(public dialogRef: MatDialogRef<AddEntryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public entriesService: EntriesService) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addNewEntry() {
    this.entriesService.addNewEntry(
      new UserEntry(
        this.newEntryDate,
        this.newEntryWorkedHours,
        this.newEntryProject,
        this.newEntryTask,
        this.newEntrySubtask,
        this.newEntryNotes))
        .subscribe(respnseData=>{

    })
  }
}
