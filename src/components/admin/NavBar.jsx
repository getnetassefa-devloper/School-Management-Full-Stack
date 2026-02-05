"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

export default function AdminNavigationBar() {
  return (
    <div>
      <NavigationMenu className='py-5  font-bold w-full bg-blend-color '>
        
         <NavigationMenuList className=' w-full flex flex-row gap-8'>
        
           <NavigationMenuItem className=''>
            <NavigationMenuTrigger>Students</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-96">
                <ListItem href="/." title="Student List">
                  List all Students
                </ListItem>
                <ListItem href="/." title="Archived Students">
                  Check the deleted Students
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Teachers</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-96">
                <ListItem href="/." title="Teachers">
                  List all Teachers
                </ListItem>
                <ListItem href="/." title="Archived Students">
                  Check the deleted Students
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList> 
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all", // Changed transition-colors to transition-all
  "hover:bg-blue-50 hover:text-blue-700 hover:translate-x-1", // Custom hover: Blue tint and slight move right
  "focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";
