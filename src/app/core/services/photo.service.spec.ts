import { TestBed } from '@angular/core/testing';
import { CameraPhoto } from '@capacitor/core'
import { PhotoService } from './photo.service';


describe('PhotoService', () => {
  let service: PhotoService;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add photo', () => {
    service.uploadPhoto();
    expect(service.profilePhoto$.value).toBeTruthy();
  });

  it('should read as blob', () => {
    const fakeData = {} as CameraPhoto;
    const res = service.readAsBlob(fakeData);
    expect(typeof res).toEqual('object');
  });

  it('should call save picture blob', () => {
    const fakeData = {} as CameraPhoto;
    const readAsBlob = spyOn(service, 'readAsBlob');
    service.savePicture(fakeData);
    expect(readAsBlob).toHaveBeenCalled()
  });

  it('should read as base 64', () => {
    const fakeData = {} as CameraPhoto;
    const res = service.readAsBase64(fakeData);
    expect(typeof res).toEqual('object');
  })

});
