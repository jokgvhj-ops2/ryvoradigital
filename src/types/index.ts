export type CategoryId = 
  | 'all' 
  | 'ai' 
  | 'design' 
  | 'video' 
  | 'development' 
  | 'streaming' 
  | 'marketing' 
  | 'vpn';

export interface Category {
  id: CategoryId;
  name: string;
  count: number;
}

export type PlanDuration = '1_month' | '3_months' | '6_months' | '1_year';

export type AccountType = 'private_account' | 'workspace_invite' | 'dedicated_profile';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: CategoryId;
  categoryLabel: string;
  iconName: string;
  brandColor: string;
  accentGlow: string;
  rating: number;
  reviewsCount: number;
  features: string[];
  retailPriceUSD: number;
  priceUSD: number;
  inStock: boolean;
  popular?: boolean;
  featured?: boolean;
  badge?: string;
  allowedAccountTypes: AccountType[];
  description: string;
  deliveryTime: string;
  warranty: string;
}

export interface CartItem {
  product: Product;
  duration: PlanDuration;
  accountType: AccountType;
  quantity: number;
  priceUSD: number;
}

export interface CustomerOrder {
  orderId: string;
  customerEmail: string;
  customerPhone?: string;
  items: CartItem[];
  subtotalUSD: number;
  discountUSD: number;
  totalUSD: number;
  paymentMethod: string;
  status: 'processing' | 'activated' | 'delivered';
  createdAt: string;
  credentials?: {
    licenseKey?: string;
    accountEmail?: string;
    instructions: string;
  };
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  productName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface LiveActivation {
  id: string;
  productName: string;
  category: string;
  customerMasked: string;
  city: string;
  state: string;
  minutesAgo: number;
  planDuration: string;
}

export interface PromoCoupon {
  code: string;
  discountPercent: number;
  description: string;
  active: boolean;
  usageCount: number;
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'CAD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateAgainstUSD: number;
  label: string;
}
