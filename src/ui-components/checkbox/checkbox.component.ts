import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<input type="checkbox"  (change)="onChange($event)" class="checkbox" #input />`,
  styleUrls: ['./checkbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {
  @Input() checked = false;

  @Output() handleClick = new EventEmitter<boolean>();
  @ViewChild("input") inputRef!: ElementRef;
  constructor(private renderer: Renderer2) { }
  ngAfterViewInit() {
    this.setChecked()
  }
  setChecked() {
    if (this.checked) {
      this.renderer.setAttribute(this.inputRef.nativeElement, "checked", "true")
    }
    else {
      this.renderer.removeAttribute(this.inputRef.nativeElement, "checked")
    }
  }
  onChange(event: Event) {
    this.checked = !this.checked;
    this.setChecked()
    this.handleClick.emit(this.checked);
  }
}
