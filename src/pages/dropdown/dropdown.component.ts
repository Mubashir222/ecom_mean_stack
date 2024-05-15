import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownServices } from './dropdown.service';
import { faPen, faTrash, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoaderComponent } from 'src/components/loader/loader.component';
import { LoadingComponent } from 'src/components/loading/loading.component';


@Component({
  selector: 'app-dropdown',
  standalone: true,
  // imports: [CommonModule, ReactiveFormsModule, FormsModule],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, FontAwesomeModule, LoaderComponent, LoadingComponent],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent implements OnInit{
  penIcon = faPen;
  trashIcon = faTrash;
  checkIcon = faCheck;
  xmarkIcon = faXmark;
  isLoader = false;
  loading = false;

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



  constructor(private dropdownServices: DropdownServices, private toastr: ToastrService) {}

  ngOnInit() {
    this.isLoader = true;
    this.getOptions();
    this.getOptionData();
    setInterval(() => {
      this.isLoader = false;
    }, 1000);
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
      this.dropdownServices.addDropdownOption({ option: this.option }).subscribe({
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
    this.dropdownServices.getDropdownOptions().subscribe({
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
    this.dropdownServices.updateDropdownOption(optionData).subscribe({
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
    this.dropdownServices.deleteDropdownOption(_id).subscribe({
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
    this.dropdownServices.addOptionData(optionData).subscribe({
      next: (res) => {
        this.toastr.success(res.message, "Success");
        this.getOptionData();
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
    this.loading = true;
    this.dropdownServices.getOptionData().subscribe({
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
    setInterval(() => {
      this.loading = false;
    }, 1000);
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
  }

  // ----------------------------------------- Nested Option Update -----------------------------------------
  isEditNestedOption: number | null = null;;
  editNestedOption: string = "";

  startEditingNestedOption(i: number, id: any) {
    this.isEditNestedOption = i;
    this.editNestedOption = this.optionData.find(item => item._id === id)?.data
  }

  cancelEditingNestedOption() {
    this.isEditNestedOption = null;
    this.editNestedOption = "";
  }

  updateNestedOption(id: string, optionData: string){
    if(!id && !optionData){
      this.toastr.error("Please select an option", "Error");
      return;
    }
    this.dropdownServices.updateNestedOption({_id: id, optionData: optionData}).subscribe({
      next: (res) => {
        this.toastr.success(res.message, "Success");
        this.isEditNestedOption = null;
        this.editNestedOption = "";
      },
      error: (err) => {
        this.toastr.error(err.error.message, "Error");
      }
    });
  }


  //-------------------------------------Delete Nested Option------------------------------------- 

  deleteNestedOption(id: string){
    this.dropdownServices.deleteNestedOption(id).subscribe({
      next: (res) => {
        const index = this.optionData.findIndex(item => item._id === id);
        if (index !== -1) {
          this.optionData.splice(index, 1);
        }
        this.toastr.success(res.message, "Success");
      },
      error: (err) => {
        this.toastr.error(err.error.message, "Error");
      }
    });
  }

}
