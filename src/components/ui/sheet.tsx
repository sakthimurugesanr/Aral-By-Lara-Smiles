'use client';
// Local adaptation of shadcn/ui's MIT-licensed Radix Sheet composition.
import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
export const Sheet=DialogPrimitive.Root;
export const SheetTrigger=DialogPrimitive.Trigger;
export const SheetClose=DialogPrimitive.Close;
export const SheetTitle=DialogPrimitive.Title;
export const SheetDescription=DialogPrimitive.Description;
export const SheetContent=React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>,React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>>(({className,children,...props},ref)=><DialogPrimitive.Portal><DialogPrimitive.Overlay className="sheet-overlay"/><DialogPrimitive.Content ref={ref} className={cn('sheet-content',className)} {...props}>{children}<DialogPrimitive.Close className="sheet-close" aria-label="Close appointment drawer"><X size={19}/></DialogPrimitive.Close></DialogPrimitive.Content></DialogPrimitive.Portal>);
SheetContent.displayName='SheetContent';
export function SheetHeader({className,...props}:React.ComponentProps<'div'>){return <div className={cn('sheet-header',className)} {...props}/>}
