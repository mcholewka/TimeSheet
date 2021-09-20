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
import { ToastrService } from 'ngx-toastr';
import {NotesModalComponent} from "../entries/modals/notes-modal/notes-modal.component";

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
  addDialog: boolean;
  filterStartDate: Date;
  filterEndDate: Date;
  filterProject: string;
  filterTask: string;

  constructor(public entriesService: EntriesService, public dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.getUserEntries();

  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    
    this.getUserEntries();
  }

  getUserEntries() {
    this.entriesService.getUserEntries<UserEntriesList>(this.pageSize, this.pageIndex + 1, this.filterStartDate, this.filterEndDate, this.filterProject, this.filterTask)
    .subscribe(data=> {
      if(data!=undefined)
      {
        this.userEntries = data;
      }
      this.dataSource = new MatTableDataSource<UserEntry>(this.userEntries.entries);
      this.paginator.length = this.userEntries.totalItems;
    })
  }

  addNewEntry() {
    const dialogRef = this.dialog.open(AddEntryModalComponent, {
      width: '500px',
      data: {
        result: this.addDialog
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUserEntries();
      this.toastr.success("New entry has been added", 'Success!');
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
      this.toastr.success("Entry has been deleted", 'Success!');
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
      
      this.toastr.success("Entry has been edited", 'Success!');
    });
  }

  filter() {
    this.getUserEntries();
  }

  clearFilter() {
    this.filterTask = null;
    this.filterProject = null;
    this.filterStartDate = null;
    this.filterEndDate = null;
    this.getUserEntries();
  }

  notes(entryId: string) {
    const dialogRef = this.dialog.open(NotesModalComponent, {
      width: '500px',
      data: {
        entryId: entryId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
