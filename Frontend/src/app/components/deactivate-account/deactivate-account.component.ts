import { Component, OnInit } from '@angular/core';
import { DeactivateAccountService } from 'src/app/services/deactivate-account.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deactivate-account',
  templateUrl: './deactivate-account.component.html',
  styleUrls: ['./deactivate-account.component.scss']
})
export class DeactivateAccountComponent implements OnInit {
  candidateData:any = []
  candidate:any = []

  constructor(private deactivateAccountService: DeactivateAccountService, private router: Router) { }

  ngOnInit(): void {
  }

  deactivateAccount(){
    this.candidateData = localStorage.getItem('candidate')
    this.candidate = JSON.parse(this.candidateData)

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.deactivateAccountService.deactivateAccountById(this.candidate.id).subscribe({
          next: (data) => {
            let deleted = data.result[0].fn_delete_account_by_id;
            if(deleted){
              localStorage.clear();
              this.router.navigateByUrl('/',{replaceUrl:true});
              swalWithBootstrapButtons.fire(
                'Deactivated!',
                'Your account has been deactivated.',
                'success'
              )
            }
            console.log("the data: ",data.result[0].fn_delete_account_by_id);
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Failed to deactivate account!'
            })
          }
        })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your account is safe :)',
          'error'
        )
      }
    })
  }

}
