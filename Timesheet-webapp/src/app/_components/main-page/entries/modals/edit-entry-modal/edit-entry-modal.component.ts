import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import {EntriesService} from '../../../../../_services/entries/entries.service';
import {UserEntry} from '../../../../../_models/entries/userEntry.model';
import { FormGroup , FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-entry-modal',
  templateUrl: './edit-entry-modal.component.html',
  styleUrls: ['./edit-entry-modal.component.css']
})
export class EditEntryModalComponent implements OnInit {

  currentEntry: UserEntry;
  page: number = 0;
  entriesForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditEntryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public entriesService: EntriesService, 
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getEntry();
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

  getEntry() {
    this.entriesService.getSingleEntry<UserEntry>(this.data.entryId).subscribe(responseData => {
      this.currentEntry = responseData;
    })
  }

  editEntry() {
    this.entriesService.editEntry(this.data.entryId, this.currentEntry).subscribe(responseData => {
      this.toastr.success("Entry has been edited", 'Success!');
      this.dialogRef.close();
    });
  }

}
