"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { CaretRightIcon } from "@phosphor-icons/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { dashboardItems } from "@/constants/sidebar-tabs";

const findItemByPath = (pathname: string) => {
  // Check dashboard items
  for (const item of dashboardItems) {
    if (item.href === pathname) {
      return { section: "Dashboards", parent: null, current: item };
    }
  }

  return null;
};

export const BreadcrumbNav = () => {
  const pathname = usePathname();
  const pathInfo = findItemByPath(pathname);

  if (!pathInfo) {
    return null;
  }

  const { section, parent, current } = pathInfo;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <span className="text-muted-foreground">{section}</span>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <CaretRightIcon size={16} />
            </BreadcrumbSeparator>
            {parent && (
              <>
                <BreadcrumbItem>
                  <Link href={parent?.href || "#"}>{parent?.label}</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <CaretRightIcon size={16} />
                </BreadcrumbSeparator>
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage>{current.label}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </motion.div>
    </AnimatePresence>
  );
};
