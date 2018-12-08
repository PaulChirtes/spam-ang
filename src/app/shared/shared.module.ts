
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatHint } from '@angular/material';

@NgModule({
  imports: 
  [RouterModule,
  MatFormFieldModule
  ],
  exports: [HeaderComponent],
  declarations: [HeaderComponent],
})
export class SharedModule { }
