export interface IUser {
  email: string;
  password?: string;
  name: string;
  hasShop: boolean;
  clientInfo: {
    device: 'pc' | 'mobile'; // Device type
    browser: string; // Browser name
    ipAddress: string; // User IP address
    pcName?: string; // Optional PC name
    os?: string; // Optional OS name (Windows, MacOS, etc.)
    userAgent?: string; // Optional user agent string
  };
  lastLogin: Date;
  picked?: boolean;
  isActive: boolean;
  otpToken?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface IOrderProduct {
  product: IProduct;
  quantity: number;
  unitPrice: number;
  color: string;
  type: string;
}

interface IProduct {
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  weight: number | null;
  offerPrice?: number | null;
  imageUrls: string[];
  isActive: boolean;
  quantity?: number;
  averageRating?: number;
  ratingCount?: number;
  availableColors: string[];

  calculateOfferPrice(): Promise<number | null>;
}

interface IOrderAddress {
  city: string;
  zip_code: string;
  street_or_building_name: string;
  area: string;
}
interface IOrder {
  user: IUser;

  products: IOrderProduct[];
  totalAmount: number;
  discount: number;
  deliveryCharge: number;
  finalAmount: number;
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled' | 'Picked';
  shippingAddress: IOrderAddress;
  paymentMethod: 'COD' | 'Online';
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  createdAt?: Date;
  updatedAt?: Date;
}

export default function InvoiceGenerator(order: IOrder) {
  const mywindow = window.open('', '_blank');
  mywindow!.document.write(`
            <!DOCTYPE html>
            	            <html lang="en">
            	            <head>
            	                <meta charset="UTF-8">
            	                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            	                <title>Invoice</title>
            		                <style lang="css">
            		                    #app h1{
         		                        font-size:38px;
            		                        font-weight: 700;
            		                    }
            
            	                    #app .customer-detail{
            		                        display: flex;
            		                        justify-content: space-between;
            		                    }
            	                    #app .customer-detail .section-one{
            		                        line-height: .4;
            	                    }
         		                    #app .customer-detail .section-one .customer-name{
            		                        font-weight:600;
            	                    }
            
            		                    #app .invoice-title{
            		                        width: 100%;
            		                        display: flex;
            		                        justify-content: center;
            		                        margin-top: 35px!important;
            		                    }
            		                    #app .invoice-title span{
            		                        border: 1px solid #000;
            		                        font-weight: 600;
            	                        padding: 8px;
            		                        border-radius: 8px;
            	                    }
        	                    .invoice-table{
            		                        width: 100%;
         		                        border-collapse: collapse;
            		                        margin-top: 25px;
            		                    }
            	                    @media print{
        		                        body{
            	                            margin: 0;
            	                            padding: 0;
            		                            box-sizing: border-box;
            		                        }
            		                        @page {
            		                            size: A4;
            		                            border: none;
        	                        }
            		                    }
            	                </style>
            
        	            </head>
        	            <body>
            	                <div id="app">
        	                    <h1>EMart</h1>
        	                    <div class="customer-detail">
        	                        <div class="section-one">
            	                            <p>Bill To:</p>
            	                            <p class="customer-name">${order?.user?.name ?? ''}</p>
            	                            <p class="customer-address">${order?.shippingAddress?.area ?? ''}, ${
                                            order?.shippingAddress
                                              ?.street_or_building_name
                                          }</p>
            		                            <p class="customer-address">${order?.shippingAddress?.zip_code ?? ''}, ${
                                              order?.shippingAddress?.city
                                            }, Bangladesh</p>
            		                        </div>
            		                        <div class="section-two">
            		                            <p class="date">Invoice Date: ${new Intl.DateTimeFormat('en-US').format(new Date())}</p>
            		                        </div>
            		                    </div>
            		                    <div class="invoice-title">
            		                        <span>INVOICE</span>
            		                    </div>
            		                    <table border="1" cellspacing="0" cellpadding="8" class="invoice-table">
            		                        <thead>
            		                            <tr>
            		                                <th>Product Name</th>
            		                                <th>Unit Price</th>
            		                                <th>Quantity</th>
            		                                <th>Total Price</th>
            		                            </tr>
            		                        </thead>
            		                        <tbody>
            		                        ${order?.products
                                          ?.map((product) => {
                                            return `<tr>
            		                                <td>${product?.product?.name ?? ''}</td>
            		                                <td>BDT ${product?.unitPrice ?? ''}</td>
            		                                <td>${product?.quantity ?? ''}</td>
            		                                <td>BDT ${Number(product?.quantity) * Number(product.unitPrice)}</td>
            		                            </tr>`;
                                          })
                                          .join('')}
            		                        </tbody>
            		                        <tfoot>
            		                            <tr>
            		                                <td colspan="3" style="text-align: right;"><strong>Subtotal:</strong></td>
            		                                <td>BDT ${order?.totalAmount ?? '0'}</td>
            		                            </tr>
            		                            <tr>
            		                                <td colspan="3" style="text-align: right;"><strong>Delivery Charge:</strong></td>
            		                                <td>BDT ${order?.deliveryCharge ?? '0'}</td>
            		                            </tr>
            		                            <tr>
            		                                <td colspan="3" style="text-align: right;"><strong>Total:</strong></td>
            		                                <td><strong>BDT ${order?.finalAmount ?? '0'}</strong></td>
            		                            </tr>
            		                        </tfoot>
            		                    </table>
            
            		                </div>
            		            </body>
            		            </html>
        `);

  mywindow!.document.close();
  mywindow!.focus();
  mywindow!.print();
  return true;
}
