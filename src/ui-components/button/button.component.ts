import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<button (click)="onClick()"  [ngClass]="classStyle" #button>{{text}}</button>`,
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() variant = "";
  @Input() text = "";
  @Output() handleClick = new EventEmitter<void>();
  @Input() disabled = false;
  @ViewChild("button") buttonRef!: ElementRef;
  constructor(private rendered: Renderer2) {

  }

  ngAfterViewInit() {
    this.setDisabled()
  }
  ngOnChanges() {
    if (this.buttonRef) {
      this.setDisabled()
    }
  }
  setDisabled() {
    if (this.disabled) {
      this.rendered.setAttribute(this.buttonRef.nativeElement, "disabled", "true")

    }
    else {
      this.rendered.removeAttribute(this.buttonRef.nativeElement, "disabled")
    }
  }
  onClick() {
    this.handleClick.emit();
  }

  get classStyle() {
    switch (this.variant) {
      case "primary":
        return "btn btn-primary";
      case "secondary":
        return "btn btn-secondary";
      default:
        return 'btn'
    }
  }

}
