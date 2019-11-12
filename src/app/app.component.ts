import { Component, ViewChild, ElementRef, } from '@angular/core';

import { Base64EncodedImage } from './base64-encoded-image';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  imageSrc = Base64EncodedImage;

  @ViewChild("video")
  public video: ElementRef;

  selectFile(event: any) {
    const file = event.target.files.item(0);
    const reader = new FileReader();
    reader.onload = (e: any) => this.imageSrc = e.target.result;
    reader.readAsDataURL(file);
  }
  ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { width: 240, height: 240 } }).then(stream => {
        try {
          this.video.nativeElement.srcObject = stream;
        } catch (error) {
          this.video.nativeElement.src = window.URL.createObjectURL(stream);
        }
        // this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      });
    }

  }
}
