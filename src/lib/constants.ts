export const propertyTypeToArabic: Record<string, string> = {
  APARTMENT: 'شقة',
  HOUSE: 'منزل',
  LAND: 'أرض',
  COMMERCIAL: 'تجاري',
};

export const currencyToArabic: Record<string, string> = {
  USD: 'دولار أمريكي',
  EUR: 'يورو',
  GBP: 'جنيه إسترليني',
  DH: 'درهم مغربي',
};

export const statusToArabic: Record<string, string> = {
  PENDING: 'قيد الانتظار',
  APPROVED: 'تمت الموافقة',
  REJECTED: 'مرفوض',
  SOLD: 'تم البيع',
};

export const badgeToArabic: Record<string, string> = {
  VERIFIED: 'موثق',
  UNVERIFIED: 'غير موثق',
};
