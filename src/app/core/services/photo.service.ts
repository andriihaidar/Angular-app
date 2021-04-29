import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, CameraPhoto, CameraSource } from '@capacitor/core';
import { BehaviorSubject } from 'rxjs';
import { Photo, ServicePhotosList } from '@app/core/models/photo';
import { SourceTypes, PhotoTypes } from 'constants/components.constants';

const { Camera } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public profilePhoto$: BehaviorSubject<Photo> = new BehaviorSubject<Photo>({} as Photo);
  public chatPhotos$: BehaviorSubject<Photo[]> = new BehaviorSubject<Photo[]>([] as Photo[]);
  public requestPhotos$: BehaviorSubject<Photo[]> = new BehaviorSubject<Photo[]>([] as Photo[]);
  public extraCostPhotos$: BehaviorSubject<Photo[]> = new BehaviorSubject<Photo[]>([] as Photo[]);
  public coverPhoto$: BehaviorSubject<Photo> = new BehaviorSubject<Photo>({} as Photo)
  public servicePhotos$: BehaviorSubject<ServicePhotosList[]> = new BehaviorSubject([] as ServicePhotosList[]);

  constructor() { }

  public async uploadPhoto(
    serviceName = '',
    photoType = PhotoTypes.PROFILE,
    source = SourceTypes.CAMERA
  ) {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource[source],
      quality: 100,
    });
    const savedImageFile = await this.savePicture(capturedPhoto);
    switch (photoType) {
      case PhotoTypes.PROFILE: {
        this.profilePhoto$.next(savedImageFile);
        break;
      }
      case PhotoTypes.CHAT: {
        this.chatPhotos$.next([ savedImageFile, ...this.chatPhotos$.value ]);
        break;
      }
      case PhotoTypes.COVER: {
        this.coverPhoto$.next(savedImageFile);
        break;
      }
      case PhotoTypes.SERVICE: {
        const servicePhotosCopy = [...this.servicePhotos$.value];
        const serviceIdx = servicePhotosCopy.findIndex((service) => service.serviceName === serviceName);
        if (serviceIdx !== -1) {
          servicePhotosCopy[serviceIdx].photos = [ savedImageFile, ...servicePhotosCopy[serviceIdx].photos ];
        }
        this.servicePhotos$.next(servicePhotosCopy);
        break;
      }
      case PhotoTypes.REQUEST: {
        this.requestPhotos$.next([ ...this.requestPhotos$.value, savedImageFile ]);
        break;
      }
      case PhotoTypes.EXTRA_COST: {
        this.extraCostPhotos$.next([ ...this.extraCostPhotos$.value, savedImageFile ]);
        break;
      }
    }
  }

  discardServicePhoto() {
    this.coverPhoto$.next(null);
  }

  deleteUploadedPhoto(
    serviceName = '',
    photoWebviewPath = '',
    photoType = PhotoTypes.PROFILE,
    empty = false,
  ) {
    switch (photoType) {
      case PhotoTypes.PROFILE: {
        this.profilePhoto$.next({} as Photo);
        break;
      }
      case PhotoTypes.COVER: {
        this.coverPhoto$.next({} as Photo);
        break;
      }
      case PhotoTypes.CHAT: {
        if (empty) {
          this.chatPhotos$.next([]);
        } else {
          this.deletePhoto(this.chatPhotos$, photoWebviewPath);
        }
        break;
      }
      case PhotoTypes.REQUEST: {
        this.deletePhoto(this.requestPhotos$, photoWebviewPath);
        break;
      }
      case PhotoTypes.EXTRA_COST: {
        if (empty) {
          this.extraCostPhotos$.next([])
        } else {
          this.deletePhoto(this.extraCostPhotos$, photoWebviewPath);
        }
        break;
      }
      case PhotoTypes.SERVICE: {
        const servicePhotosCopy = [...this.servicePhotos$.value];
        const serviceIdx = servicePhotosCopy.findIndex((service) => service.serviceName === serviceName);
        if (serviceIdx !== -1) {
          const photosListCopy = [...servicePhotosCopy[serviceIdx].photos];
          const photoIdx = photosListCopy.findIndex((photo) => photo.webviewPath ===  photoWebviewPath);
          if (photoIdx !== -1) {
            photosListCopy.splice(photoIdx, 1);
          }
          servicePhotosCopy[serviceIdx].photos = photosListCopy;
        }
        this.servicePhotos$.next(servicePhotosCopy);
        break;
      }
    }
  }

  deletePhoto(array: BehaviorSubject<Photo[]>, photoWebviewPath: string) {
    const photoIdx = array.value.findIndex((photo) => photo.webviewPath ===  photoWebviewPath);
    array.next([ ...array.value.slice(0, photoIdx), ...array.value.slice(photoIdx + 1) ]);
  }

  public async savePicture(cameraPhoto: CameraPhoto) {
    const blob = await this.readAsBlob(cameraPhoto);
    const base64 = await this.readAsBase64(cameraPhoto);
    const fileName = new Date().getTime().toString();
    return {
      filepath: fileName,
      webviewPath: cameraPhoto.webPath,
      blob,
      base64,
      format: cameraPhoto.format
    };
  }

  async readAsBlob(cameraPhoto: CameraPhoto) {
    // tslint:disable-next-line:no-non-null-assertion
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();
    return blob;
  }

  async readAsBase64(cameraPhoto: CameraPhoto) {
    const blob = await this.readAsBlob(cameraPhoto);
    return await this.convertBlobToBase64(blob) as string;
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    // tslint:disable-next-line:new-parens
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

}
