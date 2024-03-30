/*
 * Copyright (c) 2024 Oliver Ni
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { ForwardedRef } from "react";

import clsx from "clsx";
import { forwardRef } from "react";

type TextAreaProps = JSX.IntrinsicElements["textarea"] & {
  invalid?: boolean;
};

export const TextArea = forwardRef(function TextArea(
  { className, invalid, ...props }: TextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  return (
    <textarea
      ref={ref}
      {...props}
      className={clsx`block w-full rounded-md border-gray-300 placeholder-gray-300 shadow-sm invalid:border-red-300 invalid:text-red-900 invalid:placeholder-red-300 focus:border-blue-500 focus:ring-blue-500 invalid:focus:border-red-500 invalid:focus:ring-red-500 sm:text-sm ${
        invalid &&
        "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
      } ${className}`}
    />
  );
});
