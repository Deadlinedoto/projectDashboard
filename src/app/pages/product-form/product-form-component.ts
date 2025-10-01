import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {CategoryApi} from '../../features/categories/services/category-api';
import {CategoryInterface} from '../../features/categories/interfaces';
import {TreeSelect, TreeSelectModule} from 'primeng/treeselect';
import {tap} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {TreeTableModule} from 'primeng/treetable';
import {CommonModule} from '@angular/common';
import {AuthStateService} from '../../features/auth/components/auth/services';
import {ButtonComponent} from '../../shared/components/ui/button';
import {FileUpload} from 'primeng/fileupload';
import {DadataService} from '../../features/dadata/dadata.service';



@Component({
  selector: 'app-product-form',
  imports: [
    CommonModule,
    TreeTableModule,
    TreeSelect,
    FormsModule,
    TreeSelectModule,
    ButtonComponent,
    FileUpload,
  ],
  templateUrl: './product-form-component.html',
  styleUrl: './product-form-component.scss',
  standalone: true,
})


export class ProductFormComponent implements OnInit {
  addressQuery: string = '';
  addressSuggestions: any[] = [];
  selectedAddress: string = '';

  onAddressInput() {
    this.dadataService.checkApiKey()
    if (this.addressQuery.length < 3) {
      this.addressSuggestions = [];
      return;
    }


    this.dadataService.completeAddress(this.addressQuery).subscribe({
      next: (response: any) => {
        this.addressSuggestions = response.suggestions || [];
      },
      error: (error) => {
        console.error('Dadata error:', error);
      }
    });

  }
  selectAddress(suggestion: any) {
    this.selectedAddress = suggestion.value;
    this.addressSuggestions = [];
    console.log('Выбран адрес:', suggestion);
  }





  uploadedFiles: any[] = [];

  onUpload(event: any ) {
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }








  dadataService = inject(DadataService)
  categoriesApi = inject(CategoryApi);
  authStateService = inject(AuthStateService);
  cd = inject(ChangeDetectorRef);


  nodes: any[] = [];
  nudesArray: any[] = [];
  nudes!: CategoryInterface;
  currentCategories: any[] = [];
  selectedNodes: any;

  ngOnInit() {
    this.loadCategories()
  }

  loadCategories() {
    this.categoriesApi.getAllCategories()
      .pipe(
        tap(
          (response) => {
            this.nodes = []
            response.forEach((value) => {
              this.nodes.push({
                label: value.name,
                id: value.id,
              });
              this.categoriesApi.getCategoryWithChildren(value.id)
              .pipe(
                tap(
                  (response) => {
                    this.nudes = response
                  }
                )
              )
                console.log(this.nudes)




              // this.categoriesApi.getCategoryWithChildren(value.id).subscribe(
              //   (res) => {
              //     response.forEach((value) => {
              //       this.nudesArray.push({
              //         label: value.name,
              //         id: value.id,
              //         children: [value.childs]
              //       });
              //     })
              //   }
              // )
            }
            )

          })

      )
      .subscribe()
  }



  // ngOnInit() {
  //   this.categoriesApi.getAllCategories()
  //     .pipe(
  //       tap(
  //         (response) => {
  //           this.nodes = [];
  //           response.forEach((value) => {
  //             this.nodes.push({
  //               label: value.name,
  //               value: value.id,
  //             })
  //             if (value.name === "00000000-0000-0000-0000-000000000000") {
  //               console.log('Родитель!!')
  //             }
  //           })
  //           console.log('для списка:', this.nodes)
  //         }
  //       )
  //     )
  //     .subscribe()
  //
  //
  // }


}
