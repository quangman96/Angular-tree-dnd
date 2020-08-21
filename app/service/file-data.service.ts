import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FileNode } from '../model/FileNode';
import { DepartmentService } from 'src/app/services/department.service';
import { true_data } from 'src/app/pages/company-organization/organizational-chart/model/data';
@Injectable({
  providedIn: 'root',
})
export class FileDataService {
  tmpDataList = [];
  dataListDepartment = [];
  dataChange = new BehaviorSubject<FileNode[]>([]);

  get data(): FileNode[] {
    return this.dataChange.value;
  }

  constructor(private departmentService: DepartmentService) {
    this.initialize();
  }

  async initialize() {
    await this.callDataSource();
    const data = this.dataListDepartment;
    this.dataChange.next(data);
  }

  callDataSource = async () => {
    await this.departmentService.getDepartment().then((res) => {
      this.tmpDataList = Object.assign([], res.data);
      this.dataListDepartment = this.nestData(this.tmpDataList);
    });
  };

  nestData = (data, parentId = '') => {
    return data.reduce((result, fromData) => {
      const obj = Object.assign({}, fromData);

      if (parentId === fromData.parent_id) {
        const children = this.nestData(data, fromData.id);
        if (children.length) {
          obj.children = children;
        } else {
          obj.userData = [];
        }
        result.push(obj);
      }
      return result;
    }, []);
  };

  insertItem(parent: FileNode, name: string) {
    const child = <FileNode>{ name: name,'parent_id': parent.parent_id};
    if (parent.children) {
      parent.children.unshift(child);
      this.dataChange.next(this.data);
    } else {
      parent.children = [];
      parent.children.unshift(child);
      this.dataChange.next(this.data);
    }
  }

  deleteItem(parent: FileNode, name: string) {
    if(parent.children) {
      parent.children = parent.children.filter(c => c.name !== name);
      this.dataChange.next(this.data);
    }
  }
}
