import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  BusinessDTO,
  FaqDTO,
  TeamMemberDTO,
  ScheduleDTO,
  Service,
  OfferDTO,
  ServicesListDTO,
  BusinessRuleIdDTO
} from '@app/core/models/business';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http: HttpClient) { }

  getMyBusinesses = (): Observable<{ data: { businesses: BusinessDTO[] } }> => {
    return this.http.get<{ data: { businesses: BusinessDTO[] } }>('businesses/me');
  }

  getOffers = (): Observable<OfferDTO[]> => {
    return this.http.get<OfferDTO[]>('offer');
  }

  getMyOffers = (): Observable<OfferDTO[]> => {
    return this.http.get<OfferDTO[]>('offer/my-offers');
  }

  getBusinessById = (id: string): Observable<{data: { business: BusinessDTO } }> => {
    return this.http.get<{ data: { business: BusinessDTO } }>(`businesses/${id}`)
  }

  getOfferById = (id: string): Observable<OfferDTO> => {
    return this.http.get<OfferDTO>(`offer/${id}`)
  }

  getFAQByBusinessId = (id: string): Observable<{data: { faqs: FaqDTO[]} }> => {
    return this.http.get<{ data: { faqs: FaqDTO[]} }>(`faq/${id}`)
  }

  getServicesByBusinessId = (id: string): Observable<ServicesListDTO> => {
    return this.http.get<ServicesListDTO>(`services/${id}`).pipe(pluck('data', 'service'))
  }

  getTeamMembersByBusinessId = (id: string): Observable<{ data: { success: boolean, teamMembers: TeamMemberDTO[] }}> => {
    return this.http.get<{ data: { success: boolean, teamMembers: TeamMemberDTO[] } }>(`team-member/${id}`)
  }

  getTimeSlotsByDate = (businessId: string, date: string): Observable<{ schedule: ScheduleDTO, disable: boolean}[]> => {
    return this.http.get<{ schedule: ScheduleDTO, disable: boolean}[]>(`request/slots/${date}/${businessId}`);
  }

  editServices = (businessId: string, params: Service[]): Observable<Service[]> => {
    return this.http.put<Service[]>(`services/serviceList/${businessId}`, params).pipe(pluck('result', 'servicesList'));
  }

  editSchedules = (businessId: string, params: ScheduleDTO[]): Observable<ScheduleDTO[]> => {
    return this.http.put<ScheduleDTO[]>(`services/schedule/${businessId}`, params).pipe(pluck('result', 'scheduleList'));
  }


  updateFaq = (params: FaqDTO[]): Observable<FaqDTO[]> => {
    return this.http.put<FaqDTO[]>(`faq`, params).pipe(pluck('result'));
  }

  updateRules = (params, businessId: string): Observable<BusinessRuleIdDTO[]> => {
    return this.http.put<BusinessRuleIdDTO[]>(`businesses/rule/${businessId}`, params).pipe(pluck('result'));
  }

  updateTeamMembers = (params) => {
    return this.http.put(`team-member`, params).pipe(pluck('result'));
  }

  toggleAvailabilityService = (params: Service): Observable<any> => (
    this.http.patch<any>(`services/serviceList/${params._id}`, params)
  )

  deleteBusiness = (businessId: string, password: string) => {
    const options = {
      headers: new HttpHeaders(),
      body: {
        password
      },
    };
    return this.http.delete(`businesses/${businessId}`, options)
  }

  toggleBusinessStatus = (businessId: string) => {
    return this.http.post(`businesses/available/${businessId}`, {});
  }

}
