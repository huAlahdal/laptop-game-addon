import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggingDirective } from './dragging.directive';
import { DraggingHandleDirective } from './dragging-handle.directive';




@NgModule({
  declarations: [
    DraggingDirective,
    DraggingHandleDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DraggingDirective,
    DraggingHandleDirective,
  ], // Added
})
export class SharedModule { }
