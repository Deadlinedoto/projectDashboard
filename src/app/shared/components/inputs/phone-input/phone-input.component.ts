// import {ChangeDetectorRef, Component, forwardRef} from '@angular/core';
// import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
// import {InputMask} from 'primeng/inputmask';
//
// @Component({
//   selector: 'app-phone-input',
//   standalone: true,
//   imports: [
//     InputMask,
//     FormsModule
//   ],
//   templateUrl: './phone-input.component.html',
//   styleUrl: './phone-input.component.scss',
//   providers: [
//     {
//       provide: NG_VALUE_ACCESSOR,
//       multi: true,
//       useExisting: forwardRef(() => PhoneInputComponent),
//     }
//   ]
// })
// export class PhoneInputComponent implements ControlValueAccessor {
//   public value: string;
//   public disabled = false;
//   public readonly phoneMask: '+7(999)999-99-99' = PHONE_MASK
//
//   constructor(private _cdr: ChangeDetectorRef) {}
//
//   onModelChange(): void {
//     this._onChange(this.value)
//   }
//   onBlur(): void {
//     this._onTouched()
//   }
//   writeValue(obj: any) {
//     this.value = obj;
//   }
// }
