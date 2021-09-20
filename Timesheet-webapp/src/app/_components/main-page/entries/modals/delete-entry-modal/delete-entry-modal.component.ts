import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import {EntriesService} from '../../../../../_services/entries/entries.service';
import {UserEntry} from '../../../../../_models/entries/userEntry.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-entry-modal',
  templateUrl: './delete-entry-modal.component.html',
  styleUrls: ['./delete-entry-modal.component.css']
})
export class DeleteEntryModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteEntryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public entriesService: EntriesService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteEntry() {
    this.entriesService.deleteEntry(this.data.entryId).subscribe(responseData=> {
      console.log('deleted');
      this.toastr.info("Entry has been deleted", 'Information');
    });
  }
}
