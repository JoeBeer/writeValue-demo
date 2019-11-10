import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {TableService} from "../service/table.service";

export class SomeObject {
  value: string;
  parameters: {[parameterName: string]: string} = {};
}

@Component({
  selector: "app-select",
  templateUrl: "./select.component.html",
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SelectComponent,
    multi: true
  }]
})
export class SelectComponent implements ControlValueAccessor, OnChanges {
  @ViewChild("select", {static: true}) select: ElementRef;
  @Input() tableId: string;
  @Input() filter: { [parameterName: string]: string};

  returnedTable: SomeObject[];

  onChange: (_: any) => void;
  onTouched: () => void;

  selected: string;

  constructor(private tableService: TableService) { }

  loadTable(): void {
    this.tableService.getTable(this.tableId, this.filter)
      .subscribe(table => {
        this.returnedTable = table;
        if (!!this.select && !!this.select.nativeElement.value) {
          this.writeValue(this.select.nativeElement.value);
          this.onChange(this.selected);
        }
      });
  }

  ngOnChanges(): void {
    this.loadTable();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: string): void {
    if (!!this.returnedTable && !this.returnedTable.some(item => item.value === value)) {
      this.selected = null;
    } else {
      this.selected = value;
    }
  }
}
