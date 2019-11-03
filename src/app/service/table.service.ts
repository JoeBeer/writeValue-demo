import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {SomeObject} from "../select/select.component";
import {every, some} from "lodash";

export class ContainerObject {
  mainSelect: string;
  subSelect: string;

}

@Injectable({
  providedIn: "root"
})
export class TableService {

  firstMST: SomeObject = {
    value: "firstMainSelect",
    parameters: {firstType: "firstParameter"}
  };

  secondMST: SomeObject = {
    value: "secondMainSelect",
    parameters: {firstType: "firstParameter"}
  };

  thirdMST: SomeObject = {
    value: "thirdMainSelect",
    parameters: {firstType: "firstParameter"}
  };

  firstSST: SomeObject = {
    value: "firstSubSelect",
    parameters: {firstType: "firstParameter", secondType: "firstMainSelect"}
  };

  secondSST: SomeObject = {
    value: "secondSubSelect",
    parameters: {firstType: "firstParameter", secondType: "firstMainSelect, secondMainSelect, thirdMainSelect"}
  };

  thirdSST: SomeObject = {
    value: "thirdSubSelect",
    parameters: {firstType: "firstParameter", secondType: "secondMainSelect, thirdMainSelect"}
  };

  fourthSST: SomeObject = {
    value: "fourthSubSelect",
    parameters: {firstType: "firstParameter", secondType: "firstMainSelect, secondMainSelect, thirdMainSelect"}
  };

  fifthSST: SomeObject = {
    value: "fifthSubSelect",
    parameters: {firstType: "firstParameter", secondType: "thirdMainSelect"}
  };

  mainSelectTable: SomeObject[] = [
    this.firstMST,
    this.secondMST,
    this.thirdMST
  ];

  subSelectTable: SomeObject[] = [
    this.firstSST,
    this.secondSST,
    this.thirdSST,
    this.fourthSST,
    this.fifthSST
  ];

  private selectedMainValue = "firstMainSelect";
  private selectedSubValue = "secondSubSelect";

  private containerObject: ContainerObject = {
    mainSelect: this.selectedMainValue,
    subSelect: this.selectedSubValue
  };

  constructor() {
  }

  getTable(tableId: string, parameters: { [p: string]: string }): Observable<SomeObject[]> {
    return of(
      this.filterTableByParameter(this.selectTable(tableId), parameters)
    );
  }

  private selectTable(tableId: string): SomeObject[] {
    if (tableId === "mainSelectTable") {
      return this.mainSelectTable;
    } else {
      return this.subSelectTable;
    }
  }

  private filterTableByParameter(someObjects: SomeObject[], parameters: { [p: string]: string }): SomeObject[] {
    return someObjects.filter((someObject: SomeObject) => {
      return every(parameters, (requiredValue: string, requiredKey: string) => {
        return some(someObject.parameters, (someObjectValue, someObjectKey) => {
          if (requiredKey === someObjectKey) {
            const someObjectValues: string[] = someObjectValue.split(",");
            if (someObjectValues.some(value => value.trim() === requiredValue)) {
              return true;
            }
          }
          return false;
        });
      });
    });
  }

  getContainerObject(): Observable<ContainerObject> {
    return of(this.containerObject);
  }

  saveContainerObject(updatedContainerObject: ContainerObject): void {
    this.containerObject = updatedContainerObject;
    console.log(this.containerObject);
  }
}
