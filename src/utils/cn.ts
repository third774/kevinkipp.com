import clsx, { type ClassArray } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...classes: ClassArray) => twMerge(clsx(...classes));
