
import { API_DELAY_MIN, API_DELAY_MAX, API_ERROR_RATE } from '../config';
import { getRandomDelay, shouldFail, sleep } from '../lib/utils';
export async function simulateNetwork() {
  const delay = getRandomDelay(API_DELAY_MIN, API_DELAY_MAX);
  await sleep(delay);
  if (shouldFail(API_ERROR_RATE)) {
    throw new Error('Server error: Internal server error');
  }
}
