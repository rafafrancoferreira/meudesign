"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type NavLink = { href: string; label: string };

interface NavMobileProps {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
}

export function NavMobile({ open, onClose, links }: NavMobileProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-30 md:hidden",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-black/80 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <nav
        aria-label="Navegação mobile"
        className={cn(
          "absolute top-16 left-0 right-0 border-b bg-surface px-4 py-6 transition-transform duration-300",
          open ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <ul className="flex flex-col gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="block rounded-md px-3 py-3 text-lg font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
