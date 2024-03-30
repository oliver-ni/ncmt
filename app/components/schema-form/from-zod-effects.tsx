/*
 * Copyright (c) 2024 Oliver Ni
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { ZodEffects, ZodTypeAny } from "zod";
import type { FromZodProps } from "./from-zod";

import { FromZod } from "./from-zod";

export function FromZodEffects<T extends ZodTypeAny>({
  type,
  ...props
}: FromZodProps<ZodEffects<T>>) {
  return <FromZod type={type.innerType()} {...props} />;
}
