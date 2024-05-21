import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownServices } from './dropdown.service';
import { LoaderComponent } from 'src/components/loader/loader.component';
import { heroTrash, heroPencil } from '@ng-icons/heroicons/outline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {bootstrapXLg, bootstrapCheckLg} from "@ng-icons/bootstrap-icons"
import { LoadingComponent } from 'src/components/loading/loading.component';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, LoaderComponent, NgIconComponent, LoadingComponent],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
  viewProviders: [provideIcons({ heroTrash, heroPencil, bootstrapCheckLg, bootstrapXLg })]
})

export class DropdownComponent implements OnInit{
  isLoader: boolean = false;
  optionLoading: boolean = false;

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
    this.option = event.target.value;
    this.isDisabled = false;
  }

  onSubmit() {
    if (this.option === "") {
      this.toastr.error("Please select an option", "Error");
    } else {
      this.optionLoading = true;
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
      setInterval(() => {
        this.optionLoading = false;
      }, 1000);  
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
        this.childDropdownValue = this.dropdownOptions[0].option;
        this.OptionSelected = this.dropdownOptions[0]._id;
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
    this.optionLoading = true;

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
    
    setInterval(() => {
      this.optionLoading = false;
    }, 1000);
  }


  getOptionData(){
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
