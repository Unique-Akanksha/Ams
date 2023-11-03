import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { LeaveService } from 'src/app/admin/leave/data-access/leave.service';

@Component({
  selector: 'app-add-edit-leave',
  templateUrl: './add-edit-leave.page.html',
  styleUrls: ['./add-edit-leave.page.scss'],
})
export class AddEditLeavePage implements OnInit {

  leaveRequestForm!: FormGroup;
  loginEmployeeName = '';
  loginEmployeeID = 0;


  constructor(private fb:FormBuilder, private leaveRequestService:LeaveService, private toastController: ToastController) { }

  ngOnInit() {
    this.leaveRequestForm = this.fb.group({
      employee_id: ['', Validators.required],
      leave_type: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      reason: ['', [Validators.required]],
      created_at: ['', [Validators.required]],
    });

    const userJson = localStorage.getItem('user');

     if (userJson){
       const user = JSON.parse(userJson);
       this.loginEmployeeID = user.employee_id;
       this.loginEmployeeName = user.first_name + ' ' + user.last_name;
     }

     this.leaveRequestForm.patchValue({
      employee_id: this.loginEmployeeName
    });
  }

  applyLeave(){
    const leaveRequestsData = this.leaveRequestForm.value;
    console.log("Leave data : ",leaveRequestsData);
    leaveRequestsData.employee_id = this.loginEmployeeID;
    leaveRequestsData.status = 'Requested';
    
    this.leaveRequestService.createLeaveRequest(
      leaveRequestsData,
      async (message) => {
        console.log("Response: ", message);
        if (message === "LeaveRequest already exists") {
          const toast = await this.toastController.create({
            message: "LeaveRequest already exists",
            duration: 3000, 
            position: 'bottom', 
            color: 'danger', 
          });
          toast.present();
        }
        else{
          const toast = await this.toastController.create({
            message: "LeaveRequest inserted successfully",
            duration: 3000, 
            position: 'bottom', 
            color: 'success', 
          });
          toast.present();
        }
      },
      (error) => {
        console.log('Error: ' + error);
      }
    );
    this.leaveRequestForm.reset();
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault(); 
  }

}
