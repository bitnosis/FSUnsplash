
import {useState} from 'react'
import Logo from './logo.png'

const MyNavbar = (props) => {
    const FavCount = () => <div className="text-xs px-3 text-black dark:text-white rounded-full">{props.favorite_count}</div>
    const NoFavCount = () => <span></span>
    const [darkMode, setDarkMode] = useState(false);
    (darkMode==true) ? document.body.classList.add('dark') : document.body.classList.remove('dark')

    const darkModeToggle = () =>{
        if(darkMode){
            setDarkMode(false)
            document.body.classList.remove('dark')
        } else {
            setDarkMode(true)
            document.body.classList.add('dark') 
        }
    }

    return (
      <>
        <nav id="header" className="w-full bg-white dark:bg-gray-700 z-30 top-0 py-1">
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3">
        
            <label for="menu-toggle" className="cursor-pointer md:hidden block">
                <svg className="fill-current text-gray-900 dark:text-white" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                    <title>menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                </svg>
            </label>
            <input className="hidden" type="checkbox" id="menu-toggle" />
            <div className="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1" id="menu">
                <nav>
                    <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
                        <li><a className="inline-block no-underline  dark:text-white hover:text-black hover:underline py-2 px-4" href="/">Search</a></li>
                        <li><a className="inline-block no-underline  dark:text-white hover:text-black hover:underline py-2 px-4" href="/slideshow">Slideshow</a></li>
                        <li><svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer ml-4 lg:ml-8 " onClick={()=>darkModeToggle()} width="24" height="24" viewBox="0 0 24 24"><path d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm2 0c0-5.514 4.486-10 10-10v20c-5.514 0-10-4.486-10-10z"/></svg></li>
                    </ul>
                </nav>
            </div>
            <div className="mr-8 order-1 md:order-2">
                <a className="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 dark:text-white  text-xl " href="#">
                  <img src={Logo} className='mr-4 myLogo'/>
                    UNSPLASH DEMO
                </a>
            </div>
            
            <div className="order-2 md:order-3 " >
                <a className="no-underline hover:text-black" href="/favorites">
                <svg className="text-black dark:text-white" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                    <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/></svg>
                    <div className="favcount ">
                    {props.favorite_count!=0 ? <FavCount /> : <NoFavCount />} 
                    </div>
                </a>
                
            </div>
        </div>
        </nav>
      </>
    );
}

export default MyNavbar;


