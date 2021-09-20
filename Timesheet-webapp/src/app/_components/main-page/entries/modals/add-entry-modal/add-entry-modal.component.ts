import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import {EntriesService} from '../../../../../_services/entries/entries.service';
import {UserEntry} from '../../../../../_models/entries/userEntry.model';
import { FormGroup , FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  entriesForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddEntryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public entriesService: EntriesService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.entriesForm = new FormGroup({
      'newEntryDate': new FormControl(null, Validators.required),
      'newEntryWorkedHours': new FormControl(null, Validators.min(1)),
      'newEntryProject': new FormControl(null, Validators.required),
      'newEntryTask': new FormControl(null, Validators.required),
      'newEntrySubtask': new FormControl(null, null),
      'newEntryNotes': new FormControl(null, null)
    });
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
          this.toastr.success("New entry has been added", 'Success!');
          this.dialogRef.close();
    })
  }
}
