import { Component, OnInit, ViewChild } from '@angular/core';
import {EntriesService} from "../../../_services/entries/entries.service";
import {UserEntriesList} from "../../../_models/entries/userEntriesList.model";
import {UserEntry} from "../../../_models/entries/userEntry.model";
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {AddEntryModalComponent} from './modals/add-entry-modal/add-entry-modal.component';
import {DeleteEntryModalComponent} from './modals/delete-entry-modal/delete-entry-modal.component';
import {EditEntryModalComponent} from './modals/edit-entry-modal/edit-entry-modal.component';
import {MatPaginator} from '@angular/material/paginator';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  userEntries: UserEntriesList;
  displayedColumns: string[] = ['date', 'workedHours', 'project', 'task', 'subtask', 'options'];
  dataSource: MatTableDataSource<UserEntry>;
  length = 500;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  constructor(public entriesService: EntriesService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.getUserEntries();

  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    console.log("length: " + this.length);
    console.log("pageSize: " + this.pageSize);
    console.log("pageIndex: " + this.pageIndex);
    
    this.getUserEntries();
  }

  getUserEntries() {
    this.entriesService.getUserEntries<UserEntriesList>(this.pageSize, this.pageIndex + 1).subscribe(data=> {
      if(data!=undefined)
      {
        this.userEntries = data;
        console.log(this.userEntries)
      }
      this.dataSource = new MatTableDataSource<UserEntry>(this.userEntries.entries);
      this.paginator.length = this.userEntries.totalItems;
    })
  }

  addNewEntry() {
    const dialogRef = this.dialog.open(AddEntryModalComponent, {
      width: '500px',
      data: {

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUserEntries();
    });
  }

  deleteEntry(entryId: string) {
    const dialogRef = this.dialog.open(DeleteEntryModalComponent, {
      width: '500px',
      data: {
        entryId: entryId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUserEntries();
    });
  }

  editEntry(entryId: string) {
    const dialogRef = this.dialog.open(EditEntryModalComponent, {
      width: '500px',
      data: {
        entryId: entryId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUserEntries();
    });
  }
}
