export const blockMod = (blockName: string, modifiers: (string|boolean)[]) => modifiers
    .filter(modifier => 
        typeof modifier === 'string' ? !!modifier.length : false
    )
    .map(modifier => 
        `${blockName}--${(modifier as string).trim()}`
    )
    .join(' ')

    
export const goTo = (id: string) => {
    const target = document.getElementById(id) as HTMLElement
    const parentElem = target.parentElement as HTMLElement
    
    const newTop = target.getBoundingClientRect().top - parentElem.getBoundingClientRect().top - NAVBAR_HEIGHT
    
    window.scrollTo({ top: newTop, behavior: 'smooth' })
    
    const scrollIsComplete = () => Math.abs(window.scrollY - newTop) <= 2 // account for some variation in box sizing between browsers
    
    function onScroll() {
        if (scrollIsComplete()) {
        window.location.hash = id
        window.scrollTo(0, newTop)
        window.removeEventListener('scroll', onScroll)
        }
    }
    
    window.addEventListener('scroll', onScroll)
}