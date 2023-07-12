import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { DetailsServiceService } from '../service/details-service.service';

@Component({
  selector: 'app-upload-excel',
  templateUrl: './upload-excel.component.html',
  styleUrls: ['./upload-excel.component.css']
})
export class UploadExcelComponent {
  exceldata: any
  successMessage: boolean = false;
  constructor(private detailService: DetailsServiceService) { }

  // Function to read the uploaded Excel file
  readExcel(event: any) {

    const file = event.target.files[0];

    const fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = (e) => {

      // Reading binary data from the Excel sheet
      const workBook = XLSX.read(fileReader.result, { type: 'binary' });
      const sheetNames = workBook.SheetNames;

      //converting sheetdata to json
      this.exceldata = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]])

      this.detailService.addDetails(this.exceldata);
      this.detailService.postDetails.subscribe(response => {

        if (response.status === 200) {
          this.successMessage = true;
        }


      });
    };
  }
}
