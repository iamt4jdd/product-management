
import { environment } from "src/environments/environment"

export class AppConstant {
   public static ORDER_API_ENDPOINT= environment.apiUrl + 'orders';
   public static ROLE_KEY = 'role';
   public static ADMIN_ROLE = 'ADMIN';
   public static EMPLOYEE_ROLE = 'EMPLOYEE';
}