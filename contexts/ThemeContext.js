import {createContext, useState, useEffect} from 'react'

export const ThemeContext = createContext()

export function ThemeProvider({children}){
    const [isDark, setIsDark] = useState(() => {
        const savedMode = localStorage.getItem('isDarkMode')
        return savedMode !== null ? JSON.parse(savedMode) : false
    })
    
    // Apply theme to body element
    useEffect(() => {
        if (isDark) {
            document.body.classList.add('dark')
        } else {
            document.body.classList.remove('dark')
        }
    }, [isDark])

    return (
        <ThemeContext.Provider value={[isDark, setIsDark]}>  
            {children}
        </ThemeContext.Provider>
    )
}
