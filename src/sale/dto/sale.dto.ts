export class SaleDto {
    date: Date;
    created_at: Date;
    city: String;
    custom_paid: String;
    form_payment: String;
    total: String;
    id_seller: Number;
    id_client: Number;
    products: Array<Object>;
}
