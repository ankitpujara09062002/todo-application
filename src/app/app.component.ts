import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  addTaskForm!: FormGroup;
  tasks: any = [
    { title: 'Role Base Auth', assignee: 'me', tag: 'low', dueDate: '2023-04-09', description: 'Best Role Base Auth', checked: false },
    { title: 'Role Base Routing', assignee: 'Kirav', tag: 'medium', dueDate: '2023-04-09', description: 'Best Role Base Routing', checked: false },
    { title: 'Reactive Login Form', assignee: 'Ravi', tag: 'high', dueDate: '2023-04-09', description: 'Best Reactive Login FOrm', checked: false },
    { title: 'Bind Api', assignee: 'Rutu', tag: 'update', dueDate: '2023-04-09', description: 'Best Bind Api', checked: false },
  ];
  addFlage: boolean = false;
  editFlage: boolean = false;
  editData: any = {};
  filteredTasks: any;
  noDataFoundFlag: boolean = false;
  assigneeCheckeBox: any = [
    { id: '1', checked: false, assigneeName: 'me' },
    { id: '2', checked: false, assigneeName: 'Kirav' },
    { id: '3', checked: false, assigneeName: 'Ravi' },
    { id: '4', checked: false, assigneeName: 'Rutu' },
  ]

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Form
    this.addTaskForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      assignee: new FormControl('', [Validators.required]),
      dueDate: new FormControl('', [Validators.required]),
      tag: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  // Get Controls
  get f() {
    return this.addTaskForm.controls;
  }

  onAdd() {
    if (this.addTaskForm.valid) {
      if (this.addFlage === true) {
        let addTask = {
          checked: false,
          ...this.addTaskForm.value
        };
        this.tasks.push(addTask);
        this.addFlage = false;
        this.addTaskForm.reset();
      } else if (this.editFlage === true) {
        let findIndex = this.tasks.findIndex((res: any) => {
          return res.id === this.editData.id
        });
        this.tasks[findIndex].title = this.addTaskForm.value.title;
        this.tasks[findIndex].assignee = this.addTaskForm.value.assignee;
        this.tasks[findIndex].dueDate = this.addTaskForm.value.dueDate;
        this.tasks[findIndex].tag = this.addTaskForm.value.tag;
        this.tasks[findIndex].description = this.addTaskForm.value.description;
        this.editFlage = false;
        this.addTaskForm.reset();
      }
    }
  }

  setData(task: any) {
    this.editFlage = true;
    this.addTaskForm.setValue({
      "title": task.title,
      "assignee": task.assignee,
      "dueDate": task.dueDate,
      "tag": task.tag,
      "description": task.description
    });
    this.editData = task;

  }

  addTask() {
    this.addTaskForm.reset();
    this.addFlage = true;
  }

  searchTod(event: any) {
    if (event.target.value === '') {
      this.filteredTasks = this.tasks;
      this.noDataFoundFlag = false;
    } else {
      let filteredTasks = this.filteredTasks ? this.filteredTasks.filter((element: any) => {
        return element.title.trim().toLowerCase().includes(event.target.value.trim().toLowerCase())
      }) : this.tasks.filter((element: any) => {
        return element.title.trim().toLowerCase().includes(event.target.value.trim().toLowerCase())
      });
      if (filteredTasks.length === 0) {
        this.noDataFoundFlag = true;
      } else {
        this.noDataFoundFlag = false;
      }
      this.filteredTasks = filteredTasks;

    }
  }

  tagsFilter(tag: any) {
    let filteredTasks = this.tasks.filter((element: any) => {
      return element.tag === tag
    });
    if (filteredTasks.length === 0) {
      this.noDataFoundFlag = true;
    } else {
      this.noDataFoundFlag = false;
    }
    this.filteredTasks = filteredTasks;
  }

  assigneeFilter(assignee: any) {
    let filteredTasks = this.tasks.filter((element: any) => {
      return element.assignee === assignee.assigneeName
    });

    this.assigneeCheckeBox.forEach((element: any, i: number) => {
      if (element.assigneeName === assignee.assigneeName) {
        this.assigneeCheckeBox[i].checked = true;
      } else {
        this.assigneeCheckeBox[i].checked = false;
      }
    });
    if (filteredTasks.length === 0) {
      this.noDataFoundFlag = true;
    } else {
      this.noDataFoundFlag = false;
    }
    this.filteredTasks = filteredTasks;
  }

  deletTask(task: any) {
    this.tasks = this.tasks.filter((item: any) => item.title !== task.title);
    this.filteredTasks = this.tasks;
  }

  completeTaskCheckBox(task: any, index: number) {
    this.tasks[index].checked = true
  }

  completedTask() {
    this.filteredTasks = this.tasks.filter((res: any) => {
      return res.checked === true
    });
  }

  allData() {
    this.filteredTasks = this.tasks;
  }
}
