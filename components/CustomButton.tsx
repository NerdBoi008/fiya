import { cn } from '@/lib/utils'
import React from 'react'

interface CustomButtonProps {
  label?: string
  onClick: (event: any) => void
  leadingIcon?: string
  trailingIcon?: string
  variant: "active" | "disable" | "outline",
  classNames?: string
}

const CustomButton = ({
  label,
  onClick,
  leadingIcon,
  trailingIcon,
  variant,
  classNames
}: CustomButtonProps) => {
  let buttonStyle = ''
  
  switch (variant) {
    case 'active':
      buttonStyle = 'bg-primary text-white hover:bg-[#344e41] border-2 border-primary'
      break;
    
    case 'disable':
      buttonStyle = ''
      break;
    
    case 'outline':
      buttonStyle = 'border-2 border-primary bg-background  hover:bg-accent hover:text-accent-foreground text-primary'
      break;

    default:
      break;
  }

    return (
      <div
        onClick={onClick}
        className={cn('flex justify-center gap-2 rounded-sm items-center w-fit cursor-pointer px-2 py-1 h-9 font-medium', buttonStyle, classNames)}>
        {leadingIcon && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={leadingIcon}
            height={20}
            width={20}
            alt={`${label} button`}
            className={`size-[18px] ${(variant === 'outline') ? '' : 'svg-stroke-white'}`}
          />
          )}

        {label && (
          <p className='select-none text-nowrap text-sm'>{label}</p>
        )}

        {trailingIcon && (
        // eslint-disable-next-line @next/next/no-img-element
          <img
            src={trailingIcon}
            height={20}
            width={20}
            alt={`${label} button`}
            className='size-[18px]'
          />
        )}
      </div>  
  )
}

export default CustomButton