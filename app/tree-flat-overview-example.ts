import { FileDataService } from './service/file-data.service';
import { FileFlatNode } from './model/FileFlatNode';
import { FileNode } from './model/FileNode';
import { Component, OnInit, Input } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Observable, of as observableOf } from 'rxjs';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';

@Component({
  selector: 'ait-organizational-chart',
  templateUrl: './organizational-chart.component.html', 
  styleUrls: ['./organizational-chart.component.scss'],
  providers: [FileDataService]
})

export class OrganizationalChartComponent implements OnInit {
  @Input() inputValue: [];
  name: string;
  iconVisible = false;
  isEdit = false;
  treeControl: FlatTreeControl<FileFlatNode>;
  treeFlattener: MatTreeFlattener<FileNode, FileFlatNode>;
  dataSource: MatTreeFlatDataSource<FileNode, FileFlatNode>;
  expandedNodeSet = new Set<string>();
  dragging = false;
  expandTimeout: any;
  expandDelay = 1000;
  dataListDepartment = [];
  tmpDataList = [];
  //TODO
  // flatNodeMap: Map<FileFlatNode, FileNode> = new Map<FileFlatNode, FileNode>();
  // nestedNodeMap: Map<FileNode, FileFlatNode> = new Map<FileNode, FileFlatNode>();

  constructor(private departmentService: DepartmentService, private fileData: FileDataService) { }
  
  async ngOnInit() {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
      this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<FileFlatNode>(this._getLevel, this._isExpandable);  
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);  
    this.fileData.dataChange.subscribe(data => this.rebuildTreeForData(data));
  }
  
  transformer = (node: FileNode, level: number) => {
    // let flatNode = new FileFlatNode(!!node.children, node.id, node.name, node.parent_id, level);
    //TODO
    // this.flatNodeMap.set(flatNode, node);
    // this.nestedNodeMap.set(node, flatNode);
    // return flatNode;
    return new FileFlatNode(!!node.children, node.id, node.name, node.parent_id, level);
  }

  private _getLevel = (node: FileFlatNode) => node.level;
  private _isExpandable = (node: FileFlatNode) => node.expandable;
  private _getChildren = (node: FileNode): Observable<FileNode[]> => observableOf(node.children);
  hasChild = (_: number, _nodeData: FileFlatNode) => _nodeData.expandable;
  //TODO
  // hasNoContent = (_: number, _nodeData: FileFlatNode) => _nodeData.name === '';
  
  visibleNodes(): FileNode[] {
    this.rememberExpandedTreeNodes(this.treeControl, this.expandedNodeSet);
    const result = [];

    function addExpandedChildren(node: FileNode, expanded: Set<string>) {
      result.push(node);
      if (expanded.has(node.id)) {
        node.children.map(child => addExpandedChildren(child, expanded));
      }
    }
    this.dataSource.data.forEach(node => {
      addExpandedChildren(node, this.expandedNodeSet);
    });
    return result;
  }

  drop(event: CdkDragDrop<string[]>) {

    if (!event.isPointerOverContainer) return;
    const visibleNodes = this.visibleNodes();
    const changedData = JSON.parse(JSON.stringify(this.dataSource.data));

    function findNodeSiblings(arr: Array<any>, id: string): Array<any> {
      let result, subResult;
      arr.forEach(item => {
        if (item.id === id) {
          result = arr;
        } else if (item.children) {
          subResult = findNodeSiblings(item.children, id);
          if (subResult) result = subResult;
        }
      });
      return result;
    }

    const node = event.item.data;
        
    const siblings = findNodeSiblings(changedData, node.id);
    const siblingIndex = siblings.findIndex(n => n.id === node.id);
    const nodeToInsert: FileNode = siblings.splice(siblingIndex, 1)[0];

    const nodeAtDest = visibleNodes[event.currentIndex];
    if (nodeAtDest.id === nodeToInsert.id) return;

    let relativeIndex = event.currentIndex;
    const nodeAtDestFlatNode = this.treeControl.dataNodes.find(n => nodeAtDest.id === n.id);
    const parent = this.getParentNode(nodeAtDestFlatNode);
    if (parent) {
      const parentIndex = visibleNodes.findIndex(n => n.id === parent.id) + 1;
      relativeIndex = event.currentIndex - parentIndex;
    }
    // insert node 
    const newSiblings = findNodeSiblings(changedData, nodeAtDest.id);
    if (!newSiblings) return;
    newSiblings.splice(relativeIndex, 0, nodeToInsert);

    this.rebuildTreeForData(changedData);
  }

  dragStart() {
    this.dragging = true;
  }
  dragEnd() {
    this.dragging = false;
  }
  dragHover(node: FileFlatNode) {
    this.iconVisible = !this.iconVisible; 
    
    
    if (this.dragging) {
      clearTimeout(this.expandTimeout);
      this.expandTimeout = setTimeout(() => {
        this.treeControl.expand(node);
      }, this.expandDelay);
    }
  }
  dragHoverEnd() {
    this.iconVisible = !this.iconVisible;
    
    if (this.dragging) {
      clearTimeout(this.expandTimeout);
    }
  }
  man(data) {
    // this.isEdit = !this.isEdit;
  this.name = data.name;
  let id = data.id;
  
    this.isEdit = true;  
    // console.log(id);
  }
  rebuildTreeForData(data: any) {
    this.rememberExpandedTreeNodes(this.treeControl, this.expandedNodeSet);
    this.dataSource.data = data;
    this.forgetMissingExpandedNodes(this.treeControl, this.expandedNodeSet);
    this.expandNodesById(this.treeControl.dataNodes, Array.from(this.expandedNodeSet));
  }
  //TODO
  addNewItem(node: FileFlatNode) {
    }
  //   const parentNode = this.flatNodeMap.get(node);
  //   console.log(parentNode);
  //   // 
  //   let isParentHasChildren: boolean = false;
  //   if (parentNode.children)
  //     isParentHasChildren = true;
  //   //
  //   this.fileData.insertItem(parentNode!, '');
  //   // expand the subtree only if the parent has children (parent is not a leaf node)
  //   if (isParentHasChildren)
  //     this.treeControl.expand(node);
  // }

  // saveNode(node: FileFlatNode, itemValue: string) {
  //   // const nestedNode = this.flatNodeMap.get(node);
  //   // this._database.updateItem(nestedNode!, itemValue);
  //   // console.log(itemValue);
    
  // }

    private rememberExpandedTreeNodes(
      treeControl: FlatTreeControl<FileFlatNode>,
      expandedNodeSet: Set<string>
    ) {
      if (treeControl.dataNodes) {
        treeControl.dataNodes.forEach((node) => {
          if (treeControl.isExpandable(node) && treeControl.isExpanded(node)) {
            expandedNodeSet.add(node.id);
          }
        });
      }
    }

  private forgetMissingExpandedNodes(
    treeControl: FlatTreeControl<FileFlatNode>,
    expandedNodeSet: Set<string>
  ) {
    if (treeControl.dataNodes) {
      expandedNodeSet.forEach((nodeId) => {

        if (!treeControl.dataNodes.find((n) => n.id === nodeId)) {
          expandedNodeSet.delete(nodeId);
        }
      });
    }
  }

  private expandNodesById(flatNodes: FileFlatNode[], ids: string[]) {
    if (!flatNodes || flatNodes.length === 0) return;
    const idSet = new Set(ids);
    return flatNodes.forEach((node) => {
      if (idSet.has(node.id)) {
        this.treeControl.expand(node);
        let parent = this.getParentNode(node);
        while (parent) {
          this.treeControl.expand(parent);
          parent = this.getParentNode(parent);
        }
      }
    });
  }

  private getParentNode(node: FileFlatNode): FileFlatNode | null {
    const currentLevel = node.level;
    if (currentLevel < 1) {
      return null;
    }
    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];
      if (currentNode.level < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

}
