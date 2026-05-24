import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCompetition } from './project-competition';

describe('ProjectCompetition', () => {
  let component: ProjectCompetition;
  let fixture: ComponentFixture<ProjectCompetition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCompetition]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCompetition);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
