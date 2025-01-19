import { useState } from 'react'
import reactLogo from '../assets/react.svg'

function Layout({ children }) {
  const [show, setShow] = useState(true)

  const handleBar = () =>{
    setShow(show ? false : true)
  }

  return (
    <div className='w-full'>
      {show ? <div className="absolute z-50 w-full rounded-lg border shadow-sm overflow-hidden bg-white border-stone-200 shadow-stone-950/5 max-w-[280px]">
        <div className="w-[calc(100%-16px)] rounded m-2 mx-3 mb-0 mt-3 flex h-max items-center gap-2">
          <img src="/logo.png" alt="brand" className="inline-block object-cover object-center w-6 h-6 rounded-sm" />
          <p className="font-sans antialiased text-base text-current font-semibold">Material Tailwind</p>
          <button className="outline-none group ml-12" aria-expanded="false" aria-haspopup="dialog" onClick={handleBar}>
            <button className="inline-grid place-items-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm min-w-[38px] min-h-[38px] rounded-md shadow-sm hover:shadow-md bg-stone-800 border-stone-800 text-stone-50 hover:bg-stone-700 hover:border-stone-700">
              X
            </button>
          </button>
        </div>
        <div className="w-full h-max rounded p-3">
          <ul className="flex flex-col gap-0.5 min-w-60">
            <li href="#" class="flex items-center py-1.5 px-2.5 rounded-md align-middle select-none font-sans transition-all duration-300 ease-in aria-disabled:opacity-50 aria-disabled:pointer-events-none bg-transparent text-stone-600 hover:text-stone-800 dark:hover:text-white hover:bg-stone-200 focus:bg-stone-200 focus:text-stone-800 dark:focus:text-white dark:data-[selected=true]:text-white dark:bg-opacity-70">
              <span className="grid place-items-center shrink-0 me-2.5"><svg width="1.5em" height="1.5em" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="h-[18px] w-[18px]"><path d="M7 9L12 12.5L17 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2 17V7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17Z" stroke="currentColor"></path></svg>
              </span>Inbox
              <span className="grid place-items-center shrink-0 ps-2.5 ms-auto">
                <div className="relative inline-flex w-max items-center border font-sans font-medium rounded-md text-xs p-0.5 bg-stone-800/10 border-transparent text-stone-800 shadow-none">
                  <span className="font-sans text-current leading-none my-0.5 mx-1.5">14</span>
                </div>
              </span>
            </li>
            <li href="#" className="flex items-center py-1.5 px-2.5 rounded-md align-middle select-none font-sans transition-all duration-300 ease-in aria-disabled:opacity-50 aria-disabled:pointer-events-none bg-transparent text-stone-600 hover:text-stone-800 dark:hover:text-white hover:bg-stone-200 focus:bg-stone-200 focus:text-stone-800 dark:focus:text-white dark:data-[selected=true]:text-white dark:bg-opacity-70">
              <span className="grid place-items-center shrink-0 me-2.5"><svg width="1.5em" height="1.5em" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="h-[18px] w-[18px]"><g clip-path="url(#clip0_2476_13290)"><path d="M22.1525 3.55321L11.1772 21.0044L9.50686 12.4078L2.00002 7.89795L22.1525 3.55321Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9.45557 12.4436L22.1524 3.55321" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>
              </span>Sent</li>
            <li href="#" className="flex items-center py-1.5 px-2.5 rounded-md align-middle select-none font-sans transition-all duration-300 ease-in aria-disabled:opacity-50 aria-disabled:pointer-events-none bg-transparent text-stone-600 hover:text-stone-800 dark:hover:text-white hover:bg-stone-200 focus:bg-stone-200 focus:text-stone-800 dark:focus:text-white dark:data-[selected=true]:text-white dark:bg-opacity-70">
              <span class="grid place-items-center shrink-0 me-2.5"><svg width="1.5em" height="1.5em" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="h-[18px] w-[18px]"><path d="M4 21.4V2.6C4 2.26863 4.26863 2 4.6 2H16.2515C16.4106 2 16.5632 2.06321 16.6757 2.17574L19.8243 5.32426C19.9368 5.43679 20 5.5894 20 5.74853V21.4C20 21.7314 19.7314 22 19.4 22H4.6C4.26863 22 4 21.7314 4 21.4Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 2V5.4C16 5.73137 16.2686 6 16.6 6H20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </span>Drafts</li>
            <li href="#" className="flex items-center py-1.5 px-2.5 rounded-md align-middle select-none font-sans transition-all duration-300 ease-in aria-disabled:opacity-50 aria-disabled:pointer-events-none bg-transparent text-stone-600 hover:text-stone-800 dark:hover:text-white hover:bg-stone-200 focus:bg-stone-200 focus:text-stone-800 dark:focus:text-white dark:data-[selected=true]:text-white dark:bg-opacity-70">
              <span class="grid place-items-center shrink-0 me-2.5"><svg width="1.5em" height="1.5em" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="h-[18px] w-[18px]"><path d="M9.5 14.5L3 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5.00007 9.48528L14.1925 18.6777L15.8895 16.9806L15.4974 13.1944L21.0065 8.5211L15.1568 2.67141L10.4834 8.18034L6.69713 7.78823L5.00007 9.48528Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </span>Pins</li>
            <li href="#" className="flex items-center py-1.5 px-2.5 rounded-md align-middle select-none font-sans transition-all duration-300 ease-in aria-disabled:opacity-50 aria-disabled:pointer-events-none bg-transparent text-stone-600 hover:text-stone-800 dark:hover:text-white hover:bg-stone-200 focus:bg-stone-200 focus:text-stone-800 dark:focus:text-white dark:data-[selected=true]:text-white dark:bg-opacity-70">
              <span class="grid place-items-center shrink-0 me-2.5"><svg width="1.5em" height="1.5em" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="h-[18px] w-[18px]"><path d="M7 6L17 6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 9L17 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9 17H15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 12H2.6C2.26863 12 2 12.2686 2 12.6V21.4C2 21.7314 2.26863 22 2.6 22H21.4C21.7314 22 22 21.7314 22 21.4V12.6C22 12.2686 21.7314 12 21.4 12H21M3 12V2.6C3 2.26863 3.26863 2 3.6 2H20.4C20.7314 2 21 2.26863 21 2.6V12M3 12H21" stroke="currentColor"></path></svg>
              </span>Archive</li>
            <li href="#" className="flex items-center py-1.5 px-2.5 rounded-md align-middle select-none font-sans transition-all duration-300 ease-in aria-disabled:opacity-50 aria-disabled:pointer-events-none bg-transparent text-stone-600 hover:text-stone-800 dark:hover:text-white hover:bg-stone-200 focus:bg-stone-200 focus:text-stone-800 dark:focus:text-white dark:data-[selected=true]:text-white dark:bg-opacity-70">
              <span className="grid place-items-center shrink-0 me-2.5"><svg width="1.5em" height="1.5em" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="h-[18px] w-[18px]"><path d="M3.03919 4.2939C3.01449 4.10866 3.0791 3.92338 3.23133 3.81499C3.9272 3.31953 6.3142 2 12 2C17.6858 2 20.0728 3.31952 20.7687 3.81499C20.9209 3.92338 20.9855 4.10866 20.9608 4.2939L19.2616 17.0378C19.0968 18.2744 18.3644 19.3632 17.2813 19.9821L16.9614 20.1649C13.8871 21.9217 10.1129 21.9217 7.03861 20.1649L6.71873 19.9821C5.6356 19.3632 4.90325 18.2744 4.73838 17.0378L3.03919 4.2939Z" stroke="currentColor"></path><path d="M3 5C5.57143 7.66666 18.4286 7.66662 21 5" stroke="currentColor"></path></svg>
              </span>Trash</li>
            <hr className="-mx-3 my-3 border-stone-200" />
            <li className="flex items-center py-1.5 px-2.5 rounded-md align-middle select-none font-sans transition-all duration-300 ease-in aria-disabled:opacity-50 aria-disabled:pointer-events-none bg-transparent text-stone-600 hover:text-stone-800 dark:hover:text-white hover:bg-stone-200 focus:bg-stone-200 focus:text-stone-800 dark:focus:text-white dark:data-[selected=true]:text-white dark:bg-opacity-70">
              <span className="grid place-items-center shrink-0 me-2.5"><svg width="1.5em" height="1.5em" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="h-[18px] w-[18px]"><path d="M7 12.5C7.27614 12.5 7.5 12.2761 7.5 12C7.5 11.7239 7.27614 11.5 7 11.5C6.72386 11.5 6.5 11.7239 6.5 12C6.5 12.2761 6.72386 12.5 7 12.5Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 12.5C12.2761 12.5 12.5 12.2761 12.5 12C12.5 11.7239 12.2761 11.5 12 11.5C11.7239 11.5 11.5 11.7239 11.5 12C11.5 12.2761 11.7239 12.5 12 12.5Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17 12.5C17.2761 12.5 17.5 12.2761 17.5 12C17.5 11.7239 17.2761 11.5 17 11.5C16.7239 11.5 16.5 11.7239 16.5 12C16.5 12.2761 16.7239 12.5 17 12.5Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </span>More
              <span className="grid place-items-center shrink-0 ps-2.5 ms-auto"><svg width="1.5em" height="1.5em" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="h-4 w-4 "><path d="M9 6L15 12L9 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </span>
            </li>
            <hr className="-mx-3 my-3 border-stone-200" />
            <li className="flex items-center py-1.5 px-2.5 rounded-md align-middle select-none font-sans transition-all duration-300 ease-in aria-disabled:opacity-50 aria-disabled:pointer-events-none bg-transparent dark:hover:text-white dark:focus:text-white dark:data-[selected=true]:text-white dark:bg-opacity-70 text-red-500 hover:bg-red-500/10 hover:text-error focus:bg-error/10 focus:text-error">
              <span className="grid place-items-center shrink-0 me-2.5"><svg width="1.5em" height="1.5em" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="h-[18px] w-[18px]"><path d="M12 12H19M19 12L16 15M19 12L16 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19 6V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </span>Logout</li>
          </ul>
        </div>
      </div>:
      <button className="absolute z-50 outline-none group m-4" aria-expanded="false" aria-haspopup="dialog" onClick={handleBar}>
            <button className="inline-grid place-items-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm min-w-[38px] min-h-[38px] rounded-md shadow-sm hover:shadow-md bg-stone-800 border-stone-800 text-stone-50 hover:bg-stone-700 hover:border-stone-700">
              Menu
            </button>
          </button>}

        <div>
          {children}
        </div>

      <footer class="relative w-full z-40">
      <div class="mx-auto w-full max-w-7xl px-8">
        <div class="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
          <h6 class="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-current mb-4">Material Tailwind</h6>
          <div class="grid grid-cols-3 justify-between gap-x-6 gap-y-4">
            <ul>
              <p class="font-sans antialiased text-base text-current mb-2 font-semibold opacity-50">Product</p>
              <li>
                <a href="#" class="font-sans antialiased text-base text-current py-1 hover:text-primary">Overview</a>
              </li>
              <li>
                <a href="#" class="font-sans antialiased text-base text-current py-1 hover:text-primary">Features</a>
              </li>
              <li>
                <a href="#" class="font-sans antialiased text-base text-current py-1 hover:text-primary">Solutions</a>
              </li>
              <li>
                <a href="#" class="font-sans antialiased text-base text-current py-1 hover:text-primary">Tutorials</a>
              </li>
            </ul>
            <ul>
              <p class="font-sans antialiased text-base text-current mb-2 font-semibold opacity-50">Company</p>
              <li>
                <a href="#" class="font-sans antialiased text-base text-current py-1 hover:text-primary">About us</a>
              </li>
              <li>
                <a href="#" class="font-sans antialiased text-base text-current py-1 hover:text-primary">Careers</a>
              </li>
              <li>
                <a href="#" class="font-sans antialiased text-base text-current py-1 hover:text-primary">Press</a>
              </li>
              <li>
                <a href="#" class="font-sans antialiased text-base text-current py-1 hover:text-primary">News</a>
              </li>
            </ul>
            <ul>
              <p class="font-sans antialiased text-base text-current mb-2 font-semibold opacity-50">Resource</p>
              <li>
                <a href="#" class="font-sans antialiased text-base text-current py-1 hover:text-primary">Blog</a>
              </li>
              <li>
                <a href="#" class="font-sans antialiased text-base text-current py-1 hover:text-primary">Newsletter</a>
              </li>
              <li>
                <a href="#" class="font-sans antialiased text-base text-current py-1 hover:text-primary">Events</a>
              </li>
              <li>
                <a href="#" class="font-sans antialiased text-base text-current py-1 hover:text-primary">Help center</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-10 flex w-full flex-col items-center justify-center gap-4 border-t border-stone-200 py-4 md:flex-row md:justify-between">
          <small class="font-sans antialiased text-sm text-current text-center">© 2024
            <a href="https://material-tailwind.com/">Material Tailwind</a>. All Rights Reserved.</small>
          <div class="flex gap-1 sm:justify-center">
            <a href="#" class="inline-grid place-items-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm min-w-[34px] min-h-[34px] rounded-md bg-transparent border-transparent text-stone-800 hover:bg-stone-200/10 hover:border-stone-600/10 shadow-none hover:shadow-none"><svg width="1.5em" height="1.5em" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="h-4 w-4"><path d="M17 2H14C12.6739 2 11.4021 2.52678 10.4645 3.46447C9.52678 4.40215 9 5.67392 9 7V10H6V14H9V22H13V14H16L17 10H13V7C13 6.73478 13.1054 6.48043 13.2929 6.29289C13.4804 6.10536 13.7348 6 14 6H17V2Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </a>
            <a href="#" class="inline-grid place-items-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm min-w-[34px] min-h-[34px] rounded-md bg-transparent border-transparent text-stone-800 hover:bg-stone-200/10 hover:border-stone-600/10 shadow-none hover:shadow-none"><svg width="1.5em" height="1.5em" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="h-4 w-4"><path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16Z" stroke="currentColor"></path><path d="M17.5 6.51L17.51 6.49889" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </a>
            <a href="#" class="inline-grid place-items-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm min-w-[34px] min-h-[34px] rounded-md bg-transparent border-transparent text-stone-800 hover:bg-stone-200/10 hover:border-stone-600/10 shadow-none hover:shadow-none"><svg width="1.5em" height="1.5em" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="h-4 w-4"><path d="M16.8198 20.7684L3.75317 3.96836C3.44664 3.57425 3.72749 3 4.22678 3H6.70655C6.8917 3 7.06649 3.08548 7.18016 3.23164L20.2468 20.0316C20.5534 20.4258 20.2725 21 19.7732 21H17.2935C17.1083 21 16.9335 20.9145 16.8198 20.7684Z" stroke="currentColor"></path><path d="M20 3L4 21" stroke="currentColor" stroke-linecap="round"></path></svg>
            </a>
            <a href="#" class="inline-grid place-items-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm min-w-[34px] min-h-[34px] rounded-md bg-transparent border-transparent text-stone-800 hover:bg-stone-200/10 hover:border-stone-600/10 shadow-none hover:shadow-none"><svg width="1.5em" height="1.5em" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="h-4 w-4"><path d="M16 22.0268V19.1568C16.0375 18.68 15.9731 18.2006 15.811 17.7506C15.6489 17.3006 15.3929 16.8902 15.06 16.5468C18.2 16.1968 21.5 15.0068 21.5 9.54679C21.4997 8.15062 20.9627 6.80799 20 5.79679C20.4558 4.5753 20.4236 3.22514 19.91 2.02679C19.91 2.02679 18.73 1.67679 16 3.50679C13.708 2.88561 11.292 2.88561 8.99999 3.50679C6.26999 1.67679 5.08999 2.02679 5.08999 2.02679C4.57636 3.22514 4.54413 4.5753 4.99999 5.79679C4.03011 6.81549 3.49251 8.17026 3.49999 9.57679C3.49999 14.9968 6.79998 16.1868 9.93998 16.5768C9.61098 16.9168 9.35725 17.3222 9.19529 17.7667C9.03334 18.2112 8.96679 18.6849 8.99999 19.1568V22.0268" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9 20.0267C6 20.9999 3.5 20.0267 2 17.0267" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </a>
            <a href="#" class="inline-grid place-items-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm min-w-[34px] min-h-[34px] rounded-md bg-transparent border-transparent text-stone-800 hover:bg-stone-200/10 hover:border-stone-600/10 shadow-none hover:shadow-none"><svg width="1.5em" height="1.5em" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="h-4 w-4"><path d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16.6726 20.8435C15.5 14 12.5 8.00003 8.5 2.62964" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2.06653 10.8406C6.00004 11 15.2829 10.5 19.1415 5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21.9677 12.81C15.3438 10.8407 7.50002 14.0001 5.23145 19.3613" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Layout
