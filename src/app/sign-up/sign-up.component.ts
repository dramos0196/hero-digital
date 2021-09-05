import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpService } from '../services/sign-up.service';

export interface Response {
  status: string;
  message: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public form: FormGroup = new FormGroup({});
  public formErrors: boolean = false;
  public formSubmitted: boolean = false;
  public response: Response;

  public checks: Array<any> = [
    { description: 'ADVANCES', value: 'advances' },
    { description: "ALERTS", value: 'alerts' },
    { description: "OTHER COMMUNICATIONS", value: 'other' }
  ];

  constructor(
    private fb: FormBuilder,
    private signUpService: SignUpService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  /*
   * This method creates the form
  */
  createForm() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      orgname: [''],
      euResident: ['', Validators.required],
      // fieldName: this.fb.group({}),
    })
  }

  get firstName() { return this.form.get('firstName'); }
  get lastName() { return this.form.get('lastName'); }
  get email() { return this.form.get('email'); }
  get orgname() { return this.form.get('orgname'); }
  get euResident() { return this.form.get('euResident'); }

  /**
   * @description
   * Handles the selection of a checkbox
   */
  onCheckChange(event) {
    if (event.target.checked) {
      this.form.addControl('fieldName', new FormControl(event.target.value, Validators.required));
    }
  }


  /**
   * @description
   * Method called when the "onsubmit" event is triggered on the form.
   */
  onSubmit() {
    if (this.form.controls.fieldName && Object.keys(this.form.controls.fieldName).length !== 0 && this.form.valid) {
      this.formErrors = false;

      this.signUpService.signUp(this.form.value).subscribe(resp => {

        this.response = {
          "status": "success",
          "message": "Thank you. You are now subscribed."
        };
        this.formSubmitted = true;

      }, error => {
        this.formSubmitted = true;
        this.response = error;
      });

    } else {
      this.formErrors = true;
    }
  }

  /**
   * @description
   * Method called when the "reset" event is triggered on the form.
   */
  onReset(): void {
    this.resetForm();
  }

  /**
   * @description
   * Resets the form to an initial value and resets its submitted status.
   *
   * @param value The new value for the form.
   */
  resetForm(value: any = undefined): void {
    this.form.reset(value);
    this.formErrors = false;
  }

  /**
   * go back to the form
   */
  back() {
    this.resetForm();
    this.formSubmitted = false;
  }
}
