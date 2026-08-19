const MIN_DISCOUNT_PERCENT = 10;
const MAX_DISCOUNT_PERCENT = 28;

/**
 * Deterministic pseudo-random percent derived from the product id — the same
 * product always shows the same discount (stable across renders/reloads),
 * while different products land on different values. Display-only: nothing
 * about the real price, cart, or checkout is affected anywhere in the app.
 */
function hashToPercent(id: string, min: number, max: number): number {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
    }
    const range = max - min + 1;
    return min + (hash % range);
}

export function getMockDiscountPercent(id: string): number {
    return hashToPercent(id, MIN_DISCOUNT_PERCENT, MAX_DISCOUNT_PERCENT);
}

export type MockDiscountDisplay = {
    percent: number;
    wasPrice: number;
    savedAmount: number;
};

/**
 * Given the real price (untouched everywhere else), returns a display-only
 * "was" price and saved amount implying a discount, for marketing cards only.
 */
export function getMockDiscountDisplay(price: number, id: string): MockDiscountDisplay {
    const percent = getMockDiscountPercent(id);
    const wasPrice = Math.ceil(price / (1 - percent / 100) / 10) * 10;
    return { percent, wasPrice, savedAmount: wasPrice - price };
}
