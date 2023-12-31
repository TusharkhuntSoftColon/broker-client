// ----------------------------------------------------------------------

export type IExchangeListView = {
  name: string;
  id: string;
  status: string;
};

export type IProductFilterValue = string | string[] | number | number[];

export type IProductFilters = {
  rating: string;
  gender: string[];
  category: string;
  colors: string[];
  priceRange: number[];
};

// ----------------------------------------------------------------------

export type IProductReviewNewForm = {
  rating: number | null;
  review: string;
  name: string;
  email: string;
};

export type IProductReview = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  helpful: number;
  avatarUrl: string;
  isPurchased: boolean;
  attachments?: string[];
  postedAt: Date;
};

export type IExchangeItem = {
  name: string;
  id?: string;
  _id?: any;
  createdAt?: string;
  updatedAt?: string;
  label?: string;
  status?: string;
  stopLoss?: boolean;
  isActive?: any;
};

export type IProductItem = {
  _id?: string;
  sku: string;
  name: string;
  code: string;
  price: number;
  taxes: number;
  tags: string[];
  gender: string;
  sizes: string[];
  publish: string;
  coverUrl: string;
  images: string[];
  colors: string[];
  quantity: number;
  category: string;
  available: number;
  totalSold: number;
  description: string;
  totalRatings: number;
  totalReviews: number;
  inventoryType: string;
  subDescription: string;
  priceSale: number | null;
  isActive: any;
  status: any;
  updatedAt: string;
  reviews: IProductReview[];
  createdAt: string;
  ratings: {
    name: string;
    starCount: number;
    reviewCount: number;
  }[];
  saleLabel: {
    enabled: boolean;
    content: string;
  };
  newLabel: {
    enabled: boolean;
    content: string;
  };
};

export type IProductTableFilterValue = string | string[] | any;

export type IProductTableFilters = {
  name: string;
  stock: string[];
  publish: string[];
  status: any;
  dateRange: any;
};
