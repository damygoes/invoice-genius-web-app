import { cn } from '@/lib/utils'

type IconProps = React.HTMLAttributes<SVGElement> & {
  strokeColor?: string
  className?: string
}

export const Icons = {
  companyLogo: ({ strokeColor, className, ...props }: IconProps) => (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke={strokeColor || 'currentColor'}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={cn('ucide lucide-briefcase-business', className)}
    >
      <path d='M12 12h.01' />
      <path d='M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2' />
      <path d='M22 13a18.15 18.15 0 0 1-20 0' />
      <rect width='20' height='14' x='2' y='6' rx='2' />
    </svg>
  ),
  instagram: ({ strokeColor, className, ...props }: IconProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke={strokeColor || 'currentColor'}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
      className={cn('lucide lucide-instagram', className)}
    >
      <rect width='20' height='20' x='2' y='2' rx='5' ry='5' />
      <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
      <line x1='17.5' x2='17.51' y1='6.5' y2='6.5' />
    </svg>
  ),
  twitter: ({ strokeColor, className, ...props }: IconProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke={strokeColor || 'currentColor'}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
      className={cn('lucide lucide-twitter', className)}
    >
      <path d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' />
    </svg>
  ),
  facebook: ({ strokeColor, className, ...props }: IconProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke={strokeColor || 'currentColor'}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
      className={cn('lucide lucide-facebook', className)}
    >
      <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
    </svg>
  ),
  linkedIn: ({ strokeColor, className, ...props }: IconProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke={strokeColor || 'currentColor'}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
      className={cn('lucide lucide-linkedin', className)}
    >
      <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
      <rect width='4' height='12' x='2' y='9' />
      <circle cx='4' cy='4' r='2' />
    </svg>
  ),
  caution: ({ className, ...props }: IconProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      enableBackground='new 0 0 84 84'
      viewBox='0 0 84 84'
      id='alert'
      className={cn('', className)}
      {...props}
    >
      <path
        fill='#e1e9ff'
        d='M42,10c0,0-8,0-14,8c-6,8-7,10-11,12s-7,3-7,13s10,7,13,16s8,15,19,15s9-7,16-9s16-6,16-13s-5-10-3-15s3-7,3-14c0-3.343-2.078-5.918-5.163-7.034c-1.584-0.573-3.239-0.719-4.911-0.687c-1.595,0.031-3.022,0.752-4.595,0.935c-3.554,0.414-5.185-2.436-7.921-4.044C48.573,10.503,45.249,10,42,10z'
      ></path>
      <path
        fill='#d7e0f4'
        d='M42,69c-7.579,0-11.442-3.139-14.256-11.581c-1.999-5.995-6.371-8.427-9.264-10.037C15.495,45.723,15,45.379,15,43c0-6.434,0.777-6.817,3.669-8.247l0.566-0.281c4.437-2.218,6.264-4.692,10.269-10.114C30.232,23.374,31.053,22.262,32,21c4.377-5.837,9.945-6,10-6c2.931,0,5.18,0.484,6.876,1.481c0.493,0.29,1.05,0.752,1.639,1.242c1.694,1.407,4.254,3.533,8.132,3.533c0.415,0,0.84-0.025,1.263-0.074c1.079-0.126,2.021-0.388,2.779-0.599c0.503-0.14,1.073-0.299,1.333-0.304l0.332-0.003c1.158,0,2.042,0.125,2.783,0.393C68.373,21.116,69,21.9,69,23c0,5.579-0.616,7.109-2.263,11.199l-0.379,0.944c-1.863,4.657-0.173,8.419,1.06,11.166C68.267,48.2,69,49.833,69,52c0,2.829-4.857,6.045-12.374,8.192c-4.394,1.255-6.541,3.897-8.108,5.826C46.854,68.065,46.095,69,42,69z'
      ></path>
      <path
        fill='#ced9ed'
        d='M42,64c-4.79,0-7.17-1.134-9.513-8.162C29.874,48,24.043,44.756,20.911,43.013c-0.258-0.143-0.554-0.229-0.782-0.423c-0.253-0.215-0.264-0.543-0.217-0.85c0.068-0.441,0.134-0.873,0.153-1.32c0.016-0.36,0.148-0.688,0.415-0.934c0.398-0.367,0.946-0.514,1.417-0.759c0.33-0.172,0.657-0.349,0.98-0.533c0.605-0.346,1.197-0.715,1.77-1.112c1.072-0.742,2.073-1.581,2.999-2.497c0.962-0.952,1.845-1.981,2.69-3.037c0.99-1.238,1.932-2.514,2.874-3.789c0.106-0.143,0.211-0.286,0.316-0.428C34.265,26.331,35.071,25.239,36,24c2.601-3.468,5.656-3.943,6.16-4c1.881,0.015,3.325,0.288,4.182,0.791c0.173,0.108,0.657,0.511,0.978,0.777c1.973,1.639,5.644,4.687,11.327,4.687c0.608,0,1.228-0.036,1.842-0.108l0.077-0.009c1.796-0.212,3.238,1.507,2.669,3.224c-0.278,0.837-0.648,1.756-1.136,2.968l-0.381,0.949c-2.653,6.633-0.187,12.126,1.138,15.077c0.006,0.014,0.012,0.027,0.018,0.041c0.805,1.794,0.04,3.889-1.718,4.77c-1.394,0.7-3.321,1.48-5.903,2.218c-5.908,1.688-8.854,5.314-10.624,7.492c-0.569,0.7-1.413,1.106-2.315,1.121C42.215,63.999,42.111,64,42,64z'
      ></path>
      <polygon
        fill='#7d8995'
        points='69 65.1 69 67 15 67 15 65.1 19 65.1 65 65.1'
      ></polygon>
      <path
        fill='#ed7e7e'
        d='M64,53v10.1H20V53c0-9.16,5.63-17.03,13.61-20.33C36.2,31.59,39.03,31,42,31c2.13,0,4.2,0.31,6.15,0.88c2.42,0.7,4.66,1.81,6.65,3.25c1.1,0.78,2.11,1.66,3.04,2.62c0.93,0.97,1.77,2.02,2.52,3.14C62.66,44.37,64,48.53,64,53z'
      ></path>
      <path
        fill='#ee4d4d'
        d='M61,54v9.1H20V53c0-9.16,5.63-17.03,13.61-20.33C35.34,32.23,37.14,32,39,32c2.69,0,5.27,0.49,7.65,1.38c2.3,0.85,4.42,2.08,6.29,3.61c1.04,0.85,1.99,1.8,2.84,2.82c0.89,1.03,1.67,2.15,2.33,3.33C59.95,46.34,61,50.05,61,54z'
      ></path>
      <path
        fill='#ed7e7e'
        d='M54.8 35.13L26.83 63.1H20v-3.07l26.65-26.65 1.5-1.5C50.57 32.58 52.81 33.69 54.8 35.13zM60.36 40.89L38.15 63.1h-5.66l23.29-23.29 2.06-2.06C58.77 38.72 59.61 39.77 60.36 40.89z'
      ></path>
      <path
        fill='#3e4354'
        d='M70,63.1h-4V53c0-13.23-10.77-24-24-24S18,39.77,18,53v10.1h-4c-0.55,0-1,0.45-1,1V68c0,0.55,0.45,1,1,1h56c0.55,0,1-0.45,1-1v-3.9C71,63.55,70.55,63.1,70,63.1z M20,53c0-12.13,9.87-22,22-22s22,9.87,22,22v10.1H20V53z M69,67H15v-1.9h4h46h4V67z'
      ></path>
      <polygon
        fill='#3e4354'
        points='61.75 33.66 68.75 25.66 67.25 24.34 60.25 32.34'
      ></polygon>
      <rect width='2' height='10' x='41' y='16' fill='#3e4354'></rect>
      <polygon
        fill='#3e4354'
        points='15.25 25.66 22.25 33.66 23.75 32.34 16.75 24.34'
      ></polygon>
    </svg>
  )
}
