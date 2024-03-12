import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderNew } from 'src/app/core/models/order-new.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-order-new',
  templateUrl: './order-new.component.html',
  styleUrls: ['./order-new.component.css']
})
export class OrderNewComponent implements OnInit {
  orderForm: FormGroup;

  constructor(private fb: FormBuilder, private orderSerivce: OrderService, private notificationService: NotificationService) {
    this.orderForm = this.fb.group({
      productUuid: ['', [Validators.required]],
      uuid: ['', [Validators.required]],
      amount: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.orderForm?.addValidators;
  }

  onSubmit() {
    const orderNew = new OrderNew(
      this.orderForm.value.productUuid,
      this.orderForm.value.uuid,
      this.orderForm.value.amount);

    this.orderSerivce.saveOrder(orderNew).subscribe(data => {
      this.clear();
      this.notificationService.openSnackBar("Đơn hàng " + data.uuid + " thêm thành công!!!")},
      error => {
        this.notificationService.openSnackBar(error.error.message);
      });
  }

  clear() {
    this.orderForm.reset();
  }
}
