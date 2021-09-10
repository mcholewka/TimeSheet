export class UserEntry {
    date: Date;
    workedHours: number;
    project: String;
    task: String;
    subtask: String;
    notes: String;

    constructor(date: Date, workedHours: number, project: String, task: String, subtask: String, notes: String) {
        this.date = date;
        this.workedHours = workedHours;
        this.project = project;
        this.task = task;
        this.subtask = subtask;
        this.notes = notes;
    }
}