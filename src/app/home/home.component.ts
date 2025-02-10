import {Component, ElementRef, ViewChild} from '@angular/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('myDialog') dialogRef!: ElementRef<HTMLDialogElement>;

  openDialog() {
    this.dialogRef.nativeElement.showModal();
  }

  closeDialog() {
    this.dialogRef.nativeElement.close();
  }
}
