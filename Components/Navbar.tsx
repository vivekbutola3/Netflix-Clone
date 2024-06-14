import { useCallback, useEffect, useState } from "react"
import MobileMenu from "./MobileMenu"
import NavbarItems from "./NavbarItems"
import {FaChevronDown,FaSearch,FaBell} from "react-icons/fa"
import AccountMenu from "./AccountMenu"

const TOP_OFFSET = 66;
const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => 
            !current)
    }, [])
    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => 
            !current)
    }, [])
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackground(true);
            } else {
                setShowBackground(false);
           }
        }
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll',handleScroll)
        }
    },[])
    return (<>
        <nav className="w-full fixed z-40">
            <div className={`px-4 md:px-16 flex py-6 flex flex-row items-center transition duration-500 ${showBackground?'bg-zinc-900 bg-opacity-90':""}`}>
                <img className="h-4 lg:h-7" src="/images/logo.png" alt="logo" />
                <div className="flex-row ml-8 gap-7 hidden lg:flex">
                    <NavbarItems label="Home" />
                    <NavbarItems label="Series" />
                    <NavbarItems label="Films" />
                    <NavbarItems label="New & Popular" />
                    <NavbarItems label="My List" />
                    <NavbarItems label="Browse by langugaes"/>
                </div>
                <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white text-sm">Browse</p>
                    <FaChevronDown style={{ color: "white" }} className="text-white transatio" />
                    <MobileMenu visible={showMobileMenu} />
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transation">
                        <FaSearch />
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transation">
                        <FaBell  />
                    </div>
                    <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img src="/images/default-blue.png" alt=" "/>
                        </div>
                        <FaChevronDown style={{
                            color: "white",
                            }} className={`text-white transation ${showAccountMenu ? 'rotate-180' : 'rorate-0'}`} />
                        <AccountMenu visible={showAccountMenu} />
                    </div>
                </div>
            </div>
          
        </nav>
    </>)
}

export default Navbar
