import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ContainerObject, TableService} from "./service/table.service";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

  form: FormGroup;
  containerObject: ContainerObject;

  selectedMainValue: string;

  constructor(private tableService: TableService,
              private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.tableService.getContainerObject()
      .subscribe(containerObject => {
        this.containerObject = containerObject;
        this.selectedMainValue = containerObject.mainSelect;
        this.initForm();
      });
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      mainSelect: [this.containerObject.mainSelect, Validators.required],
      subSelect: [this.containerObject.subSelect, Validators.required]
    });
    this.subscribeToMainSelectChanged();
    this.subscribeToSubSelectChanged();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.containerObject.mainSelect = this.form.get("mainSelect").value;
      this.containerObject.subSelect = this.form.get("subSelect").value;
      this.tableService.saveContainerObject(this.containerObject);
    }
  }

  private subscribeToMainSelectChanged() {
    this.form.get("mainSelect").valueChanges
      .subscribe(mainSelect => {
        this.selectedMainValue = mainSelect;
        console.log(this.form.status);
      });
  }

  private subscribeToSubSelectChanged() {
    this.form.get("subSelect").valueChanges
      .subscribe(() => {
        console.log(this.form.status);
      });
  }
}
