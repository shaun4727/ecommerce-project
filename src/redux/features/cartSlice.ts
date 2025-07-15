import { addCoupon } from '@/service/cart';
import { IAgentOrder, IProduct } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface CartProduct extends IProduct {
  orderQuantity: number;
}

interface InitialState {
  products: CartProduct[];
  shippingAddress: {
    area: string;
    city: string;
    zip_code: string;
    street_or_building_name: string;
  };
  shopId: string;
  coupon: {
    code: string;
    discountAmount: number;
    isLoading: boolean;
    error: string;
  };
  paymentMethod: string;
  pickedOrder: IAgentOrder;
}

const initialState: InitialState = {
  products: [],
  shippingAddress: {
    area: '',
    city: '',
    zip_code: '',
    street_or_building_name: '',
  },
  shopId: '',
  coupon: {
    code: '',
    discountAmount: 0,
    isLoading: false,
    error: '',
  },
  paymentMethod: '',
  pickedOrder: {
    _id: '',
    orderId: '',
    destination: {
      city: '',
      area: '',
      zip_code: '',
      street_or_building_name: '',
    },
    agentId: '',
    status: 'Assigned',
    createdAt: '',
    updatedAt: '',
  },
};

export const fetchCoupon = createAsyncThunk(
  'cart/fetchCoupon',
  async ({
    couponCode,
    subTotal,
    shopId,
  }: {
    couponCode: string;
    subTotal: number;
    shopId: string;
  }) => {
    try {
      const res = await addCoupon(couponCode, subTotal, shopId);

      if (!res.success) {
        throw new Error(res.message);
      }

      return res;
    } catch (err: any) {
      console.log(err);
      throw new Error(err.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      if (state.products.length === 0) {
        state.shopId = action.payload.shop._id;
      }

      const productToAdd = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (productToAdd) {
        productToAdd.orderQuantity += 1;
        return;
      }

      state.products.push({ ...action.payload, orderQuantity: 1 });
    },
    incrementOrderQuantity: (state, action) => {
      const productToIncrement = state.products.find(
        (product) => product._id === action.payload
      );

      if (productToIncrement) {
        productToIncrement.orderQuantity += 1;
        return;
      }
    },
    decrementOrderQuantity: (state, action) => {
      const productToIncrement = state.products.find(
        (product) => product._id === action.payload
      );

      if (productToIncrement && productToIncrement.orderQuantity > 1) {
        productToIncrement.orderQuantity -= 1;
        return;
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    updateShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    clearCart: (state) => {
      state.products = [];

      state.shippingAddress = {
        area: '',
        city: '',
        zip_code: '',
        street_or_building_name: '',
      };
    },
    updatePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    assignPickedOrder: (state, action) => {
      state.pickedOrder = action.payload;
    },
    clearPickedOrder: (state) => {
      state.pickedOrder = {
        _id: '',
        orderId: '',
        destination: {
          area: '',
          city: '',
          zip_code: '',
          street_or_building_name: '',
        },
        agentId: '',
        status: 'Assigned',
        createdAt: '',
        updatedAt: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCoupon.pending, (state) => {
      state.coupon.isLoading = true;
      state.coupon.error = '';
    });
    builder.addCase(fetchCoupon.rejected, (state, action) => {
      state.coupon.isLoading = false;
      state.coupon.error = action.error.message as string;
      state.coupon.code = '';
      state.coupon.discountAmount = 0;
    });
    builder.addCase(fetchCoupon.fulfilled, (state, action) => {
      state.coupon.isLoading = false;
      state.coupon.error = '';
      state.coupon.code = action.payload.data.coupon.code;
      state.coupon.discountAmount = action.payload.data.discountAmount;
    });
  },
});

//* Products

export const orderedProductsSelector = (state: RootState) => {
  return state.cart.products;
};

export const orderSelector = (state: RootState) => {
  return {
    products: state.cart.products.map((product) => ({
      product: product._id,
      quantity: product.orderQuantity,
      color: 'White',
    })),
    shippingAddress: state.cart.shippingAddress,
    paymentMethod: state.cart.paymentMethod,
  };
};

export const shopSelector = (state: RootState) => {
  return state.cart.shopId;
};

//* Payment

export const subTotalSelector = (state: RootState) => {
  return state.cart.products.reduce((acc, product) => {
    if (product.offerPrice) {
      return acc + product.offerPrice * product.orderQuantity;
    } else {
      return acc + product.price * product.orderQuantity;
    }
  }, 0);
};

export const shippingCostSelector = (state: RootState) => {
  if (
    state.cart.shippingAddress.city &&
    state.cart.shippingAddress.city === 'Dhaka' &&
    state.cart.products.length > 0
  ) {
    return 60;
  } else if (
    state.cart.shippingAddress.city &&
    state.cart.shippingAddress.city !== 'Dhaka' &&
    state.cart.products.length > 0
  ) {
    return 120;
  } else {
    return 0;
  }
};

export const grandTotalSelector = (state: RootState) => {
  const subTotal = subTotalSelector(state);
  const shippingCost = shippingCostSelector(state);
  const discountAmount = discountAmountSelector(state);

  return subTotal - discountAmount + shippingCost;
};

export const couponSelector = (state: RootState) => {
  return state.cart.coupon;
};

export const discountAmountSelector = (state: RootState) => {
  return state.cart.coupon.discountAmount;
};

//* Address

export const shippingAddressSelector = (state: RootState) => {
  return state.cart.shippingAddress;
};

export const pickedOrderSelector = (state: RootState) => {
  return state.cart.pickedOrder;
};

export const {
  addProduct,
  incrementOrderQuantity,
  decrementOrderQuantity,
  removeProduct,
  updateShippingAddress,
  clearCart,
  updatePaymentMethod,
  assignPickedOrder,
  clearPickedOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
