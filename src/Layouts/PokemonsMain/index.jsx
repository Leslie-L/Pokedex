function PokemonsMain({children}) {
    return(
        <main className="w-full h-screen flex justify-center items-start">
            <div className="grid grid-cols-1 justify-center place-items-center gap-x-2 gap-y-8 md:grid-cols-2 lg:grid-cols-3 lg:w-9/12">
                 {children}
            </div>
        </main>
    )
}
export default PokemonsMain