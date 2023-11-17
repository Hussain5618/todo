import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../types';
import { ButtonComponent } from '../../ui-components/button/button.component';
import { CheckboxComponent } from '../../ui-components/checkbox/checkbox.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule, ButtonComponent, CheckboxComponent
  ],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  onDelete(todo: Todo) {
    this.handleDelete.emit(todo.id)
  }
  onUpdate(todo: Todo) {
    this.handleUpdate.emit({ id: todo.id, currentTodo: todo })
  }
  setFilter(filter: string) {
    this.activeFilter = filter;
  }
  @Input() list!: Todo[];
  @Output() handleDelete = new EventEmitter<number>();
  @Output() handleUpdate = new EventEmitter<{ id: number, currentTodo: Todo }>();
  @Output() handleChecked = new EventEmitter<{ id: number, currentTodo: Todo }>();
  onChecked(todo: Todo) {
    this.handleChecked.emit({ id: todo.id, currentTodo: todo })
  }
  activeFilter: string = "all";
  get filteredList() {
    if (this.activeFilter === "all") {
      return this.list
    }
    else if (this.activeFilter === "done") {
      return this.list.filter((todo) => todo.isDone)
    }
    else {
      return this.list.filter((todo) => !todo.isDone)
    }
  }
}
