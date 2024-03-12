import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms'
import { ProductNew } from 'src/app/core/models/product-new.model';
import { Warehouse } from 'src/app/core/models/warehouse.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProductService } from 'src/app/core/services/product.service';
import { WarehouseService } from 'src/app/core/services/warehouse.service';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

  ngOnInit(): void {
    this.getWarehouses();
  }

  productForm: FormGroup;
  productModel !: ProductNew;
  warehouse: Warehouse[] = [];


  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private notificationService: NotificationService,
    private warehouseService: WarehouseService) {

    this.productForm = this.fb.group({
      warehouseId: ['', [Validators.required]],
      uuid: ['', [Validators.required]],
      productName: ['', Validators.required],
      stages: this.fb.array([], [Validators.required]),
    });
  }
  products(): FormArray {
    return this.productForm.get("stages") as FormArray
  }

  newProduct(): FormGroup {
    return this.fb.group({
      stageName: '',
      cost: '',
    })
  }

  addStage() {
    this.products().push(this.newProduct());
  }

  removeStage(i: number) {
    this.products().removeAt(i);
  }

  onSubmit() {
    this.productModel = new ProductNew(this.productForm.value.uuid, this.productForm.value.productName, this.productForm.value.date, this.productForm.value.warehouseId, true, this.productForm.value.stages);
    this.productService.saveProduct(this.productModel).subscribe(data => {
      this.clear();
      this.notificationService.openSnackBar("Sản phẩm " + data.productName + " thêm thành công!!!")
    },
      error => {
        this.notificationService.openSnackBar(error.error.message);
      });
  }

  clear() {
    this.productForm.reset();
  }

  getWarehouses() {
    this.warehouseService.getWarehouses(true).subscribe((res: any) => {
      this.warehouse = res;
    });
  }

}
