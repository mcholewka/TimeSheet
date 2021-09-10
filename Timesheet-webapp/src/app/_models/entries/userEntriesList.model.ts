import {UserEntry} from "./userEntry.model";

export class UserEntriesList {
    entries: UserEntry[];
    totalPages: number;
    currentPage: number;

    constructor(entries: UserEntry[], totalPages: number, currentPage: number) {
        this.entries = entries;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
    }
}