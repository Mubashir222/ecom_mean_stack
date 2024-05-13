import { Component, OnInit } from '@angular/core';
import { UserServices } from '../../services/user.services';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-dropdown',
  standalone: true,
  // imports: [CommonModule, ReactiveFormsModule, FormsModule],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent implements OnInit{
  dropdownOpen = false;
  dropdownValue = "Country";
  isDisabled = true;
  option = "";
  dropdownOptions: any[] = [];
  isEdit: number | null = null;
  editOption: string = "";
  isSettingsOpen = false;
  

  //-------------------------------------Dropdown Option Data------------------------------------- 
  optionDataValue: string = "";
  isChildDropdownOpen = false;
  selectedOptionId = "";
  isEmptyDataInput = true;
  childDropdownValue = "Country";
  optionData: any[] = [];
  OptionSelected: string = "";
  isOptionHasData = true;



  constructor(private userServices: UserServices, private toastr: ToastrService) {}

  ngOnInit() {
    this.getOptions();
    this.getOptionData();
  }

  startEditing(i: number, id: any) {
    this.isEdit = i;
    this.editOption = this.dropdownOptions.find(item => item._id === id)?.option
    console.log(this.editOption, id)
  }

  cancelEditing() {
    this.isEdit = null;
    this.editOption = "";
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
    if(this.dropdownOptions.length>0){
      this.dropdownOpen = !this.dropdownOpen;
    }else {
      this.toastr.info("No options available", "Info");
    }
  }

  updateOption(id: any, option: any) {
    if (option === this.editOption) {
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


    //-------------------------------------Dropdown Option Data------------------------------------- 

  toggleChildDropdownOpen(){
    this.isChildDropdownOpen = !this.isChildDropdownOpen;

  }

  toggleChildDropdown(id: any, value: any) {
    this.childDropdownValue = value;
    this.selectedOptionId = id;
    this.isChildDropdownOpen = false;
  }

  isButtonDisabled(): boolean {
    if(this.childDropdownValue!=="Country" && this.isEmptyDataInput===false){
      return false;
    }
    return true;
}

  addOptionData(){
    const optionData = { optionId: this.selectedOptionId, optionData: this.optionDataValue}
    this.userServices.addOptionData(optionData).subscribe({
      next: (res) => {
        this.toastr.success(res.message, "Success");
        this.childDropdownValue = "Country";
        this.optionDataValue = "";
        this.isEmptyDataInput = true;
      },
      error: (err) => {
        this.toastr.error(err.error.message, "Error");
      }
    });
  }


  getOptionData(){
    this.userServices.getOptionData().subscribe({
      next: (res) => {
        this.optionData = [];
        for (const obj of res) {
          this.optionData.push(obj);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  toggleOptionDataSelected(value: any){
    const isOptionData = this.optionData.find(item => item.optionId === value);
    if(isOptionData===undefined || isOptionData===null){
      this.isOptionHasData = false;
    }
    else{
      this.isOptionHasData = true;
    }
    this.OptionSelected = value;
    console.log(this.isOptionHasData);
  }

}
