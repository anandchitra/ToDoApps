import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedTaskComponent } from './deleted-task.component';

describe('DeletedTaskComponent', () => {
  let component: DeletedTaskComponent;
  let fixture: ComponentFixture<DeletedTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletedTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletedTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
