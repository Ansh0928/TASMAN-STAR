/**
 * Input validation for cart server actions.
 * Shopify GIDs are typically: gid://shopify/Cart/xxx or gid://shopify/ProductVariant/xxx
 */

const SHOPIFY_GID_REGEX = /^gid:\/\/shopify\/[\w-]+\/[\w-]+$/;
const MAX_QUANTITY = 99;
const MAX_LINES = 50;
const MAX_LINE_IDS = 100;

export function isValidCartId(cartId: string): boolean {
  if (!cartId || typeof cartId !== 'string') return false;
  const trimmed = cartId.trim();
  if (trimmed.length > 100) return false;
  return SHOPIFY_GID_REGEX.test(trimmed) || /^[a-zA-Z0-9_-]+$/.test(trimmed);
}

export function isValidMerchandiseId(id: string): boolean {
  if (!id || typeof id !== 'string') return false;
  const trimmed = id.trim();
  if (trimmed.length > 100) return false;
  return SHOPIFY_GID_REGEX.test(trimmed) || /^[a-zA-Z0-9_-]+$/.test(trimmed);
}

export function isValidLineId(id: string): boolean {
  if (!id || typeof id !== 'string') return false;
  const trimmed = id.trim();
  if (trimmed.length > 100) return false;
  return SHOPIFY_GID_REGEX.test(trimmed) || /^[a-zA-Z0-9_-]+$/.test(trimmed);
}

export function isValidQuantity(qty: number): boolean {
  return Number.isInteger(qty) && qty >= 1 && qty <= MAX_QUANTITY;
}

export interface AddToCartLine {
  merchandiseId: string;
  quantity: number;
}

export interface UpdateCartLine {
  id: string;
  merchandiseId?: string;
  quantity: number;
}

export function validateAddToCartInput(
  cartId: string,
  lines: AddToCartLine[]
): { valid: true; cartId: string; lines: AddToCartLine[] } | { valid: false; error: string } {
  if (!isValidCartId(cartId)) {
    return { valid: false, error: 'Invalid cart ID' };
  }
  if (!Array.isArray(lines) || lines.length === 0 || lines.length > MAX_LINES) {
    return { valid: false, error: 'Invalid lines (must be 1–50 items)' };
  }
  const validated: AddToCartLine[] = [];
  for (const line of lines) {
    if (!line || typeof line !== 'object') continue;
    const merchandiseId = line.merchandiseId;
    const quantity = line.quantity;
    if (!isValidMerchandiseId(merchandiseId) || !isValidQuantity(quantity)) {
      return { valid: false, error: 'Invalid merchandise ID or quantity' };
    }
    validated.push({ merchandiseId: merchandiseId.trim(), quantity });
  }
  if (validated.length === 0) {
    return { valid: false, error: 'No valid lines to add' };
  }
  return { valid: true, cartId: cartId.trim(), lines: validated };
}

export function validateRemoveFromCartInput(
  cartId: string,
  lineIds: string[]
): { valid: true; cartId: string; lineIds: string[] } | { valid: false; error: string } {
  if (!isValidCartId(cartId)) {
    return { valid: false, error: 'Invalid cart ID' };
  }
  if (!Array.isArray(lineIds) || lineIds.length === 0 || lineIds.length > MAX_LINE_IDS) {
    return { valid: false, error: 'Invalid line IDs (must be 1–100 items)' };
  }
  const validated: string[] = [];
  for (const id of lineIds) {
    if (!isValidLineId(id)) {
      return { valid: false, error: 'Invalid line ID' };
    }
    validated.push(id.trim());
  }
  return { valid: true, cartId: cartId.trim(), lineIds: validated };
}

export function validateUpdateCartInput(
  cartId: string,
  lines: UpdateCartLine[]
): { valid: true; cartId: string; lines: UpdateCartLine[] } | { valid: false; error: string } {
  if (!isValidCartId(cartId)) {
    return { valid: false, error: 'Invalid cart ID' };
  }
  if (!Array.isArray(lines) || lines.length === 0 || lines.length > MAX_LINES) {
    return { valid: false, error: 'Invalid lines (must be 1–50 items)' };
  }
  const validated: UpdateCartLine[] = [];
  for (const line of lines) {
    if (!line || typeof line !== 'object') continue;
    const id = line.id;
    const quantity = line.quantity;
    if (!isValidLineId(id) || !isValidQuantity(quantity)) {
      return { valid: false, error: 'Invalid line ID or quantity' };
    }
    const entry: UpdateCartLine = { id: id.trim(), quantity };
    if (line.merchandiseId != null && isValidMerchandiseId(line.merchandiseId)) {
      entry.merchandiseId = line.merchandiseId.trim();
    }
    validated.push(entry);
  }
  if (validated.length === 0) {
    return { valid: false, error: 'No valid lines to update' };
  }
  return { valid: true, cartId: cartId.trim(), lines: validated };
}
