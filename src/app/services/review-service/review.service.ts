import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthDataStorage } from 'src/app/security/auth-data-storage';
import { Observable } from 'rxjs';
import { Review } from 'src/app/shared/data-types/review';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient,
    private service : AuthDataStorage) { }

    public postReview(review: Review): Observable<any> {
      var url = `${environment.apiUrl}/review`;
      var httpOptions = {
        headers: new HttpHeaders({'token': this.service.getJwtToken()})
      };
      return this.http.post(url,review,httpOptions);
    }
}
