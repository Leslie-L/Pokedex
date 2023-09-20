import pokeball from '../../Images/pokeball.svg'
function Navigation() {
    return(
        <section className="w-full h-24 flex flex-col justify-center items-center">
            <div className='flex mx-2'>
                <img src={pokeball} alt={pokeball}  className='w-8 h-8 bg-cover mr-2'/>
                <input type="text" className='w-72 bg-red rounded-md text-white2 shadow-md px-2' placeholder='Busca un pokemon!' />
            </div>
        </section>
    )
}
export default Navigation;