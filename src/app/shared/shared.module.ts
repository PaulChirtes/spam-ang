
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: 
  [RouterModule,
  MatFormFieldModule,
  ToastrModule.forRoot(),
  ],
  exports: [
    HeaderComponent,
    ToastrModule,
  ],
  declarations: [HeaderComponent],
})
export class SharedModule { }
