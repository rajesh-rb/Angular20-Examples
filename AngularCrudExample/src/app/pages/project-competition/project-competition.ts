import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

export interface ProjectCompetitionModel {
  competitionId: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
}

@Component({
  selector: 'app-project-competition',
  imports: [ReactiveFormsModule],
  templateUrl: './project-competition.html',
  styleUrl: './project-competition.css',
})
export class ProjectCompetition {
  projectForm = new FormGroup({
    competitionId: new FormControl(0),
    title: new FormControl(''),
    description: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    status: new FormControl(''),
  });

  http = inject(HttpClient);
  projectCompetitionList = signal<ProjectCompetitionModel[]>([]);
  constructor() {}

  ngOnInit() {
    this.getAllCompetitions();
  }

  getAllCompetitions() {
    this.http
      .get('https://api.freeprojectapi.com/api/ProjectCompetition/GetAllCompetition')
      .subscribe({
        next: (response: any) => {
          this.projectCompetitionList.set(response);
        },
      });
  }

  saveCompetition() {
    debugger;
    const competitionData = this.projectForm.value;
    this.http
      .post('https://api.freeprojectapi.com/api/ProjectCompetition/competition', competitionData)
      .subscribe({
        next: (response: any) => {
          alert('Competition saved successfully!');
          this.getAllCompetitions(); // Refresh the list after saving
        },
        error: (error: any) => {
          alert('Error saving competition: ' + error.message);
        },
      });
  }

  updateCompetition() {
    debugger;
    const competitionData = this.projectForm.value;

    this.http
      .put(
        'https://api.freeprojectapi.com/api/ProjectCompetition/update/' +
          competitionData.competitionId,
        competitionData,
      )
      .subscribe({
        next: (response: any) => {
          alert('Competition updated successfully!');
          this.getAllCompetitions(); // Refresh the list after saving
        },
        error: (error: any) => {
          alert('Error updating competition: ' + error.message);
        },
      });
  }
  onEdit(competition: ProjectCompetitionModel) {
    this.projectForm.setValue({
      competitionId: competition.competitionId,
      title: competition.title,
      description: competition.description,
      startDate: competition.startDate,
      endDate: competition.endDate,
      status: competition.status,
    });
  }

  resetForm() {
    this.projectForm.reset({
      competitionId: 0,
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      status: '',
    });
  }
}
