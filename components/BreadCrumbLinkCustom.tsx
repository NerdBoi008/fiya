import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { memo } from 'react'

type BreadCrumbLinkCustomProps = {
    href: string;
    children: React.ReactNode;
    classNames?: string;
}
  
const BreadCrumbLinkCustom: React.FC<BreadCrumbLinkCustomProps> = memo(({ href, children, classNames }: BreadCrumbLinkCustomProps) => {
    return (
        <Link
            href={href}
            className={cn("transition-colors hover:text-foreground", classNames)}
            passHref
        >
            {children}
        </Link>
    )
});

BreadCrumbLinkCustom.displayName = 'BreadCrumbLinkCustom';

export default BreadCrumbLinkCustom;