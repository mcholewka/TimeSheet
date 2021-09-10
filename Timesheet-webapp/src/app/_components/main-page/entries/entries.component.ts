import { Component, OnInit } from '@angular/core';
import {EntriesService} from "../../../_services/entries/entries.service";
import {UserEntriesList} from "../../../_models/entries/userEntriesList.model";
import {UserEntry} from "../../../_models/entries/userEntry.model";
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {

  userEntries: UserEntriesList;
  displayedColumns: string[] = ['notes', 'task', 'subtask', 'date'];
  dataSource: MatTableDataSource<UserEntry>;
  constructor(public entriesService: EntriesService) { }

  ngOnInit(): void {
    this.getUserEntries();
  }

  getUserEntries() {
    this.entriesService.getUserEntries<UserEntriesList>().subscribe(data=> {
      if(data!=undefined)
      {
        this.userEntries = data;
        console.log(this.userEntries.entries)
      }
      this.dataSource = new MatTableDataSource<UserEntry>(this.userEntries.entries);
    })
  }
}
