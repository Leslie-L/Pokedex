import logo from '../../Images/logo.svg'
function Header() {
    return(
        <header className='w-full h-32 flex justify-center'>
            <img src={logo} alt="logo pokemon" className='w-64 h-32' />
        </header>
    )
}
export default Header;