import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Injectable} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject, Observable, of as observableOf} from 'rxjs';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

/**
 * File node data with nested structure.
 * Each node has a filename, and a type or a list of children.
 */

let nest_data = [{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"c4fac705-0282-42a7-afdb-9a9d7a394126","name":"AIT","parent_id":"","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","children":[{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"68d6dd18-95a1-4014-89d3-14f86879f3e2","name":"Package Solution Dept.","parent_id":"c4fac705-0282-42a7-afdb-9a9d7a394126","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","children":[{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"b5465831-07ce-4c72-be9a-2b2abb559bbb","name":"Package Solution Division","parent_id":"68d6dd18-95a1-4014-89d3-14f86879f3e2","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","children":[{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"4d06ac46-4d02-409d-b179-23dceda29d8c","name":"Package Solution Grp 1","parent_id":"b5465831-07ce-4c72-be9a-2b2abb559bbb","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","userData":[]},{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"2845e9a9-da4d-46cd-9a47-73c41f1d717d","name":"Package Solution Grp 2","parent_id":"b5465831-07ce-4c72-be9a-2b2abb559bbb","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","userData":[]},{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"a0af866e-50f0-414b-90cc-14f2dfbd7c80","name":"Package Solution Grp 3","parent_id":"b5465831-07ce-4c72-be9a-2b2abb559bbb","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","userData":[]},{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"f8c95dac-2460-406c-8c6f-dc1a67ced170","name":"Product Sales & Network","parent_id":"b5465831-07ce-4c72-be9a-2b2abb559bbb","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","userData":[]}]},{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"bc8b2406-ed5a-44de-86fe-40a32fd14a35","name":"Sales Division","parent_id":"68d6dd18-95a1-4014-89d3-14f86879f3e2","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","children":[{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"d0ffd91a-9a25-4a3c-940c-8f142dbf60c2","name":"Sales Sect.","parent_id":"bc8b2406-ed5a-44de-86fe-40a32fd14a35","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","userData":[]}]}]},{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"8756bec6-bca9-4d0f-a2d3-178e6ec8091b","name":"Software Dev Dept.","parent_id":"c4fac705-0282-42a7-afdb-9a9d7a394126","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","children":[{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"f8db4c35-015f-4535-988f-ad7d9592c476","name":"Product Dev Division","parent_id":"8756bec6-bca9-4d0f-a2d3-178e6ec8091b","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","children":[{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"0ab86ebd-86bf-48e1-8723-e2e34237f55f","name":"Product Dev Grp 1","parent_id":"f8db4c35-015f-4535-988f-ad7d9592c476","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","userData":[]},{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"44fac6a1-2358-4821-aaa2-acb027eb9514","name":"Product Dev Grp 2","parent_id":"f8db4c35-015f-4535-988f-ad7d9592c476","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","userData":[]},{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"529b13d4-ec54-41c3-80a4-ad5095df1abf","name":"Product Dev Grp 3","parent_id":"f8db4c35-015f-4535-988f-ad7d9592c476","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","userData":[]},{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"0935fcd4-8442-4297-841b-3d700da693b8","name":"Product Dev Grp 4","parent_id":"f8db4c35-015f-4535-988f-ad7d9592c476","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","userData":[]}]},{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"f07b5d5f-037a-41c2-89e2-0e87c5d0e25d","name":"Dev Division","parent_id":"8756bec6-bca9-4d0f-a2d3-178e6ec8091b","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","children":[{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"a13573d0-cd19-4c0a-8582-e2b34f74fb2c","name":"Dev Grp 1","parent_id":"f07b5d5f-037a-41c2-89e2-0e87c5d0e25d","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","userData":[]},{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"0016b6ef-98cb-4b33-9fff-d8bee959b76a","name":"Dev Grp 2","parent_id":"f07b5d5f-037a-41c2-89e2-0e87c5d0e25d","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","userData":[]},{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"4daae9bd-1be0-4db7-b8c2-640d6b6e2249","name":"Dev Grp 3","parent_id":"f07b5d5f-037a-41c2-89e2-0e87c5d0e25d","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","userData":[]},{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"09f4d930-2900-4340-9a7e-3ee437c546bc","name":"Dev Grp 4","parent_id":"f07b5d5f-037a-41c2-89e2-0e87c5d0e25d","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","userData":[]},{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"07ea350c-0bbe-4955-b774-00cad70f7241","name":"Dev Grp 5","parent_id":"f07b5d5f-037a-41c2-89e2-0e87c5d0e25d","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","userData":[]},{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"7e2faa9a-923d-4b79-a832-81e8452e18d2","name":"Dev Grp 6","parent_id":"f07b5d5f-037a-41c2-89e2-0e87c5d0e25d","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","userData":[]}]}]},{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"2061924e-1d6a-4d68-ae48-bc8ba9fc62c0","name":"Technical Dept.","parent_id":"c4fac705-0282-42a7-afdb-9a9d7a394126","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","children":[{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"41f84ead-01d4-4807-90a7-6c522cb9acc7","name":"Planning Support","parent_id":"2061924e-1d6a-4d68-ae48-bc8ba9fc62c0","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","userData":[]},{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"8ca8d004-3aba-4af3-8163-87a8e513bc04","name":"Training Support","parent_id":"2061924e-1d6a-4d68-ae48-bc8ba9fc62c0","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","userData":[]},{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"71cf77f5-cee1-4048-add6-ff34e4bded3c","name":"On-site Support","parent_id":"2061924e-1d6a-4d68-ae48-bc8ba9fc62c0","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","userData":[]},{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"a710f38a-45eb-4e38-b9e7-9a89ef2e3be0","name":"Production & Quality Assurance Division","parent_id":"2061924e-1d6a-4d68-ae48-bc8ba9fc62c0","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","children":[{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"15c30c32-b3d7-42cf-82d6-682ccb24d240","name":"Production & Quality Assurance Sect.","parent_id":"a710f38a-45eb-4e38-b9e7-9a89ef2e3be0","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","userData":[]}]},{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"65f25644-a33d-4848-ab6f-27d612ecea0c","name":"Quotation & Design Division","parent_id":"2061924e-1d6a-4d68-ae48-bc8ba9fc62c0","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","children":[{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"8765819f-106d-4f13-ba39-56e9bf6271e3","name":"IT Communicator Sect.","parent_id":"65f25644-a33d-4848-ab6f-27d612ecea0c","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","userData":[]},{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"8c333561-0eab-49bc-8918-327b394f56d3","name":"Quality Control Sect.","parent_id":"65f25644-a33d-4848-ab6f-27d612ecea0c","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","userData":[]},{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"4017767c-a7d6-4959-86cc-348f28db8c26","name":"Quotation & Design Sect.","parent_id":"65f25644-a33d-4848-ab6f-27d612ecea0c","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","userData":[]}]}]},{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"c39a8a8b-fecc-4ab3-8747-458b73833204","name":"Management Planning Division","parent_id":"c4fac705-0282-42a7-afdb-9a9d7a394126","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","children":[{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"b619ceef-98f5-4202-8b18-f14233726ab2","name":"Management Planning Sect.","parent_id":"c39a8a8b-fecc-4ab3-8747-458b73833204","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","userData":[]}]},{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"0f25c764-52ae-4ba1-95ac-ad57ca64e605","name":"Human Resource Division","parent_id":"c4fac705-0282-42a7-afdb-9a9d7a394126","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","children":[{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"11a4676c-84ab-461c-aee6-c5d8eae77fbb","name":"Recruitment & Training","parent_id":"0f25c764-52ae-4ba1-95ac-ad57ca64e605","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","userData":[]},{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"da06373c-79bc-4009-8a8f-34dad0b049e5","name":"Personnel Affairs","parent_id":"0f25c764-52ae-4ba1-95ac-ad57ca64e605","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","userData":[]}]},{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"a866a5c8-38c5-48f5-8857-f27710f5e867","name":"Finance & Legal Division","parent_id":"c4fac705-0282-42a7-afdb-9a9d7a394126","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","children":[{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"2de7a6e5-c26a-4fe5-8e9e-a1e04cbfa4a5","name":"Accounting","parent_id":"a866a5c8-38c5-48f5-8857-f27710f5e867","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","userData":[]},{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"822fb1df-9900-4aea-9df1-212766abf959","name":"Finance & Legal & Equipment Control","parent_id":"a866a5c8-38c5-48f5-8857-f27710f5e867","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","userData":[]}]},{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"fccba6a7-f29d-44ec-88bb-c8967cb414f3","name":"Hue Branch (Division)","parent_id":"c4fac705-0282-42a7-afdb-9a9d7a394126","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","children":[{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"c87338fc-54a1-4fd4-ab73-8815a26b6ac0","name":"Hue Branch (Sect)","parent_id":"fccba6a7-f29d-44ec-88bb-c8967cb414f3","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","userData":[]}]},{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"1d2852c2-45cc-4510-bce7-61fff3918a9f","name":"Japan Branch (Division)","parent_id":"c4fac705-0282-42a7-afdb-9a9d7a394126","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","children":[{"change_count":1,"create_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","create_at":"2020-07-10T13:13:42.000Z","change_by":"f2fe532b-97f3-46e5-b30f-78b7e539f8e5","change_at":"2020-07-10T13:13:48.000Z","data_flag":"1","company":"ait","lang":"vi-VN","id":"ae3469e6-e060-4d1b-b429-4ec29bed4c93","name":"Japan Branch (Sect.)","parent_id":"1d2852c2-45cc-4510-bce7-61fff3918a9f","active_flag":true,"sort_no":1,"email":"dept1@email.com","phone_number":"","country":"","city":"","district":"","address":"","summary":"","userData":[]}]}]}];

  

export class FileNode {
  id: string;
  children: FileNode[];
  name: string;
  type: any;
}

export class FileNode2 {
  id: string;
  name: string;
  parent_id: string;


}

/** Flat node with expandable and level information */
export class FileFlatNode {
  constructor(
    public expandable: boolean,
    public name: string,
    public level: number,
    public type: any,
    public id: string
  ) {}
}

/**
 * The file structure tree data in string. The data could be parsed into a Json object
 */
const TREE_DATA = JSON.stringify({
  Applications: {
    Calendar: 'app',
    Chrome: 'app',
    Webstorm: 'app'
  },
  Documents: {
    angular: {
      src: {
        compiler: 'ts',
        core: 'ts'
      }
    },
    material2: {
      src: {
        button: 'ts',
        checkbox: 'ts',
        input: 'ts'
      }
    }
  },
  Downloads: {
    October: 'pdf',
    November: 'pdf',
    Tutorial: 'html'
  },
  Pictures: {
    'Photo Booth Library': {
      Contents: 'dir',
      Pictures: 'dir'
    },
    Sun: 'png',
    Woods: 'jpg'
  }
});

/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
@Injectable()
export class FileDatabase {
  dataChange = new BehaviorSubject<FileNode[]>([]);

  get data(): FileNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Parse the string to json object.
    const dataObject = JSON.parse(TREE_DATA);

    // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
    //     file node as children.
    const data = nest_data;
    // console.log(JSON.stringify(data));

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `FileNode`.
   */
  buildFileTree(obj: {[key: string]: any}, level: number, parentId: string = '0'): FileNode[] {
    return Object.keys(obj).reduce<FileNode[]>((accumulator, key, idx) => {
      const value = obj[key];
      const node = new FileNode();
      node.name = key;
      /**
       * Make sure your node has an id so we can properly rearrange the tree during drag'n'drop.
       * By passing parentId to buildFileTree, it constructs a path of indexes which make
       * it possible find the exact sub-array that the node was grabbed from when dropped.
       */
      node.id = `${parentId}/${idx}`;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1, node.id);
        } else {
          node.type = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }
}

/**
 * @title Tree with flat nodes
 */
@Component({
  selector: 'tree-flat-overview-example',
  templateUrl: 'tree-flat-overview-example.html',
  styleUrls: ['tree-flat-overview-example.css'],
  providers: [FileDatabase]
})
export class TreeFlatOverviewExample {
  value = 'Clear me';
 
  name: string;
  iconVisible = false;
  isEdit = false;
    dataListDepartment = [];
  tmpDataList = [];

  treeControl: FlatTreeControl<FileFlatNode>;
  treeFlattener: MatTreeFlattener<FileNode, FileFlatNode>;
  dataSource: MatTreeFlatDataSource<FileNode, FileFlatNode>;
  expandedNodeSet = new Set<string>();
  dragging = false;
  expandTimeout: any;
  expandDelay = 1000;

  constructor(database: FileDatabase) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
      this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<FileFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    database.dataChange.subscribe(data => this.rebuildTreeForData(data));
  }

  transformer = (node: FileNode, level: number) => {
    return new FileFlatNode(!!node.children, node.name, level, node.type, node.id);
  }
  private _getLevel = (node: FileFlatNode) => node.level;
  private _isExpandable = (node: FileFlatNode) => node.expandable;
  private _getChildren = (node: FileNode): Observable<FileNode[]> => observableOf(node.children);
  hasChild = (_: number, _nodeData: FileFlatNode) => _nodeData.expandable;

  /**
   * This constructs an array of nodes that matches the DOM,
   * and calls rememberExpandedTreeNodes to persist expand state
   */
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

  /**
   * Handle the drop - here we rearrange the data based on the drop event,
   * then rebuild the tree.
   * */
  drop(event: CdkDragDrop<string[]>) {
    // console.log('origin/destination', event.previousIndex, event.currentIndex);
  
    // ignore drops outside of the tree
    if (!event.isPointerOverContainer) return;

    // construct a list of visible nodes, this will match the DOM.
    // the cdkDragDrop event.currentIndex jives with visible nodes.
    // it calls rememberExpandedTreeNodes to persist expand state
    const visibleNodes = this.visibleNodes();

    // deep clone the data source so we can mutate it
    const changedData = JSON.parse(JSON.stringify(this.dataSource.data));

    // recursive find function to find siblings of node
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

    // remove the node from its old place
    const node = event.item.data;
    const siblings = findNodeSiblings(changedData, node.id);
    const siblingIndex = siblings.findIndex(n => n.id === node.id);
    const nodeToInsert: FileNode = siblings.splice(siblingIndex, 1)[0];

    // determine where to insert the node
    const nodeAtDest = visibleNodes[event.currentIndex];
    if (nodeAtDest.id === nodeToInsert.id) return;

    // determine drop index relative to destination array
    let relativeIndex = event.currentIndex; // default if no parent
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
    
    // rebuild tree with mutated data
    this.rebuildTreeForData(changedData);
  }

  /**
   * Experimental - opening tree nodes as you drag over them
   */
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
    // console.log(this.isEdit);
  }

  /**
   * The following methods are for persisting the tree expand state
   * after being rebuilt
   */

  rebuildTreeForData(data: any) {
    this.rememberExpandedTreeNodes(this.treeControl, this.expandedNodeSet);
    this.dataSource.data = data;
    this.forgetMissingExpandedNodes(this.treeControl, this.expandedNodeSet);
    this.expandNodesById(this.treeControl.dataNodes, Array.from(this.expandedNodeSet));
  }

  private rememberExpandedTreeNodes(
    treeControl: FlatTreeControl<FileFlatNode>,
    expandedNodeSet: Set<string>
  ) {
    if (treeControl.dataNodes) {
      treeControl.dataNodes.forEach((node) => {
        if (treeControl.isExpandable(node) && treeControl.isExpanded(node)) {
          // capture latest expanded state
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
        // maintain expanded node state
        if (!treeControl.dataNodes.find((n) => n.id === nodeId)) {
          // if the tree doesn't have the previous node, remove it from the expanded list
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