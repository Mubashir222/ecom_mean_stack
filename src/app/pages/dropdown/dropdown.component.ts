import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { UserServices } from '../../services/user.services';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent implements OnInit{
  dropdownOpen = false;
  dropdownValue = "Religion";
  isDisabled = true;
  option = "";
  dropdownOptions: any[] = [];
  isEdit: number | null = null;
  
  constructor(private userServices: UserServices, private toastr: ToastrService) {}

  ngOnInit() {
    this.getOptions();
  }

  startEditing(i: number) {
    this.isEdit = i;
  }

  cancelEditing() {
    this.isEdit = null;
  }


  handleChangeOption(event: any) {
    const target = event.target;
    this.option = target.value;
    this.isDisabled = false;
  }

  onSubmit() {
    if (this.option === "") {
      this.toastr.error("Please select an option", "Error");
    } else {
      this.userServices.addDropdownOption({ option: this.option }).subscribe({
        next: (res) => {
          this.getOptions();
          this.toastr.success(res.message, "Success");
          this.option = "";
          this.isDisabled = true;
        },
        error: (err) => {
          this.toastr.error(err.error.message, "Error");
        }
      });
    }
  }

  getOptions() {
    this.userServices.getDropdownOptions().subscribe({
      next: (res) => {
        this.dropdownOptions = [];
        for (const obj of res) {
          this.dropdownOptions.push(obj);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  
  }
  
  updateButtonValue(value: any): void {
    this.dropdownValue = value;
    this.dropdownOpen = false;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  updateOption(id: any, option: any) {
    if (option === this.dropdownOptions.find(item => item._id === id)?.option) {
      this.toastr.warning("Please change the option before updating", "Warning");
      return;
    }

    const optionData = { id, option };
    this.userServices.updateDropdownOption(optionData).subscribe({
      next: (res) => {
        const index = this.dropdownOptions.findIndex(item => item._id === id);
        if (index !== -1) {
          this.dropdownOptions[index].option = option;
        }
        this.toastr.success(res.message);
        this.isEdit = null;
        this.option = "";
      },
      error: (err) => {
        this.toastr.error(err.error_code);
        console.log(err);
      }
    });
  }


  deleteOption(_id: any) {
    this.userServices.deleteDropdownOption(_id).subscribe({
      next: (res: any) => {
        const index = this.dropdownOptions.findIndex(item => item._id === _id);
        if (index !== -1) {
          this.dropdownOptions.splice(index, 1);
        }
        this.toastr.success(res.message);
      },
      error: (err) => {
        this.toastr.error(err.error.error_code);
        console.log(err)
      }
    });
  }
}
