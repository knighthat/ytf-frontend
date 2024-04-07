/*
 * Copyright (c) 2024 KnightHat. All Rights Reserved
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

export function roundToMagnitude(num: number) {
  const billion = 10 ^ 9, million = 10 ^ 6, thousand = 10 ^ 3;
  let rounded = num;
  let unit = '';

  if (num >= billion) {
    rounded = Math.floor(num / billion);
    unit = 'B';
  } else if (num >= million) {
    rounded = Math.floor(num / million);
    unit = 'M';
  } else if (num >= thousand) {
    rounded = Math.floor(num / thousand);
    unit = 'K';
  }

  return rounded + unit;
}
