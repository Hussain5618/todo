import { Component, SimpleChange } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../ui-components/button/button.component';
import { InputComponent } from '../ui-components/text-input/text-input.component';
import { CheckboxComponent } from '../ui-components/checkbox/checkbox.component';
import { Todo } from './types';
import { TodoListComponent } from './todo-list/todo-list.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ButtonComponent,
    FormsModule,
    InputComponent,
    CheckboxComponent,
    TodoListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  handleChecked($event: { id: number; currentTodo: Todo; }) {
    this.todoList = this.todoList.map((todo) => {
      if (todo.id === $event.id) {
        return { ...todo, isDone: !todo.isDone }
      }
      return todo;
    });
  }
  inputText = '';
  todoList: Todo[] = [{ id: 0, text: 'test', isDone: true }];
  isEditing: boolean = false;
  todo: Todo = { id: 0, text: '', isDone: false };
  addTodo() {
    this.todoList = [
      ...this.todoList,
      { id: this.todoList.length, text: this.inputText, isDone: false },
    ];
    this.inputText = '';

  }
  deleteTodo(id: number) {
    this.todoList = this.todoList.filter((todo) => todo.id !== id);
  }
  setCurrentTodo({ id, currentTodo }: { id: number, currentTodo: Todo }) {
    this.inputText = currentTodo.text;
    this.todo = currentTodo;
    this.isEditing = true
  }
  updateTodo() {
    this.todoList = this.todoList.map((todo) => {
      if (todo.id === this.todo.id) {
        return { ...todo, text: this.inputText }
      }
      return todo;
    });
    this.inputText = "";
    this.isEditing = false;
  }
  get disabled() {
    return this.inputText.trim().length === 0;

  }

}
