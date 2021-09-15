import {UserEntry} from "./userEntry.model";

export class UserEntriesList {
    entries: UserEntry[];
    totalPages: number;
    currentPage: number;
    totalItems: number;

    constructor(entries: UserEntry[], totalPages: number, currentPage: number, totalItems: number) {
        this.entries = entries;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
        this.totalItems = totalItems;
    }
}