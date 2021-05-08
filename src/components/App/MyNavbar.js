

import Heart from '../../heart.svg'
import Logo from './logo.png'

const MyNavbar = (props) => {
    const FavCount = () => <div class="text-xs px-3 bg-teal-200 text-teal-800 rounded-full">{props.favorite_count}</div>
    const NoFavCount = () => <span></span>
    return (
      <>
        <nav id="header" class="w-full z-30 top-0 py-1">
        <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3">
            <label for="menu-toggle" class="cursor-pointer md:hidden block">
                <svg class="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                    <title>menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                </svg>
            </label>
            <input class="hidden" type="checkbox" id="menu-toggle" />
            <div class="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1" id="menu">
                <nav>
                    <ul class="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
                        <li><a class="inline-block no-underline hover:text-black hover:underline py-2 px-4" href="/">Search</a></li>
                        <li><a class="inline-block no-underline hover:text-black hover:underline py-2 px-4" href="/slideshow">Slideshow</a></li>
                    </ul>
                </nav>
            </div>
            <div class="order-1 md:order-2">
                <a class="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl " href="#">
                  <img src={Logo} class='myLogo'/>
                    UNSPLASH DEMO
                </a>
            </div>
            <div class="order-2 md:order-3 " >
                <a class="no-underline hover:text-black" href="/favorites">
                    <img src={Heart} />
                    <div className="favcount">
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


