
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatDialogModule } from '@angular/material';
import { MatInputModule} from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: 
  [CommonModule,
  RouterModule,
  MatFormFieldModule,
  MatInputModule,
  ToastrModule.forRoot(),
  MatDialogModule
  ],
  exports: [
    HeaderComponent,
    ToastrModule,
  ],
  declarations: [HeaderComponent],
})
export class SharedModule { }
